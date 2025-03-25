import Image from "next/image";
import { getPolishCurrency } from "@/lib/getPolishCurrency";
import { updateDocument } from "@/firebase";
import { useState } from "react";

export default function ProductCard({
  setOpenedImage,
  product,
}: {
  setOpenedImage: any;
  product: any;
}) {
  const [loading, setLoading] = useState(true);
  return (
    <div
      className="group relative cursor-pointer"
      onClick={() => {
        setOpenedImage(product.id);
        updateDocument(
          ["views"],
          [product?.views ? product?.views + 1 : 1],
          "products",
          product.id
        );
      }}
    >
      <div className="absolute z-[5] inset-0 bg-gradient-to-t from-black/10 to-black/50 group-hover:from-black/50 group-hover:to-black/50" />
      {!loading && (
        <div className="absolute z-[6] inset-0 flex items-center justify-center">
          <div className="text-center">
            {product.price > 0 && (
              <p className="group-hover:scale-110 scale-125 duration-700 font-pt font-light text-white text-sm mb-1">
                {getPolishCurrency(product.price)}
              </p>
            )}
            <h2 className="font-pt text-white font-extralight text-lg line-clamp-2">
              {product.title}
            </h2>
          </div>
        </div>
      )}

      <div className="overflow-hidden">
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
