'use client';

import { getSearchSuggestions } from '@/ai/flows/search-suggestions';
import type { Movie } from '@/lib/types';
import { Loader2, SearchIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState, useTransition } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';

export default function Search({ allMovies }: { allMovies: Movie[] }) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Movie[]>([]);
  const [isAiLoading, startAiTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (suggestions.length > 0) {
      router.push(`/movie/${suggestions[0].id}`);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    const getSuggestions = async () => {
      startAiTransition(async () => {
        try {
          const suggestedTitles = await getSearchSuggestions({ query });
          const fullSuggestions = suggestedTitles
            .map(title =>
              allMovies.find(
                movie => movie.title.toLowerCase() === title.toLowerCase()
              )
            )
            .filter((movie): movie is Movie => movie !== undefined);
          setSuggestions(fullSuggestions);
          setIsOpen(fullSuggestions.length > 0);
        } catch (error) {
          console.error('Failed to get search suggestions:', error);
          setSuggestions([]);
          setIsOpen(false);
        }
      });
    };

    const debounceTimeout = setTimeout(getSuggestions, 300);
    return () => clearTimeout(debounceTimeout);
  }, [query, allMovies]);

  return (
    <div className="relative" ref={containerRef}>
      <form onSubmit={handleSearch}>
        <div className="relative">
          <Input
            type="search"
            placeholder="Search for a movie like 'Inception'..."
            className="w-full pl-10 pr-4 py-6 text-lg bg-card border-2 border-transparent focus:border-primary focus:bg-background transition-all"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onFocus={() => query.length > 1 && setIsOpen(true)}
          />
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          {isAiLoading && (
            <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground animate-spin" />
          )}
        </div>
      </form>
      {isOpen && (
        <Card className="absolute top-full mt-2 w-full z-10 shadow-2xl animate-fade-in-up">
          <CardContent className="p-2">
            {suggestions.length > 0 ? (
              <ul className="space-y-1">
                {suggestions.map(movie => (
                  <li key={movie.id}>
                    <Button
                      asChild
                      variant="ghost"
                      className="w-full justify-start h-auto py-2 px-3"
                    >
                      <Link
                        href={`/movie/${movie.id}`}
                        onClick={() => setIsOpen(false)}
                      >
                        <p className="font-medium">{movie.title}</p>
                      </Link>
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="p-4 text-center text-sm text-muted-foreground">
                No suggestions found.
              </p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
