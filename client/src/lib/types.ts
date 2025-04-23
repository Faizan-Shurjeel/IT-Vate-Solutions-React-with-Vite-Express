export interface ExpertiseArea {
  title: string;
  description: string;
  icon: string;
  borderColor: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  title: string;
}

export interface BlogPost {
  id: number;
  title: string;
  description: string;
  date: string;
  image: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
