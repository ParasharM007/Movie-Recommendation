import { apiResponse } from "@/lib/apiResponse";
import dbConnect from "@/lib/dbConnect";
import { getUserTaste } from "@/lib/getUserTaste";
import { authOptions } from "@/lib/options";
import { UserTasteInput } from "@/types/UserTaste";
import { getServerSession, User } from "next-auth";

export async function GET(req:Request){
    const session = await getServerSession(authOptions)
    const user:User = session?.user as User
    if (!user || !user._id || !session)
          return apiResponse(false, "Not Authorized", 401);
    
   try {
     await dbConnect()
     const userTaste:UserTasteInput = await getUserTaste(user._id)
 
     if(!userTaste) return apiResponse(false,"Error occurred in finding user taste",400)
 
     return apiResponse(true,"User Taste Fetched",200,userTaste)
   } catch (error) {
    return apiResponse(false, "Something unexpected occurred",400)
    
   }

}