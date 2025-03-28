import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa6";
import { getPolishCurrency } from "@/lib/getPolishCurrency";
import { FaShoppingCart } from "react-icons/fa";

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
  return (
    <div className="flex h-full justify-center text-center flex-col bg-white w-full lg:w-auto p-4">
      <h2 className="text-2xl text-black mb-2 mt-6 font-bold">{test?.title}</h2>
      <p className="text-white bg-blue-500 px-2 rounded-full text-sm w-max block mx-auto">
        Pytanie {currentIndex + 1}.
      </p>
      {test && (
        <div className="relative w-full text-black mt-2">
          <AnimatePresence mode="wait">
            {test && test.questions[currentIndex] && (
              <motion.div
                key={currentIndex} // Key ensures Framer Motion detects changes
                initial={{ opacity: 0, x: 50 }} // Start animation
                animate={{ opacity: 1, x: 0 }} // End animation
                exit={{ opacity: 0, x: -50 }} // Exit animation
                // Animation duration
                className="w-[100%] sm:w-[30rem] px-4"
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
                        className={`${
                          selected.some(
                            (item: any) =>
                              item.question ===
                                test.questions[currentIndex].question &&
                              item.answer === answer
                          )
                            ? "bg-green-600 text-white"
                            : "bg-gray-100 hover:bg-gray-200 hover:border-gray-400"
                        } cursor-pointer group duration-150 border border-transparent text-black p-2 rounded-lg text-left text-sm sm:text-base flex items-center 
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
                              ? "bg-gray-100 text-black group-hover:bg-gray-200"
                              : "bg-green-600  text-white"
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
          <div className="flex flex-col gap-2 mt-6 items-center">
            {currentIndex < test.questions.length - 1 && (
              <button
                onClick={() => {
                  setCurrentIndex((prev) =>
                    Math.min(prev + 1, test.questions.length - 1)
                  );
                }}
                className={`${
                  // Go to next question
                  currentIndex + 1 === selected.length
                    ? "bg-green-600 hover:bg-green-500 text-white duration-500"
                    : "hover:bg-gray-200 bg-gray-300 text-gray-600"
                } p-3 rounded-lg w-max cursor-pointer px-12`}
              >
                Następne
              </button>
            )}
            {currentIndex === test.questions.length - 1 && (
              <button
                onClick={() => {
                  setCurrentIndex((prev) =>
                    Math.min(prev + 1, test.questions.length - 1)
                  );
                }}
                className={`${
                  // Go to next question
                  currentIndex + 1 === selected.length
                    ? "bg-green-600 hover:bg-green-500 text-white duration-500"
                    : "hover:bg-gray-200 bg-gray-300 text-gray-600"
                } p-3 rounded-lg w-max cursor-pointer px-12 flex flex-col items-center gap-1`}
              >
                <span className="text-2xl block font-light font-pt">
                  {" "}
                  Zobacz rezultaty{" "}
                </span>
                <div className="flex items-center">
                  <FaShoppingCart className="text-2xl mr-2" /> (
                  <span className="text-xl font-light">
                    {getPolishCurrency(test.price)})
                  </span>
                </div>
              </button>
            )}
            <button
              onClick={() => setTest(false)}
              className="cursor-pointer w-max mx-auto text-gray-400 hover:border-gray-400 border-transparent hover:text-gray-600 duration-150 border p-3 px-5 rounded-lg"
            >
              Wyłącz test
            </button>
          </div>
          <div className="w-3/4 mx-auto bg-gray-200 rounded-full h-2.5 mt-4">
            <motion.div
              className="bg-blue-500 h-2.5 rounded-full"
              initial={{ width: 0 }}
              animate={{
                width: `${((currentIndex + 1) / test.questions.length) * 100}%`,
              }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
