import { useRoute } from "wouter";
import { blogPosts } from "@/lib/data";
import { Link } from "wouter";

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

  return (
    <main>
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
          <p className="text-lg text-white/80 mb-2">{post.date}</p>
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
        </div>
      </section>
    </main>
  );
};

export default BlogDetail;
