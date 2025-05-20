'use client';

import React, { useState } from 'react';
import { Logo } from '@/components/icons/Logo';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TemplateSelector } from '@/components/prompt-forge/TemplateSelector';
import { PromptEditor } from '@/components/prompt-forge/PromptEditor';
import { HarmfulnessChecker } from '@/components/prompt-forge/HarmfulnessChecker';
import { promptTemplates } from '@/config/prompt-templates';
import type { PromptTemplate } from '@/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

export default function HomePage() {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);

  const selectedTemplate = selectedTemplateId
    ? promptTemplates.find((t) => t.id === selectedTemplateId) || null
    : null;

  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 md:p-6 border-b sticky top-0 bg-background/95 backdrop-blur z-10">
        <div className="container mx-auto flex justify-between items-center">
          <Logo />
        </div>
      </header>

      <main className="flex-grow container mx-auto p-4 md:p-6">
        <Tabs defaultValue="generator" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:w-[400px] mb-6">
            <TabsTrigger value="generator" className="text-sm md:text-base">Prompt Generator</TabsTrigger>
            <TabsTrigger value="harmfulness" className="text-sm md:text-base">Harmfulness Checker</TabsTrigger>
          </TabsList>
          
          <TabsContent value="generator">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-2 text-primary">Choose a Template</h2>
                <p className="text-muted-foreground mb-4">
                  Select a pre-defined template to kickstart your prompt creation.
                </p>
                <TemplateSelector
                  templates={promptTemplates}
                  selectedTemplateId={selectedTemplateId}
                  onSelectTemplate={setSelectedTemplateId}
                />
              </div>
              <Separator />
              <PromptEditor template={selectedTemplate} />
            </div>
          </TabsContent>
          
          <TabsContent value="harmfulness">
            <HarmfulnessChecker />
          </TabsContent>
        </Tabs>
      </main>

      <footer className="p-4 md:p-6 border-t mt-8">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} PromptForge. Built with Next.js and Shadcn/UI.
        </div>
      </footer>
    </div>
  );
}
