import { useEffect } from "react";
import { useLocation } from "wouter";

interface PageTitleProps {
  title: string;
  description?: string;
}

const PageTitle = ({ title, description }: PageTitleProps) => {
  const [location] = useLocation();

  useEffect(() => {
    // Update document title
    const siteName = "IT-vate Solutions";
    document.title = `${title} | ${siteName}`;

    // Update meta description if provided
    if (description) {
      const metaDescription = document.querySelector(
        'meta[name="description"]'
      );
      if (metaDescription) {
        metaDescription.setAttribute("content", description);
      }
    }
  }, [title, description, location]);

  // This component doesn't render anything
  return null;
};

export default PageTitle;
