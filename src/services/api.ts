import { usersMock } from "@/mocks/users";
import { paymentsMock } from "@/mocks/payments";
import { ordersMock } from "@/mocks/orders";
import { User } from "@/types/user";
import { Payment } from "@/types/payment";
import { Order } from "@/types/order";

export async function getUsers(): Promise<User[]> {
  return new Promise((resolve) => setTimeout(() => resolve(usersMock), 500));
}

export async function getPayments(): Promise<Payment[]> {
  return new Promise((resolve) => setTimeout(() => resolve(paymentsMock), 500));
}

export async function getOrders(): Promise<Order[]> {
  return new Promise((resolve) => setTimeout(() => resolve(ordersMock), 500));
}
