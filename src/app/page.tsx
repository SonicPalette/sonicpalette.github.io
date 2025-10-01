import Header from '@/components/header';
import MovieList from '@/components/movie-list';
import Search from '@/components/search';
import { getMovies } from '@/lib/data';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { getMovieById } from '@/lib/data';

export default async function Home() {
  const movies = await getMovies();
  const heroMovie = await getMovieById('movie-1');

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {heroMovie && (
          <div className="relative h-[60vh] md:h-[80vh] w-full">
            <div className="absolute inset-0">
              <Image
                src={heroMovie.thumbnailUrl}
                alt={`Poster for ${heroMovie.title}`}
                fill
                className="object-cover"
                data-ai-hint={heroMovie.imageHint}
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent" />
            </div>
            <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center md:w-1/2">
              <h1 className="text-4xl md:text-6xl font-bold font-headline mb-4 text-white animate-fade-in-down">
                {heroMovie.title}
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-xl">
                A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.
              </p>
              <div className="flex gap-4">
                <Button asChild size="lg">
                  <Link href={`/movie/${heroMovie.id}`}>
                    Learn More
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-xl mb-12">
            <h2 className="text-2xl md:text-3xl font-headline font-bold mb-2">
              Search for any movie
            </h2>
            <Search allMovies={movies} />
          </div>
          <MovieList movies={movies} />
        </div>
      </main>
      <footer className="text-center py-6 text-muted-foreground text-sm bg-background/50">
        <p>&copy; {new Date().getFullYear()} CineLink. All rights reserved.</p>
      </footer>
    </div>
  );
}
