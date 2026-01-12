import z from "zod"
export const OTPSchema =z.string()
                         .regex(/^\d{6}$/, { message: "OTP must be exactly 6 digits" })