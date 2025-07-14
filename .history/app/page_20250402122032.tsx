import Image from "next/image";
import hero from "@/public/hero.png";
import logo from "@/public/logo.png";
import brain from "@/public/brain.png";
import Products from "@/components/Products";
import { getProducts } from "@/lib/getProducts";
import { Metadata } from "next";
export const dynamic = "force-dynamic";
export default async function Home() {
  const products = await getProducts();
  return (
    <div className="bg-gradient-to-b from-white to-gray-300 lg:h-max h-screen">
      <div className="px-6 lg:mb-24 pt-6">
        <div className="flex items-center">
          <Image
            src={logo}
            width={512}
            height={512}
            alt="Mocny Rozwój Osobisty Logo"
            className="h-16 w-16 lg:h-20 lg:w-20"
          />
          <h2 className="font-extrabold text-lg text-black ml-4 text-center">
            MocnyRozwój.pl
          </h2>
        </div>
      </div>
      <div className="-mt-[104px] lg:-mt-0 h-full flex flex-col items-center justify-center text-center lg:text-left lg:flex-row-reverse">
        <Image
          src={hero}
          width={1024}
          height={1024}
          alt=""
          className="w-[175px] lg:w-[400px] rounded-3xl shadow-2xl"
        />
        <div>
          <h1 className="font-calistoga text-3xl sm:text-4xl font-bold mt-6 text-black">
            Rozwiń swój potencjał
          </h1>
          <p className="px-6 lg:pl-0 sm:text-lg mt-4 text-gray-700 font-pt max-w-lg">
            Zrozum siebie, odkryj swoje mocne strony i otrzymaj spersonalizowane
            wskazówki rozwojowe.
          </p>
          <a
            href="/#shop"
            className="block w-max mx-auto lg:mx-0 mt-6 px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700"
          >
            Wypróbuj za darmo
          </a>
        </div>
      </div>

      <div className="bg-white lg:mt-24" id="shop">
        <Image
          src={brain}
          width={512}
          height={512}
          alt="Narzędzia Do Rozwoju Osobistego"
          className="brain pt-12 pb-6 w-[100px] mx-auto"
        />
        <h2 className="text-center font-calistoga text-3xl sm:text-4xl font-bold text-black px-4">
          Przyszłość należy do Ciebie!
        </h2>
        <p className="mx-auto mt-4 text-center px-6 lg:pl-0 sm:text-lg text-gray-700 font-pt max-w-lg">
          Sprawdzone narzędzia, które pomogą Ci w zrozumieniu siebie i
          osiągnięciu Twoich celów.
        </p>
        <Products products={products} />
        <div className="pt-12 bg-gray-200 mt-12"></div>
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title:
    "Rozwój Osobisty: Motywacja, Produktywność, Pewność Siebie - Poradniki | MocnyRozwój.pl",
  description:
    "Znajdź skuteczne sposoby na rozwój osobisty: poradniki, testy, porady, które pomogą Ci osiągnąć cele i zbudować silną osobowość. Z nami odkryjesz swój potencjał!",
  icons: [
    {
      type: "image/x-icon",
      url: "./public/logo.png",
    },
  ],
};
