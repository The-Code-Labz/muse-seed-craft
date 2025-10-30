import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function LoadingCard() {
  return (
    <Card className="overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm">
      <Skeleton className="aspect-video w-full bg-primary/10" />
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-6 w-3/4 bg-muted/50" />
          <Skeleton className="h-4 w-24 bg-muted/50" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-6 w-32 bg-muted/50" />
          <Skeleton className="h-4 w-full bg-muted/50" />
          <Skeleton className="h-4 w-full bg-muted/50" />
          <Skeleton className="h-4 w-2/3 bg-muted/50" />
        </div>
      </div>
    </Card>
  );
}
