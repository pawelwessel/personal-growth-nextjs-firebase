import React from "react";
import CourseCard from "../CourseCard";

type PersonalityTrait = {
  trait: string;
  description: string;
};

type AreaForImprovement = {
  trait: string;
  description: string;
};

type PotentialChallenge = {
  challenge: string;
  solution: string;
};

type RecommendedResource = {
  type: string;
  title: string;
  author: string;
};

type EmotionalPotentialData = {
  summary?: {
    title: string;
    description: string;
  };
  strengths?: {
    personality_traits?: PersonalityTrait[];
    self_confidence?: string;
  };
  weaknesses?: {
    areas_for_improvement?: AreaForImprovement[];
    confidence_barriers?: string;
  };
  dream_alignment?: {
    compatibility?: string;
    potential_challenges?: PotentialChallenge[];
  };
  personalized_advice?: {
    self_improvement_tips?: string[];
    mindset_shift?: string;
  };
  next_steps?: {
    actionable_goals?: string[];
    recommended_resources?: RecommendedResource[];
  };
};

interface Props {
  data: EmotionalPotentialData;
}

// Sample course data for the report
const recommendedCourses = [
  {
    id: "1",
    title: "Podstawy rozwoju osobistego",
    description:
      "Poznaj fundamenty rozwoju osobistego i rozpocznij swoją transformację",
    duration: "4 godziny",
    level: "Początkujący" as const,
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
    level: "Średniozaawansowany" as const,
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
    level: "Początkujący" as const,
    rating: 4.7,
    students: 1563,
    price: 89,
    originalPrice: 129,
    image: "/public/assets/3.jpg",
    category: "Produktywność",
    lessons: 15,
  },
];

