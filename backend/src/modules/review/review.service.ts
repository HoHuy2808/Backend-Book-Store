import * as reviewRepo from './review.repo';


export const create = async (
    customerId: string,
    data: {
        bookId: string,
        content: string,
        rating: number
    }
) => {
    const { bookId, content, rating } = data;
    return await reviewRepo.createReview(customerId, bookId, content, rating)
};

export const update = async (
  id: string,
  data: {
    content?: string;
    rating?: number;
  }
) => {
  return reviewRepo.updateReview(id, data);
};

export const remove = async (reviewId: string) => {
    return await reviewRepo.deleteReview(reviewId)
};


// export const getAll = async (query?: any) => {
//   return [];
// };

// export const getById = async (id: string) => {
//   throw new HttpError('ChÆ°a implement', 501);
// };
