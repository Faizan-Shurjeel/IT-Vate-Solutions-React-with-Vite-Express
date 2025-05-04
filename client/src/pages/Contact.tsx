import ContactForm from "@/components/ContactForm";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Contact = () => {
  return (
    <main>
      {/* Contact Hero */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Have a project or need guidance? Let's talk.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-neutral-800 mb-4">
              Get In Touch
            </h2>
            <p className="text-neutral-600">
              Ready to collaborate or have a question? Fill out the form below
              and our team will respond promptly.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-10">
            <div className="lg:w-1/2">
              <ContactForm />
            </div>

            <div className="lg:w-1/2">
              <div className="h-64 mb-8 rounded-lg overflow-hidden shadow-md">
                {/* Map embed */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3399.3724032781376!2d74.3679991!3d31.567898!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39191b5c0efa01c1%3A0xaf5588c8e2c1ed1!2sG.T.%20Road%2C%20Lahore%2C%20Pakistan!5e0!3m2!1sen!2sus!4v1650000000000!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="IT-vate Solutions Location"
                ></iframe>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-neutral-50 p-6 rounded-lg shadow-md">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold">Our Location</h3>
                  </div>
                  <p className="text-neutral-600">
                    226-B, Nai Abadi Rehmatpura
                    <br />
                    Near Garrison Garden, G.T. Road
                    <br />
                    Lahore, Punjab 54000, Pakistan
                  </p>
                </div>

                <div className="bg-neutral-50 p-6 rounded-lg shadow-md">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold">Contact Info</h3>
                  </div>
                  <p className="text-neutral-600 mb-2">
                    <span className="font-medium">Email:</span>{" "}
                    <a
                      href="mailto:info@itvatesolutions.com"
                      className="hover:text-primary transition-colors"
                    >
                      info@itvatesolutions.com
                    </a>
                  </p>
                  <p className="text-neutral-600">
                    <span className="font-medium">Phone:</span> +92 303 8411166
                  </p>
                </div>

                {/* <div className="bg-neutral-50 p-6 rounded-lg shadow-md md:col-span-2">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold">Business Hours</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <p className="text-neutral-600">
                      <span className="font-medium">Monday - Friday:</span>
                      <br />
                      9:00 AM - 6:00 PM
                    </p>
                    <p className="text-neutral-600">
                      <span className="font-medium">Saturday:</span>
                      <br />
                      9:00 AM - 1:00 PM
                    </p>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
