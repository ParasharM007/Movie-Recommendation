
import z from "zod";

export const loginSchema=z.object({
    email: z.email({message:"Please provide valid email"}),
    password:z.string().min(8,{message:"Password must be 8 characters"}),
    
    
})
