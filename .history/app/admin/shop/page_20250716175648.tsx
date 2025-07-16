import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zarządzanie sklepem - Panel administracyjny | MocnyRozwój.pl",
  description:
    "Panel administracyjny do zarządzania produktami w sklepie, zamówieniami i płatnościami.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminShopPage() {
  return <div>{/* empty admin page */}</div>;
}
