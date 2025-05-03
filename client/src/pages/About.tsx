import { CheckCircle } from "lucide-react";
import SustainabilitySection from "@/components/SustainabilitySection";

const About = () => {
  return (
    <main>
      {/* About Hero */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About IT-vate Solutions
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Learn about our mission, values, and the team behind our innovation.
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-primary mb-8">Who We Are</h2>
            <p className="text-lg text-neutral-700 mb-8">
              Founded in 2022, IT-vate Solutions is a passionate team of
              engineers and innovators. We specialize in embedded systems, IoT,
              and professional training—helping clients worldwide turn bold
              ideas into reality.
            </p>
            <p className="text-lg text-neutral-700 mb-8">
              Our solutions are trusted by startups and enterprises alike,
              tailored to diverse markets and future-ready needs.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
              <div>
                <h3 className="text-2xl font-semibold text-primary-dark mb-6">
                  Our Mission
                </h3>
                <p className="text-neutral-700 mb-6">
                  To empower innovation through precision, performance, and
                  partnership in embedded and IoT solutions.
                </p>
                <p className="text-neutral-700">
                  We’re committed to being the spark that transforms challenges
                  into opportunities and ideas into impact.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-primary-dark mb-6">
                  Vision
                </h3>
                <p className="text-neutral-700 mb-6">
                  To be a global leader in embedded systems development and
                  training by delivering reliable and scalable technology.
                </p>
                <p className="text-neutral-700">
                  We envision a world where technology uplifts industries,
                  communities, and the environment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-primary mb-12">
              Our Core Values
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <CheckCircle className="text-accent w-6 h-6 mr-3" />
                  <h3 className="text-xl font-semibold">
                    Integrity & Transparency
                  </h3>
                </div>
                <p className="text-neutral-700">
                  We build trust through open communication and ethical
                  practices—ensuring clarity at every step.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <CheckCircle className="text-accent w-6 h-6 mr-3" />
                  <h3 className="text-xl font-semibold">
                    Excellence in Engineering
                  </h3>
                </div>
                <p className="text-neutral-700">
                  We set the bar high—delivering quality, precision, and
                  reliability in every design and solution.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <CheckCircle className="text-accent w-6 h-6 mr-3" />
                  <h3 className="text-xl font-semibold">
                    Collaborative Innovation
                  </h3>
                </div>
                <p className="text-neutral-700">
                  We co-create with our clients—combining expertise to solve
                  real-world problems and unlock new possibilities.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <CheckCircle className="text-accent w-6 h-6 mr-3" />
                  <h3 className="text-xl font-semibold">
                    Empowerment through Training
                  </h3>
                </div>
                <p className="text-neutral-700">
                  We share knowledge generously—helping individuals and
                  organizations grow with confidence and skill.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <SustainabilitySection />
    </main>
  );
};

export default About;
