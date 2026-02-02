import { apiResponse } from "@/lib/apiResponse";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.modle";
import bcrypt from "bcryptjs";


export async function POST(req:Request) {
    await dbConnect()
   try {
     const { email , password , otp } = await req.json()
    
 
     const findUser  = await UserModel.findOne({email})
     if(!findUser){
         return apiResponse(false,"User not found",400)
     }
    console.log("User jfwojef:- ",findUser)
     const isCodeValid = new Date(findUser.verifyCodeExpiry) > new Date() 
     const isCodeCorrect= findUser.verifyCode === otp
 
     if(!isCodeCorrect)
         return apiResponse(false,"Incorrect otp",400)
     if(!isCodeValid)
         return apiResponse(false,"Otp expired!",400)
     
     const hashedPassword = await bcrypt.hash(password,10)
     findUser.password=hashedPassword
     await findUser.save()
     
     const updatedUser = {
        id:findUser._id.toString(),
        email:findUser.email
     }
     
     return apiResponse(true,"Password set successfully",200,updatedUser)
  
   } catch (error) {
     return apiResponse(false,"Error in setting password",400)
   }   
}