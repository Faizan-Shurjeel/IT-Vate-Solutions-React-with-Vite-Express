import { BlogPost } from "@/lib/data";
import BlogCard from "./BlogCard";

interface RelatedPostsProps {
  currentPostId: number;
  posts: BlogPost[];
  maxPosts?: number;
}

const RelatedPosts = ({
  currentPostId,
  posts,
  maxPosts = 2,
}: RelatedPostsProps) => {
  // Filter out current post and get random posts
  const otherPosts = posts.filter((post) => post.id !== currentPostId);
  const shuffled = [...otherPosts].sort(() => 0.5 - Math.random());
  const relatedPosts = shuffled.slice(0, maxPosts);

  if (relatedPosts.length === 0) return null;

  return (
    <div className="py-12 border-t border-neutral-200 mt-12">
      <h3 className="text-2xl font-bold mb-8">You Might Also Like</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {relatedPosts.map((post) => (
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
  );
};

export default RelatedPosts;
