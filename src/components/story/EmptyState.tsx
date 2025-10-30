import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

interface EmptyStateProps {
  onSelectSeed: (seed: string) => void;
}

const SAMPLE_SEEDS = [
  'lonely robot on Mars',
  'child finds a door in a tree',
  'samurai meditating under a waterfall',
];

export function EmptyState({ onSelectSeed }: EmptyStateProps) {
  return (
    <div className="text-center space-y-6 py-12">
      <div className="space-y-3">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <Sparkles className="h-8 w-8 text-primary" />
        </div>
        
        <h3 className="text-2xl font-semibold">Start Your Story</h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          Enter a simple idea (3–10 words) and watch AI transform it into a complete story with a cover image and audio narration.
        </p>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-medium">Try these examples:</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {SAMPLE_SEEDS.map((seed) => (
            <Button
              key={seed}
              variant="outline"
              onClick={() => onSelectSeed(seed)}
              className="rounded-full hover:bg-primary/10 hover:border-primary transition-all"
            >
              {seed}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
