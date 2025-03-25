"use client";
import { ImageWithSkeleton } from "./ImageLoadingSkeleton";
export default function ProductImages({
  product,
  setCurrentIndex,
  setImageOpen,
}: {
  product: any;
  setCurrentIndex: any;
  setImageOpen: any;
}) {
  return (
    <div className="mt-8 grid grid-cols-3 lg:grid-cols-5 gap-2 mb-4">
      {product.images.map((image: any, i: any) => (
        <ImageWithSkeleton
          key={i}
          src={image.src}
          index={i}
          setCurrentIndex={setCurrentIndex}
          setImageOpen={setImageOpen}
        />
      ))}
    </div>
  );
}
