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
              Established in 2022 in Lahore, Pakistan, IT-vate Solutions is a
              specialized engineering firm offering embedded systems, IoT
              development, and professional training services. Our goal is to
              transform ideas into cutting-edge products with a focus on
              innovation, quality, and efficiency.
            </p>
            <p className="text-lg text-neutral-700 mb-8">
              We proudly work with clients around the world, delivering
              globally-focused engineering solutions tailored to diverse market
              needs.
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
                  We strive to be the catalyst that transforms technological
                  ideas into reality, providing solutions that not only meet
                  current demands but anticipate future needs.
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
                  We envision a world where our embedded systems and IoT
                  solutions contribute to smarter, more efficient, and
                  sustainable technologies across industries.
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
              Core Values
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
                  We believe in honest communication and ethical business
                  practices. Our clients receive clear information about project
                  timelines, costs, and potential challenges.
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
                  We are committed to the highest standards of engineering
                  quality. Every line of code, every circuit design, and every
                  component is selected with precision and purpose.
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
                  We work closely with our clients, understanding their needs
                  and combining their industry expertise with our technical
                  knowledge to create meaningful solutions.
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
                  We believe in sharing knowledge and building capabilities. Our
                  training programs aim to empower individuals and organizations
                  with practical skills and confidence.
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
