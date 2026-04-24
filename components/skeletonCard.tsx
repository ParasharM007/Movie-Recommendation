import { Card, CardContent, CardHeader } from "components/ui/card";
import { Skeleton } from "components/ui/skeleton";


export default function SkeletonCard() {
  return (
    <Card className=" bg-black w-[20%] flex flex-col items-center border-gray-700">
      <CardContent>
        <Skeleton className=" aspect-video bg-gray-700 h-4 w-12 md:w-30 my-1 " />
        <Skeleton className="aspect-video h-4 w-8 md:w-20 bg-gray-700" />
      </CardContent>
      <CardContent>
        <Skeleton className="aspect-video h-4 w-15 md:w-35 bg-gray-700" />
      </CardContent>
    </Card>
  )
}
