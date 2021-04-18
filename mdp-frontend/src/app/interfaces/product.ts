import { Category } from './category';

export interface Product {
  _id: string;
  product_cod: string;
  name: string;
  product_desc: string;
  category: Category;
  price: number;
  status: boolean;
  created_at: Date,
  updated_at: Date,
}

export interface productData {
  product: Product;
}