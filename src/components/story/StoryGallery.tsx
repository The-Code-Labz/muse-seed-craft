import { Story } from '@/lib/types';
import { StoryCard } from './StoryCard';
import { LoadingCard } from './LoadingCard';

interface StoryGalleryProps {
  stories: Story[];
  loading?: boolean;
}

export function StoryGallery({ stories, loading }: StoryGalleryProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <LoadingCard key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stories.map((story) => (
        <StoryCard
          key={story.id}
          story={story}
          variant="compact"
        />
      ))}
    </div>
  );
}
