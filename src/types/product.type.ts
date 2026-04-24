export type NewProductInput = {
  title: string;
  description: string;
  categoryId: number;
  rating: number;
  material: string;
  careInstructions: [string];
  fit: string;
  price: number;
  discount: number;
  imageUrls: string[];
};

export type NewProductRangeInput = {
  productId: number;
  color: string;
  size: string;
  price: number;
  discount: number;
};

export type NewFeedbackInput = {
  productId: number;
  userId: number;
  rating: number;
  comment: string;
};

export type NewWishlistInput = {
  userId: number;
  productRangeId: number;
};
