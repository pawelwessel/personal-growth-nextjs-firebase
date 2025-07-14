import { Metadata } from "next";
import "moment/locale/pl";
export const metadata: Metadata = {
  title: "Panel administracyjny",
};
export default async function Admin() {
  return <div className="p-6 lg:p-16"></div>;
}
