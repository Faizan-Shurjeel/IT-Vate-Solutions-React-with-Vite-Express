import { Building, Home, Award, BookOpen, Code, Recycle } from "lucide-react";

const SustainabilitySection = () => {
  return (
    <section className="py-16 bg-primary-dark text-black">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Sustainability at Our Core
          </h2>
          <p className="text-black/80">
            We’re committed to a sustainable future. Our projects align with the
            UN Sustainable Development Goals (SDGs), driving positive change for
            industry and society.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          <div className="bg-primary/50 rounded-lg p-6 backdrop-blur-sm">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mr-4">
                <Building className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold">
                SDG 9: Industry, Innovation & Infrastructure
              </h3>
            </div>
            <p className="text-black/80">
              We modernize industries with future-ready embedded and IoT
              solutions—fueling innovation and resilient infrastructure.
            </p>
          </div>

          <div className="bg-primary/50 rounded-lg p-6 backdrop-blur-sm">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-black/10 rounded-full flex items-center justify-center mr-4">
                <Home className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold">
                SDG 11: Sustainable Cities & Communities
              </h3>
            </div>
            <p className="text-black/80">
              Our IoT platforms enable smarter, greener cities—boosting energy
              efficiency, safety, and quality of life.
            </p>
          </div>
        </div>

        <div className="mt-16 max-w-3xl mx-auto">
          <h3 className="text-2xl font-semibold text-center mb-8">
            Our Commitment to Community
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-start">
              <Award className="text-secondary w-6 h-6 mt-1 mr-3" />
              <p>
                Empowering underrepresented groups with free and subsidized
                training
              </p>
            </div>
            <div className="flex items-start">
              <BookOpen className="text-secondary w-6 h-6 mt-1 mr-3" />
              <p>Hosting technical workshops at local universities</p>
            </div>
            <div className="flex items-start">
              <Code className="text-secondary w-6 h-6 mt-1 mr-3" />
              <p>Mentoring students and contributing to open-source</p>
            </div>
            <div className="flex items-start">
              <Recycle className="text-secondary w-6 h-6 mt-1 mr-3" />
              <p>Championing eco-friendly electronics design</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SustainabilitySection;
