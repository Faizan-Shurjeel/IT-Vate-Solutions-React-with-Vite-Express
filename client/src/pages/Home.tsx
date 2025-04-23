import Hero from "@/components/Hero";
import ExpertiseArea from "@/components/ExpertiseArea";
import SustainabilitySection from "@/components/SustainabilitySection";
import TestimonialCard from "@/components/TestimonialCard";
import BlogCard from "@/components/BlogCard";
import { Link } from "wouter";
import { expertiseAreas, blogPosts, testimonials } from "@/lib/data";

const Home = () => {
  return (
    <main>
      {/* Hero Section */}
      <Hero
        title="Welcome to IT-vate Solutions"
        subtitle="Embedded with Excellence!"
        description="We provide end-to-end electronic and embedded system design solutions. From concept to deployment, we specialize in engineering services that power advanced devices. Our expert team delivers innovation through precision, performance, and reliability."
        primaryButtonText="Explore Our Services"
        primaryButtonLink="/services"
        secondaryButtonText="Contact Us"
        secondaryButtonLink="/contact"
      />

      {/* Expertise Areas */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-neutral-800 mb-12">Explore Our Expertise</h2>
          
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
                src="https://images.unsplash.com/photo-1581092921461-39b079cc8d77?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="IT-vate Solutions team" 
                className="rounded-lg shadow-xl w-full h-auto object-cover"
                style={{ maxHeight: "500px" }}
              />
            </div>
            
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-primary mb-6">Who We Are</h2>
              <p className="text-neutral-700 mb-6">
                Established in 2022 in Lahore, Pakistan, IT-vate Solutions is a specialized engineering firm
                offering embedded systems, IoT development, and professional training services. Our goal
                is to transform ideas into cutting-edge products with a focus on innovation, quality, and
                efficiency.
              </p>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-primary-dark mb-3">Our Mission</h3>
                <p className="text-neutral-700 mb-4">
                  To empower innovation through precision, performance, and partnership in embedded and
                  IoT solutions.
                </p>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-primary-dark mb-3">Vision</h3>
                <p className="text-neutral-700 mb-4">
                  To be a global leader in embedded systems development and training by delivering reliable
                  and scalable technology.
                </p>
              </div>
              
              <Link href="/about" className="inline-block mt-4 text-secondary font-medium hover:text-secondary/80 transition-colors">
                Learn more about us <span className="ml-1">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <SustainabilitySection />

      {/* Testimonials */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-neutral-800 mb-12">Client Testimonials</h2>
          
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
      </section>

      {/* Blog Highlights */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-12">
            <h2 className="text-3xl font-bold text-neutral-800">Latest Articles</h2>
            <Link href="/blog" className="text-secondary hover:text-secondary/80 font-medium transition-colors mt-4 md:mt-0">
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
