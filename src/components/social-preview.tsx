"use client"

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Globe, Facebook, Twitter, Linkedin, Link2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const LIMITS = {
  google: { title: 60, description: 160 },
  facebook: { title: 60, description: 200 },
  twitter: { title: 70, description: 200 },
  linkedin: { title: 70, description: 200 }
} as const;

type Platform = keyof typeof LIMITS;

interface Metadata {
  title: string;
  description: string;
  image: string;
  domain: string;
}

interface MetaInformationProps {
  metadata: Metadata;
  onMetadataChange: (metadata: Metadata) => void;
}

interface PlatformPreviewProps {
  platform: Platform;
  metadata: Metadata;
}

const GooglePreview: React.FC<{ metadata: Metadata }> = ({ metadata }) => {
  return (
    <div className="max-w-[600px] bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
      <p className="text-sm text-[#202124] flex items-center gap-2">
        <Globe className="h-4 w-4 text-emerald-600" />
        {metadata.domain}
      </p>
      <h3 className="text-[#1a0dab] text-xl my-1 hover:underline cursor-pointer font-medium line-clamp-2">
        {metadata.title}
      </h3>
      <p className="text-sm text-[#4d5156] line-clamp-2">{metadata.description}</p>
    </div>
  );
};

const FacebookPreview: React.FC<{ metadata: Metadata }> = ({ metadata }) => {
  return (
    <div className="max-w-[527px] rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
      {metadata.image && (
        <div className="relative">
          <img 
            src={metadata.image} 
            alt=""
            className="w-full h-[275px] object-cover"
            onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
              e.currentTarget.src = '/api/placeholder/527/275';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      )}
      <div className="p-4">
        <p className="text-xs text-[#606770] uppercase tracking-wider flex items-center gap-2">
          <Facebook className="h-4 w-4 text-blue-600" />
          {metadata.domain}
        </p>
        <h4 className="text-[#1d2129] font-semibold text-lg my-2 line-clamp-2">{metadata.title}</h4>
        <p className="text-[#606770] text-sm line-clamp-3">{metadata.description}</p>
      </div>
    </div>
  );
};

const TwitterPreview: React.FC<{ metadata: Metadata }> = ({ metadata }) => {
  return (
    <div className="max-w-[500px] rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
      {metadata.image && (
        <div className="relative">
          <img 
            src={metadata.image} 
            alt=""
            className="w-full h-[261px] object-cover"
            onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
              e.currentTarget.src = '/api/placeholder/500/261';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      )}
      <div className="p-4">
        <p className="text-xs text-[#536471] flex items-center gap-2 mb-2">
          <Twitter className="h-4 w-4 text-sky-500" />
          {metadata.domain}
        </p>
        <h4 className="text-[#0f1419] text-lg font-semibold line-clamp-1">{metadata.title}</h4>
        <p className="text-[#536471] text-sm line-clamp-2 mt-1">{metadata.description}</p>
      </div>
    </div>
  );
};

const LinkedInPreview: React.FC<{ metadata: Metadata }> = ({ metadata }) => {
  return (
    <div className="max-w-[552px] rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
      {metadata.image && (
        <div className="relative">
          <img 
            src={metadata.image} 
            alt=""
            className="w-full h-[288px] object-cover"
            onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
              e.currentTarget.src = '/api/placeholder/552/288';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      )}
      <div className="p-4">
        <p className="text-xs text-[#00000099] flex items-center gap-2 mb-2">
          <Linkedin className="h-4 w-4 text-blue-700" />
          {metadata.domain}
        </p>
        <h4 className="text-[#000000E6] font-semibold text-lg line-clamp-2">{metadata.title}</h4>
        <p className="text-[#00000099] text-sm line-clamp-2 mt-2">{metadata.description}</p>
      </div>
    </div>
  );
};

