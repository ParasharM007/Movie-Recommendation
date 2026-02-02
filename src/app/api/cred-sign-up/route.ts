
import UserModel from "@/model/User.modle";
import dbConnect from "@/lib/dbConnect";
import bcrypt from "bcryptjs";
import sendVerificationEmail from "@/helpers/sendVerification";
import { apiResponse } from "@/lib/apiResponse";


export async function POST(request: Request) {
  await dbConnect()

  try {
    const { email, password } = await request.json();

    if(!email || ! password ) return apiResponse(false,"Please provide details",400)

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const UserByEmail = await UserModel.findOne({ email });
    if (UserByEmail) {
      //Either User is verified or not verified
      if (UserByEmail.isVerified) {
        //User is registered and verified
      return apiResponse(false,"User with this email already exists",400)
      } else {
        //user registered but not verfied
        const hashedPassword = await bcrypt.hash(password, 10);
        UserByEmail.password = hashedPassword;
        UserByEmail.verifyCode = otp;
        // 1 hour in millisecond
        UserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
      }
    } else {

      const hashedPassword = await bcrypt.hash(password, 10);
      const codeExpiry = new Date();
      codeExpiry.setHours(codeExpiry.getHours() + 1);
      const UserRegistered = new UserModel({
        email,
        password: hashedPassword,
        verifyCode: otp,
        verifyCodeExpiry: codeExpiry,
        isVerified: false,
        providers:["credentials"]
      });
      await UserRegistered.save();
      if (!UserRegistered) {
     return  apiResponse(false,"Error while registering user",400)
      }
    }
    //Send verification Email
    const EmailResponse = await sendVerificationEmail(email, otp);
    if (!EmailResponse.success) {
    return  apiResponse(false,EmailResponse?.message,400)
    } else {
      
      return apiResponse(true,"Email for verification sent successfully",201,null)
    }
  } catch (error) {
    console.error("Error in registering the user", error);
  return  apiResponse(false,"Error in registering the user",400)
  }
}
