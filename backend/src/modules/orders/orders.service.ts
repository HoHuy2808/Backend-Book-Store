import { prisma } from '@/config/prisma';
import * as orderRepo from './orders.repo'
import * as bookRepo from '../book/book.repo'
import { OrderItems, OrderStatus } from '@prisma/client';

// TODO: Implement business logic cho module orders
export const getAll = async (query?: any) => {
  return [];
};

export const getById = async (id: string) => {
  throw new Error('ChÆ°a implement');
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
     * Only if Order's status is PENDING
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

export const remove = async (id: string) => {
  throw new Error('ChÆ°a implement');
};
