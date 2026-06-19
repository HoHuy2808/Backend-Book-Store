import { prisma } from "@/config/prisma"
import { OrderStatus, Prisma } from "@prisma/client"
import { includes } from "zod/v4"

// Order
export const getAllOrder = () => {
    return prisma.order.findMany()
}
export const getAllOrderActive = () => {
    return prisma.order.findMany({
        where: {
            isDeleted: false
        }
    });
};

export const getOrderById = (orderId: string) => {
    return prisma.order.findUnique({
        where: { id: orderId }
    })
}

export const createOrder = async (
    tx: any,
    customerId: string,
    totalPrice: number,
    items: any[]
) => {
    return await tx.order.create({
        data: {
            customerId: customerId,
            total: totalPrice,
            items: {
                create: items
            }
        },
        include: { items: true }
    })
}

export const findOrderById = (orderId: string) => {
    return prisma.order.findUnique({
        where: { id: orderId },
        include: { items: true }
    })
}

export const updateOrder = async (
    tx: any,
    orderId: string,
    totalPrice: number,
) => {
    return await tx.order.update({
        where: { id: orderId },
        data: { total: totalPrice },
        include: { items: true }
    })
}

export const updateOrderStatus = async (
    tx: any,
    orderId: string,
    orderStatus: OrderStatus,
) => {
    return await tx.order.update({
        where: { id: orderId },
        data: { status: orderStatus },
    })
}

export const idDeleted = (orderId: string) => {
    return prisma.order.update({
        where: { id: orderId },
        data: { isDeleted: true }
    })
}

export const remove = (orderId: string) => {
    return prisma.order.delete({
        where: {id: orderId}
    })
}
// Order Items
export const getAllOrderItems = async (tx: any, orderId: string) => {
    return await tx.orderItems.findMany({
        where: { orderId: orderId }
    })
}

export const createOrderItems = async (
    tx: any,
    orderId: string,
    bookId: string,
    quantity: number,
    price: number
) => {
    return await tx.orderItems.create({
        data: {
            orderId: orderId,
            bookId: bookId,
            quantity: quantity,
            price: price
        }
    })
}

export const updateOrderItems = async (
    tx: any,
    orderItemId: string,
    quantity: number
) => {
    return await tx.orderItems.update({
        where: { id: orderItemId },
        data: { quantity: quantity }
    })
}
