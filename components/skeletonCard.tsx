import { Card, CardContent } from "components/ui/card";
import { Skeleton } from "components/ui/skeleton";

export default function SkeletonCard({scale}:any) {
  
  return (
    <div className={`scale-[${scale}] origin-top`}>
    <Card className="bg-[#0f0f0f] border border-gray-800 rounded-2xl overflow-hidden shadow-md w-full">
      
      
      <div className="relative aspect-[2/3] overflow-hidden">
        <Skeleton className="h-full w-full bg-gray-800" />
      </div>

      
      <CardContent className="p-3 space-y-1">
        
        
        <Skeleton className="h-4 w-[85%] bg-gray-700 rounded-md" />
        
        
        <Skeleton className="h-3 w-[40%] bg-gray-800 rounded-md" />
      
      </CardContent>
    </Card>
    </div>
  );
}