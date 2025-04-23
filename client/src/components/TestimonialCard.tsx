import { User } from "lucide-react";

interface TestimonialCardProps {
  quote: string;
  name: string;
  title: string;
}

const TestimonialCard = ({ quote, name, title }: TestimonialCardProps) => {
  return (
    <div className="testimonial-card bg-white p-6 rounded-lg relative">
      <div className="text-accent text-5xl absolute -top-4 -left-2 opacity-20">"</div>
      <p className="text-neutral-700 mb-6 relative z-10">{quote}</p>
      <div className="flex items-center">
        <div className="w-12 h-12 rounded-full bg-neutral-200 flex items-center justify-center mr-4">
          <User className="text-neutral-500 w-6 h-6" />
        </div>
        <div>
          <h4 className="font-semibold">{name}</h4>
          <p className="text-sm text-neutral-500">{title}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
