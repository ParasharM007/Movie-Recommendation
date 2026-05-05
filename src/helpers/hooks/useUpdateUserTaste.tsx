import { ErrorType } from "@/types/ErrorType"
import { ExpectedResponse } from "@/types/ExpectedResponse"
import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError, AxiosResponse } from "axios"
import { toast } from "sonner"

type Props={
    action:string,
    field:string,
    data:string | string[]
}

type UserTasteData ={
    id:string,
    email:string,
    updatedField:string[]
  }
export default function useUpdateUserTaste(){

    const mutation = useMutation<ExpectedResponse<UserTasteData>,AxiosError<ErrorType>,Props>({
        mutationFn:async(data:Props)=>{
            const res:AxiosResponse= await axios.post(`/api/update-user-taste`,data)
            return res.data
        },
         onSuccess:(res,variables)=>{
            toast.success(`${res.message}`|| `User Field ${variables.field} updated successfully`)
            
        },
        onError:(err,variables)=>{
            toast.error(`${err.message}`||`Failed to update ${variables.field} field`)
            
        }
       
    })
return mutation

}