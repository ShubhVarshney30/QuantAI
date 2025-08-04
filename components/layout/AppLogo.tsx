// src/components/layout/AppLogo.tsx
import { DollarSign } from 'lucide-react'; // Changed icon
import Link from 'next/link';

export default function AppLogo() {
  return (
    <Link href="/" className="flex items-center gap-2 text-xl font-semibold text-primary hover:text-primary/90 transition-colors">
      <DollarSign className="h-10 w-10" /> {/* Changed icon */}
      <span>QuantAI Advisor</span> {/* Changed App Name */}
    </Link>
  );
}
