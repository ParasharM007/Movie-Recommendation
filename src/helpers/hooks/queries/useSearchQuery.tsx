
import { MovieData } from "@/types/MovieData";
import { useQuery } from "@tanstack/react-query"
import axios, { AxiosResponse } from "axios";


const fetchSearchQuery=async(q:string):Promise<MovieData[] | null>=>{
    const res: AxiosResponse = await axios.get(
        `/api/search-movie?query=${q}`,
      );
        
        
       const value = res.data.data?? [];
       return value

}
export const useSearchQuery=(query:string)=>{
    return useQuery({
        queryKey:['searchQuery',query],
        queryFn:()=>fetchSearchQuery(query),
        enabled:!!query
    })
}