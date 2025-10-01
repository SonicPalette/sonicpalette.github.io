import type { Movie } from '@/lib/types';
import MovieCard from './movie-card';

type MovieListProps = {
  movies: Movie[];
};

export default function MovieList({ movies }: MovieListProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
      {movies.map(movie => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
