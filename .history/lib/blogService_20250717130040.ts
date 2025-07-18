import {
  addDocument,
  getDocuments,
  getDocument,
  removeDocument,
  updateDocument,
  uploadFile,
} from "@/firebase";

const COLLECTION_NAME = "blog";

export interface BlogPost {
  id: string;
  title: string;
  shortDesc: string;
  text1Title: string;
  text1Desc: string;
  text2Title: string;
  text2Desc: string;
  text3Title: string;
  text3Desc: string;
  text4Title: string;
  text4Desc: string;
  text5Title: string;
  text5Desc: string;
  text6Title: string;
  text6Desc: string;
  text7Title: string;
  text7Desc: string;
  googleTitle: string;
  googleDescription: string;
  googleKeywords: string;
  url: string;
  urlLabel: string;
  category: string;
  tags: string;
  primaryImage?: string;
  createdAt: string;
  updatedAt: string;
}

export const blogService = {
  // Get all blog posts from the database
  async getAllBlogPosts(): Promise<BlogPost[]> {
    const posts = await getDocuments(COLLECTION_NAME);
    return posts as BlogPost[];
  },

  // Get a single blog post by ID
  async getBlogPostById(id: string): Promise<BlogPost | null> {
    const post = await getDocument(COLLECTION_NAME, id);
    return post as BlogPost | null;
  },

  // Get a blog post by URL slug
  async getBlogPostByUrl(url: string): Promise<BlogPost | null> {
    const posts = await getDocuments(COLLECTION_NAME);
    const post = posts.find((post: any) => post.url === url);
    return post as BlogPost | null;
  },

  // Add a new blog post
  async addBlogPost(
    postData: Omit<BlogPost, "id" | "createdAt" | "updatedAt">
  ): Promise<string> {
    const id = Date.now().toString();
    const now = new Date().toISOString();

    const post: BlogPost = {
      ...postData,
      id,
      createdAt: now,
      updatedAt: now,
    };

    await addDocument(COLLECTION_NAME, id, post);
    return id;
  },

  // Update a blog post
  async updateBlogPost(id: string, updates: Partial<BlogPost>): Promise<void> {
    const now = new Date().toISOString();
    const updateData = {
      ...updates,
      updatedAt: now,
    };

    const keys = Object.keys(updateData);
    const values = Object.values(updateData);

    await updateDocument(keys, values, COLLECTION_NAME, id);
  },

  // Delete a blog post
  async deleteBlogPost(id: string): Promise<void> {
    await removeDocument(COLLECTION_NAME, id);
  },

  // Generate a new blog post using the API
  async generateBlogPost(
    topic: string
  ): Promise<Omit<BlogPost, "id" | "createdAt" | "updatedAt">> {
    try {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_URL
        }/api/generateBlogPost?topic=${encodeURIComponent(topic)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate blog post");
      }

      const generatedData = await response.json();

      // Return generated data without adding to database
      return {
        title: generatedData.title,
        shortDesc: generatedData.shortDesc,
        text1Title: generatedData.text1Title,
        text1Desc: generatedData.text1Desc,
        text2Title: generatedData.text2Title,
        text2Desc: generatedData.text2Desc,
        text3Title: generatedData.text3Title,
        text3Desc: generatedData.text3Desc,
        text4Title: generatedData.text4Title,
        text4Desc: generatedData.text4Desc,
        text5Title: generatedData.text5Title,
        text5Desc: generatedData.text5Desc,
        text6Title: generatedData.text6Title,
        text6Desc: generatedData.text6Desc,
        text7Title: generatedData.text7Title,
        text7Desc: generatedData.text7Desc,
        googleTitle: generatedData.googleTitle,
        googleDescription: generatedData.googleDescription,
        googleKeywords: generatedData.googleKeywords,
        url: generatedData.url,
        urlLabel: generatedData.urlLabel,
        category: generatedData.category,
        tags: generatedData.tags,
      };
    } catch (error) {
      console.error("Error generating blog post:", error);
      throw error;
    }
  },
};
