import { apiResponse } from "@/lib/apiResponse";
import dbConnect from "@/lib/dbConnect";
import { authOptions } from "@/lib/options";
import UserModel from "@/model/User.modle";
import bcrypt from "bcryptjs";
import { Document } from "mongoose";
import { User } from "next-auth";
import { getServerSession } from "next-auth";




export async function POST(req:Request) {
    await dbConnect()
    try {
        const { oldPassword, newPassword } = await req.json()
        const session = await getServerSession(authOptions)
        const user:User = session?.user as User 
        if(!session || !user || !user._id){
            return apiResponse(false,"Not authorized",401)
        }
       
        const  findUser = await UserModel.findById(user._id)
        if(!findUser){
           return apiResponse(false,"User not found",404)
        }
        
        if(!findUser.password && findUser.providers.length){

             const providersList = findUser.providers.join("or")
            return apiResponse(false,`You logged in with ${providersList}, Please set a password first`,400)
        }
        if(!findUser.password){
             return apiResponse(false,"Please set password first",400)
        }
         
            const isPasswordCorrect = bcrypt.compare(oldPassword, findUser.password)
         if(!isPasswordCorrect){
             return apiResponse(false,"Incorrect password",401)
         }
         // we have to hash password before putting in DB:-
         const hashPassword =await bcrypt.hash(newPassword,10)
         findUser.password = hashPassword
         await findUser.save()
         
        //  const userObject = findUser.toObject()
        // delete userObject.password
         const userObject = {
            id:findUser._id.toString(),
            email:findUser.email

         }
         return apiResponse(true,"Password changed successfully",200,userObject)

    } catch (error) {
       return apiResponse(false, "Something unexpected occured while changing password",400)
    }
}