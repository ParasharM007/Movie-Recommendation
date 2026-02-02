import sendPasswordSetEmail from "@/helpers/sendPasswordSet";
import { apiResponse } from "@/lib/apiResponse";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.modle";

export async function POST(req:Request) {
    await dbConnect()
    try {
        const { email } = await req.json()
        console.log("Email:- ",email)
        const decodedEmail = decodeURIComponent(email)
        if(!decodedEmail || !email)
            return apiResponse(false, "Email not found",400) 

        const findUser = await UserModel.findOne({email:email})
        if(!findUser)
            return apiResponse(false, "User not found",400) 

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        
         
         const codeExpiry = new Date();
         codeExpiry.setHours(codeExpiry.getHours() + 1);
        findUser.verifyCode=otp
        findUser.verifyCodeExpiry=codeExpiry
        await findUser.save()
       const result = await sendPasswordSetEmail(email, otp)
       if(!result.success)
         return apiResponse(false, "Error in sending Email",400)

 
       return apiResponse(true, "Email to set password sent successfully",200,null)


    } catch (error) {
        return apiResponse(false, "Error in sending OTP",400)
    }
    
    
}