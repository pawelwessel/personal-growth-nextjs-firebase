import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Płatność zakończona pomyślnie | MocnyRozwój.pl",
  description:
    "Dziękujemy za zakup! Twoja płatność została przetworzona pomyślnie. Sprawdź swój email z potwierdzeniem i dostępem do kursów.",
  keywords:
    "płatność zakończona, potwierdzenie zakupu, dostęp do kursów, email potwierdzenia",
  openGraph: {
    title: "Płatność zakończona pomyślnie | MocnyRozwój.pl",
    description:
      "Dziękujemy za zakup! Twoja płatność została przetworzona pomyślnie.",
    type: "website",
    url: "https://mocnyrozwoj.pl/success",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "Płatność zakończona pomyślnie",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Płatność zakończona pomyślnie | MocnyRozwój.pl",
    description:
      "Dziękujemy za zakup! Twoja płatność została przetworzona pomyślnie.",
    images: ["/logo.png"],
  },
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "https://mocnyrozwoj.pl/success",
  },
};

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center p-8">
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-white text-2xl">✓</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Płatność zakończona pomyślnie!
          </h1>
          <p className="text-gray-600 mb-6">
            Dziękujemy za zakup! Twoja płatność została przetworzona pomyślnie.
            Sprawdź swój email z potwierdzeniem i dostępem do kursów.
          </p>
          <a
            href="/dashboard"
            className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 font-bold"
          >
            Przejdź do dashboardu
          </a>
        </div>
      </div>
    </div>
  );
}
