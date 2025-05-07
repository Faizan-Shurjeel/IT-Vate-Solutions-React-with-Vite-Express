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
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3399.3724032781376!2d74.3679991!3d31.567898!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39191b5c0efa01c1%3A0xaf5588c8e2c1ed1!2sJubilee%20Town%20Housing%20Scheme%2C%20Lahore%2C%20Pakistan!5e0!3m2!1sen!2sus!4v1650000000000!5m2!1sen!2sus"
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
                    MZ-20, Future Tower, Main Boulevard
                    <br />
                    Jubilee Town Housing Scheme
                    <br />
                    Lahore, Pakistan
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
                  <p className="text-neutral-600 mb-4">
                    <span className="font-medium">Phone:</span> +92 303 8411166
                  </p>
                  <a
                    href="https://wa.me/923038411166"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-2 rounded-md transition-colors shadow-md"
                  >
                    <svg
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12.004 2.003c-5.523 0-10 4.477-10 10 0 1.768.464 3.497 1.344 5.012l-1.409 5.164a1 1 0 0 0 1.213 1.213l5.164-1.409A9.956 9.956 0 0 0 12.004 22c5.523 0 10-4.477 10-10s-4.477-9.997-10-9.997zm0 18.001a7.963 7.963 0 0 1-4.09-1.153l-.292-.172-3.07.837.837-3.07-.172-.292A7.963 7.963 0 0 1 4.003 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8.004-8 8.004zm4.406-5.845c-.242-.121-1.432-.707-1.653-.788-.221-.081-.382-.121-.543.121-.161.242-.623.788-.763.95-.141.161-.282.181-.523.06-.242-.121-1.022-.377-1.947-1.202-.72-.642-1.207-1.433-1.35-1.675-.141-.242-.015-.373.106-.494.109-.108.242-.282.363-.423.121-.141.161-.242.242-.403.081-.161.04-.302-.02-.423-.06-.121-.543-1.312-.744-1.797-.196-.471-.396-.406-.543-.413l-.463-.008c-.161 0-.423.06-.646.282-.221.221-.846.827-.846 2.017 0 1.19.866 2.341.987 2.502.121.161 1.705 2.604 4.137 3.547.579.199 1.029.318 1.38.407.579.147 1.106.126 1.522.077.464-.055 1.432-.584 1.635-1.148.202-.564.202-1.048.141-1.148-.06-.101-.221-.161-.463-.282z" />
                    </svg>
                    Chat on WhatsApp
                  </a>
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
