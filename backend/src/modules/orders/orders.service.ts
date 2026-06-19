import { prisma } from '@/config/prisma';
import * as orderRepo from './orders.repo'
import * as bookRepo from '../book/book.repo'
import { OrderItems, OrderStatus, Role } from '@prisma/client';

// TODO: Implement business logic cho module orders
export const getAllOrder = async (role?: Role) => {
  if (role === Role.ADMIN) {
    return orderRepo.getAllOrder();
  }

  return orderRepo.getAllOrderActive();
};

export const getOrderById = async (id: string, role?: Role) => {
  const order = await orderRepo.getOrderById(id)
  if (!order) throw new Error(`Đơn hàng không tồn tại`)
  if (role === Role.ADMIN) {
    return order;
  }
  if (role === Role.CUSTOMER) {
    if (order.isDeleted === true) {
      throw new Error("Đơn hàng không tồn tại");
    }
    return order;
  }
};

export const createOrder = async (
  customerId: string,
  items: { bookId: string, quantity: number }[]
) => {
  return prisma.$transaction(async (tx: any) => {
    let totalPrice = 0;
    let orderItemsData = []
    for (const item of items) {
      const book = await bookRepo.findBookById(item.bookId)

      // Check condition
      if (!book) throw new Error(`Book ${item.bookId} not found`);
      if (book.stock < item.quantity) throw new Error(`Book ${book.title} is out of stock`);

      // Update book's stock
      await bookRepo.decrementStock(tx, book.id, item.quantity);
      totalPrice += Number(book.price) * Number(item.quantity);

      orderItemsData.push({
        bookId: book.id,
        quantity: item.quantity,
        price: book.price
      });
    }

    // Create Order
    const newOrder = await orderRepo.createOrder(
      tx,
      customerId,
      totalPrice,
      orderItemsData
    );
    return newOrder;
  })
};

export const updateOrder = async (
  orderId: string,
  items: { bookId: string, quantity: number }[]

) => {
  return await prisma.$transaction(async (tx: any) => {
    const order = await orderRepo.findOrderById(orderId)
    if (!order) throw new Error(`Order doesn't exist`);

    /**
     * Customer can only update book's quantity or add more book in Order
     * only if Order's status is PENDING
     * If status is not PENDING -> create new Order 
     */
    if (order.status !== OrderStatus.PENDING) {
      throw new Error(`Order status isn't PENDING. Please create new order`)
    }
    for (const inputItem of items) {
      const book = await bookRepo.findBookById(inputItem.bookId);
      if (!book) throw new Error(`Book doesn't exist`);
      const orderItem = order.items.find(
        (items: OrderItems) => {
          return items.bookId === inputItem.bookId
        }
      )
      // Case: Book already exist in the Order Items.
      // Todo: Change book's quantity in the Order Items
      if (orderItem) {
        const currentQuantity = orderItem.quantity;
        const inputQuantity = inputItem.quantity;
        // Customer increase quantity
        if (currentQuantity < inputQuantity) {
          const diff = inputQuantity - currentQuantity;
          if (book.stock < diff) throw new Error(`Book ${book.title} is out of stock`);
          await bookRepo.decrementStock(tx, book.id, diff);
        };
        // Customer decrease quantity
        if (currentQuantity > inputQuantity) {
          const diff = currentQuantity - inputQuantity;
          await bookRepo.incrementStock(tx, book.id, diff);
        };
        // Update Order Items
        await orderRepo.updateOrderItems(tx, orderItem.id, inputItem.quantity)
      }
      // Case: Book does't existing in the Order Items
      // Todo: Add new book in Order Items
      else {
        if (book.stock < inputItem.quantity) {
          throw new Error(`Book ${book.title} is out of stock`)
        }
        await orderRepo.createOrderItems(
          tx,
          orderId,
          book.id,
          inputItem.quantity,
          Number(book.price)
        );
        await bookRepo.decrementStock(tx, book.id, inputItem.quantity);
      }
    }
    // Caculate total price
    const updatedItems = await orderRepo.getAllOrderItems(tx, orderId)

    const total = updatedItems.reduce(
      (sum: number, item: OrderItems) => {
        return sum + Number(item.price) * item.quantity
      },
      0
    );
    const updateOrder = await orderRepo.updateOrder(tx, orderId, total);
    return updateOrder;
  })
};

export const cancelOrder = async (
  orderId: string
) => {
  return prisma.$transaction(async(tx: any) => {
    const order = await orderRepo.findOrderById(orderId);
    if(!order) throw new Error(`Order doesn't exist`);
    if(order.status!==OrderStatus.PENDING && order.status!==OrderStatus.CONFIRMED){
      throw new Error(`Can't cancel the order`);
    };
    // Update order status
    const updateStatus = await orderRepo.updateOrderStatus(tx, orderId, OrderStatus.CANCELED);
    
    // Return book's quantity back to stock
    for(const item of order.items){
      await bookRepo.incrementStock(tx, item.bookId, item.quantity);
    };
    return updateStatus;
  })
}

export const deleteOrder = async (orderId: string) => {
  const order = await orderRepo.findOrderById(orderId);
  if(!order) throw new Error(`Order doesn't exist`);
  if(order.status!==OrderStatus.CANCELED && order.status!==OrderStatus.DONE){
    throw new Error(`Can't delete the order`);
  };
  const updateIsDeleted = await orderRepo.idDeleted(orderId);
  return updateIsDeleted;

}

export const remove = async (orderId: string) => {
  await orderRepo.remove(orderId)
};
