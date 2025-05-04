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
