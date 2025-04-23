import { BlogPost, ExpertiseArea, Testimonial } from "./types";

export const expertiseAreas: ExpertiseArea[] = [
  {
    title: "Embedded Systems Development",
    description: "Custom hardware and firmware solutions for specialized applications.",
    icon: "cpu",
    borderColor: "border-primary"
  },
  {
    title: "IoT Development",
    description: "Connected device solutions with cloud integration and remote monitoring.",
    icon: "wifi",
    borderColor: "border-secondary"
  },
  {
    title: "Consultancy",
    description: "Expert technical guidance for your embedded and IoT projects.",
    icon: "briefcase",
    borderColor: "border-accent"
  },
  {
    title: "Training & Certification",
    description: "Comprehensive industry-focused courses and certification programs.",
    icon: "graduation-cap",
    borderColor: "border-primary-dark"
  }
];

export const testimonials: Testimonial[] = [
  {
    quote: "Their PCB design exceeded our expectations and was delivered ahead of time.",
    name: "Ammar Raza",
    title: "Founder, TechStart"
  },
  {
    quote: "The IoT solution they built has transformed our operations. Great team!",
    name: "Dr. Sara Mehmood",
    title: "Operations Head, SmartAgro"
  }
];

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Why PCB Design Is the Heart of Your Product",
    description: "Learn why professional PCB design is crucial for product performance, reliability, and manufacturing success.",
    date: "June 15, 2023",
    image: "https://images.unsplash.com/photo-1563770557718-501b19240773?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    id: 2,
    title: "Choosing the Right Microcontroller for Your Application",
    description: "A comprehensive guide to selecting the optimal microcontroller based on your project requirements.",
    date: "May 22, 2023",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    id: 3,
    title: "IoT vs. Embedded: Understanding the Difference",
    description: "Clarifying the distinctions between IoT and traditional embedded systems for better project planning.",
    date: "April 10, 2023",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    id: 4,
    title: "The Future of FPGA Development",
    description: "Exploring how FPGAs are evolving and their growing importance in modern embedded systems.",
    date: "March 5, 2023",
    image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    id: 5,
    title: "Implementing Secure Communication in IoT Devices",
    description: "Best practices for ensuring your IoT devices communicate securely with cloud services.",
    date: "February 15, 2023",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    id: 6,
    title: "Power Management Techniques for Battery-Operated Devices",
    description: "Strategies to extend battery life and optimize power consumption in portable devices.",
    date: "January 20, 2023",
    image: "https://images.unsplash.com/photo-1526045612212-70caf35c14df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  }
];
