import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlay, FaCheck, FaArrowRight, FaStar, FaGift } from "react-icons/fa";
import Image from "next/image";
import ReactConfetti from "react-confetti";
import PersonalReport from "./PersonalReport";

async function getTestResults({
  prompt,
  testName,
}: {
  prompt: { question: string; answer: string }[];
  testName: string;
}) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/test`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt,
      testName,
    }),
  });
  const data = await response.json();
  return data;
}

export default function Test({
  setTest,
  test,
}: {
  setTest: Function;
  test: any;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<any>([]);
  const [selected, setSelected] = useState<any>([]);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [finished, setFinished] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);

  // Keyboard event listener for 'E' key to jump to last question
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (
        event.key.toLowerCase() === "e" &&
        test &&
        test.questions &&
        currentIndex < test.questions.length - 1
      ) {
        // Jump to the last question
        setCurrentIndex(test.questions.length - 1);
      }
    };

    // Add event listener
    window.addEventListener("keydown", handleKeyPress);

    // Cleanup event listener
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [currentIndex, test]);

  useEffect(() => {
    if (currentIndex === test?.questions?.length) {
      setLoading(true);

      const fetchResults = async () => {
        const results = await getTestResults({
          prompt: selected,
          testName: test?.title,
        });
        console.log("Test Results:", results);
        setResults(results);
      };

      fetchResults()
        .catch((err) => console.error(err))
        .finally(() => {
          setLoading(false);
        });

      setTimeout(() => {
        setShouldAnimate(true);
        setFinished(true);
      }, 500);
      setTimeout(() => {
        setShouldAnimate(false);
      }, 7000);
    }
  }, [currentIndex, test?.questions?.length, selected]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Test Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden relative"
        >
          {/* Confetti Animation */}
          <div
            className={`absolute inset-0 z-10 ${
              shouldAnimate ? "opacity-100" : "opacity-0"
            } transition-opacity duration-300`}
          >
            <ReactConfetti width={1920} height={1920} />
          </div>

          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              {!results && (
                <motion.h1
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-3xl lg:text-4xl font-bold mb-4"
                >
                  {test?.title}
                </motion.h1>
              )}

              {/* Free Badge */}
              <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
                <FaGift className="text-yellow-300" />
                <span className="font-semibold">100% ZA DARMO</span>
              </div>

              {!finished && (
                <div className="flex flex-col items-center gap-3">
                  <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                    <FaPlay className="text-sm" />
                    <span className="font-medium">
                      Pytanie {currentIndex + 1} z {test?.questions?.length}
                    </span>
                  </div>

                  {test &&
                    test.questions &&
                    currentIndex < test.questions.length - 1 && (
                      <div className="text-white/80 text-sm">
                        Naciśnij{" "}
                        <span className="bg-white/20 px-2 py-1 rounded font-mono">
                          E
                        </span>{" "}
                        aby przejść do ostatniego pytania
                      </div>
                    )}
                </div>
              )}
            </div>
          </div>

          {/* Progress Bar */}
          {!finished && (
            <div className="px-8 pt-6">
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <motion.div
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${
                      ((currentIndex + 1) / test?.questions?.length) * 100
                    }%`,
                  }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          )}

          {/* Content */}
          <div className="p-8">
            {test && (
              <div className="relative">
                <AnimatePresence mode="wait">
                  {test && test.questions[currentIndex] && (
                    <motion.div
                      key={currentIndex}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      {/* Question */}
                      <div className="text-center">
                        <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-6 leading-relaxed">
                          {test.questions[currentIndex].question}
                        </h2>
                      </div>

                      {/* Answers */}
                      <div className="space-y-4">
                        {test.questions[currentIndex].answers.map(
                          (answer: string, i: number) => {
                            const isSelected = selected.some(
                              (item: any) =>
                                item.question ===
                                  test.questions[currentIndex].question &&
                                item.answer === answer
                            );

                            return (
                              <motion.button
                                key={i}
                                onClick={() => {
                                  setSelected((prev: any) => {
                                    const isAlreadySelected = prev.some(
                                      (item: any) =>
                                        item.question ===
                                          test.questions[currentIndex]
                                            .question && item.answer === answer
                                    );
                                    if (isAlreadySelected) {
                                      return prev.filter(
                                        (item: any) =>
                                          !(
                                            item.question ===
                                              test.questions[currentIndex]
                                                .question &&
                                            item.answer === answer
                                          )
                                      );
                                    } else {
                                      return [
                                        ...prev.filter(
                                          (item: any) =>
                                            item.question !==
                                            test.questions[currentIndex]
                                              .question
                                        ),
                                        {
                                          question:
                                            test.questions[currentIndex]
                                              .question,
                                          answer,
                                        },
                                      ];
                                    }
                                  });
                                }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`w-full p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
                                  isSelected
                                    ? "border-purple-500 bg-gradient-to-r from-purple-50 to-pink-50 shadow-lg"
                                    : "border-gray-200 bg-white hover:border-purple-300 hover:shadow-md"
                                }`}
                              >
                                <div className="flex items-center space-x-4">
                                  <div
                                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                                      isSelected
                                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                                        : "bg-gray-100 text-gray-600"
                                    }`}
                                  >
                                    {String.fromCharCode(65 + i)}{" "}
                                    {/* A, B, C, D */}
                                  </div>
                                  <div className="flex-1">
                                    <p className="text-gray-800 font-medium leading-relaxed">
                                      {answer}
                                    </p>
                                  </div>
                                  {isSelected && (
                                    <motion.div
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      className="text-purple-500"
                                    >
                                      <FaCheck />
                                    </motion.div>
                                  )}
                                </div>
                              </motion.button>
                            );
                          }
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Navigation */}
                {!finished && (
                  <div className="mt-8 text-center">
                    <motion.button
                      onClick={() => {
                        setCurrentIndex((prev) =>
                          Math.min(prev + 1, test.questions.length)
                        );
                      }}
                      disabled={currentIndex + 1 !== selected.length}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`inline-flex items-center space-x-2 px-8 py-4 rounded-full font-semibold transition-all duration-300 ${
                        currentIndex + 1 === selected.length
                          ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                          : "bg-gray-200 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      <span>Następne pytanie</span>
                      <FaArrowRight />
                    </motion.button>
                  </div>
                )}

                {/* Completion State */}
                {finished && !results && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-12"
                  >
                    <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-6">
                      <FaStar className="text-white text-3xl" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">
                      Test ukończony!
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Dziękujemy za wypełnienie testu. Generujemy Twój
                      spersonalizowany raport...
                    </p>

                    {loading && (
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mb-4"></div>
                        <p className="text-gray-600">
                          Analizujemy Twoje odpowiedzi...
                        </p>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Results */}
                {results && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <PersonalReport data={results} />
                  </motion.div>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-8 py-6 text-center">
            <button
              onClick={() => {
                setTest(false);
                setUserAnswers([]);
                setSelected([]);
                setCurrentIndex(0);
                setFinished(false);
                setShouldAnimate(false);
                setResults(null);
              }}
              className="text-gray-500 hover:text-gray-700 font-medium transition-colors duration-300"
            >
              Zamknij test
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
