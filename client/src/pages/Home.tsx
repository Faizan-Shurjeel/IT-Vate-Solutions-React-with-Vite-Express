import Hero from "@/components/Hero";
import ExpertiseArea from "@/components/ExpertiseArea";
import SustainabilitySection from "@/components/SustainabilitySection";
//import TestimonialCard from "@/components/TestimonialCard";
import BlogCard from "@/components/BlogCard";
import { Link } from "wouter";
import { expertiseAreas, blogPosts, testimonials } from "@/lib/data";

const Home = () => {
  return (
    <main>
      {/* Hero Section */}
      <Hero
        title="Empowering Innovation in IoT & Embedded Systems"
        subtitle="Engineering Tomorrow, Today"
        description="From concept to deployment, IT-vate Solutions delivers world-class embedded systems and IoT development. We turn ideas into reality with precision, performance, and a passion for excellence."
        primaryButtonText="Discover Our Services"
        primaryButtonLink="/services"
        secondaryButtonText="Let's Connect"
        secondaryButtonLink="/contact"
      />

      {/* Expertise Areas */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-neutral-800 mb-12">
            Our Core Expertise
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {expertiseAreas.map((area, index) => (
              <ExpertiseArea
                key={index}
                title={area.title}
                description={area.description}
                icon={area.icon}
                borderColor={area.borderColor}
              />
            ))}
          </div>
        </div>
      </section>

      {/* About Us Preview */}
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1729008667798-d75368ac1dc5?q=80&w=1486&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="IT-vate Solutions team"
                className="rounded-lg shadow-xl w-full h-auto object-cover max-h-[300px] md:max-h-[500px]"
              />
            </div>

            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-primary mb-6">
                Who We Are
              </h2>
              <p className="text-neutral-700 mb-6">
                Founded in 2022, IT-vate Solutions is a passionate team of
                engineers and innovators. We specialize in embedded systems,
                IoT, and professional training—helping clients worldwide turn
                bold ideas into reality.
              </p>

              <div className="mb-8">
                <h3 className="text-xl font-semibold text-primary-dark mb-3">
                  Our Mission
                </h3>
                <p className="text-neutral-700 mb-4">
                  To empower innovation through precision, performance, and
                  partnership in embedded and IoT solutions.
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold text-primary-dark mb-3">
                  Vision
                </h3>
                <p className="text-neutral-700 mb-4">
                  To be a global leader in embedded systems development and
                  training by delivering reliable and scalable technology.
                </p>
              </div>

              <Link
                href="/about"
                className="inline-block mt-4 text-secondary font-medium hover:text-secondary/80 transition-colors"
              >
                Learn more about us <span className="ml-1">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <SustainabilitySection />

      {/* Testimonials
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-neutral-800 mb-12">
            What Our Clients Say
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                quote={testimonial.quote}
                name={testimonial.name}
                title={testimonial.title}
              />
            ))}
          </div>
        </div>
      </section> */}

      {/* Blog Highlights */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-12">
            <h2 className="text-3xl font-bold text-neutral-800">
              Insights & Updates
            </h2>
            <Link
              href="/blog"
              className="text-secondary hover:text-secondary/80 font-medium transition-colors mt-4 md:mt-0"
            >
              View all articles <span className="ml-1">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(0, 3).map((post) => (
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

export default Home;
