'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, ArrowLeft } from 'lucide-react';
import { PromptEditor } from '@/components/prompt-forge/PromptEditor';
import { promptTemplates as allTemplates } from '@/config/prompt-templates';
import type { PromptTemplate } from '@/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const categories = ['All Categories', 'General', 'Writing', 'Business'];

function PromptCard({ template, onSelect }: { template: PromptTemplate; onSelect: (id: string) => void }) {
  return (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-shadow duration-200 bg-card hover:border-primary"
      onClick={() => onSelect(template.id)}
    >
      <CardHeader>
        <CardTitle className="text-lg text-primary">{template.name}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground h-10 overflow-hidden">
          {template.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <span className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded-full">
          {template.category}
        </span>
      </CardContent>
    </Card>
  );
}

export default function HomePage() {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All Categories');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSelectTemplate = (id: string) => {
    setSelectedTemplateId(id);
  };

  const handleBackToList = () => {
    setSelectedTemplateId(null);
  };

  const filteredTemplates = useMemo(() => {
    return allTemplates
      .filter(template => 
        activeCategory === 'All Categories' || template.category === activeCategory
      )
      .filter(template => 
        template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [activeCategory, searchTerm]);

  const selectedTemplate = selectedTemplateId
    ? allTemplates.find((t) => t.id === selectedTemplateId) || null
    : null;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="relative py-16 md:py-24 text-center text-foreground overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://placehold.co/1600x600.png"
            alt="Abstract background"
            layout="fill"
            objectFit="cover"
            className="opacity-10"
            data-ai-hint="mathematics physics formulas"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background z-10"></div>
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
            Ultimate AI Prompt Library
          </h1>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
            Best ChatGPT Prompts & More
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Discover our extensive collection of the best AI prompts, including top ChatGPT prompts, Anthropic prompts, and Gemini prompts. Explore our free prompt library to enhance your AI productivity. Unlock the full potential of AI chatbots with our curated selection of prompts for ChatGPT and other leading models.
          </p>
          <div className="max-w-2xl mx-auto mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search prompts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 text-base rounded-full bg-input border-border focus:ring-primary"
              />
            </div>
          </div>
          <Button size="lg" className="btn-gradient rounded-full px-8 py-3 text-base font-semibold">
            Generate a Custom Prompt
          </Button>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-4 md:p-6 relative z-10">
        {!selectedTemplate ? (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Most viewed prompts</h2>
              <div className="flex flex-wrap gap-2 mb-6">
                {categories.map(category => (
                  <Button
                    key={category}
                    variant={activeCategory === category ? 'default' : 'outline'}
                    onClick={() => {
                      setActiveCategory(category);
                      setSelectedTemplateId(null); // Reset selection when category changes
                    }}
                    className={`rounded-full px-4 py-2 text-sm md:text-base ${activeCategory === category ? 'bg-primary text-primary-foreground' : 'border-primary text-primary hover:bg-primary/10'}`}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
            {filteredTemplates.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTemplates.map(template => (
                  <PromptCard key={template.id} template={template} onSelect={handleSelectTemplate} />
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-10">No prompts found for "{searchTerm}" in "{activeCategory}".</p>
            )}
          </>
        ) : (
          <PromptEditor template={selectedTemplate} onBack={handleBackToList} />
        )}
      </main>

      <footer className="p-4 md:p-6 border-t border-border/50 mt-12">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Ultimate AI Prompt Library. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
