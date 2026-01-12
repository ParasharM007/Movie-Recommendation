import sendPasswordSetEmail from "@/src/helpers/sendPasswordSet";
import { apiResponse } from "@/src/lib/apiResponse";
import dbConnect from "@/src/lib/dbConnect";
import UserModel from "@/src/model/User.modle";

async function POST(req:Request) {
    await dbConnect()
    try {
        const { email } = await req.json()
        const decodedEmail = decodeURIComponent(email)
        if(!decodedEmail || !email)
            return apiResponse(false, "Email not found",400) 

        const findUser = await UserModel.findOne({email:email})
        if(!findUser)
            return apiResponse(false, "User not found",400) 

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
       const result = await sendPasswordSetEmail(email, otp)
       if(!result.success)
         return apiResponse(false, "Error in sending Email",400)

 
       return apiResponse(true, "Email to set password sent successfully",200)


    } catch (error) {
        return apiResponse(false, "Error in sending OTP",400)
    }
    
    
}