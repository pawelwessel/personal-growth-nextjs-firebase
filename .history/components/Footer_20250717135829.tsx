import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.png";

export default function Footer() {
  return (
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
              Twoja podróż do lepszej wersji siebie zaczyna się tutaj. Dołącz do
              społeczności ludzi, którzy rozwijają swój potencjał.
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
                  href="/blog"
                  className="hover:text-white transition-colors duration-200"
                >
                  Blog
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
              <li>
                <Link
                  href="/login"
                  className="hover:text-white transition-colors duration-200"
                >
                  Logowanie
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="hover:text-white transition-colors duration-200"
                >
                  Rejestracja
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
  );
}
