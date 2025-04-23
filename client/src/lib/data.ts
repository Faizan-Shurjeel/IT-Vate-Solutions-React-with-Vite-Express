import { BlogPost, ExpertiseArea, Testimonial } from "./types";

export const expertiseAreas: ExpertiseArea[] = [
  {
    title: "Embedded Systems Development",
    description: "Robust hardware and firmware for next-generation products.",
    icon: "cpu",
    borderColor: "border-primary",
  },
  {
    title: "IoT Development",
    description: "Smart, connected solutions for a data-driven world.",
    icon: "wifi",
    borderColor: "border-secondary",
  },
  {
    title: "Consultancy",
    description: "Expert advice to accelerate your innovation journey.",
    icon: "briefcase",
    borderColor: "border-accent",
  },
  {
    title: "Training & Certification",
    description: "Industry-leading courses to empower future engineers.",
    icon: "graduation-cap",
    borderColor: "border-primary-dark",
  },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "IT-vate’s PCB design expertise took our product to the next level—delivered ahead of schedule and beyond expectations.",
    name: "Ammar Raza",
    title: "Founder, TechStart",
  },
  {
    quote:
      "Their IoT platform transformed our operations—seamless integration and outstanding support.",
    name: "Dr. Sara Mehmood",
    title: "Operations Head, SmartAgro",
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Why PCB Design Is the Heart of Your Product",
    description:
      "Learn why professional PCB design is crucial for product performance, reliability, and manufacturing success.",
    date: "June 15, 2023",
    image:
      "https://images.unsplash.com/photo-1662528600042-f28b7a9e4c75?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    title: "Choosing the Right Microcontroller for Your Application",
    description:
      "A comprehensive guide to selecting the optimal microcontroller based on your project requirements.",
    date: "May 22, 2023",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
  {
    id: 3,
    title: "IoT vs. Embedded: Understanding the Difference",
    description:
      "Clarifying the distinctions between IoT and traditional embedded systems for better project planning.",
    date: "April 10, 2023",
    image:
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
  {
    id: 4,
    title: "The Future of FPGA Development",
    description:
      "Exploring how FPGAs are evolving and their growing importance in modern embedded systems.",
    date: "March 5, 2023",
    image:
      "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
  {
    id: 5,
    title: "Implementing Secure Communication in IoT Devices",
    description:
      "Best practices for ensuring your IoT devices communicate securely with cloud services.",
    date: "February 15, 2023",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
  {
    id: 6,
    title: "Power Management Techniques for Battery-Operated Devices",
    description:
      "Strategies to extend battery life and optimize power consumption in portable devices.",
    date: "January 20, 2023",
    image:
      "https://images.unsplash.com/photo-1526045612212-70caf35c14df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
];
