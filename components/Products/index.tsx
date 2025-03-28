"use client";
import Product from "./Product";
import { Suspense, useState, useEffect } from "react";
import Test from "./Test";
import dynamic from "next/dynamic";

const Masonry = dynamic(() => import("react-responsive-masonry"));
const ResponsiveMasonry = dynamic(() =>
  import("react-responsive-masonry").then((mod) => mod.ResponsiveMasonry)
);

export default function Products({ data }: { data: any }) {
  const [openedImage, setOpenedImage] = useState<any>(null);
  const [test, setTest] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(typeof window !== "undefined");
  }, []);

  if (!isClient) {
    return null; // Prevent rendering on the server
  }

  return (
    <div className="mx-5 lg:mx-[8vw] xl:mx-[12vw]">
      <div
        className={`z-[100] duration-500 fixed top-0 left-0 w-full h-[10vh] bg-black ${
          !test ? "-translate-y-[10vh]" : "-translate-y-0"
        }`}
      ></div>
      <div
        className={`z-[100] duration-500 fixed bottom-0 left-0 w-full h-[10vh] bg-black ${
          !test ? "translate-y-[10vh]" : "translate-y-0"
        }`}
      ></div>
      <div
        className={`h-[80.5vh] flex items-start justify-center w-full fixed top-1/2 -translate-y-1/2 duration-500 bg-gray-100 z-[100] ${
          !test ? "left-[100vw] scale-y-0" : "left-0 scale-y-100"
        }`}
      >
        <Test setTest={setTest} test={test} />
      </div>
      {/* implement masonry grid instead of grid */}
      <Suspense fallback={<div>Loading...</div>}>
        <ResponsiveMasonry
          className="mt-12"
          columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1360: 4 }}
        >
          <Masonry gutter="12px">
            {data.length > 0 ? (
              data.map((product: any, i: number) => (
                <Product
                  product={product}
                  key={i}
                  products={data}
                  openedImage={openedImage}
                  setOpenedImage={setOpenedImage}
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
