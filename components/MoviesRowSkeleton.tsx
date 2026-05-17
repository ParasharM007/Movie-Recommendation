import { Card, CardContent } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

interface MovieGridSkeletonProps {
  count?: number;
}

export default function MoviesRowSkeleton({
  count = 12,
}: MovieGridSkeletonProps) {
  const cards = Array.from({ length: count });

  return (
    <section className="px-4 sm:px-6 md:px-8 py-6">
      <div
        className="
          grid gap-5
          grid-cols-2
          sm:grid-cols-3
          md:grid-cols-4
          lg:grid-cols-5
          xl:grid-cols-6
        "
      >
        {cards.map((_, index) => (
          <Card
            key={index}
            className="border-0 bg-[#0f0f0f] rounded-2xl overflow-hidden shadow-md"
          >
            <div className="relative aspect-[2/3] w-full overflow-hidden">
              <Skeleton className="h-full w-full rounded-none bg-zinc-800" />

              <div className="absolute top-2 right-2">
                <Skeleton className="h-[24px] w-[42px] rounded-lg bg-zinc-700/60" />
              </div>
            </div>

            <CardContent className="p-3 space-y-2">
              <Skeleton className="h-4 w-5/6 bg-zinc-800" />

              <Skeleton className="h-3 w-1/3 bg-zinc-800" />
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
