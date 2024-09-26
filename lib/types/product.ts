export type Product = {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  category: {
    name: string;
    order: number;
  };
};
