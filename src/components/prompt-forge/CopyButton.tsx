'use client';

import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Copy as CopyIcon } from 'lucide-react'; // Renamed to avoid conflict
import type React from 'react';

interface CopyButtonProps {
  textToCopy: string;
  buttonText?: string; // Optional text for the button
}

export function CopyButton({ textToCopy, buttonText }: CopyButtonProps) {
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      toast({
        title: 'Copied!',
        description: 'Prompt copied to clipboard.',
        className: 'bg-card text-foreground border-primary',
      });
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to copy prompt.',
        variant: 'destructive',
      });
      console.error('Failed to copy: ', err);
    }
  };

  if (buttonText) {
    return (
      <Button onClick={handleCopy} variant="default" size="sm" className="btn-gradient">
        <CopyIcon className="mr-2 h-4 w-4" />
        {buttonText}
      </Button>
    );
  }

  return (
    <Button onClick={handleCopy} variant="outline" size="icon" aria-label="Copy prompt" className="border-primary text-primary hover:bg-primary/10">
      <CopyIcon className="h-4 w-4" />
    </Button>
  );
}
