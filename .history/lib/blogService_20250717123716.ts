import {
  addDocument,
  getDocuments,
  getDocument,
  removeDocument,
  updateDocument,
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
    const blogData = await getDocument(COLLECTION_NAME, "blog");
    return blogData?.posts || [];
  },

  // Get a single blog post by ID
  async getBlogPostById(id: string): Promise<BlogPost | null> {
    const blogData = await getDocument(COLLECTION_NAME, "blog");
    if (!blogData?.posts) return null;

    const post = blogData.posts.find((post: BlogPost) => post.id === id);
    return post || null;
  },

  // Get a blog post by URL slug
  async getBlogPostByUrl(url: string): Promise<BlogPost | null> {
    const blogData = await getDocument(COLLECTION_NAME, "blog");
    if (!blogData?.posts) return null;

    const post = blogData.posts.find((post: BlogPost) => post.url === url);
    return post || null;
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

    const blogData = await getDocument(COLLECTION_NAME, "blog");
    const existingPosts = blogData?.posts || [];

    await updateDocument(
      ["posts"],
      [[...existingPosts, post]],
      COLLECTION_NAME,
      "blog"
    );

    return id;
  },

  // Update a blog post
  async updateBlogPost(id: string, updates: Partial<BlogPost>): Promise<void> {
    const now = new Date().toISOString();
    const blogData = await getDocument(COLLECTION_NAME, "blog");

    if (!blogData?.posts) {
      throw new Error("No blog posts found");
    }

    const updatedPosts = blogData.posts.map((post: BlogPost) => {
      if (post.id === id) {
        return {
          ...post,
          ...updates,
          updatedAt: now,
        };
      }
      return post;
    });

    await updateDocument(["posts"], [updatedPosts], COLLECTION_NAME, "blog");
  },

  // Delete a blog post
  async deleteBlogPost(id: string): Promise<void> {
    const blogData = await getDocument(COLLECTION_NAME, "blog");

    if (!blogData?.posts) {
      throw new Error("No blog posts found");
    }

    const updatedPosts = blogData.posts.filter(
      (post: BlogPost) => post.id !== id
    );

    await updateDocument(["posts"], [updatedPosts], COLLECTION_NAME, "blog");
  },

  // Generate a new blog post using the API
  async generateBlogPost(topic: string): Promise<BlogPost> {
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

      // Create a new blog post from the generated data
      const newPost: Omit<BlogPost, "id" | "createdAt" | "updatedAt"> = {
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

      const postId = await this.addBlogPost(newPost);
      return {
        ...newPost,
        id: postId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    } catch (error) {
      console.error("Error generating blog post:", error);
      throw error;
    }
  },
};
