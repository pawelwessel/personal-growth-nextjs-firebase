import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.png";

export default function Navigation() {
  return (
    <nav className="bg-white backdrop-blur-md sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/how-it-works"
              className="text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium"
            >
              Jak to działa
            </Link>
            <Link
              href="/faq"
              className="text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium"
            >
              FAQ
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium"
            >
              Kontakt
            </Link>
            <Link
              href="/#courses"
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-200 font-medium"
            >
              Kursy
            </Link>
            <Link
              href="/#shop"
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-200 font-medium"
            >
              Sklep
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="text-gray-700 hover:text-purple-600 transition-colors duration-200">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
