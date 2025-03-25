import { getDocuments } from "@/firebase";
import AdminProducts from "./AdminProducts";
export const dynamic = "force-dynamic";
export default async function Page() {
  const products: any = await getDocuments("products");
  return (
    <div className="p-6 lg:p-16">
      <h1 className="text-3xl font-cardo text-black">Produkty</h1>
      <AdminProducts data={products} />
    </div>
  );
}
