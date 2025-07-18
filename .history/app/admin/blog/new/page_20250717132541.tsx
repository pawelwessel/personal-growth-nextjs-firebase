"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { blogService, BlogPost } from "@/lib/blogService";
import { ContentSection } from "./types";
import PageHeader from "./components/PageHeader";
import AIGenerationSection from "./components/AIGenerationSection";
import BasicInformationSection from "./components/BasicInformationSection";
import SEOInformationSection from "./components/SEOInformationSection";
import ContentSectionsManager from "./components/ContentSectionsManager";
import FormActions from "./components/FormActions";

export default function NewBlogPostPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [topic, setTopic] = useState("");
  const [sections, setSections] = useState<ContentSection[]>([
    { id: "1", title: "Treść posta", content: "" },
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

      // Update section with generated content
      const newSections: ContentSection[] = [
        {
          id: "1",
          title: "Treść posta",
          content: `${generatedPost.text1Desc}\n\n${generatedPost.text2Desc}\n\n${generatedPost.text3Desc}\n\n${generatedPost.text4Desc}\n\n${generatedPost.text5Desc}\n\n${generatedPost.text6Desc}\n\n${generatedPost.text7Desc}`,
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
    // Validate boundaries
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === sections.length - 1) return;
    if (index < 0 || index >= sections.length) return;

    const newSections = [...sections];
    const targetIndex = direction === "up" ? index - 1 : index + 1;

    // Validate target index
    if (targetIndex < 0 || targetIndex >= newSections.length) return;

    // Simple and reliable array reordering
    const result = [...newSections];
    const [movedItem] = result.splice(index, 1);
    result.splice(targetIndex, 0, movedItem);

    setSections(result);
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
    <div className="!text-black min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <PageHeader />

          <AIGenerationSection
            topic={topic}
            setTopic={setTopic}
            generating={generating}
            handleGeneratePost={handleGeneratePost}
          />

          {/* Post Form */}
          <form className="space-y-6">
            <BasicInformationSection
              post={post}
              handleInputChange={handleInputChange}
            />

            <SEOInformationSection
              post={post}
              handleInputChange={handleInputChange}
            />

            <ContentSectionsManager
              sections={sections}
              addSection={addSection}
              updateSection={updateSection}
              moveSection={moveSection}
              removeSection={removeSection}
            />

            <FormActions loading={loading} handleSavePost={handleSavePost} />
          </form>
        </div>
      </div>
    </div>
  );
}
