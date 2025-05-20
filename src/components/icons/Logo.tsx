import { Wand2 } from 'lucide-react';

// This component is currently not used in the new design's main page header.
// It's kept here in case it's needed elsewhere.
export function Logo() {
  return (
    <div className="flex items-center gap-2 text-2xl font-bold text-primary">
      <Wand2 className="h-8 w-8" />
      <span>PromptForge</span>
    </div>
  );
}
