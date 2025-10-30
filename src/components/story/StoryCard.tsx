import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AudioPlayer } from './AudioPlayer';
import { Story } from '@/lib/types';
import { Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StoryCardProps {
  story: Story;
  variant?: 'full' | 'compact';
  className?: string;
}

export function StoryCard({ story, variant = 'full', className }: StoryCardProps) {
  const formattedDate = new Date(story.created_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  if (variant === 'compact') {
    return (
      <Card className={cn("overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group", className)}>
        <div className="relative aspect-video overflow-hidden">
          <img
            src={story.image_url}
            alt={story.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <Badge className="absolute top-3 left-3 bg-background/90 backdrop-blur-sm">
            {story.seed}
          </Badge>
        </div>
        
        <div className="p-4 space-y-2">
          <h3 className="font-semibold text-lg line-clamp-1">{story.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-3">
            {story.story_text}
          </p>
          
          {story.audio_url && (
            <div className="pt-2">
              <AudioPlayer src={story.audio_url} />
            </div>
          )}
        </div>
      </Card>
    );
  }

  return (
    <Card className={cn("overflow-hidden card-glass", className)}>
      <div className="grid md:grid-cols-2 gap-6 p-6">
        <div className="space-y-3">
          <div className="relative aspect-video overflow-hidden rounded-2xl shadow-lg">
            <img
              src={story.image_url}
              alt={story.title}
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-xs text-muted-foreground italic">
            Image generated with Pollinations.ai
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="secondary" className="rounded-full">
                {story.seed}
              </Badge>
              <div className="flex items-center text-xs text-muted-foreground">
                <Calendar className="h-3 w-3 mr-1" />
                {formattedDate}
              </div>
            </div>
            
            <h2 className="text-3xl font-bold tracking-tight">{story.title}</h2>
          </div>

          <div className="prose prose-sm max-w-none">
            {story.story_text.split('\n\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          {story.audio_url && (
            <div className="pt-4 border-t">
              <p className="text-sm font-medium mb-3">Listen to narration:</p>
              <AudioPlayer src={story.audio_url} />
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
