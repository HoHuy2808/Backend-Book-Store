import { prisma } from "@/config/prisma"
import { Prisma } from "@prisma/client"

export const createReview = (
    customerId: string,
    bookId: string,
    content: string,
    rating: number
) => {
    return prisma.review.create({
        data: {
            customer: { connect: { id: customerId } },
            book: { connect: { id: bookId } },
            content: content,
            rating: rating
        },
        include: { book: true }
    })
}

export const updateReview = (
  id: string,
  data: {
    content?: string;
    rating?: number;
  }
) => {
  return prisma.review.update({
    where: {
      id
    },

    data: {
      content: data.content,
      rating: data.rating
    }
  });
};

export const deleteReview = (
    reviewId: string
) => {
    return prisma.review.delete({
        where: { id: reviewId }
    })
}