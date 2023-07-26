import { Payment } from "../payment";
import { Product } from "../product";
import { User } from "../user";

export interface OrderAndOrderItem {
  orderId: number;
  user: User;
  payment: Payment;
  orderDate: string;
  delivery: Delivery;
  note: string;
  totalPayment: number;
  paymentDate: string;
  orderStatus: OrderStatus
  productAndOrderItemList: ProductAndOrderItem[];
}


export interface Delivery {
    deliveryId: number,
    address: string
}


export interface ProductAndOrderItem {
    orderItemId: number;
    quantity: number;
    product: Product;
  }
export interface OrderStatus {
  statusId : number
  status: string
}