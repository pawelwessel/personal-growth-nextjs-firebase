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
