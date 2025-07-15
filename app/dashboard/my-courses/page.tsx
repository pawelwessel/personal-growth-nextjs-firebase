"use client";

import { useAuth } from "@/components/AuthContext";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaPlay, FaClock, FaStar, FaUsers, FaArrowLeft } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: "Początkujący" | "Średniozaawansowany" | "Zaawansowany";
  rating: number;
  students: number;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  lessons: number;
  isPopular?: boolean;
  isNew?: boolean;
  progress?: number;
}

export default function MyCoursesPage() {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      // In a real app, you would fetch the user's purchased courses from your database
      // For now, we'll simulate with some sample data
      const userCourses: Course[] = [
        {
          id: "1",
          title: "Podstawy rozwoju osobistego",
          description:
            "Kompleksowy kurs wprowadzający w świat rozwoju osobistego",
          duration: "2h 30m",
          level: "Początkujący",
          rating: 4.8,
          students: 1250,
          price: 199,
          image: "/assets/1.jpg",
          category: "Rozwój osobisty",
          lessons: 12,
          progress: 75,
        },
        {
          id: "2",
          title: "Zaawansowane techniki motywacji",
          description: "Poznaj zaawansowane metody motywacji i osiągania celów",
          duration: "3h 45m",
          level: "Zaawansowany",
          rating: 4.9,
          students: 890,
          price: 299,
          image: "/assets/2.jpg",
          category: "Motywacja",
          lessons: 18,
          progress: 45,
        },
      ];
      setCourses(userCourses);
      setLoading(false);
    }
  }, [user]);

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Początkujący":
        return "bg-green-100 text-green-800";
      case "Średniozaawansowany":
        return "bg-yellow-100 text-yellow-800";
      case "Zaawansowany":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Musisz być zalogowany, aby zobaczyć swoje kursy
          </h1>
          <Link
            href="/"
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
          >
            Wróć do strony głównej
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Ładowanie kursów...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-4 transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Powrót do dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Moje kursy</h1>
          <p className="text-gray-600">Kontynuuj naukę tam, gdzie skończyłeś</p>
        </div>

        {/* Courses Grid */}
        {courses.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg max-w-md mx-auto">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaPlay className="text-purple-600 text-xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Brak kursów
              </h3>
              <p className="text-gray-600 mb-6">
                Nie masz jeszcze żadnych zakupionych kursów. Rozpocznij swoją
                podróż!
              </p>
              <Link
                href="/"
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
              >
                Przeglądaj kursy
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <motion.div
                key={course.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                {/* Course Image */}
                <div className="relative h-48 bg-gradient-to-br from-purple-100 to-pink-100 overflow-hidden">
                  {course.image ? (
                    <Image
                      src={course.image}
                      alt={course.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                      priority={false}
                      quality={85}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-100" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent" />

                  {/* Progress Overlay */}
                  {course.progress && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Postęp: {course.progress}%</span>
                        <span>{course.lessons} lekcji</span>
                      </div>
                      <div className="w-full bg-gray-600 rounded-full h-2 mt-1">
                        <div
                          className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 cursor-pointer group-hover:scale-110">
                      <FaPlay className="text-white text-xl ml-1" />
                    </div>
                  </div>
                </div>

                {/* Course Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                      {course.category}
                    </span>
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${getLevelColor(
                        course.level
                      )}`}
                    >
                      {course.level}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {course.description}
                  </p>

                  {/* Course Stats */}
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

                  {/* Continue Button */}
                  <button
                    onClick={() => {
                      // In a real app, this would navigate to the course player
                      console.log(`Continue course: ${course.id}`);
                    }}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
                  >
                    Kontynuuj naukę
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
