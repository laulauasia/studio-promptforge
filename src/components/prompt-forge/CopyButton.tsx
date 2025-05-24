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
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(textToCopy);
        toast({
          title: 'Copied!',
          description: 'Prompt copied to clipboard using modern API.',
          className: 'bg-card text-foreground border-primary',
        });
      } else {
        // Fallback for HTTP or older browsers
        const textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        // Make the textarea out of sight
        textArea.style.position = 'fixed';
        textArea.style.top = '-9999px';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
          const successful = document.execCommand('copy');
          if (successful) {
            toast({
              title: 'Copied!',
              description: 'Prompt copied to clipboard using fallback.',
              className: 'bg-card text-foreground border-primary',
            });
          } else {
            throw new Error('Fallback copy command failed');
          }
        } catch (fallbackErr) {
          console.error('Fallback copy failed: ', fallbackErr);
          toast({
            title: 'Error',
            description: 'Failed to copy prompt using fallback.',
            variant: 'destructive',
          });
        } finally {
          document.body.removeChild(textArea);
        }
      }
    } catch (err) {
      // This catch block handles errors from the primary (navigator.clipboard) attempt
      // if it exists but still throws an error (e.g. permission denied)
      // or if the fallback logic itself somehow has an unhandled issue (less likely).
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
