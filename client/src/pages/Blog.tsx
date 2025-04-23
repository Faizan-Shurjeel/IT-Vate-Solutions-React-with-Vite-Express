import BlogCard from "@/components/BlogCard";
import { blogPosts } from "@/lib/data";

const Blog = () => {
  return (
    <main>
      {/* Blog Hero */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Blog</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Latest news, insights, and articles from our engineering team
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {blogPosts.map((post) => (
              <BlogCard
                key={post.id}
                id={post.id}
                title={post.title}
                description={post.description}
                date={post.date}
                image={post.image}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Blog;
