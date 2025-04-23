import { Link } from "wouter";

interface BlogCardProps {
  id: number;
  title: string;
  description: string;
  date: string;
  image: string;
}

const BlogCard = ({ id, title, description, date, image }: BlogCardProps) => {
  return (
    <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-3 hover:text-primary transition-colors">
          <Link href={`/blog/${id}`}>{title}</Link>
        </h3>
        <p className="text-neutral-600 mb-4">
          {description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-neutral-500">{date}</span>
          <Link href={`/blog/${id}`} className="text-secondary hover:text-secondary/80 font-medium text-sm transition-colors">
            Read more
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
