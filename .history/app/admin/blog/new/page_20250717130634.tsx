"use client";

import { useState } from "react";
import {
  FaSave,
  FaMagic,
  FaArrowLeft,
  FaEye,
  FaArrowUp,
  FaArrowDown,
  FaPlus,
  FaTrash,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { blogService, BlogPost } from "@/lib/blogService";

interface ContentSection {
  id: string;
  title: string;
  content: string;
}

export default function NewBlogPostPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [topic, setTopic] = useState("");
  const [sections, setSections] = useState<ContentSection[]>([
    { id: "1", title: "Wprowadzenie", content: "" },
    { id: "2", title: "Podstawy", content: "" },
    { id: "3", title: "Praktyczne zastosowania", content: "" },
    { id: "4", title: "Zaawansowane techniki", content: "" },
    { id: "5", title: "Analiza i wnioski", content: "" },
    { id: "6", title: "Przyszłość", content: "" },
    { id: "7", title: "Podsumowanie", content: "" },
  ]);
  const [post, setPost] = useState<Partial<BlogPost>>({
    title: "",
    shortDesc: "",
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

      // Update sections with generated content
      const newSections: ContentSection[] = [
        {
          id: "1",
          title: generatedPost.text1Title,
          content: generatedPost.text1Desc,
        },
        {
          id: "2",
          title: generatedPost.text2Title,
          content: generatedPost.text2Desc,
        },
        {
          id: "3",
          title: generatedPost.text3Title,
          content: generatedPost.text3Desc,
        },
        {
          id: "4",
          title: generatedPost.text4Title,
          content: generatedPost.text4Desc,
        },
        {
          id: "5",
          title: generatedPost.text5Title,
          content: generatedPost.text5Desc,
        },
        {
          id: "6",
          title: generatedPost.text6Title,
          content: generatedPost.text6Desc,
        },
        {
          id: "7",
          title: generatedPost.text7Title,
          content: generatedPost.text7Desc,
        },
      ];
      setSections(newSections);
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

    // Convert sections back to the expected format
    const postData = {
      ...post,
      text1Title: sections[0]?.title || "",
      text1Desc: sections[0]?.content || "",
      text2Title: sections[1]?.title || "",
      text2Desc: sections[1]?.content || "",
      text3Title: sections[2]?.title || "",
      text3Desc: sections[2]?.content || "",
      text4Title: sections[3]?.title || "",
      text4Desc: sections[3]?.content || "",
      text5Title: sections[4]?.title || "",
      text5Desc: sections[4]?.content || "",
      text6Title: sections[5]?.title || "",
      text6Desc: sections[5]?.content || "",
      text7Title: sections[6]?.title || "",
      text7Desc: sections[6]?.content || "",
    };

    try {
      setLoading(true);
      await blogService.addBlogPost(
        postData as Omit<BlogPost, "id" | "createdAt" | "updatedAt">
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

  const moveSection = (index: number, direction: "up" | "down") => {
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === sections.length - 1) return;

    const newSections = [...sections];
    const targetIndex = direction === "up" ? index - 1 : index + 1;

    [newSections[index], newSections[targetIndex]] = [
      newSections[targetIndex],
      newSections[index],
    ];
    setSections(newSections);
  };

  const addSection = () => {
    const newId = (sections.length + 1).toString();
    const newSection: ContentSection = {
      id: newId,
      title: `Sekcja ${newId}`,
      content: "",
    };
    setSections([...sections, newSection]);
  };

  const removeSection = (index: number) => {
    if (sections.length <= 1) {
      alert("Musi być przynajmniej jedna sekcja");
      return;
    }
    const newSections = sections.filter((_, i) => i !== index);
    setSections(newSections);
  };

  const updateSection = (
    index: number,
    field: "title" | "content",
    value: string
  ) => {
    const newSections = [...sections];
    newSections[index] = {
      ...newSections[index],
      [field]: value,
    };
    setSections(newSections);
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
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">
                  Treść posta
                </h3>
                <button
                  type="button"
                  onClick={addSection}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-all duration-300 flex items-center space-x-2"
                >
                  <FaPlus />
                  <span>Dodaj sekcję</span>
                </button>
              </div>

              {sections.map((section, index) => (
                <div
                  key={section.id}
                  className="bg-gray-50 rounded-xl p-6 border border-gray-200"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-500">
                        Sekcja {index + 1}
                      </span>
                      <div className="flex space-x-1">
                        <button
                          type="button"
                          onClick={() => moveSection(index, "up")}
                          disabled={index === 0}
                          className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Przesuń w górę"
                        >
                          <FaArrowUp />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveSection(index, "down")}
                          disabled={index === sections.length - 1}
                          className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Przesuń w dół"
                        >
                          <FaArrowDown />
                        </button>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeSection(index)}
                      className="p-1 text-red-500 hover:text-red-700"
                      title="Usuń sekcję"
                    >
                      <FaTrash />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tytuł sekcji
                      </label>
                      <input
                        type="text"
                        value={section.title}
                        onChange={(e) =>
                          updateSection(index, "title", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                        placeholder={`Tytuł sekcji ${index + 1}`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Treść sekcji
                    </label>
                    <textarea
                      value={section.content}
                      onChange={(e) =>
                        updateSection(index, "content", e.target.value)
                      }
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                      placeholder={`Treść sekcji ${index + 1}`}
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
