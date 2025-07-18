import { blogService } from "@/lib/blogService";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FaCalendar, FaTag, FaArrowLeft, FaShare } from "react-icons/fa";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await blogService.getBlogPostByUrl(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <Link
            href="/blog"
            className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium mb-6 transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Powrót do bloga
          </Link>

          <div className="flex items-center space-x-4 mb-4">
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
              {post.category}
            </span>
            <span className="text-gray-500 text-sm flex items-center">
              <FaCalendar className="mr-1" />
              {new Date(post.createdAt).toLocaleDateString("pl-PL")}
            </span>
          </div>

          <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            {post.title}
          </h1>

          <p className="text-xl text-gray-600 mb-6">{post.shortDesc}</p>

          {/* Tags */}
          {post.tags && (
            <div className="flex items-center space-x-2">
              <FaTag className="text-gray-400" />
              <div className="flex flex-wrap gap-2">
                {post.tags.split(",").map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    {tag.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <article className="bg-white rounded-xl shadow-lg p-8 lg:p-12">
          {/* Post Image */}
          {post.primaryImage && (
            <div className="relative h-64 lg:h-96 mb-8 rounded-lg overflow-hidden">
              <Image
                src={post.primaryImage}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          <div className="prose lg:prose-xl max-w-none">
            <div
              dangerouslySetInnerHTML={{ __html: post.content }}
              className="prose lg:prose-xl max-w-none"
            />
          </div>

          {/* Call to Action */}
          <div className="mt-12 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              {post.urlLabel || "Dowiedz się więcej"}
            </h3>
            <p className="text-gray-600 mb-4">
              Jeśli ten artykuł był dla Ciebie pomocny, sprawdź nasze kursy i
              materiały edukacyjne.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/#courses"
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
              >
                Zobacz kursy
              </Link>
              <Link
                href="/blog"
                className="bg-white border border-purple-600 text-purple-600 px-6 py-3 rounded-lg font-medium hover:bg-purple-50 transition-all duration-300"
              >
                Więcej artykułów
              </Link>
            </div>
          </div>
        </article>

        {/* Share Section */}
        <div className="mt-8 text-center">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">
            Podziel się tym artykułem
          </h4>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: post.title,
                    text: post.shortDesc,
                    url: window.location.href,
                  });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Link skopiowany do schowka!");
                }
              }}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
            >
              <FaShare />
              <span>Udostępnij</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
