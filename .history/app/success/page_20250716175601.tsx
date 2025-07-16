import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Płatność zakończona pomyślnie | MocnyRozwój.pl",
  description: "Dziękujemy za zakup! Twoja płatność została przetworzona pomyślnie. Sprawdź swój email z potwierdzeniem i dostępem do kursów.",
  keywords: "płatność zakończona, potwierdzenie zakupu, dostęp do kursów, email potwierdzenia",
  openGraph: {
    title: "Płatność zakończona pomyślnie | MocnyRozwój.pl",
    description: "Dziękujemy za zakup! Twoja płatność została przetworzona pomyślnie.",
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
    description: "Dziękujemy za zakup! Twoja płatność została przetworzona pomyślnie.",
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