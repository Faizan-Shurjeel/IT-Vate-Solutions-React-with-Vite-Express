import { Button } from "@/components/ui/button";
import { MailIcon, Bell } from "lucide-react";

const Careers = () => {
  return (
    <main>
      {/* Careers Hero */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Careers</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Join our team of innovative engineers and problem solvers
          </p>
        </div>
      </section>

      {/* Current Openings */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-neutral-800 mb-6">
              Current Openings
            </h2>
            <p className="text-neutral-600 mb-8">
              We are currently not hiring, but we are always on the lookout for
              passionate professionals. Stay tuned for future openings.
            </p>
            <div className="bg-neutral-50 p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">
                Join Our Talent Pool
              </h3>
              <p className="text-neutral-600 mb-6">
                Send your CV to:{" "}
                <a
                  href="mailto:careers@itvatesolutions.com"
                  className="text-secondary hover:text-secondary/80"
                >
                  careers@itvatesolutions.com
                </a>
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="mailto:careers@itvatesolutions.com">
                  <Button className="bg-primary hover:bg-primary/90 text-white font-medium px-6 py-2 rounded-md transition-colors shadow-md">
                    <MailIcon size={18} className="mr-2" />
                    Send Your CV
                  </Button>
                </a>
                <Button
                  variant="outline"
                  className="bg-white hover:bg-neutral-100 text-primary border border-primary font-medium px-6 py-2 rounded-md transition-colors shadow-sm"
                >
                  <Bell size={18} className="mr-2" />
                  Notify Me of Openings
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-neutral-800 mb-12">
            Why Join IT-vate Solutions?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
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
                  className="w-8 h-8 text-primary"
                >
                  <path d="m18 16 4-4-4-4"></path>
                  <path d="m6 8-4 4 4 4"></path>
                  <path d="m14.5 4-5 16"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Challenging Projects
              </h3>
              <p className="text-neutral-600">
                Work on cutting-edge embedded systems and IoT projects that
                solve real-world problems.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
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
                  className="w-8 h-8 text-primary"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M16 12a4 4 0 0 1-8 0"></path>
                  <path d="M12 16v-4"></path>
                  <path d="M12 8h.01"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Continuous Learning
              </h3>
              <p className="text-neutral-600">
                Access to training resources, workshops, and opportunities to
                enhance your technical skills.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
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
                  className="w-8 h-8 text-primary"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Collaborative Culture
              </h3>
              <p className="text-neutral-600">
                Join a team of passionate professionals who collaborate,
                innovate, and support each other.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Careers;
