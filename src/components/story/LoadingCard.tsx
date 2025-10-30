import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function LoadingCard() {
  return (
    <Card className="overflow-hidden card-glass">
      <div className="grid md:grid-cols-2 gap-6 p-6">
        <div className="space-y-3">
          <Skeleton className="aspect-video rounded-2xl" />
          <Skeleton className="h-3 w-48" />
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-10 w-full" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>

          <div className="pt-4">
            <Skeleton className="h-12 w-full rounded-full" />
          </div>
        </div>
      </div>
    </Card>
  );
}
