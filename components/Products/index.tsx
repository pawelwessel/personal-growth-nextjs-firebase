"use client";
import Product from "./Product";
import { Suspense, useState, useEffect } from "react";
import Test from "./Test";
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
      {/* Test Modal */}
      {test && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <Test setTest={setTest} test={test} />
          </div>
        </div>
      )}

      <Suspense fallback={<div>Loading...</div>}>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
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
            <div className="col-span-full p-4 bg-gray-200">Brak wyników...</div>
          )}
        </div>
      </Suspense>
    </div>
  );
}
