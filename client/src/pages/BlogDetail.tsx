import { useRoute } from "wouter";
import { blogPosts } from "@/lib/data";
import { Link } from "wouter";
import { calculateReadingTime } from "@/utils/readingTime";
import { Clock } from "lucide-react";
import PageTitle from "@/components/PageTitle";
import RelatedPosts from "@/components/RelatedPosts";

const BlogDetail = () => {
  const [, params] = useRoute("/blog/:id");
  const post = blogPosts.find((b) => String(b.id) === params?.id);

  if (!post) {
    return (
      <main className="py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Blog Not Found</h1>
        <Link href="/blog" className="text-secondary hover:underline">
          ← Back to Blog
        </Link>
      </main>
    );
  }

  const readingTime = calculateReadingTime(post.content);

  return (
    <main>
      <PageTitle title={post.title} description={post.description} />
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center justify-center gap-4 text-white/80">
            <p className="text-lg">{post.date}</p>
            <span className="hidden md:inline">•</span>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>{readingTime} min read</span>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <img
            src={post.image}
            alt={post.title}
            className="rounded-lg shadow mb-8 w-full object-cover max-h-96"
          />
          <article className="prose prose-neutral max-w-none">
            {/* Render markdown-like content as HTML */}
            <div
              dangerouslySetInnerHTML={{
                __html: post.content.replace(/\n/g, "<br/>"),
              }}
            />
          </article>
          <div className="mt-8">
            <Link href="/blog" className="text-secondary hover:underline">
              ← Back to Blog
            </Link>
          </div>
          <RelatedPosts currentPostId={post.id} posts={blogPosts} />
        </div>
      </section>
    </main>
  );
};

export default BlogDetail;
