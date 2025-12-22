import { usersMock } from "@/mocks/users";
import { paymentsMock } from "@/mocks/payments";
import { User } from "@/types/user";
import { Payment } from "@/types/payment";

export async function getUsers(): Promise<User[]> {
  return new Promise((resolve) => setTimeout(() => resolve(usersMock), 500));
}

export async function getPayments(): Promise<Payment[]> {
  return new Promise((resolve) => setTimeout(() => resolve(paymentsMock), 500));
}
