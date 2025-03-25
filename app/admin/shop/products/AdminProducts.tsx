"use client";
import Image from "next/image";
import { useState } from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import ProductEditor from "../add-product/ProductEditor";
import { removeDocument } from "@/firebase";
import { toast } from "react-toastify";

export default function AdminProducts({ data }: { data: any }) {
  const [products, setProducts] = useState(data);
  const [editOpen, setEditOpen] = useState<any>(false);
  const [deleteOpen, setDeleteOpen] = useState<any>(false);
  return (
    <>
      {deleteOpen && (
        <div
          onClick={() => setDeleteOpen(false)}
          className="font-ubuntu z-[150] fixed left-0 top-0 w-screen h-screen overflow-y-scroll flex items-center justify-center bg-black/50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-4 h-max w-[30rem] md:w-[35rem]"
          >
            <h3 className="text-3xl">Usuń obraz</h3>
            <h2 className="">
              Czy na pewno chcesz usunąć{" "}
              <span className="text-red-500 font-bold">
                {deleteOpen?.title}
              </span>
              ?
            </h2>
            <div className="grid grid-cols-2 mt-4">
              <button
                onClick={() => setDeleteOpen(false)}
                className="bg-gray-200 hover:bg-gray-300 duration-300 px-4 py-2 mr-4"
              >
                Anuluj
              </button>
              <button
                onClick={() => {
                  removeDocument("products", deleteOpen.id);
                  setProducts((prev: any) =>
                    prev.filter((item: any) => item.id !== deleteOpen.id)
                  );
                  toast.success("Usunięto obraz pomyślnie!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                  });
                  setDeleteOpen(false);
                }}
                className="text-white bg-red-500 hover:bg-red-600 duration-300 px-4 py-2 font-bold"
              >
                Usuń
              </button>
            </div>
          </div>
        </div>
      )}
      {editOpen && (
        <div
          onClick={() => setEditOpen(false)}
          className="z-[150] fixed left-0 top-0 w-screen h-screen overflow-y-scroll bg-black/50 p-0 lg:p-24"
        >
          <div onClick={(e) => e.stopPropagation()}>
            <ProductEditor
              data={editOpen}
              isEdit
              setEditOpen={setEditOpen}
              setProducts={setProducts}
            />
          </div>
        </div>
      )}
      <ResponsiveMasonry
        className=""
        columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1360: 4 }}
      >
        <Masonry>
          {products?.map((item: any, i: any) => (
            <div key={i} className="relative">
              <div
                className={`font-ubuntu absolute bottom-0 left-0 w-full h-12 text-white ${
                  item?.views ? "grid-cols-3" : "grid-cols-2"
                } grid`}
              >
                <button
                  onClick={() => setEditOpen(item)}
                  className="bg-black/70 hover:bg-black/80 duration-300 flex flex-col items-center justify-center text-center h-full"
                >
                  <FaEdit />

                  <p className="text-xs mt-1">EDYTUJ</p>
                </button>
                {item?.views && (
                  <div className="bg-black/70 hover:bg-black/80 duration-300 flex flex-col items-center justify-center text-center h-full">
                    <div className="flex items-center justify-center">
                      {item.views}
                      <FaEye />
                    </div>
                    <p className="text-xs">WYŚWIETLENIA</p>
                  </div>
                )}
                <button
                  onClick={() => setDeleteOpen(item)}
                  className="bg-black/70 hover:bg-black/80 duration-300 flex flex-col items-center justify-center text-center h-full"
                >
                  <FaTrash />
                  <p className="text-xs mt-1">USUŃ</p>
                </button>
              </div>
            
                <Image
                  width={1024}
                  height={1024}
                  src={item?.mainImage || item?.images[0]?.src}
                  className="border border-gray-200"
                  alt=""
                />
              
            </div>
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </>
  );
}
