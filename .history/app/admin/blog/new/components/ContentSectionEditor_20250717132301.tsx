"use client";

import { FaArrowUp, FaArrowDown, FaTrash } from "react-icons/fa";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => <p>Ładowanie edytora...</p>,
});

// Toolbar options matching quixy implementation
const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, false] }],
  ["bold", "italic", "underline", "strike", "blockquote", "link"],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ indent: "-1" }, { indent: "+1" }],
  ["clean"],
];

import { ContentSection } from "../types";

interface ContentSectionEditorProps {
  section: ContentSection;
  index: number;
  totalSections: number;
  updateSection: (
    index: number,
    field: "title" | "content",
    value: string
  ) => void;
  moveSection: (index: number, direction: "up" | "down") => void;
  removeSection: (index: number) => void;
}

export default function ContentSectionEditor({
  section,
  index,
  totalSections,
  updateSection,
  moveSection,
  removeSection,
}: ContentSectionEditorProps) {
  return (
    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-500">
            Sekcja {index + 1}
          </span>
          <div className="flex space-x-1">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                moveSection(index, "up");
              }}
              disabled={index === 0}
              className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Przesuń w górę"
            >
              <FaArrowUp />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                moveSection(index, "down");
              }}
              disabled={index === totalSections - 1}
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
            onChange={(e) => updateSection(index, "title", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
            placeholder={`Tytuł sekcji ${index + 1}`}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Treść sekcji
        </label>
        <div className="rounded-md">
          <ReactQuill
            theme="snow"
            placeholder={!section.content ? "Wpisz tekst" : ""}
            className={`border rounded-md border-gray-300 text-black bg-white w-full`}
            modules={{
              toolbar: {
                container: TOOLBAR_OPTIONS,
              },
            }}
            value={section.content}
            onChange={(content) => updateSection(index, "content", content)}
          />
        </div>
      </div>
    </div>
  );
}
