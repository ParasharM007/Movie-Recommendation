import { apiResponse } from "@/lib/apiResponse";
import dbConnect from "@/lib/dbConnect";
import axios, { AxiosResponse } from "axios";


export async function GET(req: Request){
    const apiKey = process.env.TMDB_API_KEY;
    let TMDB_BASE_URL = process.env.TMDB_BASE_URL
 await dbConnect()

 try {
    // we just have to return trending movies via tmdb:- 
    const res:AxiosResponse = await axios.get(`${TMDB_BASE_URL}/trending/movie/day?language=en-US&api_key=${apiKey}`)
    if(!res.data) return apiResponse(false,"Couldn't find trending movies", 400)
    console.log("Trending movies :-  ",res.data)
    const trending = Array.isArray(res.data.results)? res.data.results: [res.data.results]
    return apiResponse(true, "Today's trending movies fetched!",200,trending)
     
 } catch (error:any) {
    console.log("Couldn't fetch trending movies ",error.message)
    return apiResponse(false,"Internal Server Error ",500)
 }

}