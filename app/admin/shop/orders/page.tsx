"use server";
import { getDocuments } from "@/firebase";
import AdminOrders from "./AdminOrders";

export default async function Page() {
  const orders: any = await getDocuments("orders");

  return (
    <div className="relative">
      <AdminOrders orders={orders} />
    </div>
  );
}
