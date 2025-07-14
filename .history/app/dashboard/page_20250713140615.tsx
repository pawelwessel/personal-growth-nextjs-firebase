"use client";

import { useState } from "react";
import Image from "next/image";
import logo from "@/public/logo.png";
import {
  FaShoppingCart,
  FaCrown,
  FaCog,
  FaCoins,
  FaSignOutAlt,
} from "react-icons/fa";
import { useAuth } from "@/components/AuthContext";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("shop");
  const { user, logout } = useAuth();

  const tabs = [
    { id: "shop", name: "Sklep", icon: FaShoppingCart },
    { id: "premium", name: "Premium", icon: FaCrown },
    { id: "settings", name: "Ustawienia", icon: FaCog },
    { id: "earn", name: "Zarabiaj", icon: FaCoins },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "shop":
        return <ShopSection />;
      case "premium":
        return <PremiumSection />;
      case "settings":
        return <SettingsSection />;
      case "earn":
        return <EarnSection />;
      default:
        return <ShopSection />;
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
                <p className="font-semibold">Użytkownik</p>
              </div>
              <button className="p-2 text-gray-600 hover:text-red-600 transition-colors">
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

// Shop Section (Placeholder)
function ShopSection() {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Sklep</h2>
      <div className="text-center py-12">
        <div className="w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-6">
          <FaShoppingCart size={40} className="text-white" />
        </div>
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Sklep w przygotowaniu
        </h3>
        <p className="text-gray-600 max-w-md mx-auto">
          Wkrótce będziesz mógł kupować dodatkowe narzędzia i kursy rozwojowe.
          Bądź na bieżąco!
        </p>
      </div>
    </div>
  );
}

