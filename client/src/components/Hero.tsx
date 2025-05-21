import { Link } from "wouter";
import { Button } from "@/components/ui/button";

interface HeroProps {
  title: string;
  subtitle: string;
  subtitleClassName?: string; // Added prop for subtitle styling
  description: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  primaryButtonClassName?: string; // Added prop for primary button styling
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
}

const Hero = ({
  title,
  subtitle,
  subtitleClassName = "",
  description,
  primaryButtonText,
  primaryButtonLink,
  primaryButtonClassName = "",
  secondaryButtonText,
  secondaryButtonLink,
}: HeroProps) => {
  return (
    <section className="relative bg-primary overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1580584126903-c17d41830450?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
          alt="Circuit board background"
          className="w-full h-full object-cover opacity-20"
        />
      </div>
      <div className="relative container mx-auto px-4 py-24 md:py-32 lg:py-40">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {title}
          </h1>
          <p
            className={`text-2xl md:text-3xl font-medium mb-8 ${subtitleClassName || 'text-secondary'}`}
          >
            {subtitle}
          </p>
          <p className="text-lg text-white/90 mb-10 max-w-2xl">{description}</p>
          <div className="flex flex-wrap gap-4">
            <Link href={primaryButtonLink}>
              <Button
                className={`bg-secondary hover:bg-secondary/90 text-white font-medium px-6 py-3 rounded-md transition-colors shadow-md ${primaryButtonClassName}`}
              >
                {primaryButtonText}
              </Button>
            </Link>
            {secondaryButtonText && secondaryButtonLink && (
              <Link href={secondaryButtonLink}>
                <Button
                  variant="outline"
                  className="bg-white hover:bg-neutral-100 text-primary font-medium px-6 py-3 rounded-md transition-colors shadow-md"
                >
                  {secondaryButtonText}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
