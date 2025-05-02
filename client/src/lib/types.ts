export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export interface Testimonial {
  id: number;
  name: string;
  title: string;
  rating: number;
  content: string;
  image: string;
}

export interface ServicePlan {
  id: number;
  name: string;
  description: string;
  price: number;
  interval: string;
  features: string[];
  popular: boolean;
  buttonText: string;
}
