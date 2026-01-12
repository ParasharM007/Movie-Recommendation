
import VerificationEmail from "@/emails/VerificationEmail";
import { ExpectedResponse } from "../types/ExpectedResponse";
import { resend } from "../lib/resend";
import SetPasswordEmail from "@/emails/SetPasswordEmail";



export  default async function sendPasswordSetEmail(
    email:string,
    verifyCode:string
):Promise<ExpectedResponse>{
    try {
    const result = await resend.emails.send({
      from: "Movie Recommendation <onboarding@resend.dev>",
      to: [email],
      subject: 'Movie Recommendation | Password Set Email',
         react: <SetPasswordEmail otp={verifyCode} />,
      
      

    });
    if(result)
        console.log("Email response:- ",result)

    return {
        success:true, message:"set password email sent successfully"
    }

    } catch (error) {
        console.log("Error in sending Email for set password "+error)
        return {
            success:false, message:"Failed to send set password Email"
        }
        
    }
         
}
