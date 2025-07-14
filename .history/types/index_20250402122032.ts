export interface ProductImage {
  src: string;
}

export interface IQuestion {
  question: string;
  answers: string[];
}

export type IProduct = {
  id: string;
  title: string;
  description: string;
  images: ProductImage[];
  mainImage: string;
  price: number;
  tags: string[];
  questions: IQuestion[];
};
