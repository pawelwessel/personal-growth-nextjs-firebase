"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTimes,
  FaUser,
  FaCog,
  FaHeart,
  FaShoppingCart,
  FaBook,
  FaSignOutAlt,
  FaCreditCard,
  FaHistory,
  FaBell,
} from "react-icons/fa";
import { useAuth } from "./AuthContext";
import { logout } from "@/firebase";

interface UserActionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UserActionsModal({
  isOpen,
  onClose,
}: UserActionsModalProps) {
  const { user, firebaseUser } = useAuth();
  const [hoveredAction, setHoveredAction] = useState<string | null>(null);

  const handleLogout = async () => {
    try {
      await logout();
      onClose();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const userActions = [
    {
      id: "profile",
      icon: <FaUser className="text-lg" />,
      text: "Mój profil",
      action: () => console.log("Profile clicked"),
      color: "text-blue-600 hover:text-blue-700",
      bgColor: "bg-blue-50 hover:bg-blue-100",
    },
    {
      id: "courses",
      icon: <FaBook className="text-lg" />,
      text: "Moje kursy",
      action: () => console.log("Courses clicked"),
      color: "text-purple-600 hover:text-purple-700",
      bgColor: "bg-purple-50 hover:bg-purple-100",
    },
    {
      id: "favorites",
      icon: <FaHeart className="text-lg" />,
      text: "Ulubione",
      action: () => console.log("Favorites clicked"),
      color: "text-red-600 hover:text-red-700",
      bgColor: "bg-red-50 hover:bg-red-100",
    },
    {
      id: "cart",
      icon: <FaShoppingCart className="text-lg" />,
      text: "Koszyk",
      action: () => console.log("Cart clicked"),
      color: "text-green-600 hover:text-green-700",
      bgColor: "bg-green-50 hover:bg-green-100",
    },
    {
      id: "payments",
      icon: <FaCreditCard className="text-lg" />,
      text: "Płatności",
      action: () => console.log("Payments clicked"),
      color: "text-indigo-600 hover:text-indigo-700",
      bgColor: "bg-indigo-50 hover:bg-indigo-100",
    },
    {
      id: "history",
      icon: <FaHistory className="text-lg" />,
      text: "Historia",
      action: () => console.log("History clicked"),
      color: "text-orange-600 hover:text-orange-700",
      bgColor: "bg-orange-50 hover:bg-orange-100",
    },
    {
      id: "notifications",
      icon: <FaBell className="text-lg" />,
      text: "Powiadomienia",
      action: () => console.log("Notifications clicked"),
      color: "text-yellow-600 hover:text-yellow-700",
      bgColor: "bg-yellow-50 hover:bg-yellow-100",
    },
    {
      id: "settings",
      icon: <FaCog className="text-lg" />,
      text: "Ustawienia",
      action: () => console.log("Settings clicked"),
      color: "text-gray-600 hover:text-gray-700",
      bgColor: "bg-gray-50 hover:bg-gray-100",
    },
    {
      id: "logout",
      icon: <FaSignOutAlt className="text-lg" />,
      text: "Wyloguj się",
      action: handleLogout,
      color: "text-red-600 hover:text-red-700",
      bgColor: "bg-red-50 hover:bg-red-100",
    },
  ];

  if (!user) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-4 lg:inset-8 z-50 flex items-center justify-center"
          >
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                >
                  <FaTimes className="text-sm" />
                </button>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <FaUser className="text-white text-xl" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{user.name}</h2>
                    <p className="text-white/80 text-sm">{user.email}</p>
                  </div>
                </div>
              </div>

              {/* Actions Grid */}
              <div className="p-6">
                <div className="grid grid-cols-3 gap-4">
                  {userActions.map((action) => (
                    <motion.button
                      key={action.id}
                      onClick={action.action}
                      onMouseEnter={() => setHoveredAction(action.id)}
                      onMouseLeave={() => setHoveredAction(null)}
                      className={`relative p-4 rounded-xl transition-all duration-300 ${action.bgColor} group`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div
                        className={`relative flex flex-col items-center space-y-2 ${action.color}`}
                      >
                        {action.icon}

                        {/* Text that appears on hover */}
                        <AnimatePresence>
                          {hoveredAction === action.id && (
                            <motion.span
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              className="absolute top-[90%] px-3 py-1 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap z-60"
                            >
                              {action.text}
                              {/* Arrow */}
                              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* Subscription Status */}
                <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        Status subskrypcji
                      </h3>
                      <p className="text-sm text-gray-600 capitalize">
                        {user.subscriptionStatus === "premium"
                          ? "Premium"
                          : "Darmowa"}
                      </p>
                    </div>
                    {user.subscriptionStatus === "free" && (
                      <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg text-sm font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300">
                        Upgrade
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
