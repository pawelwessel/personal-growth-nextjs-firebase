import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getPolishCurrency } from "@/lib/getPolishCurrency";
import { FaShoppingCart } from "react-icons/fa";
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
    <div className="overflow-hidden pb-6 flex text-center flex-col min-h-screen lg:min-h-auto lg:h-max bg-white w-full lg:w-[35rem] items-center mx-auto lg:rounded-xl shadow-sm shadow-gray-300 relative my-12">
      <div
        className={`absolute w-full h-full left-0 top-0 ${
          shouldAnimate ? "opacity-100 duration-300" : "opacity-0 duration-300"
        }`}
      >
        <ReactConfetti width={1920} height={1920} />
      </div>

      {!results && (
        <h2 className="text-2xl text-black font-bold mt-12">{test?.title}</h2>
      )}
      {!finished && (
        <p className="text-white bg-blue-500 px-3 py-1.5 rounded-full text-sm w-max block mx-auto mb-3 mt-6">
          Pytanie {currentIndex + 1}.
        </p>
      )}
      {test && (
        <div className="relative w-full text-black">
          <AnimatePresence mode="wait">
            {test && test.questions[currentIndex] && (
              <motion.div
                key={currentIndex} // Key ensures Framer Motion detects changes
                initial={{ opacity: 0, x: 50 }} // Start animation
                animate={{ opacity: 1, x: 0 }} // End animation
                exit={{ opacity: 0, x: -50 }} // Exit animation
                // Animation duration
                className="w-[100%] px-4"
              >
                {test.questions[currentIndex].question}
                <div className="flex flex-col gap-1.5 mt-3">
                  {test.questions[currentIndex].answers.map(
                    (answer: string, i: number) => (
                      <button
                        key={i}
                        onClick={() => {
                          setSelected((prev: any) => {
                            const isAlreadySelected = prev.some(
                              (item: any) =>
                                item.question ===
                                  test.questions[currentIndex].question &&
                                item.answer === answer
                            );
                            if (isAlreadySelected) {
                              // If already selected, unselect it
                              return prev.filter(
                                (item: any) =>
                                  !(
                                    item.question ===
                                      test.questions[currentIndex].question &&
                                    item.answer === answer
                                  )
                              );
                            } else {
                              // Unselect previous answer for the current question
                              return [
                                ...prev.filter(
                                  (item: any) =>
                                    item.question !==
                                    test.questions[currentIndex].question
                                ),
                                {
                                  question:
                                    test.questions[currentIndex].question,
                                  answer,
                                },
                              ];
                            }
                          });
                        }}
                        style={{
                          boxShadow: selected.some(
                            (item: any) =>
                              item.question ===
                                test.questions[currentIndex].question &&
                              item.answer === answer
                          )
                            ? "0 0 6px #2B7FFF"
                            : "0 0 0px transparent",
                        }}
                        className={`${
                          selected.some(
                            (item: any) =>
                              item.question ===
                                test.questions[currentIndex].question &&
                              item.answer === answer
                          )
                            ? "bg-gray-100 border-gray-400"
                            : "bg-gray-100 hover:bg-gray-200 border-transparent hover:border-gray-400"
                        } cursor-pointer group duration-150 border text-black p-2 rounded-lg text-left text-sm sm:text-base flex items-center 
                      ${
                        selected.some(
                          (item: any) =>
                            item.question ===
                            test.questions[currentIndex].question
                        )
                          ? selected.some(
                              (item: any) =>
                                item.question ===
                                  test.questions[currentIndex].question &&
                                item.answer === answer
                            )
                            ? ""
                            : "opacity-50 duration-500"
                          : ""
                      }
                      `}
                      >
                        <div
                          className={`${
                            selected.some(
                              (item: any) =>
                                item.question ===
                                  test.questions[currentIndex].question &&
                                item.answer === answer
                            )
                              ? "bg-blue-500 text-white"
                              : "bg-white text-gray-700"
                          } h-10 rounded-md mr-2 aspect-square items-center justify-center flex`}
                        >
                          {i === 0 && "A"}
                          {i === 1 && "B"}
                          {i === 2 && "C"}
                          {i === 3 && "D"}
                        </div>
                        {answer}
                      </button>
                    )
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          {!finished && (
            <div className="w-3/4 mx-auto bg-gray-200 rounded-full h-2.5 mt-8">
              <motion.div
                className="bg-blue-500 h-2.5 rounded-full"
                initial={{ width: 0 }}
                animate={{
                  width: `${
                    ((currentIndex + 1) / test.questions.length) * 100
                  }%`,
                }}
                transition={{ duration: 0.5 }}
              />
            </div>
          )}
          <div className="flex flex-col gap-2 mt-4 items-center">
            {currentIndex < test.questions.length && (
              <button
                onClick={() => {
                  setCurrentIndex((prev) =>
                    Math.min(prev + 1, test.questions.length)
                  );
                }}
                disabled={currentIndex === selected.length}
                className={`${
                  // Go to next question
                  currentIndex + 1 === selected.length
                    ? "bg-blue-500 hover:bg-blue-400 text-white duration-500"
                    : "hover:bg-gray-200 bg-gray-300 text-gray-600"
                } p-3 rounded-lg w-max cursor-pointer px-12 disabled:cursor-not-allowed`}
              >
                Następne
              </button>
            )}
            {finished && !results && (
              <div className="">
                <Image
                  src={test?.mainImage}
                  width={500}
                  height={500}
                  alt="Pomyślnie ukończono test"
                  className="w-[75%] h-auto rounded-xl mx-auto"
                />
                <h2 className="mt-6 text-xl font-bold text-gray-700">
                  Pomyślnie ukończono!
                </h2>
                {loading && (
                  <div className="w-full flex flex-col items-center justify-center">
                    {/* spinner */}
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mt-6" />
                    <p className="mt-3 px-4 lg:px-12">
                      Twoje odpowiedzi są przetwarzane w celu wygenerowania
                      raportu. Proszę czekać.
                    </p>
                  </div>
                )}
              </div>
            )}
            {results && <PersonalReport data={results} />}
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
              className="cursor-pointer w-max mx-auto text-gray-400 hover:border-gray-400 border-transparent hover:text-gray-600 duration-150 border p-3 px-5 rounded-lg"
            >
              Wyłącz test
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
