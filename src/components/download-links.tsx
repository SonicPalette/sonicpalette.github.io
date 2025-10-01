'use client';

import { filterDownloadLinks } from '@/ai/flows/filter-download-links';
import { Download, Link as LinkIcon, Loader2, AlertTriangle } from 'lucide-react';
import { useEffect, useState, useTransition } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Button } from './ui/button';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

type DownloadLinksProps = {
  links: string[];
};

export default function DownloadLinks({ links }: DownloadLinksProps) {
  const [validLinks, setValidLinks] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isAiLoading, startAiTransition] = useTransition();

  useEffect(() => {
    startAiTransition(async () => {
      try {
        const result = await filterDownloadLinks({ links });
        setValidLinks(result.validLinks);
      } catch (err) {
        console.error('Failed to filter download links:', err);
        setError('Could not verify download links. Please try again later.');
      }
    });
  }, [links]);

  return (
    <Card className="bg-card/50">
      <CardHeader>
        <CardTitle className="font-headline text-2xl text-accent">Download Links</CardTitle>
        <CardDescription>
          These links have been verified by AI.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isAiLoading ? (
          <div className="flex items-center gap-4 text-muted-foreground">
            <Loader2 className="h-6 w-6 animate-spin text-accent" />
            <p>Verifying download links with AI...</p>
          </div>
        ) : error ? (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : validLinks.length > 0 ? (
          <ul className="space-y-3">
            {validLinks.map((link, index) => (
              <li key={index}>
                <Button asChild className="w-full md:w-auto bg-primary hover:bg-primary/80">
                  <a href={link} target="_blank" rel="noopener noreferrer">
                    <Download className="mr-2 h-4 w-4" />
                    Download Option {index + 1}
                  </a>
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex items-center gap-3 text-muted-foreground p-4 bg-background/50 rounded-lg">
            <LinkIcon className="h-5 w-5" />
            <p>No valid download links were found for this movie.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
