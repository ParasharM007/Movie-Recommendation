
import VerificationEmail from "@/emails/VerificationEmail";
import { ExpectedResponse } from "../types/ExpectedResponse";
import { resend } from "../lib/resend";



export  default async function sendVerificationEmail(
    email:string,
    verifyCode:string
):Promise<ExpectedResponse>{
    try {
    const result = await resend.emails.send({
      from: "Movie Recommendation <onboarding@resend.dev>",
      to: [email],
      subject: 'Movie Recommendation | Verification Email',
         react: <VerificationEmail otp={verifyCode} />,
      
      

    });
    if(result)
        console.log("Email response:- ",result)

    return {
        success:true, message:"Verification email sent successfully"
    }

    } catch (error) {
        console.log("Error in sending Email for verification "+error)
        return {
            success:false, message:"Failed to send Verification Email"
        }
        
    }
         
}
