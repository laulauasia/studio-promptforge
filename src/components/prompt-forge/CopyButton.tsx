'use client';

import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Copy } from 'lucide-react';
import type React from 'react';

interface CopyButtonProps {
  textToCopy: string;
}

export function CopyButton({ textToCopy }: CopyButtonProps) {
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      toast({
        title: 'Copied!',
        description: 'Prompt copied to clipboard.',
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

  return (
    <Button onClick={handleCopy} variant="outline" size="icon" aria-label="Copy prompt">
      <Copy className="h-4 w-4" />
    </Button>
  );
}
