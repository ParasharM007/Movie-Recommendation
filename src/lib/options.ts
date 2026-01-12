
import dbConnect from "@/src/lib/dbConnect";
import UserModel from "@/src/model/User.modle";
import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";
import { apiResponse } from "./apiResponse";

export const authOptions:NextAuthOptions = {
  providers: [
   CredentialsProvider({
    id: "credentials",
    name: "Credentials",
    
    credentials: {
      
      email: { label: "Email", type: "text ", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },
    
      async authorize(credentials:any ):Promise<any> {
      await dbConnect()
      try {
      //  const user= await UserModel.findOne({email:credentials.identifier})  //Caution
       const user= await UserModel.findOne({email:credentials.email})
        if(!user){
            throw new Error("No user found with these credentials")
        }
        if(!user.isVerified){
           throw new Error("Please Verify your account before login!!")
          
        }
       if (!user.password) {
    throw new Error("This account was created using OAuth");
  }


      // While checking password, write credentials.password not credentials.identifier.password
          
            const isPasswordCorrect = await bcrypt.compare(credentials.password, user?.password)
          if(!isPasswordCorrect){
            throw new Error("Incorrect Password")
          }
      return user
        

      } catch (error:any) {
        throw new Error(error)
      }
    },
    
    
}),


  GoogleProvider({
   clientId: process.env.GOOGLE_CLIENT_ID!,
   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
 }),


 DiscordProvider({
   clientId: process.env.DISCORD_CLIENT_ID!,
   clientSecret: process.env.DISCORD_CLIENT_SECRET!,
 }),
],
callbacks: {

  async signIn({ user, account }) {
     if (!account) return true 
    if (account?.provider !== "credentials") {
      const existingUser = await UserModel.findOne({ email: user.email });

      if (!existingUser) {
        await UserModel.create({
          email: user.email,
          isVerified: true,
          provider: account.provider,
        });
      }
    }
    return true;
  },

  async jwt({ token, user }) {
    
    if (user) {
      token._id = user._id?.toString();
    }


    if (token._id) {
      const dbUser = await UserModel.findById(token._id);

      if (dbUser) {
        token.isVerified = dbUser.isVerified;
      }
    }

    return token;
  },

  async session({ session, token }) {
    if (token && session.user) {
      session.user._id = token._id as string;
      session.user.isVerified = token.isVerified as boolean;
    }
    return session;
  },
},

pages:{
  signIn:'/sign-in',
},
session:{
  strategy:'jwt'
},
secret:process.env.NEXTAUTH_SECRET,
}
