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
  const [loading, setLoading] = useState(true);
  return (
    <div
      className="group relative cursor-pointer"
      onClick={() => setOpenedProduct(product)}
    >
      <div className="absolute rounded-2xl z-[5] inset-0 bg-gradient-to-t from-black/30 to-black/70 group-hover:from-black/50 group-hover:to-black/50" />
      {!loading && (
        <div className="absolute z-[6] inset-0 flex items-center justify-center">
          <div className="text-center">
            <h2 className="font-pt text-white font-extralight line-clamp-2 text-2xl">
              {product.title}
            </h2>
            <div className="text-yellow-400 justify-center flex gap-3 mt-3">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
          </div>
        </div>
      )}

      <div className="overflow-hidden rounded-2xl">
        {loading && (
          <div className="w-full h-[500px] bg-gray-200 animate-pulse">
            <Image
              width={800}
              height={800}
              src={product.mainImage || product.images[0].src}
              alt={product.title}
              onLoad={() => setLoading(false)}
              className={`${
                !loading ? "opacity-100" : "opacity-0"
              } w-full h-full group-hover:scale-110 duration-1000 group-hover:rotate-3`}
            />
          </div>
        )}
        {!loading && (
          <Image
            width={800}
            height={800}
            src={product.mainImage || product.images[0].src}
            alt={product.title}
            onLoad={() => {
              setTimeout(() => {
                setLoading(false);
              }, 3000);
            }}
            className={`${
              !loading ? "opacity-100" : "opacity-0"
            } w-full h-full group-hover:scale-110 duration-1000 group-hover:rotate-3`}
          />
        )}
      </div>
    </div>
  );
}
