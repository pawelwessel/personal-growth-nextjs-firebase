"use client";
import { useState } from "react";
import Viewer from "@/components/Viewer";
import ProductImages from "../ProductImages";
import ProjectImages from "../ProjectImages";
import ProductCard from "./ProductCard";
import ProductNavigation from "./ProductNavigation";
import Disclaimer from "./Disclaimer";
import ProductDetails from "./ProductDetails";
import MoreProducts from "./MoreProducts";
import { polishToEnglish } from "@/lib/polishToEnglish";

export default function Product({
  product,
  products,
  openedImage,
  setOpenedImage,
  setIsTest,
}: {
  product: any;
  products: any[];
  openedImage: string;
  setOpenedImage: React.Dispatch<React.SetStateAction<any>>;
  setIsTest: React.Dispatch<React.SetStateAction<boolean>>;
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
      <ProductCard setOpenedImage={setOpenedImage} product={product} />
      {openedImage === product.id && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white z-50 overflow-y-scroll left-0 top-0 lg:top-1/2 lg:-translate-y-1/2 lg:left-1/2 lg:-translate-x-1/2 fixed"
        >
          <div className="relative h-screen lg:h-[80vh] p-4 lg:p-12 w-screen lg:max-w-[80vw]">
            <ProductDetails product={product} />
            <div className="mt-12 text-black">
              <Viewer value={product.description} />
              <div className="mt-4 flex flex-wrap gap-2">
                {product?.tags.map((item: any, i: any) => (
                  <div key={item}>#{polishToEnglish(item)}</div>
                ))}
              </div>
            </div>
            <ProductImages
              product={product}
              setCurrentIndex={setCurrentIndex}
              setImageOpen={setImageOpen}
            />

            <Disclaimer />
            <MoreProducts
              setOpenedImage={setOpenedImage}
              products={products}
              product={product}
            />
            <ProductNavigation setOpenedImage={setOpenedImage} />
          </div>
        </div>
      )}
      {openedImage === product.id && (
        <div
          className="z-[21] bg-black/70 fixed left-0 top-0 w-full h-screen"
          onClick={() => setOpenedImage(null)}
        ></div>
      )}
    </>
  );
}
