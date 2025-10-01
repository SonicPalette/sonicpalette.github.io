import { config } from 'dotenv';
config();

import '@/ai/flows/search-suggestions.ts';
import '@/ai/flows/filter-download-links.ts';
import '@/ai/flows/enrich-movie-details.ts';