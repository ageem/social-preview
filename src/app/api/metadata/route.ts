// app/api/metadata/route.ts
import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    // Extract metadata
    const metadata = {
      title: $('title').text() || $('meta[property="og:title"]').attr('content') || '',
      description: $('meta[name="description"]').attr('content') || 
                  $('meta[property="og:description"]').attr('content') || '',
      image: $('meta[property="og:image"]').attr('content') || 
             $('meta[property="twitter:image"]').attr('content') || '',
      keywords: $('meta[name="keywords"]').attr('content')?.split(',').map(k => k.trim()) || []
    };

    return NextResponse.json(metadata);
  } catch (error) {
    console.error('Error fetching metadata:', error);
    return NextResponse.json(
      { error: 'Failed to fetch metadata' },
      { status: 500 }
    );
  }
}