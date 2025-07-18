"use client";

import { useState, useEffect, Suspense, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import logo from "@/public/logo.png";
import {
  FaShoppingCart,
  FaBook,
  FaSignOutAlt,
  FaDownload,
  FaPlay,
  FaClock,
  FaStar,
  FaUsers,
} from "react-icons/fa";
import { useAuth } from "@/components/AuthContext";
import { coursesService } from "@/lib/coursesService";
import { userPurchasesService } from "@/lib/userPurchasesService";
import { Course } from "@/types";
import { testResultsService, TestResult } from "@/lib/testResultsService";

function DashboardContent() {
  const [activeTab, setActiveTab] = useState("shop");
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [userPurchasedCourses, setUserPurchasedCourses] = useState<string[]>(
    []
  );
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const { user, logout } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      router.push("/login?redirect=/dashboard");
    }
  }, [user, router]);

  // Load user's purchased courses
  useEffect(() => {
    const loadUserPurchasedCourses = async () => {
      if (!user?.id) return;

      try {
        const userDoc = await userPurchasesService.getUserDocument(user.id);
        const purchasedCourses = userDoc?.purchasedCourses || [];
        setUserPurchasedCourses(purchasedCourses);
        console.log("User purchased courses:", purchasedCourses);
      } catch (error) {
        console.error("Error loading user purchased courses:", error);
      }
    };

    loadUserPurchasedCourses();
  }, [user?.id]);

  // Handle payment success and refresh user courses
  useEffect(() => {
    if (user) {
      // Check if user just completed a payment
      const paymentSuccess = sessionStorage.getItem("paymentSuccess");
      const sessionId = searchParams.get("session_id");
      const purchasedCourseId = sessionStorage.getItem("purchasedCourseId");

      if (paymentSuccess === "true" || sessionId) {
        console.log(
          "Dashboard: Payment success detected, refreshing user courses...",
          {
            paymentSuccess,
            sessionId,
            purchasedCourseId,
          }
        );

        // Clear the flags
        sessionStorage.removeItem("paymentSuccess");
        sessionStorage.removeItem("purchasedCourseId");

        // Remove session_id from URL without page reload
        if (sessionId) {
          const newUrl = new URL(window.location.href);
          newUrl.searchParams.delete("session_id");
          window.history.replaceState({}, "", newUrl.toString());
        }

        // Switch to "Moje kursy" tab and refresh user courses
        setActiveTab("my-courses");
        setShowSuccessMessage(true);

        // Force a complete refresh of user courses
        setTimeout(() => {
          const loadUserPurchasedCourses = async () => {
            try {
              const userDoc = await userPurchasesService.getUserDocument(
                user.id
              );
              const purchasedCourses = userDoc?.purchasedCourses || [];
              setUserPurchasedCourses(purchasedCourses);
              console.log(
                "Refreshed user purchased courses:",
                purchasedCourses
              );

              // Check if the purchased course is now in the array
              if (
                purchasedCourseId &&
                purchasedCourses.includes(purchasedCourseId)
              ) {
                console.log(
                  "✅ Purchased course confirmed in user's courses:",
                  purchasedCourseId
                );
              } else if (purchasedCourseId) {
                console.log(
                  "❌ Purchased course not found in user's courses:",
                  purchasedCourseId
                );
              }
            } catch (error) {
              console.error("Error refreshing user purchased courses:", error);
            }
          };
          loadUserPurchasedCourses();
        }, 1000); // Small delay to ensure the purchase is fully processed

        // Hide success message after 5 seconds
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 5000);
      }
    }
  }, [user?.id, searchParams.toString()]);

  // Load courses on component mount
  useEffect(() => {
    const loadCourses = async () => {
      if (!user) return;

      try {
        setLoading(true);
        const allCoursesData = await coursesService.getAllCourses();
        setAllCourses(allCoursesData);
      } catch (error) {
        console.error("Error loading courses:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, [user]);

  useEffect(() => {
    if (activeTab === "test-results" && user?.id) {
      testResultsService.getUserTestResults(user.id).then(setTestResults);
    }
  }, [activeTab, user?.id]);

  const tabs = [
    { id: "shop", name: "Sklep", icon: FaShoppingCart },
    { id: "my-courses", name: "Moje kursy", icon: FaBook },
    { id: "test-results", name: "Wyniki testów", icon: FaStar },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "shop":
        return (
          <ShopSection
            courses={allCourses}
            loading={loading}
            userPurchasedCourses={userPurchasedCourses}
          />
        );
      case "my-courses":
        return (
          <MyCoursesSection
            courses={allCourses}
            loading={loading}
            userPurchasedCourses={userPurchasedCourses}
            showSuccessMessage={showSuccessMessage}
          />
        );
      case "test-results":
        return (
          <TestResultsSection
            testResults={testResults}
            loading={activeTab === "test-results" && !testResults}
          />
        );
      default:
        return (
          <ShopSection
            courses={allCourses}
            loading={loading}
            userPurchasedCourses={userPurchasedCourses}
          />
        );
    }
  };

  // Show loading while checking authentication
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Sprawdzanie autoryzacji...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Image
                src={logo}
                width={512}
                height={512}
                alt="Mocny Rozwój Osobisty Logo"
                className="h-12 w-12"
              />
              <h1 className="font-bold text-xl ml-3 text-black">
                Panel użytkownika
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Witaj,</p>
                <p className="font-semibold text-black">
                  {user?.name || "Użytkownik"}
                </p>
              </div>
              <button
                onClick={() => {
                  logout();
                  router.push("/login");
                }}
                className="p-2 text-gray-600 hover:text-red-600 transition-colors"
              >
                <FaSignOutAlt size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? "border-purple-600 text-purple-600"
                      : "border-transparent text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">{renderContent()}</div>
    </div>
  );
}

// Shop Section
function ShopSection({
  courses,
  loading,
  userPurchasedCourses,
}: {
  courses: Course[];
  loading: boolean;
  userPurchasedCourses: string[];
}) {
  const { user } = useAuth();

  const handlePurchase = async (course: Course) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/stripe/checkout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            courseId: course.id,
            courseTitle: course.title,
            coursePrice: course.price,
            userEmail: user?.email,
            userId: user?.id,
          }),
        }
      );

      const data = await response.json();

      if (data.success && data.url) {
        window.location.href = data.url;
      } else {
        console.error("Error creating checkout session:", data.error);
      }
    } catch (error) {
      console.error("Error handling purchase:", error);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Sklep</h2>
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Ładowanie kursów...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Sklep</h2>

      {courses.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaShoppingCart size={40} className="text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Brak dostępnych kursów
          </h3>
          <p className="text-gray-600 max-w-md mx-auto">
            Wkrótce pojawią się nowe kursy rozwojowe.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => {
            const isOwned = userPurchasedCourses.includes(course.id);

            return (
              <div
                key={course.id}
                className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative h-48 bg-gradient-to-br from-purple-100 to-pink-100 rounded-t-xl overflow-hidden">
                  {course.image && (
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <FaPlay className="text-white text-lg ml-1" />
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                      {course.category}
                    </span>
                    <span className="text-xs font-medium text-gray-600">
                      {course.level}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {course.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <FaClock className="mr-1" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <FaUsers className="mr-1" />
                        <span>{course.students}</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <FaStar className="text-yellow-400 mr-1" />
                      <span className="text-sm font-medium text-black">
                        {course.rating}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-800">
                      {course.price} PLN
                    </span>
                    {isOwned ? (
                      <span className="text-sm text-green-600 font-medium">
                        ✓ Zakupiony
                      </span>
                    ) : (
                      <button
                        onClick={() => handlePurchase(course)}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
                      >
                        Kup teraz
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// My Courses Section
function MyCoursesSection({
  courses,
  loading,
  userPurchasedCourses,
  showSuccessMessage,
}: {
  courses: Course[];
  loading: boolean;
  userPurchasedCourses: string[];
  showSuccessMessage: boolean;
}) {
  const { user } = useAuth();

  const handleDownloadPdf = async (course: Course) => {
    if (!course.pdfFile) {
      alert("PDF nie jest dostępny dla tego kursu.");
      return;
    }

    try {
      // Create a temporary link to download the PDF
      const link = document.createElement("a");
      link.href = course.pdfFile;
      link.download = `${course.title}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading PDF:", error);
      alert("Błąd podczas pobierania PDF.");
    }
  };

  const handleRefresh = () => {
    // Reload the page to refresh user courses
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Moje kursy</h2>
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300 disabled:opacity-50"
          >
            Odśwież
          </button>
        </div>
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Ładowanie kursów...</p>
        </div>
      </div>
    );
  }

  // Filter only courses that user owns
  const ownedCourses = courses.filter((course) =>
    userPurchasedCourses.includes(course.id)
  );

  console.log("MyCoursesSection Debug:", {
    totalCourses: courses.length,
    ownedCourses: ownedCourses.length,
    userOwnedCourses: ownedCourses.map((c) => ({ id: c.id, title: c.title })),
    currentUserId: user?.id,
    userPurchasedCoursesCount: userPurchasedCourses.length,
    userPurchasedCourses: userPurchasedCourses,
  });

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Moje kursy</h2>
        <button
          onClick={handleRefresh}
          disabled={loading}
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300 disabled:opacity-50"
        >
          Odśwież
        </button>
      </div>

      {showSuccessMessage && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-green-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">
                Kurs został zakupiony pomyślnie! Możesz teraz pobrać PDF.
              </p>
            </div>
          </div>
        </div>
      )}

      {ownedCourses.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaBook size={40} className="text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Nie masz jeszcze żadnych kursów
          </h3>
          <p className="text-gray-600 max-w-md mx-auto">
            Kup swój pierwszy kurs w sekcji Sklep, aby rozpocząć naukę!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ownedCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative h-48 bg-gradient-to-br from-purple-100 to-pink-100 rounded-t-xl overflow-hidden">
                {course.image && (
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <FaPlay className="text-white text-lg ml-1" />
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                    {course.category}
                  </span>
                  <span className="text-xs font-medium text-gray-600">
                    {course.level}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                  {course.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {course.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <FaClock className="mr-1" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <FaUsers className="mr-1" />
                      <span>{course.students}</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FaStar className="text-yellow-400 mr-1" />
                    <span className="text-sm font-medium">{course.rating}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-green-600 font-medium">
                    ✓ Zakupiony
                  </span>
                  <button
                    onClick={() => handleDownloadPdf(course)}
                    className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-green-700 hover:to-blue-700 transition-all duration-300 flex items-center"
                  >
                    <FaDownload className="mr-2" />
                    Pobierz PDF
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function TestResultsSection({
  testResults,
  loading,
}: {
  testResults: TestResult[];
  loading: boolean;
}) {
  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Wyniki testów</h2>
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Ładowanie wyników testów...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Wyniki testów</h2>
      {testResults.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaStar size={40} className="text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Brak zapisanych wyników testów
          </h3>
          <p className="text-gray-600 max-w-md mx-auto">
            Wypełnij testy i zapisz swoje wyniki, aby zobaczyć je tutaj.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {testResults.map((result) => (
            <div
              key={result.id}
              className="border rounded-lg p-4 bg-gradient-to-br from-purple-50 to-pink-50"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div>
                  <div className="font-bold text-lg text-purple-700">
                    {result.testName}
                  </div>
                  <div className="text-gray-500 text-sm">
                    {new Date(result.createdAt).toLocaleString()}
                  </div>
                </div>
                <div className="mt-2 md:mt-0">
                  <span className="text-gray-700 font-medium">
                    Podsumowanie:
                  </span>
                  <pre className="bg-white rounded p-2 text-xs mt-1 max-w-xl overflow-x-auto border border-gray-200">
                    {typeof result.report === "string"
                      ? result.report
                      : JSON.stringify(result.report, null, 2)}
                  </pre>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Dashboard() {
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
      <DashboardContent />
    </Suspense>
  );
}
