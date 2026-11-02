import { Briefcase, FileText, Award, ClipboardList, GraduationCap, Sparkles } from 'lucide-react';

// Lucide icon chosen by service category. Server-component safe.
export function categoryIcon(category) {
  switch (category) {
    case 'Job': return Briefcase;
    case 'Admit Card': return FileText;
    case 'Result': return Award;
    case 'Form': return ClipboardList;
    case 'Scholarship': return GraduationCap;
    default: return Sparkles;
  }
}
export default function ServiceIcon({ category, size = 24 }) {
  const Icon = categoryIcon(category);
  return <Icon size={size} aria-hidden="true" />;
}
