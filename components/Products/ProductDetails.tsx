import { getPolishCurrency } from "@/lib/getPolishCurrency";
import Image from "next/image";
import hat from "../../public/hat.svg";
import calendar from "../../public/calendar.svg";
import mug from "../../public/mug.svg";
import pc from "../../public/pc.svg";
import clock from "../../public/clock.svg";
export default function ProductDetails({
  product,
  setTest,
}: {
  product: any;
  setTest: any;
}) {
  return (
    <div className="mx-auto">
      <div className="py-12 relative overflow-hidden flex flex-col items-center justify-center rounded-2xl">
        <div className="w-full h-full bg-black/80 z-10 absolute left-0 top-0"></div>
        <Image
          src={product?.mainImage}
          width={1024}
          height={1024}
          alt={product?.title}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-[5] w-full h-auto max-h-full object-cover"
        />
        {product.price > 0 && (
          <span className="z-20 font-cardo w-max block text-white bg-blue-600 rounded-xl px-3 py-1 drop-shadow-lg shadow-black">
            {getPolishCurrency(product.price)}
          </span>
        )}
        <h2 className="z-20  text-white drop-shadow-lg text-2xl sm:text-3xl xl:text-4xl font-bold mt-6">
          {product.title}
        </h2>
        <div className="text-white flex items-end flex-wrap gap-4 justify-center z-20 mt-6">
          <div className="flex-col items-center w-max justify-center text-center">
            <Image src={pc} width={28} height={28} alt="" className="mx-auto" />
            <span className="text-xs md:text-sm font-pt font-light block mt-1.5">
              100% ONLINE
            </span>
          </div>
          <div className="flex-col items-center w-max justify-center text-center">
            <Image
              src={mug}
              width={28}
              height={28}
              alt=""
              className="mx-auto"
            />
            <span className="text-xs md:text-sm font-pt font-light block mt-1.5">
              W TWOIM TEMPIE
            </span>
          </div>
          <div className="flex-col items-center w-max justify-center text-center">
            <Image
              src={clock}
              width={28}
              height={28}
              alt=""
              className="mx-auto"
            />
            <span className="text-xs md:text-sm font-pt font-light block mt-1.5">
              BEZ LIMITU
            </span>
          </div>
          <div className="flex-col items-center w-max justify-center text-center">
            <Image
              src={calendar}
              width={28}
              height={28}
              alt=""
              className="mx-auto"
            />
            <span className="text-xs md:text-sm font-pt font-light block mt-1.5">
              KIEDY CHCESZ
            </span>
          </div>
          <div className="flex-col items-center w-max justify-center text-center">
            <Image
              src={hat}
              width={28}
              height={28}
              alt=""
              className="mx-auto"
            />
            <span className="text-xs md:text-sm font-pt font-light block mt-1.5">
              OD EKSPERTÓW
            </span>
          </div>
        </div>
        <button
          onClick={() => setTest(product)}
          className="bg-blue-600 text-white rounded-xl px-6 py-2 mt-6 hover:bg-blue-700 z-20"
        >
          Wypróbuj
        </button>
      </div>
    </div>
  );
}
