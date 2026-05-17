
import { Skeleton } from "./ui/skeleton";


interface MovieSectionSkeletonProps {
      count?: number;
}

export default function MoviesGridSkeleton({ count = 4 }: MovieSectionSkeletonProps) {
  const cards = Array.from({ length: count });

  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((_, index) => (
          <div 
            key={index} 
            className="relative min-w-[160px] w-full"
          >
            
            <Skeleton className="w-full aspect-[2/3] rounded-md bg-zinc-800" />
            
            {/* Title Text Area */}
            <Skeleton className="h-4 w-5/6 mt-2 bg-zinc-800" />
            
            
            <div className="absolute top-3 left-0 px-2"> 
              
              <Skeleton className="h-[24px] w-[42px] rounded-lg bg-zinc-700/60" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}