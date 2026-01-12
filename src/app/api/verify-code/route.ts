
//Todo:- add zod validation for verify code too.

import { apiResponse } from "@/src/lib/apiResponse";
import dbConnect from "@/src/lib/dbConnect";
import UserModel from "@/src/model/User.modle";


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
       return apiResponse(true,"Acccount Verified Successfully",200)
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
