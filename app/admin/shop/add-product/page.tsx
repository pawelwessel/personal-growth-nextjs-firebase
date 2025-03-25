import ProductEditor from "./ProductEditor";

export default async function Page() {
  return (
    <ProductEditor
      data={{
        title: "",
        images: [],
        tags: [],
        price: 0,
        description: "",
        mainImage: "",
        questions: [],
      }}
      isEdit={false}
    />
  );
}
