'use client'

import { OTPInput } from '@/helpers/sendOTP';
import { ErrorType } from '@/types/ErrorType';
import { ExpectedResponse } from '@/types/ExpectedResponse';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { routerServerGlobal } from 'next/dist/server/lib/router-utils/router-server-context';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react'
import { toast } from 'sonner';

export default function changePassword() {

    
    const [newPass, setNewPass]= useState('')
    const [showNewPass, setShowNewPass] = useState(false)
    const [oldPass, setOldPass]= useState('')
    const [showOldPass, setShowOldPass] = useState(false)
    const router =useRouter()
  
  
   
   
    type responseData = {
        id:string,
        email:string
    }
     
      type payLoad ={
        newPassword:string,
        oldPassword:string,
       
      }
    const mutation =useMutation<
    ExpectedResponse<responseData>,
    AxiosError<ErrorType>,
    payLoad

    
    >({
        mutationFn:async(data:payLoad)=>{
            
            const res:AxiosResponse= await axios.post(`/api/change-password`,data)
            return res.data

        },
         onError:(err)=>{
                 toast.error("Failed to change password",{

                    description: err.response?.data.message || "something went wrong in sending otp",
                })

            },
             onSuccess:(res)=>{
                             toast("Password changed successfully",{
            
                                description: res.message || "Password reset successfully",
                            })
                        router.push('/profile')
            
                        }
    })
    const handleSubmit=async()=>{
      if(newPass===oldPass) return toast.error("Old & new password can't be same",
        {
          description:"new password & old password can't be same"
        }
      )
     if(newPass && oldPass){

       const data:payLoad={
        newPassword:newPass,
        oldPassword:oldPass
        }
        mutation.mutate(data)
      }else{

        toast.error("Details missing",
          {
            description:'please provide all details'
          }
        )
      }

    }
  return (
     <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-black border border-gray-500 rounded-2xl shadow-lg p-8">
        
        <h1 className="text-md md:text-2xl font-bold text-white text-center m-2 mb-5  ">
       Change password
        </h1>
        

       
        <div className="space-y-5">
          <div className='relative w-full'>
          
          <input
            type={showOldPass ? "text" : "password"}
            placeholder="Old password"
            className="w-full border text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white"
            value={oldPass}
            onChange={(e) => setOldPass(e.target.value)}
            />
            <button
        type="button"
        onClick={() => setShowOldPass(!showOldPass)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
      >
        {showOldPass ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
            </div>
               <div className='relative w-full'>

          <input
            type={showNewPass ? "text" : "password"}
            placeholder="New password"
            className="w-full border text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
            />
             <button
        type="button"
        onClick={() => setShowNewPass(!showNewPass)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
      >
        {showNewPass ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
          
            </div>


           <button
            onClick={handleSubmit}
            disabled={mutation.isPending}
            className="w-full cursor-pointer bg-white text- font-medium text-black py-2 rounded-lg hover:bg-black hover:text-white transition"
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
 