// Premium Section
function PremiumSection() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/stripe/create-subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId: "price_premium_monthly", // You'll need to create this in Stripe
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Error creating subscription:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Premium</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Premium Plan Card */}
        <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
          <div className="flex items-center mb-6">
            <FaCrown size={32} className="mr-3" />
            <h3 className="text-2xl font-bold">Plan Premium</h3>
          </div>

          <div className="mb-6">
            <div className="text-4xl font-bold mb-2">99 PLN</div>
            <div className="text-purple-100">/miesiąc</div>
          </div>

          <ul className="space-y-3 mb-8">
            <li className="flex items-center">
              <span className="mr-3">✓</span>
              <span>Nieograniczone testy osobowości</span>
            </li>
            <li className="flex items-center">
              <span className="mr-3">✓</span>
              <span>Zaawansowane raporty AI</span>
            </li>
            <li className="flex items-center">
              <span className="mr-3">✓</span>
              <span>Ekskluzywne kursy rozwojowe</span>
            </li>
            <li className="flex items-center">
              <span className="mr-3">✓</span>
              <span>Konsultacje z ekspertami</span>
            </li>
            <li className="flex items-center">
              <span className="mr-3">✓</span>
              <span>Priorytetowe wsparcie</span>
            </li>
          </ul>

          <button
            onClick={handleSubscribe}
            disabled={isLoading}
            className="w-full bg-white text-purple-600 py-3 px-6 rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50"
          >
            {isLoading ? "Przetwarzanie..." : "Subskrybuj Premium"}
          </button>
        </div>

        {/* Current Status */}
        <div className="bg-gray-50 rounded-2xl p-8">
          <h4 className="text-xl font-semibold text-gray-800 mb-4">
            Twój status
          </h4>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white rounded-lg">
              <div>
                <p className="font-medium text-gray-800">Plan aktualny</p>
                <p className="text-sm text-gray-600">Darmowy</p>
              </div>
              <div className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                Darmowy
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-white rounded-lg">
              <div>
                <p className="font-medium text-gray-800">Następna płatność</p>
                <p className="text-sm text-gray-600">-</p>
              </div>
              <div className="text-gray-500">-</div>
            </div>

            <div className="flex items-center justify-between p-4 bg-white rounded-lg">
              <div>
                <p className="font-medium text-gray-800">
                  Testy w tym miesiącu
                </p>
                <p className="text-sm text-gray-600">3/5</p>
              </div>
              <div className="w-20 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full"
                  style={{ width: "60%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Settings Section
function SettingsSection() {
  const [settings, setSettings] = useState({
    email: "user@example.com",
    notifications: true,
    newsletter: false,
    language: "pl",
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Ustawienia</h2>

      <div className="max-w-2xl space-y-6">
        {/* Profile Settings */}
        <div className="border-b pb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Profil</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Adres email
              </label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => handleSettingChange("email", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Język
              </label>
              <select
                value={settings.language}
                onChange={(e) =>
                  handleSettingChange("language", e.target.value)
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="pl">Polski</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="border-b pb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Powiadomienia
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">Powiadomienia push</p>
                <p className="text-sm text-gray-600">
                  Otrzymuj powiadomienia o nowych funkcjach
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications}
                  onChange={(e) =>
                    handleSettingChange("notifications", e.target.checked)
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">Newsletter</p>
                <p className="text-sm text-gray-600">
                  Otrzymuj cotygodniowe podsumowania
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.newsletter}
                  onChange={(e) =>
                    handleSettingChange("newsletter", e.target.checked)
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Account Actions */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Konto</h3>

          <div className="space-y-3">
            <button className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
              Usuń konto
            </button>
            <button className="w-full text-left px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
              Eksportuj dane
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Earn Section
function EarnSection() {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Zarabiaj</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Referral Program */}
        <div className="bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl p-6 text-white">
          <div className="flex items-center mb-4">
            <FaCoins size={24} className="mr-3" />
            <h3 className="text-xl font-bold">Program polecający</h3>
          </div>

          <p className="mb-6 text-green-100">
            Polecaj znajomym i zarabiaj na każdym poleconym użytkowniku!
          </p>

          <div className="space-y-3 mb-6">
            <div className="flex items-center">
              <span className="mr-3">💰</span>
              <span>5 PLN za każdego poleconego</span>
            </div>
            <div className="flex items-center">
              <span className="mr-3">🎁</span>
              <span>Dodatkowe bonusy za aktywnych użytkowników</span>
            </div>
            <div className="flex items-center">
              <span className="mr-3">🏆</span>
              <span>Specjalne nagrody za top polecających</span>
            </div>
          </div>

          <button className="w-full bg-white text-green-600 py-3 px-6 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Wygeneruj link polecający
          </button>
        </div>

        {/* Earnings Stats */}
        <div className="bg-gray-50 rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Twoje zarobki
          </h3>

          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-white rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Łączne zarobki</p>
                <p className="text-2xl font-bold text-gray-800">0 PLN</p>
              </div>
              <div className="text-green-600">💰</div>
            </div>

            <div className="flex justify-between items-center p-4 bg-white rounded-lg">
              <div>
                <p className="text-sm text-gray-600">
                  Polecenia w tym miesiącu
                </p>
                <p className="text-xl font-bold text-gray-800">0</p>
              </div>
              <div className="text-blue-600">👥</div>
            </div>

            <div className="flex justify-between items-center p-4 bg-white rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Łączne polecenia</p>
                <p className="text-xl font-bold text-gray-800">0</p>
              </div>
              <div className="text-purple-600">📈</div>
            </div>
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="mt-8 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Jak to działa?
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="font-bold">1</span>
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">Wygeneruj link</h4>
            <p className="text-sm text-gray-600">
              Skopiuj swój unikalny link polecający
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="font-bold">2</span>
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">
              Polecaj znajomych
            </h4>
            <p className="text-sm text-gray-600">
              Udostępnij link w mediach społecznościowych
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="font-bold">3</span>
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">Zarabiaj</h4>
            <p className="text-sm text-gray-600">
              Otrzymuj wynagrodzenie za każde polecenie
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
