import React from "react";
import { motion } from "framer-motion";
import { FaPlay, FaClock, FaStar, FaUsers } from "react-icons/fa";
import Image from "next/image";

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

interface CourseCardProps {
  course: Course;
  variant?: "default" | "compact" | "horizontal";
  onClick?: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({
  course,
  variant = "default",
  onClick,
}) => {
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

  const cardContent = (
    <>
      {/* Course Image */}
      <div className="relative h-32 sm:h-40 lg:h-48 bg-gradient-to-br from-purple-100 to-pink-100 overflow-hidden">
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
        {course.isPopular && (
          <div className="absolute top-2 left-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-2 py-1 rounded-full text-xs font-bold">
            Popularny
          </div>
        )}
        {course.isNew && (
          <div className="absolute top-2 right-2 bg-gradient-to-r from-green-400 to-blue-400 text-white px-2 py-1 rounded-full text-xs font-bold">
            Nowy
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 lg:w-16 lg:h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 cursor-pointer">
            <FaPlay className="text-white text-lg lg:text-xl ml-1" />
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="p-3 lg:p-6">
        <div className="flex items-center justify-between mb-2 lg:mb-3">
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

        <h3 className="text-sm lg:text-lg font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors line-clamp-2">
          {course.title}
        </h3>
        <p className="text-gray-600 text-xs lg:text-sm mb-3 lg:mb-4 line-clamp-2">
          {course.description}
        </p>

        {/* Course Stats */}
        <div className="flex items-center justify-between mb-3 lg:mb-4">
          <div className="flex items-center space-x-2 lg:space-x-4 text-xs lg:text-sm text-gray-500">
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
            <span className="text-xs lg:text-sm font-medium">
              {course.rating}
            </span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg lg:text-2xl font-bold text-gray-800">
              {course.price} PLN
            </span>
            {course.originalPrice && (
              <span className="text-xs lg:text-sm text-gray-500 line-through">
                {course.originalPrice} PLN
              </span>
            )}
          </div>
          <button
            onClick={onClick}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 lg:px-4 py-2 rounded-lg text-xs lg:text-sm font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
          >
            Kup teraz
          </button>
        </div>
      </div>
    </>
  );

  if (variant === "horizontal") {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group flex"
      >
        <div className="w-1/3">
          <div className="relative h-full bg-gradient-to-br from-purple-100 to-pink-100 overflow-hidden">
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
            {course.isPopular && (
              <div className="absolute top-2 left-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-2 py-1 rounded-full text-xs font-bold">
                Popularny
              </div>
            )}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 cursor-pointer">
                <FaPlay className="text-white text-lg ml-1" />
              </div>
            </div>
          </div>
        </div>
        <div className="w-2/3 p-4">
          <div className="flex items-center justify-between mb-2">
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
          <h3 className="text-sm font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors line-clamp-2">
            {course.title}
          </h3>
          <p className="text-gray-600 text-xs mb-3 line-clamp-2">
            {course.description}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <div className="flex items-center">
                <FaClock className="mr-1" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center">
                <FaStar className="text-yellow-400 mr-1" />
                <span>{course.rating}</span>
              </div>
            </div>
            <button
              onClick={onClick}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-lg text-xs font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
            >
              {course.price} PLN
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group ${
        variant === "compact" ? "max-w-xs" : ""
      }`}
    >
      {cardContent}
    </motion.div>
  );
};

export default CourseCard;
