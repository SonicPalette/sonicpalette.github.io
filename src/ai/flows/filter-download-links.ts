'use server';

/**
 * @fileOverview A flow to filter valid download links from a list of provided links.
 *
 * - filterDownloadLinks - A function that filters valid download links.
 * - FilterDownloadLinksInput - The input type for the filterDownloadLinks function.
 * - FilterDownloadLinksOutput - The return type for the filterDownloadLinks function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FilterDownloadLinksInputSchema = z.object({
  links: z
    .array(z.string().url())
    .describe('An array of download links to filter.'),
});
export type FilterDownloadLinksInput = z.infer<
  typeof FilterDownloadLinksInputSchema
>;

const FilterDownloadLinksOutputSchema = z.object({
  validLinks: z
    .array(z.string().url())
    .describe('An array of valid download links.'),
});
export type FilterDownloadLinksOutput = z.infer<
  typeof FilterDownloadLinksOutputSchema
>;

export async function filterDownloadLinks(
  input: FilterDownloadLinksInput
): Promise<FilterDownloadLinksOutput> {
  return filterDownloadLinksFlow(input);
}

const filterDownloadLinksPrompt = ai.definePrompt({
  name: 'filterDownloadLinksPrompt',
  input: {schema: FilterDownloadLinksInputSchema},
  output: {schema: FilterDownloadLinksOutputSchema},
  prompt: `You are an expert at identifying valid download links for movies.

  Given the following list of links, identify which ones are valid download links and return them in the validLinks array.

  Links: {{links}}`,
});

const filterDownloadLinksFlow = ai.defineFlow(
  {
    name: 'filterDownloadLinksFlow',
    inputSchema: FilterDownloadLinksInputSchema,
    outputSchema: FilterDownloadLinksOutputSchema,
  },
  async input => {
    const {output} = await filterDownloadLinksPrompt(input);
    return output!;
  }
);
