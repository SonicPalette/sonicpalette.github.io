import Link from 'next/link';
import { Logo } from './icons';

export default function Header() {
  return (
    <header className="py-4 fixed top-0 z-50 w-full bg-gradient-to-b from-black/80 to-transparent transition-all">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Logo className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold font-headline text-primary-foreground group-hover:text-primary transition-colors">
            CineLink
          </span>
        </Link>
      </div>
    </header>
  );
}
