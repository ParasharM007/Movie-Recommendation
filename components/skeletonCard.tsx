import { Card, CardContent } from "components/ui/card";
import { Skeleton } from "components/ui/skeleton";

export default function SkeletonCard() {
  return (
    <Card className="bg-[#0f0f0f] border border-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 w-full">
      
      
      <div className="relative w-full aspect-[2/3]">
        <Skeleton className="h-full w-full bg-gray-800" />
      </div>

      
      <CardContent className="p-3 space-y-2">
        
        
        <Skeleton className="h-4 w-3/4 bg-gray-700 rounded-md" />
        
        
        <Skeleton className="h-3 w-1/2 bg-gray-800 rounded-md" />
        
        
        <Skeleton className="h-3 w-1/3 bg-gray-800 rounded-md" />
      
      </CardContent>
    </Card>
  );
}