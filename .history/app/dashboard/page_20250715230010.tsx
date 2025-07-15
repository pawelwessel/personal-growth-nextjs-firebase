"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("shop");
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [userCourses, setUserCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuth();

  const tabs = [
    { id: "shop", name: "Sklep", icon: FaShoppingCart },
    { id: "my-courses", name: "Moje kursy", icon: FaBook },
  ];

  // Load courses on component mount
  useEffect(() => {
    const loadCourses = async () => {
      if (!user) return;

      try {
        setLoading(true);
        const [allCoursesData, userCourseIds] = await Promise.all([
          coursesService.getAllCourses(),
          userPurchasesService.getUserCourses(user.id),
        ]);

        setAllCourses(allCoursesData);

        // Filter courses that user owns
        const ownedCourses = allCoursesData.filter((course) =>
          userCourseIds.includes(course.id)
        );
        setUserCourses(ownedCourses);
      } catch (error) {
        console.error("Error loading courses:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, [user]);

  const renderContent = () => {
    switch (activeTab) {
      case "shop":
        return <ShopSection courses={allCourses} loading={loading} />;
      case "my-courses":
        return <MyCoursesSection courses={userCourses} loading={loading} />;
      default:
        return <ShopSection courses={allCourses} loading={loading} />;
    }
  };

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
              <h1 className="font-bold text-xl ml-3">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Witaj,</p>
                <p className="font-semibold">{user?.name || "Użytkownik"}</p>
              </div>
              <button
                onClick={logout}
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
}: {
  courses: Course[];
  loading: boolean;
}) {
  const { user } = useAuth();

  const handlePurchase = async (course: Course) => {
    try {
      const response = await fetch("/api/stripe/checkout", {
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
      });

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
          {courses.map((course) => (
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
                  <span className="text-xl font-bold text-gray-800">
                    {course.price} PLN
                  </span>
                  <button
                    onClick={() => handlePurchase(course)}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
                  >
                    Kup teraz
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

// My Courses Section
function MyCoursesSection({
  courses,
  loading,
}: {
  courses: Course[];
  loading: boolean;
}) {
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

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Moje kursy</h2>
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Ładowanie kursów...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Moje kursy</h2>

      {courses.length === 0 ? (
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
          {courses.map((course) => (
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
