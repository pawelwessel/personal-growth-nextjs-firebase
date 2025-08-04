"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Diet } from "@/types";
import { useAuth } from "./AuthContext";

interface DietDetailModalProps {
  diet: Diet | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function DietDetailModal({
  diet,
  isOpen,
  onClose,
}: DietDetailModalProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  if (!diet) return null;

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/stripe/diet-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dietId: diet.id,
          dietTitle: diet.title,
          dietPrice: diet.price,
          userEmail: user?.email || "",
          userId: user?.id || null,
          dietData: {
            duration: diet.duration,
            difficulty: diet.difficulty,
            calories: diet.calories,
            meals: diet.meals,
            category: diet.category,
            nutritionistName: diet.nutritionistName,
            nutritionistCredentials: diet.nutritionistCredentials,
            benefits: diet.benefits,
            targetAudience: diet.targetAudience,
            mealPlanStructure: diet.mealPlanStructure,
            shoppingList: diet.shoppingList,
            preparationTips: diet.preparationTips,
            progressTracking: diet.progressTracking,
            maintenancePhase: diet.maintenancePhase,
            scientificReferences: diet.scientificReferences,
            clinicalStudies: diet.clinicalStudies,
            averageWeightLoss: diet.averageWeightLoss,
            averageTimeToResults: diet.averageTimeToResults,
            successRate: diet.successRate,
            faq: diet.faq,
            testimonials: diet.testimonials,
            beforeAfterStories: diet.beforeAfterStories,
            image: diet.image,
          },
        }),
      });

      const data = await response.json();

      if (data.success && data.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        console.error("Checkout error:", data.error);
        alert(
          "Wystąpił błąd podczas przetwarzania płatności. Spróbuj ponownie."
        );
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Wystąpił błąd podczas przetwarzania płatności. Spróbuj ponownie.");
    } finally {
      setIsLoading(false);
    }
  };

  const parseJsonArray = (data: string | string[]) => {
    if (Array.isArray(data)) {
      return data;
    }
    if (typeof data === "string") {
      try {
        return JSON.parse(data);
      } catch {
        return [];
      }
    }
    return [];
  };

  const tabs = [
    { id: "overview", label: "Przegląd", icon: "📋" },
    // { id: "nutritionist", label: "Dietetyk", icon: "👨‍⚕️" },
    { id: "benefits", label: "Korzyści", icon: "✅" },
    { id: "testimonials", label: "Opinie", icon: "💬" },
    { id: "faq", label: "FAQ", icon: "❓" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-black">
                Opis diety
              </h3>
              <p className="text-gray-700">{diet.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 text-black">
                  Struktura planu
                </h4>
                {typeof diet.mealPlanStructure === "object" &&
                diet.mealPlanStructure ? (
                  <div className="space-y-3">
                    {Object.entries(diet.mealPlanStructure).map(
                      ([meal, details]: [string, any]) => (
                        <div
                          key={meal}
                          className="border-l-4 border-purple-500 pl-3"
                        >
                          <h5 className="font-medium text-purple-700">
                            {meal}
                          </h5>
                          <div className="text-sm text-gray-600">
                            <div>⏰ {details.Time}</div>
                            <div>🔥 {details.Calories} kcal</div>
                            <div>🍽️ {details.Example}</div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  <p className="text-gray-700">{diet.mealPlanStructure}</p>
                )}
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 text-black">
                  Faza utrzymania
                </h4>
                <p className="text-gray-700">{diet.maintenancePhase}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <div className="text-2xl mb-1">📅</div>
                <div className="text-sm font-medium text-black">
                  Czas trwania
                </div>
                <div className="text-lg font-bold text-purple-600">
                  {diet.duration}
                </div>
              </div>

              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <div className="text-2xl mb-1">🔥</div>
                <div className="text-sm font-medium text-black">Kalorie</div>
                <div className="text-lg font-bold text-purple-600">
                  {diet.calories} kcal
                </div>
              </div>

              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <div className="text-2xl mb-1">🍽️</div>
                <div className="text-sm font-medium text-black">Posiłki</div>
                <div className="text-lg font-bold text-purple-600">
                  {diet.meals}/dzień
                </div>
              </div>

              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <div className="text-2xl mb-1">📊</div>
                <div className="text-sm font-medium text-black">
                  Skuteczność
                </div>
                <div className="text-lg font-bold text-purple-600">
                  {diet.successRate}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-black">
                  Średni czas do efektów
                </h4>
                <p className="text-gray-700">{diet.averageTimeToResults}</p>
              </div>

              <div>
                <h4 className="font-semibold mb-3 text-black">
                  Średnia utrata wagi
                </h4>
                <p className="text-gray-700">{diet.averageWeightLoss}</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-black">Dla kogo</h4>
              <div className="flex flex-wrap gap-2">
                {parseJsonArray(diet.targetAudience).map(
                  (audience: string, index: number) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      {audience}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        );

      case "nutritionist":
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mr-4">
                  {diet.nutritionistName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black">
                    {diet.nutritionistName}
                  </h3>
                  <p className="text-gray-600">
                    {diet.nutritionistCredentials}
                  </p>
                </div>
              </div>
              <p className="text-gray-700">{diet.nutritionistBio}</p>
            </div>
          </div>
        );

      case "benefits":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-black">
                Korzyści z diety
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {parseJsonArray(diet.benefits).map(
                  (benefit: string, index: number) => (
                    <div
                      key={index}
                      className="flex items-center p-3 bg-green-50 rounded-lg"
                    >
                      <div className="text-green-600 mr-3">✅</div>
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  )
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-black">
                Przeciwwskazania
              </h3>
              <div className="space-y-2">
                {parseJsonArray(diet.contraindications).map(
                  (contraindication: string, index: number) => (
                    <div
                      key={index}
                      className="flex items-start p-3 bg-red-50 rounded-lg"
                    >
                      <div className="text-red-600 mr-3 mt-1">⚠️</div>
                      <span className="text-gray-700">{contraindication}</span>
                    </div>
                  )
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-black">
                Wskazówki przygotowania
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {parseJsonArray(diet.preparationTips).map(
                  (tip: string, index: number) => (
                    <div
                      key={index}
                      className="flex items-start p-3 bg-blue-50 rounded-lg"
                    >
                      <div className="text-blue-600 mr-3 mt-1">💡</div>
                      <span className="text-gray-700">{tip}</span>
                    </div>
                  )
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-black">
                Lista zakupów
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {parseJsonArray(diet.shoppingList).map(
                  (item: string, index: number) => (
                    <div
                      key={index}
                      className="flex items-center p-3 bg-yellow-50 rounded-lg"
                    >
                      <div className="text-yellow-600 mr-3">🛒</div>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        );

      case "testimonials":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-black">
                Opinie klientów
              </h3>
              <div className="space-y-4">
                {diet.testimonials.map((testimonial: any, index: number) => (
                  <div key={index} className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-black">
                        {testimonial.name}
                      </h4>
                      <span className="text-green-600 font-medium">
                        {testimonial.result}
                      </span>
                    </div>
                    <p className="text-gray-700 italic">
                      "{testimonial.testimonial}"
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-black">
                Historie przed/po
              </h3>
              <div className="space-y-4">
                {diet.beforeAfterStories.map((story: any, index: number) => (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg"
                  >
                    <h4 className="font-semibold mb-2 text-black">
                      {story.title}
                    </h4>
                    <p className="text-gray-700 mb-3">{story.description}</p>
                    <div className="bg-green-100 p-3 rounded-lg">
                      <span className="text-green-800 font-medium">
                        Wyniki: {story.results}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "faq":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-black">
                Często zadawane pytania
              </h3>
              <div className="space-y-4">
                {diet.faq.map((faq: any, index: number) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 text-purple-600">
                      {faq.question}
                    </h4>
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-black">
                Śledzenie postępów
              </h3>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-gray-700">{diet.progressTracking}</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-black">
                Badania naukowe
              </h3>
              <div className="space-y-3">
                {diet.scientificReferences.map(
                  (reference: string, index: number) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-gray-700 text-sm">{reference}</p>
                    </div>
                  )
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-black">
                Badania kliniczne
              </h3>
              <div className="space-y-3">
                {diet.clinicalStudies.map((study: string, index: number) => (
                  <div key={index} className="bg-green-50 p-3 rounded-lg">
                    <p className="text-gray-700 text-sm">{study}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 flex-shrink-0">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">
                    {diet.title}
                    <span className="text-xs text-gray-500">
                      {diet.difficulty}
                    </span>
                  </h2>
                  <p className="text-purple-100 mt-1 text-xs">
                    {diet.shortDescription}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="text-white hover:text-gray-200 transition-colors"
                >
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 flex-shrink-0">
              <div className="flex overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center px-6 py-3 text-sm font-medium whitespace-nowrap ${
                      activeTab === tab.id
                        ? "text-purple-600 border-b-2 border-purple-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <span className="mr-2">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {renderTabContent()}
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 p-6 bg-gray-50 flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {diet.price} PLN
                    </div>
                    <div className="text-sm text-gray-600">Cena</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-gray-800">
                      {diet.difficulty}
                    </div>
                    <div className="text-sm text-gray-600">
                      Poziom trudności
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleCheckout}
                  disabled={isLoading}
                  className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Przetwarzanie...
                    </>
                  ) : (
                    "Kup teraz"
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