const MetaInformation: React.FC<MetaInformationProps> = ({ metadata, onMetadataChange }) => {
  const getTitleProgress = () => {
    const percentage = (metadata.title.length / 60) * 100;
    return Math.min(percentage, 100);
  };

  const getDescriptionProgress = () => {
    const percentage = (metadata.description.length / 160) * 100;
    return Math.min(percentage, 100);
  };

  return (
    <Card className="backdrop-blur-sm bg-white/50">
      <CardHeader>
        <CardTitle>Meta Information</CardTitle>
        <CardDescription>Edit your page metadata for search engines</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Page Title</label>
          <Input
            value={metadata.title}
            onChange={(e) => onMetadataChange({ ...metadata, title: e.target.value })}
            className="font-mono"
          />
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Characters: {metadata.title.length}/60</span>
            <div className="w-32 h-1 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-300 ${
                  getTitleProgress() > 100 ? 'bg-red-500' : 
                  getTitleProgress() > 90 ? 'bg-yellow-500' : 'bg-green-500'
                }`}
                style={{ width: `${getTitleProgress()}%` }}
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Meta Description</label>
          <Textarea
            value={metadata.description}
            onChange={(e) => onMetadataChange({ ...metadata, description: e.target.value })}
            className="font-mono resize-none"
            rows={4}
          />
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Characters: {metadata.description.length}/160</span>
            <div className="w-32 h-1 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-300 ${
                  getDescriptionProgress() > 100 ? 'bg-red-500' : 
                  getDescriptionProgress() > 90 ? 'bg-yellow-500' : 'bg-green-500'
                }`}
                style={{ width: `${getDescriptionProgress()}%` }}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const PlatformPreview: React.FC<PlatformPreviewProps> = ({ platform, metadata }) => {
  const limit = LIMITS[platform];
  const titleCount = metadata.title.length;
  const descriptionCount = metadata.description.length;

  const getCounterColor = (count: number, max: number) => {
    if (count > max) return 'bg-red-500 text-white';
    if (count > max * 0.9) return 'bg-yellow-500 text-white';
    return 'bg-green-500 text-white';
  };

  const renderPlatformPreview = () => {
    switch (platform) {
      case 'google':
        return <GooglePreview metadata={metadata} />;
      case 'facebook':
        return <FacebookPreview metadata={metadata} />;
      case 'twitter':
        return <TwitterPreview metadata={metadata} />;
      case 'linkedin':
        return <LinkedInPreview metadata={metadata} />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getCounterColor(titleCount, limit.title)}`}>
          Title: {titleCount}/{limit.title}
        </span>
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getCounterColor(descriptionCount, limit.description)}`}>
          Description: {descriptionCount}/{limit.description}
        </span>
      </div>
      {renderPlatformPreview()}
    </div>
  );
};

export default function SocialPreview() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [metadata, setMetadata] = useState<Metadata>({
    title: '',
    description: '',
    image: '',
    domain: ''
  });
  const [activePlatform, setActivePlatform] = useState<Platform>('google');

  const fetchMetadata = async () => {
    if (!url) {
      setError('Please enter a URL');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const response = await fetch('/api/metadata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch metadata');
      }

      const data = await response.json();
      
      setMetadata({
        title: data.title || '',
        description: data.description || '',
        image: data.image || '/api/placeholder/800/400',
        domain: new URL(url).hostname
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch metadata');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <Card className="backdrop-blur-sm bg-white/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link2 className="h-6 w-6" />
            SEO Link Preview
          </CardTitle>
          <CardDescription>
            Check and optimize how your content appears across different platforms
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input 
              placeholder="Enter URL to check metadata"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="font-mono"
              disabled={loading}
            />
            <Button 
              onClick={fetchMetadata}
              disabled={loading}
              className="min-w-[100px]"
            >
              {loading ? 'Loading...' : 'Check'}
            </Button>
          </div>
          
          {error && (
            <p className="mt-2 text-sm text-red-500">{error}</p>
          )}
        </CardContent>
      </Card>

      {metadata.title && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 space-y-6">
            <MetaInformation 
              metadata={metadata}
              onMetadataChange={setMetadata}
            />
          </div>

          <div className="lg:col-span-7">
            <Card className="backdrop-blur-sm bg-white/50">
              <CardHeader>
                <CardTitle>Social Media Previews</CardTitle>
                <CardDescription>
                  See how your content appears across different platforms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activePlatform} onValueChange={(value) => setActivePlatform(value as Platform)}>
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="google" className="flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      Google
                    </TabsTrigger>
                    <TabsTrigger value="facebook" className="flex items-center gap-2">
                      <Facebook className="h-4 w-4" />
                      Facebook
                    </TabsTrigger>
                    <TabsTrigger value="twitter" className="flex items-center gap-2">
                      <Twitter className="h-4 w-4" />
                      Twitter
                    </TabsTrigger>
                    <TabsTrigger value="linkedin" className="flex items-center gap-2">
                      <Linkedin className="h-4 w-4" />
                      LinkedIn
                    </TabsTrigger>
                  </TabsList>
                  
                  {(Object.keys(LIMITS) as Platform[]).map((platform) => (
                    <TabsContent key={platform} value={platform} className="mt-6">
                      <PlatformPreview 
                        platform={platform}
                        metadata={metadata}
                      />
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}