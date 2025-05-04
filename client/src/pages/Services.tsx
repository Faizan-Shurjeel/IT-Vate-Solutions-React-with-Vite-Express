import ServiceCard from "@/components/ServiceCard";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const Services = () => {
  return (
    <main>
      {/* Service Hero */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Comprehensive engineering solutions to meet your technical needs
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-neutral-800 mb-4">
              What We Offer
            </h2>
            <p className="text-neutral-600">
              Unlock your potential with our full-spectrum engineering
              services—from embedded design to IoT innovation and hands-on
              training.
            </p>
          </div>

          <div className="space-y-16">
            {/* Embedded Systems Development */}
            <ServiceCard
              title="Embedded Systems Development"
              description="We craft custom embedded solutions that power tomorrow’s devices—combining robust hardware, smart firmware, and seamless integration for maximum performance."
              features={[
                "Schematic Design",
                "PCB Design",
                "Microcontroller Integration",
                "FPGA Development",
                "Firmware Development",
                "System Testing & Validation",
              ]}
              buttonText="Request a Consultation"
              buttonLink="/contact"
              imageSrc="https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              imageAlt="Embedded systems development"
            />

            {/* IoT Development */}
            <ServiceCard
              title="IoT Development"
              description="Connect, automate, and scale with our IoT expertise. We deliver secure, cloud-ready systems that turn data into actionable insights and drive efficiency."
              features={[
                "IoT Hardware Design",
                "Sensor Integration",
                "Connectivity (WiFi, BLE, LoRa, Zigbee)",
                "Cloud Integration (MQTT, HTTP, APIs)",
                "Dashboard & App Integration",
                "Remote Monitoring Systems",
              ]}
              buttonText="Discuss Your IoT Project"
              buttonLink="/contact"
              imageSrc="https://images.unsplash.com/photo-1600132806370-bf17e65e942f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              imageAlt="IoT Development"
              reversed={true}
            />

            {/* Consultancy & Training */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Consultancy */}
              <div className="bg-neutral-50 rounded-lg p-8 shadow-md">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 text-primary"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1-2 2z"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4">
                  Consultancy Services
                </h3>
                <p className="text-neutral-700 mb-6">
                  Overcome technical roadblocks with our expert guidance. We
                  help you de-risk projects, optimize designs, and accelerate
                  time-to-market.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <CheckCircle2 className="text-secondary mr-2 w-5 h-5" />
                    <span>Embedded System Architecture Review</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="text-secondary mr-2 w-5 h-5" />
                    <span>Design Optimization & Debugging</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="text-secondary mr-2 w-5 h-5" />
                    <span>IoT Project Feasibility Studies</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="text-secondary mr-2 w-5 h-5" />
                    <span>Product Prototyping Advice</span>
                  </li>
                </ul>
                <Link href="/contact">
                  <Button className="bg-primary hover:bg-primary/90 text-white font-medium px-6 py-2 rounded-md transition-colors shadow-md">
                    Book a Consultation
                  </Button>
                </Link>
              </div>

              {/* Training */}
              <div className="bg-neutral-50 rounded-lg p-8 shadow-md">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 text-primary"
                  >
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                    <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4">
                  Training{/*  & Certification */}
                </h3>
                <p className="text-neutral-700 mb-6">
                  Gain real-world skills with our immersive, industry-focused
                  programs—designed for students and professionals ready to
                  lead.
                </p>
                <h4 className="text-lg font-semibold mb-3">
                  PCB Designer Programme{/* Certified  */}
                </h4>
                <p className="text-neutral-700 mb-4">
                  Master PCB design in three progressive levels—each with
                  hands-on projects.{/*  and a recognized certificate. */}
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <CheckCircle2 className="text-secondary mt-1 mr-2 w-5 h-5" />
                    <div>
                      <span className="font-medium">Level 1: Foundation</span>
                      <p className="text-sm text-neutral-600">
                        Electronics basics, schematic capture, and PCB layout
                        essentials.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="text-secondary mt-1 mr-2 w-5 h-5" />
                    <div>
                      <span className="font-medium">Level 2: Intermediate</span>
                      <p className="text-sm text-neutral-600">
                        Multi-layer design, signal integrity, and design for
                        manufacturing.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="text-secondary mt-1 mr-2 w-5 h-5" />
                    <div>
                      <span className="font-medium">Level 3: Advanced</span>
                      <p className="text-sm text-neutral-600">
                        High-speed routing, EMI/EMC compliance, and an industry
                        project.
                      </p>
                    </div>
                  </li>
                </ul>
                <Link href="/contact">
                  <Button className="bg-primary hover:bg-primary/90 text-white font-medium px-6 py-2 rounded-md transition-colors shadow-md">
                    Enroll Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Services;
