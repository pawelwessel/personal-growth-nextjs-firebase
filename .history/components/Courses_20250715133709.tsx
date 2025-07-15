"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import CourseCard from "./CourseCard";
import { coursesService } from "@/lib/coursesService";
import { Course } from "@/types";

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
              >
                <CourseCard
                  course={course}
                  onClick={() => {
                    // Handle course click - could open course details or redirect
                    console.log("Course clicked:", course.title);
                  }}
                />
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
