import { apiResponse } from "@/src/lib/apiResponse";
import dbConnect from "@/src/lib/dbConnect";
import { authOptions } from "@/src/lib/options";
import UserModel from "@/src/model/User.modle";
import bcrypt from "bcryptjs";
import { getServerSession, User } from "next-auth";

export async function POST(req:Request) {
    await dbConnect()
   try {
     const { password , otp } = await req.json()
     const session = await getServerSession(authOptions)
     const user:User = session?.user as User
 
     const findUser  = await UserModel.findById(user._id)
     if(!findUser){
         return apiResponse(false,"User not found",400)
     }
 
     const isCodeValid = new Date(findUser.verifyCodeExpiry) > new Date() 
     const isCodeCorrect= findUser.verifyCode === otp
 
     if(!isCodeCorrect)
         return apiResponse(false,"Incorrect otp",400)
     if(!isCodeValid)
         return apiResponse(false,"Otp expired!",400)
     
     const hashedPassword = await bcrypt.hash(password,10)
     findUser.password=hashedPassword
     await findUser.save()
     const updatedUser = findUser.toObject()
     delete updatedUser.password
     
     return apiResponse(true,"Password set successfully",200,updatedUser)
  
   } catch (error) {
     return apiResponse(false,"Error in setting password",400)
   }   
}