"use client";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDocument, storage } from "../../../../firebase/index";
import { useState } from "react";
import { FaUpload } from "react-icons/fa";
import Image from "next/image";
import { v4 as uuid } from "uuid";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import { toast } from "react-toastify";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, false] }],
  ["bold", "italic", "underline", "strike", "blockquote", "link"],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ indent: "-1" }, { indent: "+1" }],
  ["clean"],
];
export default function ProductEditor({
  data,
  isEdit,
  setEditOpen,
  setProducts,
}: {
  data: any;
  isEdit: boolean;
  setEditOpen?: any;
  setProducts?: any;
}) {
  const [isLoading, setLoading] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [product, setProduct] = useState<any>(data);
  function add() {
    setLoading(true);
    const randId = `${uuid()}`;
    addDocument("products", randId, {
      ...product,
      id: randId,
    }).then(() => {
      toast.success("Dodano do sklepu pomyślnie!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
      setLoading(false);
    });
    setIsAdded(true);
  }
  function edit() {
    setLoading(true);
    addDocument("products", product.id, product).then(() => {
      toast.success("Zaktualizowano produkt pomyślnie!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
      setProducts((prevData: any) =>
        prevData.map((item: any) => {
          if (item.id === product.id) {
            return product;
          }
          return item;
        })
      );
      setLoading(false);
    });
    setEditOpen(false);
  }

  const [isUploading, setUploading] = useState(false);
  const [uploadCount, setUploadCount] = useState();
  async function upload(files: any) {
    setUploadCount(files.length);
    setUploading(true);
    const localImagesArray: any = [];
    const uploadFile = async (file: any) => {
      const randId = uuid();
      const imageRef = ref(storage, randId);
      try {
        await uploadBytes(imageRef, file);
        const url = await getDownloadURL(imageRef);
        const data = {
          src: url,
        };
        localImagesArray.push(data);
      } catch (error) {
        return;
      }
    };

    // Iterate through each file and upload
    const uploadPromises = files.map(uploadFile);

    try {
      // Wait for all uploads to complete
      await Promise.all(uploadPromises);
      setProduct((prevData: any) => ({
        ...prevData,
        images: [...prevData.images, ...localImagesArray],
      }));

      setLoading(false);
      setUploading(false);
    } catch (error) {
      setLoading(false);
      setUploading(false);
      return;
    }
  }
  function handleArtworkDataChange(key: any, value: any) {
    setProduct((prevData: any) => ({
      ...prevData,
      [key]: value,
    }));
  }

  return (
    <div className="font-ubuntu relative p-3 lg:p-16 bg-white min-h-screen">
      {isUploading && (
        <div className="z-[50] bg-black/70 text-white text-3xl font-light fixed left-0 top-0 w-full h-screen flex items-center justify-center text-center">
          Dodawanie {uploadCount} obrazów...
        </div>
      )}
      {isLoading && (
        <div className="z-[50] bg-black/70 text-white text-3xl font-light fixed left-0 top-0 w-full h-screen flex items-center justify-center text-center">
          Poczekaj...
        </div>
      )}
      <div className="w-full">
        <h1 className="text-2xl lg:text-4xl font-bold text-black mt-24 lg:mt-0">
          {isEdit ? "Edytujesz produkt" : "Dodajesz produkt"}
        </h1>
        <div className="p-4 bg-gray-200 w-full mt-6">
          <div className="flex flex-col">
            <span className="font-bold mb-3 text-xl text-black">Nazwa</span>
            <input
              className={`border text-zinc-700 p-2 bg-white ${
                product.title ? "border-green-500" : "border-gray-300"
              }`}
              type="text"
              value={product.title}
              onChange={(e) => handleArtworkDataChange("title", e.target.value)}
            />
          </div>
        </div>
        <div className="p-4 bg-gray-200 w-full mt-4">
          <div className="flex flex-col">
            <span className="font-bold mb-3 text-xl text-black">Opis</span>
            <ReactQuill
              placeholder=""
              className={`border-gray-300 text-black bg-white w-full`}
              value={product?.description}
              onChange={(e) => {
                setProduct({
                  ...product,
                  description: e,
                });
              }}
            />
          </div>
        </div>
        <div className="mt-4 bg-gray-200 p-4 w-full">
          <div>
            <p className="font-bold mb-3 text-xl text-black">
              {product.images.length ? "Wybrane zdjęcia" : "Dodaj zdjęcia"}
            </p>
            {product.images.length > 0 && !product.mainImage && (
              <p className="text-black text-sm">
                Wybierz zdjęcie główne klikając na obrazek
              </p>
            )}
          </div>
          <div className="min-w-full flex flex-row flex-wrap gap-3 mt-2">
            {product?.images?.map((item: any, i: any) => (
              <div key={i} className="relative h-[150px] w-auto aspect-square">
                {product.mainImage === item.src && (
                  <div className="z-50 absolute bottom-0 left-0 font-light text-black bg-green-500 p-1">
                    Zdjęcie główne
                  </div>
                )}
                <Image
                  onClick={() =>
                    setProduct({ ...product, mainImage: item.src })
                  }
                  src={item.src}
                  width={256}
                  height={256}
                  alt=""
                  className={`${
                    isLoading ? "blur-sm" : "blur-none"
                  } absolute inset-0 object-cover w-full h-full border-2 bg-slate-100 ${
                    product.mainImage === item.src
                      ? "border-green-500"
                      : "border-gray-300"
                  }`}
                />
                <button
                  className="absolute top-0 right-0 bg-red-500 text-black p-1 font-light"
                  onClick={() => {
                    setProduct((prevData: any) => ({
                      ...prevData,
                      images: prevData.images.filter(
                        (_: any, index: any) => index !== i
                      ),
                    }));
                  }}
                >
                  Usuń
                </button>
              </div>
            ))}
            <label
              htmlFor="fileUpload"
              className="h-[150px] aspect-square text-center flex w-max flex-col relative items-center justify-center bg-white"
            >
              <FaUpload className="text-4xl text-gray-200" />
              <span className="text-lg"></span>
            </label>
            <input
              className="hidden"
              id="fileUpload"
              type="file"
              accept="image/*"
              multiple
              onChange={(e: any) => {
                const files = e.target.files;
                const imageFiles = Array.from(files).filter((file: any) =>
                  file.type.startsWith("image/")
                );
                upload(imageFiles);
              }}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="p-4 bg-gray-200 w-full mt-4">
            <span className="font-bold text-xl text-black mb-3 block">
              Tagi
            </span>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const input = form.elements.namedItem(
                  "tagInput"
                ) as HTMLInputElement;
                const newTag = input.value;
                if (newTag && !product.tags.includes(newTag)) {
                  setProduct((prevData: any) => ({
                    ...prevData,
                    tags: [...prevData.tags, newTag],
                  }));
                }
                input.value = "";
              }}
              className="flex flex-col"
            >
              <input
                type="text"
                name="tagInput"
                placeholder="Dodaj tag"
                className="bg-white border text-zinc-700 p-2 border-gray-300"
              />
              <div className="flex flex-wrap gap-2 mt-2"></div>
              {product?.tags?.map((tag: any, i: any) => (
                <div key={i} className="flex items-center space-x-2">
                  <span className="text-black">{tag}</span>
                  <button
                    type="button"
                    className="ml-3 text-red-500"
                    onClick={() => {
                      setProduct((prevData: any) => ({
                        ...prevData,
                        tags: prevData.tags.filter(
                          (_: any, index: any) => index !== i
                        ),
                      }));
                    }}
                  >
                    Usuń
                  </button>
                </div>
              ))}

              <button
                type="submit"
                className="font-light text-white bg-blue-500 py-1.5 px-3 block"
              >
                Dodaj tag
              </button>
            </form>
          </div>

          <div className="p-4 bg-gray-200 w-full mt-4">
            <div className="flex flex-col">
              <span className="font-bold text-xl text-black mb-3">Pytania</span>
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  placeholder="Dodaj pytanie"
                  className="bg-white border text-zinc-700 p-2 border-gray-300"
                  value={product.newQuestion || ""}
                  onChange={(e) =>
                    setProduct({ ...product, newQuestion: e.target.value })
                  }
                />
                <div className="flex flex-col gap-2 mt-2">
                  <span className="font-bold text-lg text-black">
                    Odpowiedzi
                  </span>
                  {product.newAnswers?.map((answer: any, index: any) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Dodaj odpowiedź"
                        className="bg-white border text-zinc-700 p-2 border-gray-300 mt-2 flex-1"
                        value={answer}
                        onChange={(e) => {
                          const newAnswers = [...product.newAnswers];
                          newAnswers[index] = e.target.value;
                          setProduct({ ...product, newAnswers });
                        }}
                      />
                      <button
                        type="button"
                        className="text-red-500 mt-2"
                        onClick={() => {
                          const newAnswers = product.newAnswers.filter(
                            (_: any, i: any) => i !== index
                          );
                          setProduct({ ...product, newAnswers });
                        }}
                      >
                        Usuń
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="font-light text-white bg-blue-500 py-1.5 px-3 block mt-2"
                    onClick={() => {
                      setProduct({
                        ...product,
                        newAnswers: [...(product.newAnswers || []), ""],
                      });
                    }}
                  >
                    Dodaj odpowiedź
                  </button>

                  <button
                    type="button"
                    className="font-light text-white bg-blue-500 py-1.5 px-3 block mt-2"
                    onClick={() => {
                      if (
                        product.newQuestion &&
                        product.newAnswers?.length > 0
                      ) {
                        setProduct((prevData: any) => ({
                          ...prevData,
                          questions: [
                            ...prevData.questions,
                            {
                              question: product.newQuestion,
                              answers: product.newAnswers,
                            },
                          ],
                          newQuestion: "",
                          newAnswers: [],
                        }));
                      }
                    }}
                  >
                    Dodaj pytanie
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2"></div>
                {product?.questions?.map((questionObj: any, i: any) => (
                  <div key={i} className="flex flex-col space-y-2">
                    <span className="text-black font-bold">
                      {questionObj.question}
                    </span>
                    <ul className="list-disc ml-5">
                      {questionObj.answers.map((answer: any, j: any) => (
                        <li key={j} className="text-black">
                          {answer}
                        </li>
                      ))}
                    </ul>
                    <button
                      type="button"
                      className="ml-3 text-red-500"
                      onClick={() => {
                        setProduct((prevData: any) => ({
                          ...prevData,
                          questions: prevData.questions.filter(
                            (_: any, index: any) => index !== i
                          ),
                        }));
                      }}
                    >
                      Usuń
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-4 bg-gray-200 w-full mt-4">
            <div className="flex flex-col">
              <span className="font-bold text-xl text-black">Cena</span>
              <input
                className={`border bg-white mt-1.5 font-bold text-zinc-700 p-2  ${
                  product.price ? "border-green-500" : "border-gray-300"
                }`}
                min={0}
                max={99999999}
                type="number"
                value={product.price}
                onChange={(e) =>
                  handleArtworkDataChange("price", e.target.value)
                }
              />
            </div>
          </div>
        </div>
        <div className="mt-4 mx-auto w-max mb-4 space-x-6">
          {!isAdded && (
            <button
              disabled={isLoading}
              onClick={() => {
                if (!isEdit) {
                  add();
                } else {
                  edit();
                }
              }}
              className="font-bold px-6 bg-green-500 hover:bg-green-400 p-2 duration-200 text-white text-lg disabled:cursor-not-allowed disabled:bg-green-200"
            >
              {isLoading ? (
                "ŁADOWANIE"
              ) : (
                <>{isEdit ? "Zapisz zmiany" : "Dodaj do sklepu"}</>
              )}
            </button>
          )}
          {isEdit && (
            <button
              disabled={isLoading}
              onClick={() => {
                setEditOpen(false);
              }}
              className="font-light px-6 bg-gray-500 hover:bg-gray-400 p-2 duration-200 text-white text-lg disabled:cursor-not-allowed disabled:bg-green-200"
            >
              Wyjdź
            </button>
          )}
          {isAdded && (
            <button
              disabled={isLoading}
              onClick={() => {
                window.location.reload();
              }}
              className="px-6 bg-gray-500 hover:bg-gray-400 p-2 duration-200 text-white text-lg disabled:cursor-not-allowed disabled:bg-green-200"
            >
              Dodaj następny
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
