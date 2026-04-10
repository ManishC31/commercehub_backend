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
};
