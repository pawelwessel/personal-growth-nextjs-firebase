"use client";
import Product from "./Product";
import { Suspense, useState, useEffect } from "react";
import Test from "./Test";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { IProduct } from "@/types";

export default function Products({ products }: { products: IProduct[] }) {
  const [openedProduct, setOpenedProduct] = useState<IProduct | null>(null);
  const [test, setTest] = useState<IProduct | null>(null);
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(typeof window !== "undefined");
  }, []);
  if (!isClient) {
    return null;
  }
  return (
    <div className="mx-5 lg:mx-[8vw] xl:mx-[12vw]">
      <div
        className={`flex h-screen w-screen overflow-auto fixed top-1/2 left-0 duration-500 bg-black/50 z-[100] ${
          !test ? "scale-0 translate-y-[100vh]" : "-translate-y-1/2 scale-100"
        }`}
      >
        <Test setTest={setTest} test={test} />
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <ResponsiveMasonry
          className="mt-12"
          columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1360: 4 }}
        >
          <Masonry gutter="12px">
            {products.length > 0 ? (
              products.map((product: any, i: number) => (
                <Product
                  product={product}
                  key={i}
                  products={products}
                  openedProduct={openedProduct}
                  setOpenedProduct={setOpenedProduct}
                  setTest={setTest}
                />
              ))
            ) : (
              <div className="p-4 bg-gray-200">Brak wyników...</div>
            )}
          </Masonry>
        </ResponsiveMasonry>
      </Suspense>
    </div>
  );
}
