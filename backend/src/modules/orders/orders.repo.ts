import { prisma } from "@/config/prisma"
import { Prisma } from "@prisma/client"
import { includes } from "zod/v4"

// Order
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
    totalPrice: number
) => {
    return await tx.order.update({
        where: {id: orderId},
        data: {total: totalPrice},
        include: {items: true}
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
    orderItemId:string,
    quantity: number
) => {
    return await tx.orderItems.update({
        where: {id: orderItemId},
        data: {quantity: quantity}
    })
}
