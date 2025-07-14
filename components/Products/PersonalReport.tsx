import React from "react";

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

const PersonalReport: React.FC<Props> = ({ data }) => {
  if (!data) return <p>Brak danych</p>;

  return (
    <div className="text-left p-6">
      {data.summary && (
        <section className="text-center mb-6 p-3 rounded-lg shadow-sm bg-gray-100">
          <h2 className="text-2xl font-bold text-gray-800">
            {data.summary.title}
          </h2>
          <p className="text-gray-700">{data.summary.description}</p>
        </section>
      )}

      {data.strengths && (
        <section className="mb-6 p-3 rounded-lg shadow-sm bg-gray-100">
          <h3 className="text-xl font-semibold text-white bg-blue-500 rounded-b-lg mx-auto w-max max-w-full p-3 -mt-3 mb-3">
            Mocne Strony
          </h3>
          {data.strengths.personality_traits && (
            <ul className="list-none list-inside text-gray-700 gap-3 flex flex-col">
              {data.strengths.personality_traits.map((trait, index) => (
                <li key={index}>
                  <strong className="text-white bg-slate-500 px-2 py-0.5 rounded">
                    {trait.trait}:
                  </strong>{" "}
                  {trait.description}
                </li>
              ))}
            </ul>
          )}
          {data.strengths.self_confidence && (
            <p className="text-gray-700">{data.strengths.self_confidence}</p>
          )}
        </section>
      )}

      {data.weaknesses && (
        <section className="mb-6 p-3 rounded-lg shadow-sm bg-gray-100">
          <h3 className="text-xl font-semibold text-white bg-blue-500 rounded-b-lg mx-auto w-max max-w-full p-3 -mt-3 mb-3">
            Obszary do Poprawy
          </h3>
          {data.weaknesses.areas_for_improvement && (
            <ul className="list-none list-inside text-gray-700 gap-3 flex flex-col">
              {data.weaknesses.areas_for_improvement.map((area, index) => (
                <li key={index}>
                  <strong className="text-white bg-slate-500 px-2 py-0.5 rounded">
                    {area.trait}:
                  </strong>{" "}
                  {area.description}
                </li>
              ))}
            </ul>
          )}
          {data.weaknesses.confidence_barriers && (
            <p className="text-gray-700">
              {data.weaknesses.confidence_barriers}
            </p>
          )}
        </section>
      )}

      {data.dream_alignment && (
        <section className="mb-6 p-3 rounded-lg shadow-sm bg-gray-100">
          <h3 className="text-xl font-semibold text-white bg-blue-500 rounded-b-lg mx-auto w-max max-w-full p-3 -mt-3 mb-3">
            Dopasowanie do Celów Życiowych
          </h3>
          <p className="text-gray-700">{data.dream_alignment.compatibility}</p>
          {data.dream_alignment.potential_challenges && (
            <ul className="list-none list-inside text-gray-700 gap-3 flex flex-col">
              {data.dream_alignment.potential_challenges.map(
                (challenge, index) => (
                  <li key={index}>
                    <strong className="text-white bg-slate-500 px-2 py-0.5 rounded">
                      {challenge.challenge}:
                    </strong>{" "}
                    {challenge.solution}
                  </li>
                )
              )}
            </ul>
          )}
        </section>
      )}

      {data.personalized_advice && (
        <section className="mb-6 p-3 rounded-lg shadow-sm bg-gray-100">
          <h3 className="text-xl font-semibold text-white bg-blue-500 rounded-b-lg mx-auto w-max max-w-full p-3 -mt-3 mb-3">
            Spersonalizowane Porady
          </h3>
          {data.personalized_advice.self_improvement_tips && (
            <ul className="list-none list-inside text-gray-700 gap-3 flex flex-col">
              {data.personalized_advice.self_improvement_tips.map(
                (tip, index) => (
                  <li key={index}>{tip}</li>
                )
              )}
            </ul>
          )}
          {data.personalized_advice.mindset_shift && (
            <p className="text-gray-700">
              {data.personalized_advice.mindset_shift}
            </p>
          )}
        </section>
      )}

      {data.next_steps && (
        <section className="mb-6 p-3 rounded-lg shadow-sm bg-gray-100">
          <h3 className="text-xl font-semibold text-white bg-blue-500 rounded-b-lg mx-auto w-max max-w-full p-3 -mt-3 mb-3">
            Następne Kroki
          </h3>
          {data.next_steps.actionable_goals && (
            <ul className="list-none list-inside text-gray-700 gap-3 flex flex-col">
              {data.next_steps.actionable_goals.map((goal, index) => (
                <li key={index}>{goal}</li>
              ))}
            </ul>
          )}
          <span className="block mt-4 text-gray-500">Dodatkowo</span>
          {data.next_steps.recommended_resources && (
            <ul className="list-none list-inside text-gray-700 gap-3 flex flex-col mt-2">
              {data.next_steps.recommended_resources.map((resource, index) => (
                <li key={index}>
                  <strong className="text-white bg-slate-500 px-2 py-0.5 rounded">
                    {resource.type}:
                  </strong>{" "}
                  {resource.title} - {resource.author}
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
    </div>
  );
};

export default PersonalReport;
