import { Button } from '@/components/ui/button';
import { Sparkles, Lightbulb } from 'lucide-react';

interface EmptyStateProps {
  onSelectSeed: (seed: string) => void;
}

export function EmptyState({ onSelectSeed }: EmptyStateProps) {
  const suggestions = [
    {
      seed: 'A lonely robot discovers emotions',
      description: 'Explore the journey of an AI learning to feel',
    },
    {
      seed: 'Time traveler stuck in medieval times',
      description: 'Modern person navigating ancient history',
    },
    {
      seed: 'Last tree on Earth tells its story',
      description: 'Environmental tale from nature\'s perspective',
    },
    {
      seed: 'Chef who cooks memories into meals',
      description: 'Magical realism meets culinary arts',
    },
  ];

  return (
    <div className="text-center py-16 space-y-8">
      <div className="space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
          <Sparkles className="h-8 w-8 text-primary" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-bold tracking-tight">No Stories Yet</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Be the first to create a story! Start with one of these ideas or craft your own.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion.seed}
            onClick={() => onSelectSeed(suggestion.seed)}
            className="group p-6 rounded-2xl border border-border/50 bg-card/50 hover:bg-card hover:border-primary/50 transition-all text-left space-y-2"
          >
            <div className="flex items-start gap-3">
              <Lightbulb className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div className="space-y-1 flex-1">
                <p className="font-medium text-sm group-hover:text-primary transition-colors">
                  {suggestion.seed}
                </p>
                <p className="text-xs text-muted-foreground">
                  {suggestion.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      <Button
        variant="outline"
        size="lg"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="gap-2"
      >
        <Sparkles className="h-4 w-4" />
        Create Your First Story
      </Button>
    </div>
  );
}
