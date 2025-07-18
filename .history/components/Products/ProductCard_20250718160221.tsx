import Image from "next/image";
import { getPolishCurrency } from "@/lib/getPolishCurrency";
import { useState } from "react";
import { FaStar } from "react-icons/fa6";
import { IProduct } from "@/types";

export default function ProductCard({
  setOpenedProduct,
  product,
}: {
  setOpenedProduct: React.Dispatch<React.SetStateAction<IProduct | null>>;
  product: IProduct;
}) {
  return (
    <div
      className="group relative cursor-pointer"
      onClick={() => setOpenedProduct(product)}
    >
      <div className="h-[500px] rounded-2xl overflow-hidden bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 p-1">
        <div className="bg-white h-full w-full rounded-xl relative">
          {/* Decorative elements */}
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full blur-xl opacity-70" />
          <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-br from-pink-400 to-red-400 rounded-full blur-xl opacity-70" />

          {/* Content */}
          <div className="relative h-full flex flex-col items-center justify-center p-8 group-hover:scale-105 transition-transform duration-500">
            {/* Product Image */}
            <div className="w-48 h-48 mb-8 relative rounded-lg overflow-hidden">
              <Image
                src={product.mainImage || product.images[0].src}
                alt={product.title}
                fill
                className="object-contain"
              />
            </div>

            {/* Title */}
            <h2 className="font-pt text-2xl text-gray-800 text-center line-clamp-2 mb-4 group-hover:text-purple-600 transition-colors">
              Test - {product.title}
            </h2>

            {/* Stars */}
            <div className="flex gap-2 text-yellow-400">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold shadow-lg">
                Zobacz więcej
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
