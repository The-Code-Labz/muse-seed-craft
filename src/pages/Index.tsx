import { useState, useEffect, useRef } from 'react';
import { SeedForm } from '@/components/story/SeedForm';
import { StoryCard } from '@/components/story/StoryCard';
import { EmptyState } from '@/components/story/EmptyState';
import { StoryGallery } from '@/components/story/StoryGallery';
import { generateStory, getStories } from '@/lib/api';
import { Story } from '@/lib/types';
import { Sparkles, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [currentStory, setCurrentStory] = useState<Story | null>(null);
  const [galleryStories, setGalleryStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadGallery();
  }, []);

  const loadGallery = async () => {
    setLoading(true);
    try {
      const stories = await getStories(12);
      setGalleryStories(stories);
    } catch (error) {
      console.error('Failed to load gallery:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = async (seed: string) => {
    try {
      const story = await generateStory({ seed });
      setCurrentStory(story);
      
      // Scroll to result
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);

      toast({
        title: 'Story generated!',
        description: 'Your AI-powered story is ready.',
      });

      // Refresh gallery
      loadGallery();
    } catch (error) {
      toast({
        title: 'Generation failed',
        description: 'Please try again with a different seed.',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const handleSelectSeed = (seed: string) => {
    const inputElement = document.querySelector<HTMLInputElement>('input[placeholder*="lonely robot"]');
    if (inputElement) {
      inputElement.value = seed;
      inputElement.dispatchEvent(new Event('input', { bubbles: true }));
      inputElement.focus();
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <div>
              <h1 className="text-2xl font-bold tracking-tight">AI StoryPost Generator</h1>
              <p className="text-sm text-muted-foreground">Transform ideas into stories</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-12">
        {/* Generator Section */}
        <section className="max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Create Your Story</h2>
            <p className="text-muted-foreground">
              Enter a simple seed idea and let AI craft a complete narrative
            </p>
          </div>

          <div className="card-glass rounded-3xl p-6 md:p-8">
            <SeedForm onGenerate={handleGenerate} />
          </div>

          <div className="flex items-start gap-2 text-sm text-muted-foreground bg-muted/50 rounded-xl p-4">
            <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <p>
              Our AI combines cutting-edge language models with image generation to create unique, 
              personalized stories complete with visuals and narration.
            </p>
          </div>
        </section>

        {/* Result Section */}
        {currentStory && (
          <section ref={resultRef} className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Your Story</h2>
            <StoryCard story={currentStory} />
          </section>
        )}

        {/* Empty State or Gallery */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">Recent Stories</h2>
            <p className="text-muted-foreground">
              Explore stories created by the community
            </p>
          </div>

          {galleryStories.length === 0 && !loading ? (
            <EmptyState onSelectSeed={handleSelectSeed} />
          ) : (
            <StoryGallery stories={galleryStories} loading={loading} />
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card/50 backdrop-blur-sm mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Images generated with{' '}
              <a
                href="https://pollinations.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary hover:underline"
              >
                Pollinations.ai
              </a>
            </p>
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} AI StoryPost Generator
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
