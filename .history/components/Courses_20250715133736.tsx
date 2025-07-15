"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import CourseCard from "./CourseCard";
import { coursesService } from "@/lib/coursesService";
import { Course } from "@/types";

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("Wszystkie");

  // Fetch visible courses from database
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const fetchedCourses = await coursesService.getVisibleCourses();
        setCourses(fetchedCourses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

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
