import type { Movie } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from './ui/card';

type MovieCardProps = {
  movie: Movie;
};

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link href={`/movie/${movie.id}`} className="group block">
      <Card className="overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2 border-2 border-transparent hover:border-primary">
        <CardContent className="p-0">
          <div className="aspect-[2/3] relative">
            <Image
              src={movie.thumbnailUrl}
              alt={`Poster for ${movie.title}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              data-ai-hint={movie.imageHint}
            />
          </div>
          <div className="p-4 bg-card">
            <h3 className="font-bold font-headline truncate" title={movie.title}>
              {movie.title}
            </h3>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
