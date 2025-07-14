"use client";
import { useState } from "react";
import Viewer from "@/components/Viewer";
import ProjectImages from "../ProjectImages";
import ProductCard from "./ProductCard";
import ProductNavigation from "./ProductNavigation";
import Disclaimer from "./Disclaimer";
import ProductDetails from "./ProductDetails";
import MoreProducts from "./MoreProducts";
import { polishToEnglish } from "@/lib/polishToEnglish";
import { IProduct } from "@/types";

export default function Product({
  product,
  products,
  openedProduct,
  setOpenedProduct,
  setTest,
}: {
  product: IProduct;
  products: IProduct[];
  openedProduct: IProduct | null;
  setOpenedProduct: React.Dispatch<React.SetStateAction<IProduct | null>>;
  setTest: React.Dispatch<React.SetStateAction<IProduct | null>>;
}) {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isImageOpen, setImageOpen] = useState(false);
  return (
    <>
      <ProjectImages
        service={product}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        setImageOpen={setImageOpen}
        isImageOpen={isImageOpen}
      />
      <ProductCard setOpenedProduct={setOpenedProduct} product={product} />
      {openedProduct?.id === product.id && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="lg:rounded-2xl bg-white z-50 overflow-y-scroll left-0 top-0 lg:top-1/2 lg:-translate-y-1/2 lg:left-1/2 lg:-translate-x-1/2 fixed"
        >
          <div className="relative h-screen lg:h-[80vh] p-4 lg:p-12 w-screen lg:max-w-[80vw]">
            <ProductDetails product={product} setTest={setTest} />
            <div className="mt-12 text-black">
              <Viewer value={product.description} />
              <div className="mt-4 flex flex-wrap gap-2">
                {product?.tags.map((tag: string) => (
                  <div key={tag}>#{polishToEnglish(tag)}</div>
                ))}
              </div>
            </div>
            <Disclaimer />
            <MoreProducts
              setOpenedProduct={setOpenedProduct}
              products={products}
              product={product}
            />
            <ProductNavigation setOpenedProduct={setOpenedProduct} />
          </div>
        </div>
      )}
      {openedProduct?.id === product.id && (
        <div
          className="z-[21] bg-black/70 fixed left-0 top-0 w-full h-screen"
          onClick={() => setOpenedProduct(null)}
        ></div>
      )}
    </>
  );
}
