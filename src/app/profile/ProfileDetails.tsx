import { Card, CardContent, CardHeader, CardTitle } from "components/ui/card";
import { Clapperboard, Film, Sparkles } from "lucide-react";


export default function ProfileDetails({title,para}:{title:string,para:string}) {
 return (
  <Card className="group relative w-[290px] hover:scale-[1.03] bg-gradient-to-br from-[#141414] to-[#1f1f1f] border border-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:shadow-black/40 transition-all duration-300 cursor-pointer">
    
    
    <div className="absolute inset-0 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition duration-300 bg-gradient-to-r from-purple-600/10 via-transparent to-purple-600/10" />

    <CardHeader className="pb-2">
         <Clapperboard size={18} className="text-purple-400" />
         
      <CardTitle className="text-lg font-semibold text-white tracking-wide group-hover:text-purple-400 transition">
        {title}
      </CardTitle>
    </CardHeader>

    <CardContent>
      <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition">
        {para}
      </p>
    </CardContent>

    
    <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-purple-500 group-hover:w-full transition-all duration-300" />
  </Card>
);
}