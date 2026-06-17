import { Prisma } from '@prisma/client';
import * as bookRepo from './book.repo'
import { equal } from 'assert';

// TODO: Implement business logic cho module products
export const getAll = async (
  query: { page: number, limit: number, search: string }

) => {
  const { page, limit, search } = query
  const skip = (page - 1) * limit
  const where: Prisma.BookWhereInput = {}
  if (search) {
    const searchPrice = Number(search)
    where.OR = [
      { id: { contains: search, mode: 'insensitive' } },
      { title: { contains: search, mode: 'insensitive' } },
      ...(isNaN(searchPrice)
        ? []
        : [
          { price: { equals: searchPrice } }
        ]
      )
    ]
  }
  const { total, data } = await bookRepo.getAllBooks({
    where,
    skip,
    take: limit,
  });
  return {
    total,
    page,
    limit,
    totalPage: Math.ceil(total / limit),
    data
  }
};

export const getById = async (id: string) => {
  const book = await bookRepo.findBookDetailsById(id)
  if (!book) throw new Error('Book does not exist')
  return book
};

export const create = async (data: any) => {
  const bookData: Prisma.BookCreateInput = {
    title: data.title,
    price: data.price,
    stock: data.stock,
    image: data.image,
    genres: data.genres,
    BookDetails: {
      create: {
        isbn: data.isbn,
        publishDate: data.publishDate,
        publisher: data.publisher,
        format: data.format,
        pages: data.pages,
        language: data.language,
        award: data.award
      }
    }
  }
  return bookRepo.createBook(bookData)
};


export const update = async (
  id: string,
  data: {
    book?: Prisma.BookUpdateInput,
    details?: Prisma.BookDetailsUpdateInput
  }
) => {
  const existing = await bookRepo.findBookById(id)
  if (!existing) throw new Error(`Book does not exist`)
  const updates = []
  if (data.book) {
    updates.push(bookRepo.updateBook(id, data.book))
  }
  if (data.details) {
    updates.push(bookRepo.updateBookDetails(id, data.details))
  }
  const [book, details] = await Promise.all(updates)
  return {
    book,
    details
  }
};

export const remove = async (id: string) => {
  const existing = await bookRepo.findBookById(id)
  if(!existing) throw new Error('Book does not exist')
  return bookRepo.deleteBook(id)
};

