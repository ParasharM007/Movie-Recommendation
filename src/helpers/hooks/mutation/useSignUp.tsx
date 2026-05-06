import { ErrorType } from "@/types/ErrorType"
import { ExpectedResponse } from "@/types/ExpectedResponse"
import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

type payLoad ={
    email:string,
    password:string
  }
export const useSignUp=()=>{
    const router = useRouter()
     
      return useMutation<ExpectedResponse<null>, AxiosError<ErrorType>, payLoad>(
        {
        mutationFn:async(data:payLoad)=>{
        const res= await axios.post(`/api/cred-sign-up`,data)
        return res.data
      },
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
          },})
}