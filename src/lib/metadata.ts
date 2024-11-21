import { parse } from 'node-html-parser';

export interface Metadata {
  title: string;
  description: string;
  image: string;
  url: string;
}

export async function scrapeMetadata(url: string): Promise<Metadata> {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const root = parse(html);

    // Get meta tags
    const metaTags = root.querySelectorAll('meta');
    const title = root.querySelector('title')?.text || '';
    
    const metadata = {  // Changed from 'let' to 'const'
      title: title,
      description: '',
      image: '',
      url: url
    };

    metaTags.forEach(tag => {
      const property = tag.getAttribute('property') || tag.getAttribute('name');
      const content = tag.getAttribute('content');

      if (!property || !content) return;

      if (property === 'og:title' || property === 'twitter:title') {
        metadata.title = content || metadata.title;
      }
      if (property === 'og:description' || property === 'twitter:description' || property === 'description') {
        metadata.description = content;
      }
      if (property === 'og:image' || property === 'twitter:image') {
        metadata.image = content;
      }
    });

    return metadata;
  } catch (error) {
    throw new Error(`Failed to scrape metadata: ${error}`);
  }
}

export function validateUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}