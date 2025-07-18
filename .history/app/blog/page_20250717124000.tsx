import { blogService } from "@/lib/blogService";
import Link from "next/link";
import Image from "next/image";
import { FaCalendar, FaUser, FaTag } from "react-icons/fa";

export default async function BlogPage() {
  const posts = await blogService.getAllBlogPosts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              Blog
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Odkryj nasze artykuły o rozwoju osobistym, motywacji i
              produktywności
            </p>
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {posts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl text-gray-300 mb-4">📝</div>
            <h2 className="text-2xl font-semibold text-gray-600 mb-4">
              Brak postów
            </h2>
            <p className="text-gray-500">
              Nie ma jeszcze żadnych postów na blogu.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {/* Post Image */}
                <div className="relative h-48 bg-gradient-to-br from-purple-100 to-pink-100">
                  {post.primaryImage ? (
                    <Image
                      src={post.primaryImage}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                      <div className="text-4xl text-purple-300">📝</div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent" />
                </div>

                {/* Post Content */}
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {new Date(post.createdAt).toLocaleDateString("pl-PL")}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                    {post.title}
                  </h2>

                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.shortDesc}
                  </p>

                  {/* Tags */}
                  {post.tags && (
                    <div className="flex items-center space-x-2 mb-4">
                      <FaTag className="text-gray-400 text-sm" />
                      <div className="flex flex-wrap gap-1">
                        {post.tags
                          .split(",")
                          .slice(0, 3)
                          .map((tag, index) => (
                            <span
                              key={index}
                              className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                            >
                              {tag.trim()}
                            </span>
                          ))}
                        {post.tags.split(",").length > 3 && (
                          <span className="text-gray-500 text-xs">
                            +{post.tags.split(",").length - 3} więcej
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  <Link
                    href={`/blog/${post.url}`}
                    className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium transition-colors"
                  >
                    Czytaj więcej
                    <svg
                      className="ml-2 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
