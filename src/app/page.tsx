import Header from '@/components/header';
import MovieList from '@/components/movie-list';
import Search from '@/components/search';
import { getMovies } from '@/lib/data';

export default async function Home() {
  const movies = await getMovies();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-center mb-4 text-primary-foreground animate-fade-in-down">
            Find Your Next Movie
          </h1>
          <p className="text-center text-lg text-muted-foreground mb-8">
            Search for movies and get valid download links instantly.
          </p>
          <Search allMovies={movies} />
        </div>
        <MovieList movies={movies} />
      </main>
      <footer className="text-center py-4 text-muted-foreground text-sm">
        <p>&copy; {new Date().getFullYear()} CineLink. All rights reserved.</p>
      </footer>
    </div>
  );
}
