'use client';

import type React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface CharacterCountInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
  placeholder?: string;
  isTextArea?: boolean;
  isRequired?: boolean;
}

export function CharacterCountInput({
  id,
  label,
  value,
  onChange,
  maxLength,
  placeholder,
  isTextArea = false,
  isRequired = false,
}: CharacterCountInputProps) {
  const currentLength = value.length;
  
  const InputComponent = isTextArea ? Textarea : Input;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Label htmlFor={id} className="text-base font-medium text-foreground">
            {label}
          </Label>
          {isRequired && (
            <Badge variant="destructive" className="text-xs px-1.5 py-0.5">Required</Badge>
          )}
        </div>
        {maxLength && (
          <span className={cn('text-xs text-muted-foreground')}>
            {currentLength}/{maxLength}
          </span>
        )}
      </div>
      <InputComponent
        id={id}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e.target.value)}
        maxLength={maxLength}
        placeholder={placeholder || `Enter ${label.toLowerCase()}...`}
        className={cn(
            "bg-input border-border focus:ring-primary text-foreground placeholder:text-muted-foreground",
            isTextArea && "min-h-[100px] leading-relaxed", 
            "text-base md:text-sm"
        )}
      />
    </div>
  );
}
