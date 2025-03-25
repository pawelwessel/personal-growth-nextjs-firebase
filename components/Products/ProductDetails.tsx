import { getPolishCurrency } from "@/lib/getPolishCurrency";
import Image from "next/image";

export default function ProductDetails({ product }: { product: any }) {
  return (
    <div className="">
      <div className="h-[300px] relative overflow-hidden flex flex-col items-center justify-center rounded-2xl">
        <div className="w-full h-full bg-black/50 z-10 absolute left-0 top-0"></div>
        <Image
          src={product?.mainImage}
          width={1024}
          height={1024}
          alt={product?.title}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-[5] w-full bg-center"
        />

        <h2 className="z-20 font-calistoga text-white drop-shadow-lg text-2xl sm:text-3xl xl:text-4xl font-bold">
          {product.title}
        </h2>
        {product.price > 0 && (
          <span className="z-20 font-cardo w-max block text-white bg-blue-600 rounded-xl px-3 py-1 mt-3 drop-shadow-lg shadow-black">
            {getPolishCurrency(product.price)}
          </span>
        )}
      </div>
    </div>
  );
}
