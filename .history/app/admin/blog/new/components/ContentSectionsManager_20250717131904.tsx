"use client";

import { FaPlus } from "react-icons/fa";
import ContentSectionEditor from "./ContentSectionEditor";

interface ContentSection {
  id: string;
  title: string;
  content: string;
}

interface ContentSectionsManagerProps {
  sections: ContentSection[];
  addSection: () => void;
  updateSection: (
    index: number,
    field: "title" | "content",
    value: string
  ) => void;
  moveSection: (index: number, direction: "up" | "down") => void;
  removeSection: (index: number) => void;
}

export default function ContentSectionsManager({
  sections,
  addSection,
  updateSection,
  moveSection,
  removeSection,
}: ContentSectionsManagerProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">Treść posta</h3>
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
        <ContentSectionEditor
          key={section.id}
          section={section}
          index={index}
          totalSections={sections.length}
          updateSection={updateSection}
          moveSection={moveSection}
          removeSection={removeSection}
        />
      ))}
    </div>
  );
}
