import { Card, CardContent, CardHeader, CardTitle } from "components/ui/card";


export default function ProfileDetails({title,para}:{title:string,para:string}) {
  return (
    <Card className="w-[300px] bg-purple-700 shadow-md hover:shadow-lg transition">
      <CardHeader>
        <CardTitle className="text-lg text-black font-semibold">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-white ">
          {para}
        </p>
      </CardContent>
    </Card>
  )
}