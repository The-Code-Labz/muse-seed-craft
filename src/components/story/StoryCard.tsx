import { Story } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { AudioPlayer } from './AudioPlayer';
import { Calendar, Sparkles } from 'lucide-react';
import { format, isValid, parseISO } from 'date-fns';

interface StoryCardProps {
  story: Story;
  variant?: 'default' | 'compact';
}

export function StoryCard({ story, variant = 'default' }: StoryCardProps) {
  const isCompact = variant === 'compact';

  // Safely format the date with validation
  const formatDate = (dateString: string) => {
    try {
      const date = parseISO(dateString);
      if (isValid(date)) {
        return format(date, 'MMM d, yyyy');
      }
    } catch (error) {
      console.error('Invalid date:', dateString, error);
    }
    return 'Recently';
  };

  return (
    <Card className="overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group">
      {/* Image */}
      <div className="relative aspect-video overflow-hidden bg-muted">
        <img
          src={story.imageUrl}
          alt={story.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className={`font-bold tracking-tight ${isCompact ? 'text-lg' : 'text-xl'}`}>
              {story.title}
            </h3>
            <Sparkles className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
          </div>
          
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            <time dateTime={story.createdAt}>
              {formatDate(story.createdAt)}
            </time>
          </div>
        </div>

        {/* Story Content */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
            <Sparkles className="h-3 w-3" />
            Seed: {story.seed}
          </div>
          
          <p className={`text-muted-foreground leading-relaxed ${isCompact ? 'text-sm line-clamp-3' : 'text-base'}`}>
            {story.content}
          </p>
        </div>

        {/* Audio Player */}
        {!isCompact && story.audioUrl && (
          <div className="pt-2">
            <AudioPlayer audioUrl={story.audioUrl} />
          </div>
        )}
      </div>
    </Card>
  );
}
