'use client';

import type { PromptTemplate } from '@/types';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface TemplateSelectorProps {
  templates: PromptTemplate[];
  selectedTemplateId: string | null;
  onSelectTemplate: (templateId: string) => void;
}

export function TemplateSelector({
  templates,
  selectedTemplateId,
  onSelectTemplate,
}: TemplateSelectorProps) {
  const groupedTemplates = templates.reduce((acc, template) => {
    (acc[template.category] = acc[template.category] || []).push(template);
    return acc;
  }, {} as Record<string, PromptTemplate[]>);

  return (
    <Select
      value={selectedTemplateId || ''}
      onValueChange={(value) => value && onSelectTemplate(value)}
    >
      <SelectTrigger className="w-full md:w-[300px] text-base md:text-sm">
        <SelectValue placeholder="Select a prompt template..." />
      </SelectTrigger>
      <SelectContent>
        <ScrollArea className="h-[300px]">
          {Object.entries(groupedTemplates).map(([category, templatesInCategory]) => (
            <SelectGroup key={category}>
              <SelectLabel className="text-sm font-semibold">{category}</SelectLabel>
              {templatesInCategory.map((template) => (
                <SelectItem key={template.id} value={template.id} className="text-sm">
                  <div className="flex items-center gap-2">
                    {template.icon && <template.icon className="h-4 w-4 text-muted-foreground" />}
                    <span>{template.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectGroup>
          ))}
        </ScrollArea>
      </SelectContent>
    </Select>
  );
}
