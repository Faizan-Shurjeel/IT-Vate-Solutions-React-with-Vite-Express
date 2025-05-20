import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
//import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location]);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About Us" },
    { path: "/services", label: "Services" },
    { path: "/blog", label: "Blog" },
    { path: "/careers", label: "Careers" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 bg-white shadow-md transition-all duration-300 ${
        isScrolled ? "py-2" : "py-4"
      }`}
    >
      <nav className="container mx-auto px-4 flex flex-wrap items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/assets/IT-VATE Logo (Horizontal)  colors.jpg"
              alt="IT-vate Solutions Logo"
              className={`transition-all duration-300 ${
                isScrolled ? "h-8" : "h-10"
              }`}
            />
            <div className="flex items-center">
              <span className="text-2xl font-bold text-primary">IT-vate</span>
              <span className="text-2xl font-medium text-secondary ml-1">
                Solutions
              </span>
            </div>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-neutral-700 hover:text-primary focus:outline-none"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Navigation */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:flex md:items-center w-full md:w-auto mt-4 md:mt-0`}
        >
          <ul className="flex flex-col md:flex-row md:space-x-8 space-y-2 md:space-y-0 font-medium text-neutral-600">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  href={link.path}
                  className={`nav-link hover:text-primary transition-colors ${
                    location === link.path ? "active-nav" : ""
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Button
        <Link href="/contact" className="hidden md:block">
          <Button className="bg-accent hover:bg-accent/90 text-white font-medium px-6 py-2 rounded-md transition-colors shadow-md">
            Get a Quote
          </Button>
        </Link> */}
      </nav>
    </header>
  );
};

export default Navbar;
