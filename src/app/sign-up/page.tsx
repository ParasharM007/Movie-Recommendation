'use client'
import { ErrorType } from '@/types/ErrorType';
import { ExpectedResponse } from '@/types/ExpectedResponse';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useState } from 'react'
import { toast } from 'sonner';
import { fa } from 'zod/v4/locales';


const signUp = () => {
     const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [loading, setLoading] = useState(false);
      const router = useRouter()
      

      
      type payLoad ={
        email:string,
        password:string
      }
     
      const mutation = useMutation<ExpectedResponse<null>, AxiosError<ErrorType>, payLoad>({mutationFn:async(data:payLoad)=>{
        setLoading(true)
        const res= await axios.post(`/api/cred-sign-up`,data)
        return res.data
      }})
      const handleRegister=async()=>{


        if(!email || !password){
          toast('Please provide your credentials')
          return
        }
        mutation.mutate({email, password},{
          onSuccess:()=>{
             toast("User Registered",
              {
                description:"user successfully registered"
              }
             )
             router.replace('/genres-selection')
          },
          onError:(error)=>{
             toast(error.response?.data?.message ||
                            error.message || "Error in registeration",
            
             )
          },
          onSettled:()=>{
            setLoading(false)
          }
      
        })
        

      }
  return (
     <div className="min-h-screen flex items-center justify-center  px-4">
      <div className="w-full max-w-md bg-black border border-gray-500 rounded-2xl shadow-lg p-8">
        
        <h1 className="text-2xl font-bold text-white text-center mb-7">
           Welcome To MovieRecommendation👋
          </h1>
      
  
         
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full border text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
  
            <input
              type="password"
              placeholder="Password"
              className="w-full border text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
  
            <button
              onClick={handleRegister}
              disabled={loading}
              className="w-full cursor-pointer bg-black text- font-medium text-white py-2 rounded-lg hover:bg-gray-900 transition"
            >
              {loading ? "Signing up..." : "Sign up"}
            </button>
          </div>
  
       
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-white" />
            <span className="px-4 text-sm text-gray-200">OR</span>
            <div className="flex-1 h-px bg-white" />
          </div>
  
  
          <div className="space-y-3">
            <button
              onClick={() => signIn("google")}
              className="w-full flex items-center justify-center gap-3 border py-2 rounded-lg cursor-pointer text-white hover:bg-gray-50 hover:text-black transition"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
              />
              Continue with Google
            </button>
  
            <button
              onClick={() => signIn("discord")}
              className="w-full flex items-center justify-center gap-3 border py-2 rounded-lg cursor-pointer text-white hover:bg-gray-50 hover:text-black transition"
            >
              <img
                src="https://www.svgrepo.com/show/353655/discord-icon.svg"
                alt="Discord"
                className="w-5 h-5"
              />
              Continue with Discord
            </button>
          </div>
            <p className="text-center text-sm text-gray-100 mt-6">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-purple-400 font-medium">
            Sign in
          </Link>
        </p>
         
        </div>
      </div>
    );
}

export default signUp