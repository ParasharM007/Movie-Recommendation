import { ErrorType } from "@/types/ErrorType";
import { ExpectedResponse } from "@/types/ExpectedResponse";
import { UserTasteInput } from "@/types/UserTaste";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";

  type MovieDetails={
     movie:any,
     videos:{results:any[]},
     credits:undefined,
     userTaste:UserTasteInput
   }
   const fetchMovieData=async(id:string):Promise<ExpectedResponse<MovieDetails>>=>{
    const res: AxiosResponse= await axios.get(`/api/movie-data?id=${id}`)
    return res.data;
   }
export const useFetchMovie = (id:string)=>{
    return useQuery<ExpectedResponse<MovieDetails>,AxiosError<ErrorType>>({
    queryKey: ["movie-data", id],
    queryFn: ()=>fetchMovieData(id),
    staleTime: 1000 * 60,   //60 sec
    refetchOnWindowFocus: false,
    retry:1
  })
    
}