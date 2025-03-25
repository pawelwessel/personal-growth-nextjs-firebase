import { getDocuments } from "@/firebase";
import EditPostPage from "./EditPostPage";

export default async function Page() {
  const posts = await getDocuments("blog");
  return <EditPostPage posts={posts} />;
}
