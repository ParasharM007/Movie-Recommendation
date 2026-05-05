'use client'

import { OTPInput } from '@/helpers/sendOTP';
import { ErrorType } from '@/types/ErrorType';
import { ExpectedResponse } from '@/types/ExpectedResponse';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { Loader2 } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react'
import { toast } from 'sonner';

// const setPassword = async( //TODO:- this can't be async , this is wrong 
//   {searchParams}:{
//     searchParams: Promise<{ email?: string; otp?: string }>;
//   }
// ) => {

export default function Page({searchParams}:{
    searchParams: { email?: string; otp?: string };
  }
  )
   {

  
    const [pass, setPass]= useState('')
    const [confpass, setConfPass]=useState('')
    const [code, setCode] = useState(searchParams.otp || '');
    const [email, setEmail] = useState(searchParams.email || '');
    
    

    type responseData = {
        id:string,
        email:string
    }
     
      type payLoad ={
        email:string,
        password:string,
        otp:string
      }
    const mutation =useMutation<
    ExpectedResponse<responseData>,
    AxiosError<ErrorType>,
    payLoad

    
    >({
        mutationFn:async(data:payLoad)=>{
            
            const res:AxiosResponse= await axios.post(`/api/setnew-forget-passw`,data)
            return res.data

        },
         onError:(err)=>{
                 toast.error("Failed to set password",{

                    description: err.response?.data.message || "something went wrong in sending otp",
                })

            },
             onSuccess:(res)=>{
                             toast("Password set successfully",{
            
                                description: res.message || "Password set/reset successfully",
                            })
            
                        }
    })
    const handleSubmit=async()=>{
      if(pass!==confpass) return toast.error("Password fields mismatch",
        {
          description:"new password & confirm password must be same"
        }
      )
     if(email && pass && code){

       const data:payLoad={
         email,
         password:pass,
         otp:code
        }
        mutation.mutate(data)
      }else{

        toast.error("Details missing",
          {
            description:'please provide all details (otp, email, password)'
          }
        )
      }

    }
  return (
     <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-black border border-gray-500 rounded-2xl shadow-lg p-4">
        
        <h1 className="text-md md:text-2xl font-bold text-white text-center m-2  ">
        { email? (  `Welcome👋 ${" "} ${email}`):( "Welcome👋") }
        </h1>
        

       
        <div className="space-y-4">
          <input
            type="password"
            placeholder="New password"
            className="w-full border text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm password"
            className="w-full border text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white"
            value={confpass}
            onChange={(e) => setConfPass(e.target.value)}
          />
          <OTPInput length={6} value={code} onComplete={(otp) => console.log("Final OTP:", otp)}/>


           <button
            onClick={handleSubmit}
            disabled={mutation.isPending}
            className="w-full cursor-pointer bg-white font-medium text-black py-2 rounded-lg hover:bg-black hover:text-white transition"
          >
            {mutation.isPending ? (<div className='flex justify-center items-center'>
                Submiting... <Loader2 className=' animate-spin'/>
            </div>
                
                ): "Submit"}
          </button>

          </div>
          </div>
          </div>

  )
}
 