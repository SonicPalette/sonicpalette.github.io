import moviesData from './movies.json';
import placeholderData from './placeholder-images.json';
import type { Movie } from './types';

const moviesWithImages: Movie[] = moviesData.map(movie => {
  const image = placeholderData.placeholderImages.find(p => p.id === movie.id);
  return {
    ...movie,
    thumbnailUrl: image?.imageUrl || `https://picsum.photos/seed/${movie.id}/500/750`,
    imageHint: image?.imageHint || 'movie poster'
  };
});

export async function getMovies(): Promise<Movie[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 100));
  return moviesWithImages;
}

export async function getMovieById(id: string): Promise<Movie | undefined> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 100));
  return moviesWithImages.find(movie => movie.id === id);
}
