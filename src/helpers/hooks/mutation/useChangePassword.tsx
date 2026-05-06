import { ErrorType } from "@/types/ErrorType"
import { ExpectedResponse } from "@/types/ExpectedResponse"
import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError, AxiosResponse } from "axios"
import { useRouter } from "next/navigation"

import { toast } from "sonner"

type responseData = {
    id:string,
    email:string
}
 
   type payLoad ={
    newPassword:string,
    oldPassword:string,
   
  }

  const changePasswordFunc=async({newPassword, oldPassword}:payLoad)=>{
           const data={
            newPassword,
            oldPassword
           }
            
            const res:AxiosResponse= await axios.post(`/api/change-password`,data)
            return res.data

        }

  
export const useChangePassword =()=>{
    const router =useRouter()
    
    return useMutation<
    ExpectedResponse<responseData>,
    AxiosError<ErrorType>,
    payLoad
    >({
        mutationFn:changePasswordFunc,
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
}