import { User } from "../user";
import { Product } from "../product";

export interface Feedback {
  feedbackId: number;
  user: User;
  product: Product;
  content: string;
  date: Date;
}