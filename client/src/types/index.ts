export interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  projectUrl: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}
