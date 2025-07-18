"use client";

import { useState } from "react";
import { FaSave, FaMagic, FaArrowLeft, FaEye } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { blogService, BlogPost } from "@/lib/blogService";

export default function NewBlogPostPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [topic, setTopic] = useState("");
  const [post, setPost] = useState<Partial<BlogPost>>({
    title: "",
    shortDesc: "",
    text1Title: "Wprowadzenie",
    text1Desc: "",
    text2Title: "Podstawy",
    text2Desc: "",
    text3Title: "Praktyczne zastosowania",
    text3Desc: "",
    text4Title: "Zaawansowane techniki",
    text4Desc: "",
    text5Title: "Analiza i wnioski",
    text5Desc: "",
    text6Title: "Przyszłość",
    text6Desc: "",
    text7Title: "Podsumowanie",
    text7Desc: "",
    googleTitle: "",
    googleDescription: "",
    googleKeywords: "",
    url: "",
    urlLabel: "",
    category: "Rozwój osobisty",
    tags: "",
  });

  const handleGeneratePost = async () => {
    if (!topic.trim()) {
      alert("Proszę wprowadzić temat posta");
      return;
    }

    try {
      setGenerating(true);
      const generatedPost = await blogService.generateBlogPost(topic);
      setPost(generatedPost);
      setTopic("");
    } catch (error) {
      console.error("Error generating post:", error);
      alert("Błąd podczas generowania posta");
    } finally {
      setGenerating(false);
    }
  };

  const handleSavePost = async () => {
    if (!post.title || !post.shortDesc || !post.url) {
      alert("Proszę wypełnić wszystkie wymagane pola");
      return;
    }

    try {
      setLoading(true);
      await blogService.addBlogPost(
        post as Omit<BlogPost, "id" | "createdAt" | "updatedAt">
      );
      router.push("/admin/blog");
    } catch (error) {
      console.error("Error saving post:", error);
      alert("Błąd podczas zapisywania posta");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof BlogPost, value: string) => {
    setPost((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Nowy post na blogu
              </h1>
              <p className="text-gray-600">
                Utwórz nowy post lub wygeneruj go za pomocą AI
              </p>
            </div>
            <Link
              href="/admin/blog"
              className="bg-gray-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-700 transition-all duration-300 flex items-center space-x-2"
            >
              <FaArrowLeft />
              <span>Powrót</span>
            </Link>
          </div>

          {/* AI Generation Section */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <FaMagic className="mr-2 text-purple-600" />
              Generowanie AI
            </h2>
            <div className="flex space-x-4">
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Wprowadź temat posta (np. 'motywacja', 'produktywność')"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
              />
              <button
                onClick={handleGeneratePost}
                disabled={generating || !topic.trim()}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {generating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Generowanie...</span>
                  </>
                ) : (
                  <>
                    <FaMagic />
                    <span>Wygeneruj post</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Post Form */}
          <form className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tytuł *
                </label>
                <input
                  type="text"
                  value={post.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                  placeholder="Wprowadź tytuł posta"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL slug *
                </label>
                <input
                  type="text"
                  value={post.url}
                  onChange={(e) => handleInputChange("url", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                  placeholder="url-sluga"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Krótki opis *
              </label>
              <textarea
                value={post.shortDesc}
                onChange={(e) => handleInputChange("shortDesc", e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                placeholder="Krótki opis posta"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kategoria
                </label>
                <input
                  type="text"
                  value={post.category}
                  onChange={(e) =>
                    handleInputChange("category", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                  placeholder="Rozwój osobisty"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tagi
                </label>
                <input
                  type="text"
                  value={post.tags}
                  onChange={(e) => handleInputChange("tags", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                  placeholder="tag1,tag2,tag3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL Label
                </label>
                <input
                  type="text"
                  value={post.urlLabel}
                  onChange={(e) =>
                    handleInputChange("urlLabel", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                  placeholder="Dowiedz się więcej"
                />
              </div>
            </div>

            {/* SEO Information */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Informacje SEO
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Google Title
                  </label>
                  <input
                    type="text"
                    value={post.googleTitle}
                    onChange={(e) =>
                      handleInputChange("googleTitle", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                    placeholder="Tytuł dla Google"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Google Keywords
                  </label>
                  <input
                    type="text"
                    value={post.googleKeywords}
                    onChange={(e) =>
                      handleInputChange("googleKeywords", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                    placeholder="słowa kluczowe"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Google Description
                </label>
                <textarea
                  value={post.googleDescription}
                  onChange={(e) =>
                    handleInputChange("googleDescription", e.target.value)
                  }
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                  placeholder="Opis dla Google"
                />
              </div>
            </div>

            {/* Content Sections */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800">
                Treść posta
              </h3>
              {[1, 2, 3, 4, 5, 6, 7].map((section) => (
                <div key={section} className="bg-gray-50 rounded-xl p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tytuł sekcji {section}
                      </label>
                      <input
                        type="text"
                        value={
                          post[
                            `text${section}Title` as keyof BlogPost
                          ] as string
                        }
                        onChange={(e) =>
                          handleInputChange(
                            `text${section}Title` as keyof BlogPost,
                            e.target.value
                          )
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                        placeholder={`Tytuł sekcji ${section}`}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Treść sekcji {section}
                    </label>
                    <textarea
                      value={
                        post[`text${section}Desc` as keyof BlogPost] as string
                      }
                      onChange={(e) =>
                        handleInputChange(
                          `text${section}Desc` as keyof BlogPost,
                          e.target.value
                        )
                      }
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                      placeholder={`Treść sekcji ${section}`}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
              <Link
                href="/admin/blog"
                className="bg-gray-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-all duration-300"
              >
                Anuluj
              </Link>
              <button
                type="button"
                onClick={handleSavePost}
                disabled={loading}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Zapisywanie...</span>
                  </>
                ) : (
                  <>
                    <FaSave />
                    <span>Zapisz post</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
