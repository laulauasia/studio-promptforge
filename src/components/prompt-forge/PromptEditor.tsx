'use client';

import type { PromptTemplate, Placeholder } from '@/types';
import React, { useState, useEffect, useCallback } from 'react';
import { CharacterCountInput } from './CharacterCountInput';
import { CopyButton } from './CopyButton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowLeft } from 'lucide-react';

interface PromptEditorProps {
  template: PromptTemplate | null;
  onBack: () => void;
}

export function PromptEditor({ template, onBack }: PromptEditorProps) {
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
      // Automatically generate prompt on template load or input change
      let newPrompt = template.template;
      template.placeholders.forEach((p) => {
        const regex = new RegExp(`\\[${p.name}\\]`, 'g');
        newPrompt = newPrompt.replace(regex, (inputValues[p.name] || p.defaultValue) || `[${p.name}]`);
      });
      setGeneratedPrompt(newPrompt);
    } else {
      setInputValues({});
      setGeneratedPrompt('');
    }
  }, [template, initializeInputs]); // Removed inputValues from here to avoid loop with generate now button

   useEffect(() => {
    if (template) {
      generateLivePreview();
    }
  }, [inputValues, template]);


  const handleInputChange = (name: string, value: string) => {
    setInputValues((prev) => ({ ...prev, [name]: value }));
  };

  const generateLivePreview = () => {
     if (template) {
      let newPrompt = template.template;
      template.placeholders.forEach((p) => {
        const regex = new RegExp(`\\[${p.name}\\]`, 'g');
        newPrompt = newPrompt.replace(regex, inputValues[p.name] || '');
      });
      setGeneratedPrompt(newPrompt);
    }
  };
  
  const handleGeneratePrompt = () => {
    // This function is now more for a conceptual "final" generation,
    // though live preview already does this.
    // Could be used for API calls in the future.
    generateLivePreview(); 
  };


  if (!template) {
    // This case should ideally be handled by the parent component's logic
    // For example, by not rendering PromptEditor if template is null
    return (
      <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-8">
        <p className="mb-4">No template selected or an issue occurred.</p>
        <Button onClick={onBack} variant="outline" className="btn-secondary-custom">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Prompts
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <Card className="bg-card shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-primary">{template.name}</CardTitle>
          <CardDescription className="text-muted-foreground">{template.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
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
              isRequired={p.isRequired}
            />
          ))}
          <Button onClick={handleGeneratePrompt} size="lg" className="w-full btn-gradient text-base">
            Generate Prompt
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-card shadow-xl">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl">Generated Prompt</CardTitle>
            {generatedPrompt && <CopyButton textToCopy={generatedPrompt} buttonText="Copy" />}
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[200px] md:h-[250px] bg-input p-4 rounded-md">
            <pre className="whitespace-pre-wrap text-sm leading-relaxed font-mono text-foreground">
              {generatedPrompt || 'Fill in the placeholders and click "Generate Prompt" to see the result.'}
            </pre>
          </ScrollArea>
        </CardContent>
      </Card>
      
      <div className="text-center mt-8">
        <Button onClick={onBack} variant="outline" size="lg" className="btn-secondary-custom">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Prompts
        </Button>
      </div>
    </div>
  );
}
