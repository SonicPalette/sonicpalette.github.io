'use server';

/**
 * @fileOverview Provides movie title suggestions as the user types in the search bar.
 *
 * - getSearchSuggestions - A function that takes a search query and returns a list of movie title suggestions.
 * - SearchSuggestionsInput - The input type for the getSearchSuggestions function.
 * - SearchSuggestionsOutput - The return type for the getSearchSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SearchSuggestionsInputSchema = z.object({
  query: z.string().describe('The search query entered by the user.'),
});
export type SearchSuggestionsInput = z.infer<typeof SearchSuggestionsInputSchema>;

const SearchSuggestionsOutputSchema = z.array(z.string()).describe('A list of movie title suggestions.');
export type SearchSuggestionsOutput = z.infer<typeof SearchSuggestionsOutputSchema>;

export async function getSearchSuggestions(input: SearchSuggestionsInput): Promise<SearchSuggestionsOutput> {
  return searchSuggestionsFlow(input);
}

const searchSuggestionsPrompt = ai.definePrompt({
  name: 'searchSuggestionsPrompt',
  input: {schema: SearchSuggestionsInputSchema},
  output: {schema: SearchSuggestionsOutputSchema},
  prompt: `You are a movie title suggestion service.  Given the user's query, suggest up to 5 movie titles that are relevant to the query.

Query: {{{query}}}

Suggestions:`,
});

const searchSuggestionsFlow = ai.defineFlow(
  {
    name: 'searchSuggestionsFlow',
    inputSchema: SearchSuggestionsInputSchema,
    outputSchema: SearchSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await searchSuggestionsPrompt(input);
    return output!;
  }
);
