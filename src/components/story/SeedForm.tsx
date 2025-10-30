import { useState, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Sparkles, Loader2 } from 'lucide-react';
import { LoadingStep } from '@/lib/types';

interface SeedFormProps {
  onGenerate: (seed: string) => Promise<void>;
}

const STEP_LABELS: Record<LoadingStep, string> = {
  idle: '',
  scaffolding: 'Scaffolding idea...',
  'generating-image': 'Generating cover image...',
  'writing-story': 'Writing your story...',
  'creating-narration': 'Creating audio narration...',
  complete: 'Complete!',
};

const STEP_PROGRESS: Record<LoadingStep, number> = {
  idle: 0,
  scaffolding: 20,
  'generating-image': 40,
  'writing-story': 70,
  'creating-narration': 90,
  complete: 100,
};

export function SeedForm({ onGenerate }: SeedFormProps) {
  const [seed, setSeed] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<LoadingStep>('idle');
  const [error, setError] = useState('');

  const validateSeed = (text: string): boolean => {
    const words = text.trim().split(/\s+/).filter(w => w.length > 0);
    return words.length >= 3 && words.length <= 10;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    const trimmedSeed = seed.trim();
    
    if (!validateSeed(trimmedSeed)) {
      setError('Please enter between 3 and 10 words');
      return;
    }

    setLoading(true);
    
    // Simulate step progression
    const steps: LoadingStep[] = ['scaffolding', 'generating-image', 'writing-story', 'creating-narration'];
    let currentStepIndex = 0;

    const stepInterval = setInterval(() => {
      if (currentStepIndex < steps.length) {
        setStep(steps[currentStepIndex]);
        currentStepIndex++;
      }
    }, 800);

    try {
      await onGenerate(trimmedSeed);
      setStep('complete');
      setSeed('');
      setTimeout(() => {
        setStep('idle');
      }, 1500);
    } catch (err) {
      setError('Failed to generate story. Please try again.');
      setStep('idle');
    } finally {
      clearInterval(stepInterval);
      setLoading(false);
    }
  };

  const wordCount = seed.trim().split(/\s+/).filter(w => w.length > 0).length;
  const isValid = wordCount >= 3 && wordCount <= 10;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <div className="relative">
          <Input
            value={seed}
            onChange={(e) => setSeed(e.target.value)}
            placeholder="e.g., lonely robot on Mars"
            disabled={loading}
            className="pr-16 h-14 text-lg rounded-2xl border-2 transition-all duration-300 focus:border-primary focus:shadow-lg"
            aria-label="Story seed input"
            aria-describedby="seed-helper"
            maxLength={100}
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
            {wordCount}/10
          </div>
        </div>
        
        <p id="seed-helper" className="text-sm text-muted-foreground px-1">
          3–10 words. Keep it general and let the AI fill in the magic ✨
        </p>
        
        {error && (
          <p className="text-sm text-destructive px-1" role="alert">
            {error}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={!isValid || loading}
        className="w-full h-14 text-lg rounded-2xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Sparkles className="mr-2 h-5 w-5" />
            Generate Story
          </>
        )}
      </Button>

      {loading && step !== 'idle' && (
        <div className="space-y-3 pt-2" aria-live="polite" aria-atomic="true">
          <Progress value={STEP_PROGRESS[step]} className="h-2" />
          <p className="text-sm text-center text-muted-foreground animate-pulse">
            {STEP_LABELS[step]}
          </p>
        </div>
      )}
    </form>
  );
}
