import { Building, Home, Award, BookOpen, Code, Recycle } from "lucide-react";

const SustainabilitySection = () => {
  return (
    <section className="py-16 bg-primary-dark text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Sustainability Focus</h2>
          <p className="text-white/80">
            At IT-vate Solutions, we believe in building a sustainable technological future. Our work
            aligns with the United Nations Sustainable Development Goals (SDGs).
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          <div className="bg-primary/50 rounded-lg p-6 backdrop-blur-sm">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mr-4">
                <Building className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold">SDG 9 – Industry, Innovation and Infrastructure</h3>
            </div>
            <p className="text-white/80">
              We foster innovation through robust, future-ready embedded systems and IoT technologies
              that help modernize industries and create smarter infrastructure.
            </p>
          </div>
          
          <div className="bg-primary/50 rounded-lg p-6 backdrop-blur-sm">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mr-4">
                <Home className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold">SDG 11 – Sustainable Cities and Communities</h3>
            </div>
            <p className="text-white/80">
              Our IoT solutions contribute to more sustainable urban environments—enabling energy
              efficiency, smart monitoring, and improved quality of life.
            </p>
          </div>
        </div>
        
        <div className="mt-16 max-w-3xl mx-auto">
          <h3 className="text-2xl font-semibold text-center mb-8">Corporate Social Responsibility</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-start">
              <Award className="text-secondary w-6 h-6 mt-1 mr-3" />
              <p>Free and subsidized training for underrepresented groups</p>
            </div>
            <div className="flex items-start">
              <BookOpen className="text-secondary w-6 h-6 mt-1 mr-3" />
              <p>Technical workshops in local universities</p>
            </div>
            <div className="flex items-start">
              <Code className="text-secondary w-6 h-6 mt-1 mr-3" />
              <p>Open-source contributions and student mentorships</p>
            </div>
            <div className="flex items-start">
              <Recycle className="text-secondary w-6 h-6 mt-1 mr-3" />
              <p>Supporting eco-friendly electronics design practices</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SustainabilitySection;
