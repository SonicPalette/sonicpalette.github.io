import Link from 'next/link';
import { Logo } from './icons';

export default function Header() {
  return (
    <header className="py-4 border-b border-white/10 sticky top-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Logo className="h-8 w-8 text-primary group-hover:animate-pulse" />
          <span className="text-2xl font-bold font-headline text-primary-foreground group-hover:text-primary transition-colors">
            CineLink
          </span>
        </Link>
      </div>
    </header>
  );
}
