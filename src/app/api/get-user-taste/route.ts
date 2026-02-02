import { apiResponse } from "@/lib/apiResponse";
import dbConnect from "@/lib/dbConnect";
import { getUserTaste } from "@/lib/getUserTaste";
import { authOptions } from "@/lib/options";
import { UserTasteModel } from "@/model/UserTaste.model";
import { UserTasteInput } from "@/types/UserTaste";
import { getServerSession, User } from "next-auth";

export async function GET() {
  
  await dbConnect();
  try {
    const session = await getServerSession(authOptions);
    const user: User = session?.user as User;

    if (!user || !user._id || !session)
      return apiResponse(false, "Not Authorized", 401);

     
     const getUserTasteResponse:Promise<UserTasteInput> = getUserTaste(user._id)       //TODO:- clg user (check user.id and user._id for Oauth users)
     if(!getUserTasteResponse) return apiResponse(false,"Error in getting user taste",400)

      return apiResponse(true, "User taste fetched successfully",200,getUserTasteResponse)
    


    
    
    
  } catch (error) {
    return apiResponse(
      false,
      "Something unexpected error occured in uploading users' taste data",
      400
    );
  }
}
