"use client";
import { updateDocument } from "@/firebase";
import moment from "moment";
import "moment/locale/pl";
import { getPolishCurrency } from "../../../../../utils/getPolishCurrency";
import { FaCheckCircle } from "react-icons/fa";

interface Order {
  id: string;
  creationTime: string;
  customerInfo: string;
  productName: string;
  price: number;
  finished?: boolean;
}

interface CustomerInfo {
  firstName: string;
  lastName: string;
  street: string;
  houseNumber: string;
  postalCode: string;
  city: string;
  phoneNumber: string;
}

const OrderCard = ({ order }: { order: Order }) => {
  const {
    firstName,
    lastName,
    street,
    houseNumber,
    postalCode,
    city,
    phoneNumber,
  }: CustomerInfo = JSON.parse(order.customerInfo);

  return (
    <div key={order.id} className="bg-white p-4 shadow-md relative">
      <div className="absolute left-0 top-0 gap-4 w-full h-full bg-black/70 flex-col justify-center items-center flex text-center">
        <FaCheckCircle className="w-12 h-12 text-green-600" />
        <h3 className="text-3xl text-white">Zrealizowano</h3>
      </div>
      <div className="mb-2">
        <span className="font-bold">Data zamówienia:</span>{" "}
        {moment(order.creationTime).format("LLL")}
      </div>
      <div className="mb-2">
        <span className="font-bold">Klient:</span> {firstName} {lastName}
      </div>
      <div className="mb-2">
        <span className="font-bold">Adres:</span> {street} {houseNumber},{" "}
        {postalCode} {city}
      </div>
      <div className="mb-2">
        <span className="font-bold">Telefon:</span> {phoneNumber}
      </div>
      <div className="mb-2">
        <span className="font-bold">Produkt:</span> {order.productName}
      </div>
      <div className="mb-2">
        <span className="font-bold">Cena:</span>{" "}
        {getPolishCurrency(order.price / 100)}
      </div>
      {!order?.finished && (
        <button
          onClick={() =>
            updateDocument(["finished"], [true], "orders", order.id)
          }
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2"
        >
          Oznacz jako zrealizowane
        </button>
      )}
    </div>
  );
};

export default function AdminOrders({ orders }: { orders: Order[] }) {
  return (
    <div className="min-h-screen w-full bg-gray-200">
      <div className="flex flex-col pt-24 px-3 lg:px-6">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Zamówienia</h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 px-3 lg:px-6 gap-4">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}
