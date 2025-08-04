import Image from "next/image";
import Link from "next/link";
import hero from "@/public/hero.png";
import logo from "@/public/logo.png";
import brain from "@/public/brain.png";
import asset1 from "@/public/assets/1.jpg";
import asset2 from "@/public/assets/2.jpg";
import asset3 from "@/public/assets/3.jpg";
import asset4 from "@/public/assets/4.jpg";
import asset5 from "@/public/assets/5.jpg";
import Products from "@/components/Products";
import Courses from "@/components/Courses";
import { getProducts } from "@/lib/getProducts";
import { blogService } from "@/lib/blogService";
import { Metadata } from "next";
import Script from "next/script";
import NewsletterSignup from "@/components/NewsletterSignup";

export const dynamic = "force-dynamic";

export default async function Home() {
  const products = await getProducts();
  const recentPosts = await blogService.getAllBlogPosts();
  const latestPosts = recentPosts.slice(0, 3); // Get the 3 most recent posts

  return (
    <div className="relative min-h-screen">
      {/* Hero Section */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute min-w-full min-h-full object-cover"
          style={{
            transform: "translate3d(0, var(--scroll), 0) scale(1.25)",
          }}
        >
          <source src="/herovid.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-green-800 bg-opacity-40" />
      </div>
      <div className="relative lg:mt-0 h-[95vh] flex items-center justify-center">
        <div className="mx-6 pt-8 bg-black/50 p-4 lg:p-12 rounded-3xl flex flex-col items-center justify-center text-center lg:text-left lg:flex-row-reverse ">
          <div className="relative">
            <Image
              src={hero}
              width={1024}
              height={1024}
              alt="Zdrowe posiłki i plany dietetyczne"
              className="w-[175px] lg:w-[400px] xl:w-[300px] 2xl:w-[300px] rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-300 border-2 border-green-500"
            />
            <div className="absolute -bottom-4 -left-4 bg-white text-black px-4 py-2 rounded-full text-sm font-bold border-2 border-green-500">
              Kursy i testy
            </div>
            <div className="absolute -top-4 -right-4 bg-white text-black px-4 py-2 rounded-full text-sm font-bold border-2 border-green-500">
              Zdrowa dieta
            </div>
          </div>
          <div className="lg:mr-12 max-w-[450px]">
            <h1 className=" text-2xl lg:text-4xl font-bold mt-6 text-white">
              Rozwój osobisty i zdrowie w jednym miejscu
            </h1>
            <p className="px-6 lg:pl-0 sm:text-lg mt-6 text-white font-pt max-w-lg leading-relaxed">
              Profesjonalne diety stworzone przez ekspertów. Energia, zdrowie,
              lepsze jutro.
            </p>
            <div className="flex flex-row gap-4 justify-center lg:justify-start mt-8">
              <a
                href="/#shop"
                className="w-max text-xs max-w-full sm:text-base px-4 py-2 bg-white text-green-600 border-2 border-green-600 rounded-full hover:bg-green-50 transform hover:scale-105 transition-all duration-300 font-bold shadow-lg relative"
              >
                Profesjonalna dieta
              </a>
              <a
                href="/#courses"
                className="w-max text-xs max-w-full sm:text-base px-4 py-2 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-full hover:from-green-700 hover:to-teal-700 transform hover:scale-105 transition-all duration-300 font-bold shadow-lg relative"
              >
                Kup dietę
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Courses Section */}
      <div className="pt-12 bg-white" />
      <Courses />
      {/* Why Choose Us Section */}
      <div className="bg-black/50 rounded-3xl p-6 lg:p-12 m-6 lg:m-12 lg:my-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center  text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-8">
            Profesjonalna dieta – bez czekania, bez wysokich kosztów
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">👨‍⚕️</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Profesjonalne plany
              </h3>
              <p className="text-gray-600">
                Każdy plan dietetyczny przygotowany jest przez specjalistę z
                zakresu dietetyki
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">⚖️</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Zbilansowane diety
              </h3>
              <p className="text-gray-600">
                Diety są zbilansowane, pełnowartościowe, dostosowane do potrzeb
                osób chcących redukować wagę, utrzymać zdrowie lub budować masę
                mięśniową
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-red-400 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">📄</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Gotowe do wydruku
              </h3>
              <p className="text-gray-600">
                Pliki PDF są przejrzyste, gotowe do wydruku i zawierają listy
                zakupów oraz dokładne przepisy
              </p>
            </div>
          </div>
          <div className="flex flex-row gap-4 justify-center mt-8">
            <a
              href="/#shop"
              className="w-max text-xs max-w-full sm:text-base px-4 py-2 bg-white text-green-600 border-2 border-green-600 rounded-full hover:bg-green-50 transform hover:scale-105 transition-all duration-300 font-bold shadow-lg relative"
            >
              Kup dietę
            </a>
            <a
              href="/#courses"
              className="w-max text-xs max-w-full sm:text-base px-4 py-2 bg-white text-green-600 border-2 border-green-600 rounded-full hover:bg-green-50 transform hover:scale-105 transition-all duration-300 font-bold shadow-lg relative"
            >
              Rozwój osobisty
            </a>
          </div>
        </div>
      </div>
      {/* How It Works Section */}
      <div className="py-16 px-6 lg:px-12 bg-gradient-to-r from-purple-100 to-pink-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center  text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-12">
            Dieta?
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <Image
                src={asset1}
                width={600}
                height={400}
                alt="Dieta"
                className="rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Prosty proces w 4 krokach
              </h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">
                      Wybierz swoją dietę online
                    </p>
                    <p className="text-gray-600 text-sm">
                      Keto, wegetariańska, redukcyjna, dla sportowców
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">
                      Płać szybko i bezpiecznie
                    </p>
                    <p className="text-gray-600 text-sm">
                      Bezpieczne płatności online
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">
                      Pobierz gotowy jadłospis PDF
                    </p>
                    <p className="text-gray-600 text-sm">
                      I zacznij zdrowe odżywianie
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    4
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">
                      Wydrukuj i trzymaj się planu
                    </p>
                    <p className="text-gray-600 text-sm">Każdego dnia</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* What's Included Section */}
      <div className="py-16 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Co zawiera każdy plan dietetyczny?
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-gray-700">
                    7-dniowy lub 14-dniowy jadłospis w formie PDF
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-gray-700">
                    Zbilansowane przepisy dietetyczne dostosowane do
                    makroskładników
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-400 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-gray-700">
                    Lista zakupów na każdy tydzień
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-pink-400 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-gray-700">
                    Łatwe i szybkie w przygotowaniu posiłki
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-gray-700">
                    Piękny design gotowy do wydruku
                  </span>
                </div>
              </div>
            </div>
            <div>
              <Image
                src={asset2}
                width={600}
                height={400}
                alt="Co zawiera plan dietetyczny"
                className="rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Diet Types Section */}
      <div className="py-16 px-6 lg:px-12 bg-gradient-to-r from-green-100 to-blue-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center  text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600 mb-12">
            Typy diet do wyboru
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-red-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚖️</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Dieta redukcyjna
              </h3>
              <p className="text-gray-600">
                Dla osób chcących schudnąć i poprawić sylwetkę
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💪</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Dieta wysokobiałkowa
              </h3>
              <p className="text-gray-600">
                Dla sportowców i osób budujących masę mięśniową
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-teal-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🥬</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Dieta wegetariańska
              </h3>
              <p className="text-gray-600">
                Wegetariańska i wegańska dla zdrowia i środowiska
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🥑</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Dieta keto i low carb
              </h3>
              <p className="text-gray-600">
                Niskowęglowodanowe plany żywieniowe
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌱</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Dieta na zdrowe jelita
              </h3>
              <p className="text-gray-600">
                Wspomagająca zdrowie układu pokarmowego
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-400 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Diety spersonalizowane
              </h3>
              <p className="text-gray-600">
                Dostosowane do Twoich celów i preferencji
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Products Section */}
      <div className="bg-white mt-24 mb-12" id="shop">
        <div className="relative">
          <Image
            src={brain}
            width={512}
            height={512}
            alt="Plany Dietetyczne"
            className="brain pt-12 pb-6 w-[100px] mx-auto animate-bounce"
          />
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="text-nowrap bg-black text-white px-6 py-2 rounded-full text-sm font-bold">
              Profesjonalne plany
            </div>
          </div>
        </div>
        <h2 className="text-center  text-3xl sm:text-4xl lg:text-5xl font-bold text-black px-4">
          Wybierz swoją dietę!
        </h2>
        <p className="mx-auto mt-6 text-center px-6 lg:pl-0 sm:text-lg text-gray-700 font-pt max-w-2xl leading-relaxed">
          Profesjonalne plany dietetyczne stworzone przez dietetyków. Gotowe
          jadłospisy do wydruku z listami zakupów i przepisami. Zacznij zdrowe
          odżywianie już dziś!
        </p>
        <Products products={products} />
      </div>
      {/* Customer Reviews Section */}
      <div className="py-16 px-6 lg:px-12 bg-gradient-to-r from-blue-100 to-purple-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center  text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-12">
            Opinie klientów
          </h2>
          <div className="gap-6 grid lg:grid-cols-3">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-start space-x-4">
                <Image
                  src={asset3}
                  width={80}
                  height={80}
                  alt="Opinie klientów"
                  className="rounded-full w-20 h-20 object-cover flex-shrink-0"
                />
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800 mb-2">Anna K.</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    "Dzięki gotowej diecie schudłam 6 kg w 6 tygodni! Proste
                    przepisy i świetny design."
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-start space-x-4">
                <Image
                  src={asset4}
                  width={80}
                  height={80}
                  alt="Opinie klientów"
                  className="rounded-full w-20 h-20 object-cover flex-shrink-0"
                />
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800 mb-2">Marek P.</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    "Proste przepisy, świetny design, w końcu dieta, której mogę
                    się trzymać!"
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-start space-x-4">
                <Image
                  src={asset5}
                  width={80}
                  height={80}
                  alt="Opinie klientów"
                  className="rounded-full w-20 h-20 object-cover flex-shrink-0"
                />
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800 mb-2">Karolina M.</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    "Jako trener polecam – gotowe plany dietetyczne ułatwiają
                    pracę z klientami."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-16 px-6 lg:px-12 bg-gradient-to-r from-purple-100 to-pink-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className=" text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-6">
            Bądź na bieżąco!
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Zapisz się do newslettera i otrzymuj informacje o najnowszych
            planach dietetycznych, promocjach i wskazówkach żywieniowych prosto
            na swoją skrzynkę email.
          </p>

          <NewsletterSignup />

          <div className="mt-8 flex items-center justify-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              <span>Bezpłatne informacje</span>
            </div>
            <div className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              <span>Możliwość rezygnacji w każdej chwili</span>
            </div>
            <div className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              <span>Bez spamu</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title:
    "Gotowe Plany Dietetyczne - Profesjonalne Jadłospisy do Wydruku | Dietetyka Online",
  description:
    "Gotowe jadłospisy do wydruku z listami zakupów. Diety redukcyjne, keto, wegetariańskie. Zdrowe odżywianie online!",
  icons: [
    {
      type: "image/x-icon",
      url: "./public/logo.png",
    },
  ],
};
