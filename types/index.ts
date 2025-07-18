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
  clickCount?: number; // Added to track product/test clicks
};

export interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: "Początkujący" | "Średniozaawansowany" | "Zaawansowany";
  rating: number;
  students: number;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  lessons: number;
  isPopular?: boolean;
  isNew?: boolean;
  pdfFile?: string; // URL to the PDF file
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  subscriptionStatus: "free" | "premium";
  subscriptionEndDate?: string;
  totalPurchases?: number;
  totalSpent?: number;
  lastPurchaseDate?: string;
  purchasedCourses?: string[];
  createdAt?: string;
  updatedAt?: string;
}
