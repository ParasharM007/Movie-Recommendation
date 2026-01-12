
import z from "zod";
import { OTPSchema } from "./otpschema";

export const setPasswordForgetPasswordSchema=z.object({
    otp:OTPSchema,
    password:z.string().min(8,{message:"Password must be 8 characters"}),
    confirmpassword:z.string().min(8,{message:"Password must be 8 characters"}),
})
