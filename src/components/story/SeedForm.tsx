import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Wand2, Sparkles } from 'lucide-react';

interface SeedFormProps {
  onGenerate: (seed: string) => Promise<void>;
}

export function SeedForm({ onGenerate }: SeedFormProps) {
  const [seed, setSeed] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!seed.trim() || loading) return;

    setLoading(true);
    try {
      await onGenerate(seed.trim());
      setSeed('');
    } catch (error) {
      console.error('Generation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const exampleSeeds = [
    'a lonely robot discovering emotions',
    'a magical library where books come alive',
    'the last tree on a distant planet',
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-3">
        <Label htmlFor="seed" className="text-base font-medium flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          Your Story Seed
        </Label>
        <div className="relative">
          <Input
            id="seed"
            value={seed}
            onChange={(e) => setSeed(e.target.value)}
            placeholder="a lonely robot discovering emotions..."
            disabled={loading}
            className="h-14 text-base px-6 bg-background/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all"
          />
          {seed && (
            <button
              type="button"
              onClick={() => setSeed('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              ✕
            </button>
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          Enter a simple idea, concept, or scenario to generate a complete story
        </p>
      </div>

      <Button
        type="submit"
        disabled={!seed.trim() || loading}
        className="w-full h-14 text-base font-semibold bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all shadow-lg hover:shadow-xl glow-primary"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Crafting your story...
          </>
        ) : (
          <>
            <Wand2 className="mr-2 h-5 w-5" />
            Generate Story
          </>
        )}
      </Button>

      {/* Example Seeds */}
      <div className="space-y-3 pt-4 border-t border-border/50">
        <p className="text-sm font-medium text-muted-foreground">Try these examples:</p>
        <div className="flex flex-wrap gap-2">
          {exampleSeeds.map((example) => (
            <button
              key={example}
              type="button"
              onClick={() => setSeed(example)}
              disabled={loading}
              className="text-xs px-3 py-2 rounded-lg bg-secondary/50 hover:bg-secondary border border-border/50 text-foreground/80 hover:text-foreground transition-all disabled:opacity-50"
            >
              {example}
            </button>
          ))}
        </div>
      </div>
    </form>
  );
}
