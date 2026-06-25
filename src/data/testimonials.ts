export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  avatar?: string;
};

// Add real client testimonials here as they come in.
export const testimonials: Testimonial[] = [];
