export interface Job {
  id: string;
  title: string;
  company: string;
  href: string;
  location: string;
  priority?: number;
  description?: string;
}
