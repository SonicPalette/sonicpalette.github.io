import { enrichMovieDetails } from '@/ai/flows/enrich-movie-details';
import DownloadLinks from '@/components/download-links';
import Header from '@/components/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getMovieById } from '@/lib/data';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type MoviePageProps = {
  params: { movieId: string };
};

export default async function MoviePage({ params }: MoviePageProps) {
  const movie = await getMovieById(params.movieId);

  if (!movie) {
    notFound();
  }

  const { movieSummary } = await enrichMovieDetails({ movieTitle: movie.title });

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button asChild variant="outline">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          <div className="md:col-span-1">
            <Card className="overflow-hidden shadow-2xl shadow-black/30">
              <div className="aspect-[2/3] relative">
                <Image
                  src={movie.thumbnailUrl}
                  alt={`Poster for ${movie.title}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority
                  data-ai-hint={movie.imageHint}
                />
              </div>
            </Card>
          </div>

          <div className="md:col-span-2">
            <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">
              {movie.title}
            </h1>

            <Card className="mb-6 bg-card/50">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {movieSummary}
                </p>
              </CardContent>
            </Card>

            <DownloadLinks links={movie.downloadLinks} />
          </div>
        </div>
      </main>
      <footer className="text-center py-4 text-muted-foreground text-sm">
        <p>&copy; {new Date().getFullYear()} CineLink. All rights reserved.</p>
      </footer>
    </div>
  );
}
