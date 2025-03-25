"use client";
import Product from "./Product";
import { useState } from "react";
import dynamic from "next/dynamic";
const Masonry = dynamic(() => import("react-responsive-masonry"), {
  ssr: false,
});
const ResponsiveMasonry = dynamic(
  () => import("react-responsive-masonry").then((mod) => mod.ResponsiveMasonry),
  { ssr: false }
);
export default function Products({ products }: { products: any }) {
  const [openedImage, setOpenedImage] = useState<any>(null);
  const [isTest, setIsTest] = useState(false);
  return (
    <div className="mx-5 lg:mx-[8vw] xl:mx-[12vw]">
      {/* {isTest && <Test setIsTest={setIsTest} isTest={isTest} />} */}

      {/* implement masonry grid instead of grid */}
      <ResponsiveMasonry
        className="mt-12"
        columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1360: 4 }}
      >
        <Masonry>
          {products.length > 0 ? (
            products.map((product: any, i: number) => (
              <Product
                product={product}
                key={i}
                products={products}
                openedImage={openedImage}
                setOpenedImage={setOpenedImage}
                setIsTest={setIsTest}
              />
            ))
          ) : (
            <div className="p-4 bg-gray-200">Brak wyników... </div>
          )}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
}
