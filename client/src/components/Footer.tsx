import { Link } from "wouter";
import { Facebook, Twitter, Linkedin, Instagram, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-800 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center mb-6">
              <span className="text-2xl font-bold text-white">IT-vate</span>
              <span className="text-2xl font-medium text-secondary ml-1">
                Solutions
              </span>
            </div>
            <p className="text-neutral-400 mb-6">
              We provide end-to-end electronic and embedded system design
              solutions. From concept to deployment, we specialize in
              engineering services that power advanced devices.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/company/itvate/"
                className="w-10 h-10 rounded-full bg-neutral-700 flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} className="text-white" />
              </a>
              {/* <a
                href="https://twitter.com"
                className="w-10 h-10 rounded-full bg-neutral-700 flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} className="text-white" />
              </a> */}
              <a
                href="https://www.facebook.com/share/1ATMcbX2MK/?mibextid=qi2Omg"
                className="w-10 h-10 rounded-full bg-neutral-700 flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} className="text-white" />
              </a>
              <a
                href="https://wa.me/923038411166"
                className="w-10 h-10 rounded-full bg-neutral-700 flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="WhatsApp"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  className="text-white"
                  fill="currentColor"
                >
                  <path d="M 12.011719 2 C 6.5057187 2 2.0234844 6.478375 2.0214844 11.984375 C 2.0204844 13.744375 2.4814687 15.462563 3.3554688 16.976562 L 2 22 L 7.2324219 20.763672 C 8.6914219 21.559672 10.333859 21.977516 12.005859 21.978516 L 12.009766 21.978516 C 17.514766 21.978516 21.995047 17.499141 21.998047 11.994141 C 22.000047 9.3251406 20.962172 6.8157344 19.076172 4.9277344 C 17.190172 3.0407344 14.683719 2.001 12.011719 2 z M 12.009766 4 C 14.145766 4.001 16.153109 4.8337969 17.662109 6.3417969 C 19.171109 7.8517969 20.000047 9.8581875 19.998047 11.992188 C 19.996047 16.396187 16.413812 19.978516 12.007812 19.978516 C 10.674812 19.977516 9.3544062 19.642812 8.1914062 19.007812 L 7.5175781 18.640625 L 6.7734375 18.816406 L 4.8046875 19.28125 L 5.2851562 17.496094 L 5.5019531 16.695312 L 5.0878906 15.976562 C 4.3898906 14.768562 4.0204844 13.387375 4.0214844 11.984375 C 4.0234844 7.582375 7.6067656 4 12.009766 4 z M 8.4765625 7.375 C 8.3095625 7.375 8.0395469 7.4375 7.8105469 7.6875 C 7.5815469 7.9365 6.9355469 8.5395781 6.9355469 9.7675781 C 6.9355469 10.995578 7.8300781 12.182609 7.9550781 12.349609 C 8.0790781 12.515609 9.68175 15.115234 12.21875 16.115234 C 14.32675 16.946234 14.754891 16.782234 15.212891 16.740234 C 15.670891 16.699234 16.690438 16.137687 16.898438 15.554688 C 17.106437 14.971687 17.106922 14.470187 17.044922 14.367188 C 16.982922 14.263188 16.816406 14.201172 16.566406 14.076172 C 16.317406 13.951172 15.090328 13.348625 14.861328 13.265625 C 14.632328 13.182625 14.464828 13.140625 14.298828 13.390625 C 14.132828 13.640625 13.655766 14.201187 13.509766 14.367188 C 13.363766 14.534188 13.21875 14.556641 12.96875 14.431641 C 12.71875 14.305641 11.914938 14.041406 10.960938 13.191406 C 10.218937 12.530406 9.7182656 11.714844 9.5722656 11.464844 C 9.4272656 11.215844 9.5585938 11.079078 9.6835938 10.955078 C 9.7955938 10.843078 9.9316406 10.663578 10.056641 10.517578 C 10.180641 10.371578 10.223641 10.267562 10.306641 10.101562 C 10.389641 9.9355625 10.347156 9.7890625 10.285156 9.6640625 C 10.223156 9.5390625 9.737625 8.3065 9.515625 7.8125 C 9.328625 7.3975 9.131125 7.3878594 8.953125 7.3808594 C 8.808125 7.3748594 8.6425625 7.375 8.4765625 7.375 z"></path>
                </svg>
              </a>
              {/* <a
                href="https://instagram.com"
                className="w-10 h-10 rounded-full bg-neutral-700 flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} className="text-white" />
              </a> */}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-neutral-400 hover:text-secondary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-neutral-400 hover:text-secondary transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-neutral-400 hover:text-secondary transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-neutral-400 hover:text-secondary transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-neutral-400 hover:text-secondary transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-neutral-400 hover:text-secondary transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/services"
                  className="text-neutral-400 hover:text-secondary transition-colors"
                >
                  Embedded Systems Development
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-neutral-400 hover:text-secondary transition-colors"
                >
                  IoT Development
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-neutral-400 hover:text-secondary transition-colors"
                >
                  Consultancy Services
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-neutral-400 hover:text-secondary transition-colors"
                >
                  Training {/*  & Certification */}
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-neutral-400 hover:text-secondary transition-colors"
                >
                  PCB Design
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-neutral-400 hover:text-secondary transition-colors"
                >
                  Firmware Development
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Newsletter</h3>
            <p className="text-neutral-400 mb-4">
              Get the latest news, insights, and opportunities—straight to your
              inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-neutral-700 text-white placeholder-neutral-500 px-4 py-2 rounded-md focus:ring-2 focus:ring-secondary focus:outline-none flex-grow"
              />
              <Button
                type="submit"
                className="bg-secondary hover:bg-secondary/80 text-white font-medium px-4 py-2 rounded-md transition-colors flex items-center gap-2"
              >
                <Send size={16} />
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-neutral-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-neutral-500 mb-4 md:mb-0">
              &copy; {currentYear} IT-vate Solutions. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-neutral-500 hover:text-neutral-300 transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-neutral-500 hover:text-neutral-300 transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-neutral-500 hover:text-neutral-300 transition-colors"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
