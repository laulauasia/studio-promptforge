'use client';

import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { detectHarmfulness, type DetectHarmfulnessOutput } from '@/ai/flows/detect-harmfulness';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function HarmfulnessChecker() {
  const [promptText, setPromptText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<DetectHarmfulnessOutput | null>(null);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!promptText.trim()) {
      toast({
        title: 'Input required',
        description: 'Please enter a prompt to check.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setResult(null);
    try {
      const harmResult = await detectHarmfulness({ prompt: promptText });
      setResult(harmResult);
    } catch (error) {
      console.error('Harmfulness check failed:', error);
      toast({
        title: 'Error',
        description: 'Failed to check prompt for harmfulness. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl">Harmfulness Detector</CardTitle>
        <CardDescription>
          Paste your prompt below to check for potentially harmful content using AI.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Enter your prompt here..."
          value={promptText}
          onChange={(e) => setPromptText(e.target.value)}
          rows={6}
          className="text-base md:text-sm"
        />
        <Button onClick={handleSubmit} disabled={isLoading} className="w-full md:w-auto">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Checking...
            </>
          ) : (
            'Check Prompt'
          )}
        </Button>
      </CardContent>
      {result && (
        <CardFooter className="flex flex-col items-start space-y-2 border-t pt-4">
            <h3 className="text-md font-semibold">Analysis Result:</h3>
            {result.isHarmful ? (
                 <Badge variant="destructive" className="text-sm p-2">
                    <AlertCircle className="mr-2 h-5 w-5" />
                    Potentially Harmful
                </Badge>
            ) : (
                <Badge variant="default" className="bg-green-600 hover:bg-green-700 text-sm p-2">
                    <CheckCircle2 className="mr-2 h-5 w-5" />
                    Not Harmful
                </Badge>
            )}
            <p className="text-sm text-muted-foreground">
              <strong>Reason:</strong> {result.reason}
            </p>
        </CardFooter>
      )}
    </Card>
  );
}
