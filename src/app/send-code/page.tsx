'use client'
import { ExpectedResponse } from '@/types/ExpectedResponse';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { Loader2 } from 'lucide-react';
import { useState } from 'react'
import { toast } from 'sonner';

const sendOTP = () => {
    const [email, setEmail] = useState("");
    
   
    
    type ErrorType = {
    message: string;
  };
    const mutation = useMutation<
    ExpectedResponse<null>,
    AxiosError<ErrorType>,
    string
    >({
        mutationFn:async ()=>{
            
            const res:AxiosResponse= await axios.post('/api/sendOTP',{
                email
            })
            return res.data

        }
    })
   
    const handleSendOTP=async()=>{
        
        mutation.mutate(email,{
            onSuccess:()=>{
                toast("OTP sent",{

                    description:"otp sent please check your email"
                })
            },
            onError:(err)=>{
                 toast.error("Failed to send OTP",{

                    description: err.response?.data.message || "something went wrong in sending otp",
                })

            }
            
        })
      
    }
  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className="w-full max-w-md bg-black border border-gray-500 rounded-2xl shadow-lg p-8">
        
        <h1 className="text-2xl font-bold text-white text-center mb-5">
          Get OTP to set password
        </h1>
       

       
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />


           <button
            onClick={handleSendOTP}
            disabled={mutation.isPending}
            className="w-full cursor-pointer bg-white text- font-medium text-black py-2 rounded-lg hover:bg-black hover:text-white transition"
          >
            {mutation.isPending ? (<div className='flex justify-center items-center'>
                Sending... <Loader2 className=' animate-spin'/>
            </div>
                
                ): "Send OTP"}
          </button>

          </div>
          </div>
          </div>

  )
}

export default sendOTP