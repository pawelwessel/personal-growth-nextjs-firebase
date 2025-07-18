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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="px-6 lg:mb-24 pt-6">
        <div className="flex items-center"></div>
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
      {/* Products Section */}
      <div className="bg-white mt-24" id="shop">
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
      </div>
      {/* Courses Section */}
      <div className="pt-12 bg-white"></div>
      <Courses />

      {/* Blog Section */}
      {latestPosts.length > 0 && (
        <div className="py-16 px-6 lg:px-12 bg-gradient-to-r from-green-100 to-blue-100">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-center font-calistoga text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600 mb-12">
              Najnowsze artykuły
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.url}`}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <div className="mb-4">
                    <span className="inline-block bg-gradient-to-r from-purple-400 to-pink-400 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {post.shortDesc}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-purple-600 font-medium text-sm">
                      Czytaj więcej →
                    </span>
                    <div className="flex space-x-2">
                      {post.tags
                        .split(",")
                        .slice(0, 2)
                        .map((tag, index) => (
                          <span
                            key={index}
                            className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs"
                          >
                            {tag.trim()}
                          </span>
                        ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/blog"
                className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 font-medium shadow-lg"
              >
                Zobacz wszystkie artykuły
              </Link>
            </div>
          </div>
        </div>
      )}

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
                    siebie.mp"
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
                    "Znalazłem motywację do realizacji swoich celów, raporty
                    pomogły mi zidentyfikować obszary do rozwoju."
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
                    "Nauczyłam się lepiej zarządzać swoim czasem. Ćwiczenia
                    zmotywowały mnie do działania."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-16 px-6 lg:px-12 bg-gradient-to-r from-purple-100 to-pink-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-calistoga text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-6">
            Bądź na bieżąco!
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Zapisz się do newslettera i otrzymuj informacje o najnowszych
            kursach, promocjach i wskazówkach rozwojowych prosto na swoją
            skrzynkę email.
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
