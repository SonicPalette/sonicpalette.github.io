import type { Movie } from '@/lib/types';
import MovieCard from './movie-card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

type MovieListProps = {
  movies: Movie[];
};

export default function MovieList({ movies }: MovieListProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold font-headline mb-4">Trending Now</h2>
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {movies.map(movie => (
            <CarouselItem key={movie.id} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6">
              <MovieCard movie={movie} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-14 hidden sm:flex" />
        <CarouselNext className="mr-14 hidden sm:flex" />
      </Carousel>
    </div>
  );
}
