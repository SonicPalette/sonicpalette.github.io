'use server';

/**
 * @fileOverview This flow enriches movie details by providing a summary of the movie.
 *
 * - enrichMovieDetails - A function that takes a movie title and returns a summary of the movie.
 * - EnrichMovieDetailsInput - The input type for the enrichMovieDetails function.
 * - EnrichMovieDetailsOutput - The return type for the enrichMovieDetails function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EnrichMovieDetailsInputSchema = z.object({
  movieTitle: z.string().describe('The title of the movie to summarize.'),
});
export type EnrichMovieDetailsInput = z.infer<typeof EnrichMovieDetailsInputSchema>;

const EnrichMovieDetailsOutputSchema = z.object({
  movieSummary: z.string().describe('A short summary of the movie.'),
});
export type EnrichMovieDetailsOutput = z.infer<typeof EnrichMovieDetailsOutputSchema>;

export async function enrichMovieDetails(input: EnrichMovieDetailsInput): Promise<EnrichMovieDetailsOutput> {
  return enrichMovieDetailsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'enrichMovieDetailsPrompt',
  input: {schema: EnrichMovieDetailsInputSchema},
  output: {schema: EnrichMovieDetailsOutputSchema},
  prompt: `Summarize the following movie:\n\nTitle: {{{movieTitle}}}`,
});

const enrichMovieDetailsFlow = ai.defineFlow(
  {
    name: 'enrichMovieDetailsFlow',
    inputSchema: EnrichMovieDetailsInputSchema,
    outputSchema: EnrichMovieDetailsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
