import { prisma } from "@/config/prisma"
import { Prisma } from "@prisma/client"


export const getAllBooks = async (
    params: { where?: Prisma.BookWhereInput, skip?: number, take?: number }
) => {
    const { where, skip, take } = params
    const [data, total] = await Promise.all([
        prisma.book.findMany({
            where,
            skip,
            take,
            orderBy: { createdAt: 'desc' }
            // include: {BookDetails: true}
        }),
        prisma.book.count({ where })
    ])
    return { data, total }
}

export const createBook = (data: Prisma.BookCreateInput) => {
    return prisma.book.create({
        data: data,
        include: { BookDetails: true }
    })
}

export const findBookById = (bookId: string) => {
    return prisma.book.findUnique({
        where: { id: bookId }
    })
}

export const findBookDetailsById = (id: string) => {
    return prisma.book.findUnique({
        where: { id },
        include: { BookDetails: true }
    })
}

export const updateBook = (id: string, data: Prisma.BookUpdateInput) => {
    return prisma.book.update({
        where: { id: id },
        data: data
    })
}
export const updateBookDetails = (bookId: string, data: Prisma.BookDetailsUpdateInput) => {
    return prisma.bookDetails.update({
        where: { bookId },
        data: data
    })
}

export const deleteBook = (id: string) => {
    return prisma.book.delete({
        where: {id}
    })
}

// Transaction in Order process
export const decrementStock = async (
    tx: any,
    bookId: string,
    quantity: number
) => {
    return await tx.book.update({
        where: { id: bookId },
        data: { stock: { decrement: quantity } }
    })
}

export const incrementStock = async (
    tx: any,
    bookId: string,
    quantity: number
) => {
    return await tx.book.update({
        where: { id: bookId },
        data: { stock: { increment: quantity } }
    })
}