import type { Movie } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';

type MovieCardProps = {
  movie: Movie;
};

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link href={`/movie/${movie.id}`} className="group block">
      <div className="aspect-[2/3] relative overflow-hidden rounded-lg">
        <Image
          src={movie.thumbnailUrl}
          alt={`Poster for ${movie.title}`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
          data-ai-hint={movie.imageHint}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute bottom-0 left-0 p-3">
           <h3 className="font-bold text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity truncate" title={movie.title}>
              {movie.title}
            </h3>
        </div>
      </div>
    </Link>
  );
}
