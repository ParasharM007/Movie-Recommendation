import { Card, CardContent, CardHeader } from "components/ui/card";
import { Skeleton } from "components/ui/skeleton";


export function SkeletonCard() {
  return (
    <Card className="w-full bg-black max-w-xs border-gray-800">
      <CardHeader>
        <Skeleton className="bg-gray-700 h-4 w-2/3" />
        <Skeleton className="h-4 w-1/2 bg-gray-700" />
      </CardHeader>
      <CardContent>
        <Skeleton className="aspect-video w-full bg-gray-700" />
      </CardContent>
    </Card>
  )
}
