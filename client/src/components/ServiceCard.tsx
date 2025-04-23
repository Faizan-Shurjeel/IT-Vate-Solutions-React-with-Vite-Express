import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

interface ServiceCardProps {
  title: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonLink: string;
  imageSrc: string;
  imageAlt: string;
  reversed?: boolean;
}

const ServiceCard = ({
  title,
  description,
  features,
  buttonText,
  buttonLink,
  imageSrc,
  imageAlt,
  reversed = false,
}: ServiceCardProps) => {
  return (
    <div className={`flex flex-col lg:flex-row gap-10 items-center ${reversed ? 'lg:flex-row-reverse' : ''}`}>
      <div className={`lg:w-1/2 ${reversed ? 'order-2 lg:order-2' : 'order-2 lg:order-1'}`}>
        <h3 className="text-2xl font-bold text-primary mb-4">{title}</h3>
        <p className="text-neutral-700 mb-6">{description}</p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <CheckCircle2 className="text-secondary mr-2 w-5 h-5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <Link href={buttonLink}>
          <Button className="bg-primary hover:bg-primary/90 text-white font-medium px-6 py-2 rounded-md transition-colors shadow-md">
            {buttonText}
          </Button>
        </Link>
      </div>
      <div className={`lg:w-1/2 ${reversed ? 'order-1 lg:order-1' : 'order-1 lg:order-2'}`}>
        <img 
          src={imageSrc}
          alt={imageAlt}
          className="rounded-lg shadow-lg w-full h-auto"
        />
      </div>
    </div>
  );
};

export default ServiceCard;
