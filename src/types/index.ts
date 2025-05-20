import type { LucideIcon } from 'lucide-react';

export interface Placeholder {
  name: string;
  label: string;
  defaultValue?: string;
  maxLength?: number;
  isTextArea?: boolean; // Optional: Renders as Textarea if true
  isRequired?: boolean; // Optional: Shows a "required" badge
}

export interface PromptTemplate {
  id: string;
  name:string;
  description: string;
  category: string; // e.g., "General", "Writing", "Business"
  template: string;
  placeholders: Placeholder[];
  icon?: LucideIcon;
}
