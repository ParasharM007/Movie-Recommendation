
//Todo:- add zod validation for verify code too.

import { apiResponse } from "@/lib/apiResponse";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.modle";


export async function POST(request: Request) {
  await dbConnect();
  try {
    const { code, email } = await request.json();
    const decodedEmail = decodeURIComponent(email);
    const user = await UserModel.findOne({
      email: decodedEmail,
    });
    console.log("This is the user in verify code :- "+user)
    if(!user){
       return apiResponse(false,"User not found",400)
        
    }
    const isCodeValid = user.verifyCode === code
    const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date()
    if(isCodeValid && isCodeNotExpired){
        user.isVerified = true
        await user.save()
        const userDTO={
          isVerified: true
        }
       return apiResponse(true,"Acccount Verified Successfully",200,userDTO)
    }
    else if(!isCodeNotExpired){
    return apiResponse(false,"Verification code has been expired, please sign up again to get new code",400)  
    }
    else {
      return apiResponse(false,"Incorrect Verificatin code",400)

    }
  } catch (error) {
    console.error("Error verifying user " + error);
   return apiResponse(false,"Error verifying user",500)
  }
}
