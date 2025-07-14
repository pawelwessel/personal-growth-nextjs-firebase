"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaChevronDown,
  FaPlay,
  FaClock,
  FaStar,
  FaUsers,
} from "react-icons/fa";

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
}

const courses: Course[] = [
  {
    id: "1",
    title: "Podstawy rozwoju osobistego",
    description:
      "Poznaj fundamenty rozwoju osobistego i rozpocznij swoją transformację",
    duration: "4 godziny",
    level: "Początkujący",
    rating: 4.8,
    students: 1247,
    price: 99,
    originalPrice: 149,
    image: "/public/assets/1.jpg",
    category: "Rozwój osobisty",
    lessons: 12,
    isPopular: true,
    isNew: true,
  },
  {
    id: "2",
    title: "Budowanie pewności siebie",
    description: "Naucz się technik zwiększających pewność siebie i samoocenę",
    duration: "6 godzin",
    level: "Średniozaawansowany",
    rating: 4.9,
    students: 892,
    price: 129,
    originalPrice: 179,
    image: "/public/assets/2.jpg",
    category: "Psychologia",
    lessons: 18,
    isPopular: true,
  },
  {
    id: "3",
    title: "Zarządzanie czasem i produktywność",
    description:
      "Opanuj sztukę efektywnego zarządzania czasem i zwiększ swoją produktywność",
    duration: "5 godzin",
    level: "Początkujący",
    rating: 4.7,
    students: 1563,
    price: 89,
    originalPrice: 129,
    image: "/public/assets/3.jpg",
    category: "Produktywność",
    lessons: 15,
  },
  {
    id: "4",
    title: "Komunikacja interpersonalna",
    description: "Rozwijaj umiejętności komunikacyjne i buduj lepsze relacje",
    duration: "7 godzin",
    level: "Średniozaawansowany",
    rating: 4.6,
    students: 734,
    price: 119,
    originalPrice: 159,
    image: "/public/assets/4.jpg",
    category: "Komunikacja",
    lessons: 20,
    isNew: true,
  },
  {
    id: "5",
    title: "Motywacja i wyznaczanie celów",
    description: "Naucz się wyznaczać i osiągać cele oraz utrzymywać motywację",
    duration: "5.5 godzin",
    level: "Początkujący",
    rating: 4.8,
    students: 1102,
    price: 109,
    originalPrice: 149,
    image: "/public/assets/5.jpg",
    category: "Motywacja",
    lessons: 16,
  },
];

export default function Courses() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("Wszystkie");

  const categories = [
    "Wszystkie",
    "Rozwój osobisty",
    "Psychologia",
    "Produktywność",
    "Komunikacja",
    "Motywacja",
  ];

  const filteredCourses =
    selectedCategory === "Wszystkie"
      ? courses
      : courses.filter((course) => course.category === selectedCategory);

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

  return (
    <div className="bg-white py-16 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-calistoga text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
            Kursy rozwojowe
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Wybierz kurs dopasowany do Twoich potrzeb i rozpocznij swoją podróż
            do lepszej wersji siebie
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredCourses
            .slice(0, isExpanded ? filteredCourses.length : 3)
            .map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                {/* Course Image */}
                <div className="relative h-48 bg-gradient-to-br from-purple-100 to-pink-100">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  {course.isPopular && (
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full text-xs font-bold">
                      Popularny
                    </div>
                  )}
                  {course.isNew && (
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-green-400 to-blue-400 text-white px-3 py-1 rounded-full text-xs font-bold">
                      Nowy
                    </div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
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

                  <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
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
                      <span className="text-sm font-medium">
                        {course.rating}
                      </span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-gray-800">
                        {course.price} PLN
                      </span>
                      {course.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          {course.originalPrice} PLN
                        </span>
                      )}
                    </div>
                    <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105">
                      Dołącz teraz
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>

        {/* Expand/Collapse Button */}
        {filteredCourses.length > 3 && (
          <div className="text-center">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
            >
              <span>{isExpanded ? "Pokaż mniej" : "Pokaż więcej"}</span>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <FaChevronDown />
              </motion.div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
