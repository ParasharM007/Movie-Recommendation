import { Card, CardContent, CardHeader } from "components/ui/card";
import { Skeleton } from "components/ui/skeleton";


export function SkeletonCard() {
  return (
    <Card className=" bg-black w-[20%] border-gray-700">
      <CardHeader>
        <Skeleton className="bg-gray-700 h-4 w-12" />
        <Skeleton className="h-4 w-8 bg-gray-700" />
      </CardHeader>
      <CardContent>
        <Skeleton className="aspect-video h-4 w-15 bg-gray-700" />
      </CardContent>
    </Card>
  )
}