const PersonalReport: React.FC<Props> = ({ data }) => {
  if (!data) return <p>Brak danych</p>;

  return (
    <div className="text-left space-y-6 overflow-y-auto max-h-full pb-6">
      {data.summary && (
        <section className="text-center p-4 rounded-lg shadow-sm bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200">
          <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-3">
            {data.summary.title}
          </h2>
          <p className="text-gray-700 text-sm lg:text-base leading-relaxed">
            {data.summary.description}
          </p>
        </section>
      )}

      {data.strengths && (
        <section className="p-4 rounded-lg shadow-sm bg-gradient-to-r from-green-50 to-blue-50 border border-green-200">
          <h3 className="text-lg lg:text-xl font-semibold text-white bg-gradient-to-r from-green-500 to-blue-500 rounded-lg mx-auto w-max max-w-full p-3 -mt-3 mb-4">
            Mocne Strony
          </h3>
          {data.strengths.personality_traits && (
            <ul className="space-y-3">
              {data.strengths.personality_traits.map((trait, index) => (
                <li key={index} className="bg-white p-3 rounded-lg shadow-sm">
                  <strong className="text-white bg-green-500 px-2 py-1 rounded text-sm">
                    {trait.trait}:
                  </strong>{" "}
                  <span className="text-gray-700 text-sm lg:text-base">
                    {trait.description}
                  </span>
                </li>
              ))}
            </ul>
          )}
          {data.strengths.self_confidence && (
            <p className="text-gray-700 text-sm lg:text-base bg-white p-3 rounded-lg shadow-sm">
              {data.strengths.self_confidence}
            </p>
          )}
        </section>
      )}

      {data.weaknesses && (
        <section className="p-4 rounded-lg shadow-sm bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200">
          <h3 className="text-lg lg:text-xl font-semibold text-white bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg mx-auto w-max max-w-full p-3 -mt-3 mb-4">
            Obszary do Poprawy
          </h3>
          {data.weaknesses.areas_for_improvement && (
            <ul className="space-y-3">
              {data.weaknesses.areas_for_improvement.map((area, index) => (
                <li key={index} className="bg-white p-3 rounded-lg shadow-sm">
                  <strong className="text-white bg-yellow-500 px-2 py-1 rounded text-sm">
                    {area.trait}:
                  </strong>{" "}
                  <span className="text-gray-700 text-sm lg:text-base">
                    {area.description}
                  </span>
                </li>
              ))}
            </ul>
          )}
          {data.weaknesses.confidence_barriers && (
            <p className="text-gray-700 text-sm lg:text-base bg-white p-3 rounded-lg shadow-sm">
              {data.weaknesses.confidence_barriers}
            </p>
          )}
        </section>
      )}

      {data.dream_alignment && (
        <section className="p-4 rounded-lg shadow-sm bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200">
          <h3 className="text-lg lg:text-xl font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg mx-auto w-max max-w-full p-3 -mt-3 mb-4">
            Dopasowanie do Celów Życiowych
          </h3>
          <p className="text-gray-700 text-sm lg:text-base bg-white p-3 rounded-lg shadow-sm mb-4">
            {data.dream_alignment.compatibility}
          </p>
          {data.dream_alignment.potential_challenges && (
            <ul className="space-y-3">
              {data.dream_alignment.potential_challenges.map(
                (challenge, index) => (
                  <li key={index} className="bg-white p-3 rounded-lg shadow-sm">
                    <strong className="text-white bg-purple-500 px-2 py-1 rounded text-sm">
                      {challenge.challenge}:
                    </strong>{" "}
                    <span className="text-gray-700 text-sm lg:text-base">
                      {challenge.solution}
                    </span>
                  </li>
                )
              )}
            </ul>
          )}
        </section>
      )}

      {data.personalized_advice && (
        <section className="p-4 rounded-lg shadow-sm bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200">
          <h3 className="text-lg lg:text-xl font-semibold text-white bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg mx-auto w-max max-w-full p-3 -mt-3 mb-4">
            Spersonalizowane Porady
          </h3>
          {data.personalized_advice.self_improvement_tips && (
            <ul className="space-y-3">
              {data.personalized_advice.self_improvement_tips.map(
                (tip, index) => (
                  <li
                    key={index}
                    className="bg-white p-3 rounded-lg shadow-sm text-sm lg:text-base text-gray-700"
                  >
                    {tip}
                  </li>
                )
              )}
            </ul>
          )}
          {data.personalized_advice.mindset_shift && (
            <p className="text-gray-700 text-sm lg:text-base bg-white p-3 rounded-lg shadow-sm">
              {data.personalized_advice.mindset_shift}
            </p>
          )}
        </section>
      )}

      {/* Recommended Courses Section */}
      <section className="p-4 rounded-lg shadow-sm bg-gradient-to-r from-teal-50 to-green-50 border border-teal-200">
        <h3 className="text-lg lg:text-xl font-semibold text-white bg-gradient-to-r from-teal-500 to-green-500 rounded-lg mx-auto w-max max-w-full p-3 -mt-3 mb-4">
          Polecane Kursy
        </h3>
        <div className="space-y-4">
          {recommendedCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              variant="horizontal"
              onClick={() => {
                // Handle course click - could open course details or redirect
                console.log("Course clicked:", course.title);
              }}
            />
          ))}
        </div>
      </section>

      {data.next_steps && (
        <section className="p-4 rounded-lg shadow-sm bg-gradient-to-r from-teal-50 to-green-50 border border-teal-200">
          <h3 className="text-lg lg:text-xl font-semibold text-white bg-gradient-to-r from-teal-500 to-green-500 rounded-lg mx-auto w-max max-w-full p-3 -mt-3 mb-4">
            Następne Kroki
          </h3>
          {data.next_steps.actionable_goals && (
            <ul className="space-y-3 mb-4">
              {data.next_steps.actionable_goals.map((goal, index) => (
                <li
                  key={index}
                  className="bg-white p-3 rounded-lg shadow-sm text-sm lg:text-base text-gray-700"
                >
                  {goal}
                </li>
              ))}
            </ul>
          )}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <span className="block mb-3 text-gray-500 font-medium">
              Dodatkowo
            </span>
            {data.next_steps.recommended_resources && (
              <ul className="space-y-3">
                {data.next_steps.recommended_resources.map(
                  (resource, index) => (
                    <li key={index} className="bg-gray-50 p-3 rounded-lg">
                      <strong className="text-white bg-teal-500 px-2 py-1 rounded text-sm">
                        {resource.type}:
                      </strong>{" "}
                      <span className="text-gray-700 text-sm lg:text-base">
                        {resource.title} - {resource.author}
                      </span>
                    </li>
                  )
                )}
              </ul>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default PersonalReport;
