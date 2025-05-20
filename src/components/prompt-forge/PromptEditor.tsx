'use client';

import type { PromptTemplate, Placeholder } from '@/types';
import React, { useState, useEffect, useCallback } from 'react';
import { CharacterCountInput } from './CharacterCountInput';
import { CopyButton } from './CopyButton';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '../ui/separator';

interface PromptEditorProps {
  template: PromptTemplate | null;
}

export function PromptEditor({ template }: PromptEditorProps) {
  const [inputValues, setInputValues] = useState<Record<string, string>>({});
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');

  const initializeInputs = useCallback((placeholders: Placeholder[]) => {
    const initialValues: Record<string, string> = {};
    placeholders.forEach((p) => {
      initialValues[p.name] = p.defaultValue || '';
    });
    setInputValues(initialValues);
  }, []);

  useEffect(() => {
    if (template) {
      initializeInputs(template.placeholders);
    } else {
      setInputValues({});
      setGeneratedPrompt('');
    }
  }, [template, initializeInputs]);

  useEffect(() => {
    if (template) {
      let newPrompt = template.template;
      template.placeholders.forEach((p) => {
        const regex = new RegExp(`\\[${p.name}\\]`, 'g');
        newPrompt = newPrompt.replace(regex, inputValues[p.name] || '');
      });
      setGeneratedPrompt(newPrompt);
    }
  }, [inputValues, template]);

  const handleInputChange = (name: string, value: string) => {
    setInputValues((prev) => ({ ...prev, [name]: value }));
  };

  if (!template) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        <p>Select a template to get started.</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-8 mt-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl">{template.name}</CardTitle>
          <CardDescription>{template.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <ScrollArea className="h-[calc(100vh-380px)] pr-4">
            <div className="space-y-6">
            {template.placeholders.map((p) => (
              <CharacterCountInput
                key={p.name}
                id={p.name}
                label={p.label}
                value={inputValues[p.name] || ''}
                onChange={(val) => handleInputChange(p.name, val)}
                maxLength={p.maxLength}
                placeholder={p.defaultValue || `Enter ${p.label.toLowerCase()}`}
                isTextArea={p.isTextArea}
              />
            ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl">Live Preview</CardTitle>
            <CopyButton textToCopy={generatedPrompt} />
          </div>
          <CardDescription>Your generated prompt will appear here.</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[calc(100vh-300px)]">
            <pre className="whitespace-pre-wrap p-4 bg-muted rounded-md text-sm leading-relaxed font-mono">
              {generatedPrompt || 'Modify inputs to see the live prompt...'}
            </pre>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
