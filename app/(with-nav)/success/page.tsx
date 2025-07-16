"use client";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { FaCheckCircle, FaArrowRight, FaHome } from "react-icons/fa";
import { trackConversion, trackPurchase } from "@/lib/conversionTracking";
import ConversionTracker from "@/components/ConversionTracker";

function SuccessPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const session_id = searchParams.get("session_id");
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [purchaseType, setPurchaseType] = useState<
    "course" | "subscription" | null
  >(null);

  useEffect(() => {
    const fetchSessionData = async () => {
      if (!session_id) {
        setErrorMessage("Missing session ID.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/stripe/success`,
          {
            method: "POST",
            body: JSON.stringify({ session_id }),
          }
        );

        const data = await response.json();

        if (data.success) {
          // Check if this is a course purchase or subscription
          if (data.purchaseType === "course") {
            setPurchaseType("course");
            setSuccessMessage("Kurs został zakupiony pomyślnie!");

            // Track conversion for course purchase
            const transactionId = `${Date.now()}-${Math.random()
              .toString(36)
              .substr(2, 9)}`;
            trackConversion(
              "zwzzCNHu7ZUaELKQzqYo",
              "course_purchase",
              data.session?.amount_total / 100,
              "PLN"
            );
            trackPurchase(
              transactionId,
              data.session?.amount_total / 100,
              "PLN",
              [
                {
                  item_id: data.courseId,
                  item_name: data.session?.metadata?.courseTitle || "Course",
                  price: data.session?.amount_total / 100,
                  quantity: 1,
                },
              ]
            );

            console.log("Course purchase successful:", {
              courseId: data.courseId,
              courseTitle: data.session?.metadata?.courseTitle,
              userId: data.userId,
              sessionId: session_id,
            });

            // Redirect to dashboard after a short delay
            setTimeout(() => {
              // Set a flag to indicate successful payment
              sessionStorage.setItem("paymentSuccess", "true");
              sessionStorage.setItem("purchasedCourseId", data.courseId);
              console.log(
                "Payment successful, redirecting to dashboard with session_id:",
                session_id
              );
              router.push(
                `${process.env.NEXT_PUBLIC_URL}/dashboard?session_id=${session_id}`
              );
            }, 3000);
          } else {
            setPurchaseType("subscription");
            setSuccessMessage("Subskrypcja została aktywowana pomyślnie!");

            // Track conversion for subscription
            trackConversion(
              "subscription_conversion",
              "subscription_purchase",
              data.session?.amount_total / 100,
              "PLN"
            );
          }
        } else {
          setErrorMessage(
            data.error || "Wystąpił błąd podczas procesu płatności."
          );
        }
      } catch (error) {
        console.error("Error fetching session data:", error);
        setErrorMessage("Wystąpił nieoczekiwany błąd. Spróbuj ponownie.");
      } finally {
        setLoading(false);
      }
    };

    fetchSessionData();
  }, [session_id, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Weryfikacja płatności...</p>
        </div>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaCheckCircle className="text-red-500 text-2xl" />
          </div>
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Płatność nie powiodła się
          </h1>
          <p className="text-gray-600 mb-6">{errorMessage}</p>
          <Link
            href="/"
            className="inline-flex items-center bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
          >
            <FaHome className="mr-2" />
            Wróć do strony głównej
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
      {/* Track conversion immediately when page loads */}
      {purchaseType === "course" && (
        <ConversionTracker
          conversionId="zwzzCNHu7ZUaELKQzqYo"
          conversionLabel="course_purchase"
          triggerOnMount={true}
        />
      )}
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FaCheckCircle className="text-green-500 text-2xl" />
        </div>
        <h1 className="text-2xl font-bold text-green-600 mb-4">
          Płatność zakończona pomyślnie!
        </h1>
        <p className="text-gray-600 mb-6">{successMessage}</p>

        {purchaseType === "course" && (
          <div className="mb-6 p-4 bg-purple-50 rounded-lg">
            <p className="text-sm text-purple-700">
              Zostaniesz przekierowany do dashboard za kilka sekund...
            </p>
          </div>
        )}

        <div className="space-y-3">
          {purchaseType === "course" ? (
            <Link
              href="/dashboard"
              className="inline-flex items-center bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
            >
              <FaArrowRight className="mr-2" />
              Przejdź do dashboard
            </Link>
          ) : (
            <Link
              href="/dashboard"
              className="inline-flex items-center bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
            >
              <FaArrowRight className="mr-2" />
              Przejdź do dashboard
            </Link>
          )}

          <Link
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <FaHome className="mr-2" />
            Strona główna
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Ładowanie...</p>
          </div>
        </div>
      }
    >
      <SuccessPageContent />
    </Suspense>
  );
}
