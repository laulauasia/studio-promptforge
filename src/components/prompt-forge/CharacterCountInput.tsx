'use client';

import type React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface CharacterCountInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
  placeholder?: string;
  isTextArea?: boolean;
}

export function CharacterCountInput({
  id,
  label,
  value,
  onChange,
  maxLength,
  placeholder,
  isTextArea = false,
}: CharacterCountInputProps) {
  const currentLength = value.length;
  let progressColor = 'text-muted-foreground';
  if (maxLength) {
    const percentage = (currentLength / maxLength) * 100;
    if (percentage > 90) {
      progressColor = 'text-destructive';
    } else if (percentage > 70) {
      progressColor = 'text-orange-500'; // Custom color, ensure it's defined or use a Tailwind class
    }
  }

  const InputComponent = isTextArea ? Textarea : Input;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <Label htmlFor={id} className="text-sm font-medium">
          {label}
        </Label>
        {maxLength && (
          <span className={cn('text-xs', progressColor)}>
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
        className={cn(isTextArea && "min-h-[80px] leading-relaxed", "text-base md:text-sm")}
      />
    </div>
  );
}
