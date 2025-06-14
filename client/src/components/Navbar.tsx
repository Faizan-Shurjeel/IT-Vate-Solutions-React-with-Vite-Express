import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { auth } from "@/utils/firebase";

const Navbar = () => {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, loading } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setIsMenuOpen(false); // Close mobile menu after logout
    } catch (error) {
      console.error("Logout failed", error);
    }
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
          <Link href="/" className="flex items-center">
            <img src="/logo_h_c.png" alt="IT-vate Solutions Logo" className="h-12" />
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
            
            {/* User dropdown for authenticated users */}
            {user && !loading && (
              <li className="relative group">
                <button className="nav-link cursor-pointer hover:text-primary transition-colors flex items-center">
                  {user.displayName || user.email}
                  <svg className="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                <ul className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <li>
                    <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                      {user.email}
                    </div>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            )}

            {/* Login link for non-authenticated users */}
            {!user && !loading && (
              <li>
                <Link
                  href="/register"
                  className="nav-link hover:text-primary transition-colors"
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
