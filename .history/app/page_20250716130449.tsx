import Image from "next/image";
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
import { Metadata } from "next";
import Script from "next/script";

export const dynamic = "force-dynamic";

export default async function Home() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
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

      {/* Hero Section */}
      <div className="relative mt-[104px] lg:mt-0 h-full flex flex-col items-center justify-center text-center lg:text-left lg:flex-row-reverse px-6 lg:px-12 pb-24">
        <div className="relative">
          <Image
            src={hero}
            width={1024}
            height={1024}
            alt="Hero Image"
            className="w-[175px] lg:w-[400px] rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute -top-4 -right-4 bg-gradient-to-r from-purple-400 to-pink-400 text-white px-4 py-2 rounded-full text-sm font-bold animate-pulse">
            ✨ Nowość
          </div>
        </div>
        <div className="lg:mr-12">
          <h1 className="font-calistoga text-4xl sm:text-5xl lg:text-6xl font-bold mt-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600">
            Rozwiń swój potencjał
          </h1>
          <p className="px-6 lg:pl-0 sm:text-lg mt-6 text-gray-700 font-pt max-w-lg leading-relaxed">
            Zrozum siebie, odkryj swoje mocne strony i otrzymaj spersonalizowane
            wskazówki rozwojowe. Twoja podróż do lepszej wersji siebie zaczyna
            się tutaj.
          </p>
          <a
            href="/#shop"
            className="block w-max mx-auto lg:mx-0 mt-8 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 font-bold shadow-lg"
          >
            🚀 Wypróbuj za darmo
          </a>
        </div>
      </div>

      {/* Growth Journey Section */}
      <div className="py-16 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center font-calistoga text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600 mb-8">
            Twoja ścieżka rozwoju
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Odkryj siebie
              </h3>
              <p className="text-gray-600">
                Poznaj swoje mocne strony i obszary do rozwoju
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">💪</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Buduj pewność
              </h3>
              <p className="text-gray-600">
                Rozwijaj swoją samoocenę i pewność siebie
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-red-400 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🌟</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Osiągnij cele
              </h3>
              <p className="text-gray-600">
                Realizuj swoje marzenia i cele życiowe
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Inspiration Section */}
      <div className="py-16 px-6 lg:px-12 bg-gradient-to-r from-purple-100 to-pink-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center font-calistoga text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-12">
            Inspiracja do działania
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <Image
                src={asset1}
                width={600}
                height={400}
                alt="Inspiration"
                className="rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Każdy dzień to nowa szansa
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Nie czekaj na idealny moment. Rozpocznij swoją transformację już
                dziś. Małe kroki prowadzą do wielkich zmian.
              </p>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                  <span className="text-xl">⭐</span>
                </div>
                <div>
                  <p className="font-bold text-gray-800">Ponad 10,000+</p>
                  <p className="text-sm text-gray-600">
                    zadowolonych użytkowników
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Growth Tools Section */}
      <div className="py-16 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Narzędzia, które działają
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Sprawdzone metody i techniki, które pomogą Ci osiągnąć sukces.
                Od testów osobowości po praktyczne ćwiczenia.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-gray-700">
                    Spersonalizowane raporty
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-gray-700">Praktyczne ćwiczenia</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-400 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-gray-700">Śledzenie postępów</span>
                </div>
              </div>
            </div>
            <div>
              <Image
                src={asset2}
                width={600}
                height={400}
                alt="Growth Tools"
                className="rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Courses Section */}
      <Courses />
      {/* Success Stories Section */}
      <div className="py-16 px-6 lg:px-12 bg-gradient-to-r from-blue-100 to-purple-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center font-calistoga text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-12">
            Historie sukcesu
          </h2>
          <div className="gap-6 grid lg:grid-cols-3">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-start space-x-4">
                <Image
                  src={asset3}
                  width={80}
                  height={80}
                  alt="Success Story 1"
                  className="rounded-full w-20 h-20 object-cover flex-shrink-0"
                />
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800 mb-2">Anna K.</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    "Odkryłam swoje mocne strony i teraz jestem pewniejsza
                    siebie. Dzięki narzędziom rozwojowym zrozumiałam swój
                    potencjał i zaczęłam działać."
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
                  alt="Success Story 2"
                  className="rounded-full w-20 h-20 object-cover flex-shrink-0"
                />
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800 mb-2">Marek P.</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    "Znalazłem motywację do realizacji swoich celów.
                    Spersonalizowane raporty pomogły mi zidentyfikować obszary
                    do rozwoju."
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
                  alt="Success Story 3"
                  className="rounded-full w-20 h-20 object-cover flex-shrink-0"
                />
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800 mb-2">Karolina M.</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    "Nauczyłam się lepiej zarządzać swoim czasem. Praktyczne
                    ćwiczenia i śledzenie postępów zmotywowały mnie do
                    działania."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="bg-white lg:mt-24" id="shop">
        <div className="relative">
          <Image
            src={brain}
            width={512}
            height={512}
            alt="Narzędzia Do Rozwoju Osobistego"
            className="brain pt-12 pb-6 w-[100px] mx-auto animate-bounce"
          />
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="bg-gradient-to-r from-purple-400 to-pink-400 text-white px-6 py-2 rounded-full text-sm font-bold">
              🧠 Sprawdzone narzędzia
            </div>
          </div>
        </div>
        <h2 className="text-center font-calistoga text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 px-4">
          Przyszłość należy do Ciebie!
        </h2>
        <p className="mx-auto mt-6 text-center px-6 lg:pl-0 sm:text-lg text-gray-700 font-pt max-w-2xl leading-relaxed">
          Sprawdzone narzędzia, które pomogą Ci w zrozumieniu siebie i
          osiągnięciu Twoich celów. Rozpocznij swoją transformację już dziś.
        </p>
        <Products products={products} />
        <div className="pt-12 bg-gradient-to-r from-gray-100 to-gray-200 mt-12"></div>
      </div>
      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center mb-6">
                <Image
                  src={logo}
                  width={512}
                  height={512}
                  alt="Mocny Rozwój Osobisty Logo"
                  className="h-12 w-12 lg:h-16 lg:w-16"
                />
                <h3 className="font-bold text-xl ml-3">MocnyRozwój.pl</h3>
              </div>
              <p className="text-gray-300 mb-6 max-w-md">
                Twoja podróż do lepszej wersji siebie zaczyna się tutaj. Dołącz
                do społeczności ludzi, którzy rozwijają swój potencjał.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                  <span className="text-white">📧</span>
                </div>
                <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
                  <span className="text-white">📱</span>
                </div>
                <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center">
                  <span className="text-white">💬</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-lg mb-4">Szybkie linki</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <Link
                    href="/how-it-works"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Jak to działa
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="hover:text-white transition-colors duration-200"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Kontakt
                  </Link>
                </li>
              </ul>
            </div>

            {/* Join CTA */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6">
              <h4 className="font-bold text-lg mb-3">Dołącz za darmo!</h4>
              <p className="text-sm mb-4 text-purple-100">
                Rozpocznij swoją transformację już dziś. Pełny dostęp do
                wszystkich narzędzi rozwojowych.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Darmowe testy osobowości</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Spersonalizowane raporty</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Praktyczne ćwiczenia</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Śledzenie postępów</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 MocnyRozwój.pl. Wszystkie prawa zastrzeżone.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0 text-sm text-gray-400">
              <span>Polityka prywatności</span>
              <span>Regulamin</span>
              <span>Cookies</span>
            </div>
          </div>
        </div>
      </footer>
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
