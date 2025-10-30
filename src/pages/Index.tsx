import { useState, useEffect, useRef } from 'react';
import { SeedForm } from '@/components/story/SeedForm';
import { StoryCard } from '@/components/story/StoryCard';
import { EmptyState } from '@/components/story/EmptyState';
import { StoryGallery } from '@/components/story/StoryGallery';
import { generateStory, getStories } from '@/lib/api';
import { Story } from '@/lib/types';
import { Sparkles, Info, Wand2, BookOpen } from 'lucide-react';
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
        title: '✨ Story crafted!',
        description: 'Your narrative has been brought to life.',
      });

      // Refresh gallery
      loadGallery();
    } catch (error) {
      toast({
        title: 'Creation failed',
        description: 'The muse needs a different spark. Try another seed.',
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
      {/* Magical Header */}
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Wand2 className="h-8 w-8 text-primary animate-pulse" />
                <Sparkles className="h-4 w-4 text-accent absolute -top-1 -right-1" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  Muse Seed Craft
                </h1>
                <p className="text-sm text-muted-foreground">Where ideas become stories</p>
              </div>
            </div>
            <BookOpen className="h-6 w-6 text-muted-foreground" />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary mb-4">
              <Sparkles className="h-4 w-4" />
              <span>AI-Powered Story Generation</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
              Transform a{' '}
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-pulse">
                single prompt
              </span>
              {' '}into a complete narrative
            </h2>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Watch your ideas come alive with AI-generated stories, stunning visuals, and immersive narration
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-20 space-y-24">
        {/* Generator Section */}
        <section className="max-w-3xl mx-auto space-y-8">
          <div className="card-glass rounded-3xl p-8 md:p-12 story-card">
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center glow-primary">
                  <Wand2 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Craft Your Story</h3>
                  <p className="text-sm text-muted-foreground">Enter a seed and let the magic begin</p>
                </div>
              </div>
              
              <SeedForm onGenerate={handleGenerate} />
            </div>
          </div>

          <div className="flex items-start gap-3 text-sm text-muted-foreground bg-secondary/50 backdrop-blur-sm rounded-2xl p-6 border border-border/50">
            <Info className="h-5 w-5 mt-0.5 flex-shrink-0 text-primary" />
            <p className="leading-relaxed">
              Our AI weaves together advanced language models and image generation to create unique, 
              personalized narratives complete with atmospheric visuals and professional narration. 
              Each story is a one-of-a-kind creation.
            </p>
          </div>
        </section>

        {/* Result Section */}
        {currentStory && (
          <section ref={resultRef} className="space-y-8">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-sm text-accent">
                <Sparkles className="h-4 w-4" />
                <span>Your Story is Ready</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Behold Your Creation</h2>
            </div>
            <div className="max-w-4xl mx-auto">
              <StoryCard story={currentStory} />
            </div>
          </section>
        )}

        {/* Gallery Section */}
        <section className="space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Story Gallery</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore narratives crafted by our community of storytellers
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
      <footer className="border-t border-border/50 bg-card/30 backdrop-blur-xl mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center justify-center gap-3">
              <Wand2 className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Muse Seed Craft
              </span>
            </div>
            
            <div className="text-center space-y-3">
              <p className="text-sm text-muted-foreground">
                Powered by cutting-edge AI technology
              </p>
              <p className="text-sm text-muted-foreground">
                Images generated with{' '}
                <a
                  href="https://pollinations.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary hover:text-accent transition-colors"
                >
                  Pollinations.ai
                </a>
              </p>
              <p className="text-xs text-muted-foreground/70">
                © {new Date().getFullYear()} Muse Seed Craft • Where imagination meets reality
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
