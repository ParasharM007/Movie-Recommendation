import { ErrorType } from "@/types/ErrorType"
import { ExpectedResponse } from "@/types/ExpectedResponse"
import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError, AxiosResponse } from "axios"
import { toast } from "sonner"

type payLoad={
    action:string,
    field:string,
    data:string | string[]
}

type UserTasteData ={
    id:string,
    email:string,
    updatedField:string[]
  }
export const useUpdateUserTaste=()=>{

    return useMutation<ExpectedResponse<UserTasteData>,AxiosError<ErrorType>,payLoad>({
        mutationFn:async(data:payLoad)=>{
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

}