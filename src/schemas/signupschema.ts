import z from "zod";

export const signUpSchema =z.object({
    email: z.email({message:"Please provide valid email"}),
    password:z.string().min(8,{message:'password must have at least 8 characters'})
})