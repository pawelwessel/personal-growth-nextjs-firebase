import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zarządzanie kursami - Panel administracyjny | MocnyRozwój.pl",
  description:
    "Panel administracyjny do zarządzania kursami rozwojowymi. Dodawaj, edytuj i usuwaj kursy oraz materiały edukacyjne.",
  robots: {
    index: false,
    follow: false,
  },
};

("use client");
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminCoursesPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/admin/courses/list");
  }, [router]);

  return (
    <div className="p-6 lg:p-16">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Przekierowywanie...</p>
      </div>
    </div>
  );
}
