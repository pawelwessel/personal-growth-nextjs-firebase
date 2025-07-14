import Image from "next/image";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useMemo } from "react";
import { getPolishCurrency } from "@/lib/getPolishCurrency";
import { updateDocument } from "@/firebase";

export default function MoreProducts({
  product,
  products,
  setOpenedProduct,
}: {
  product: any;
  products: any;
  setOpenedProduct: React.Dispatch<React.SetStateAction<Product | null>>;
}) {
  const displayedProducts = useMemo(() => {
    return [...products]
      .filter((item) => item.id !== product.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 10);
  }, [products]);

  return (
    <div className="pb-6">
      <h3 className="mt-8 text-black text-lg sm:text-xl xl:text-2xl text-center lg:text-left font-bold flex flex-row items-center">
        Zobacz więcej
      </h3>
      <ResponsiveMasonry
        className="mt-4"
        columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1360: 4 }}
      >
        <Masonry>
          {displayedProducts?.map((item: any, i: any) => (
            <div
              className={`${item.title === product.title && "hidden"}`}
              key={item.title}
            >
              <button
                key={i}
                onClick={() => setOpenedProduct(item.id)}
                className="flex flex-col relative overflow-hidden rounded-2xl group drop-shadow-sm shadow-black"
              >
                <div className="absolute z-[5] inset-0 bg-gradient-to-t from-black/30 to-black/70 group-hover:from-black/50 group-hover:to-black/50" />
                <div className="absolute z-[6] inset-0 flex items-center justify-center">
                  <div className="text-center">
                    {item.price > 0 && (
                      <p className="group-hover:scale-110 scale-125 duration-700 font-cardo text-white font-bold text-sm mb-1">
                        {getPolishCurrency(item.price)}
                      </p>
                    )}
                    {item.price === 0 && (
                      <p className="text-white font-bold text-sm mb-1">
                        Zapytaj o cenę
                      </p>
                    )}
                    <h2 className="font-cardo text-white font-bold line-clamp-2">
                      {item.title}
                    </h2>
                  </div>
                </div>
                <div className="overflow-hidden rounded-2xl">
                  <Image
                    width={800}
                    height={800}
                    src={item.mainImage || item.images[0].src}
                    alt={item.title}
                    className="w-full h-full group-hover:scale-110 duration-1000 group-hover:rotate-3"
                  />
                </div>
              </button>
            </div>
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
}
