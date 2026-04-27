import { apiResponse } from "@/lib/apiResponse";
import dbConnect from "@/lib/dbConnect";
import axios from "axios";

export async function GET(req: Request) {
  await dbConnect();
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return apiResponse(false,"MovieId is missing",400)
    }
    
    const apiKey = process.env.TMDB_API_KEY;
    let TMDB_BASE_URL = process.env.TMDB_BASE_URL
         

    const [movieRes, videosRes, creditsRes] = await Promise.all([
      axios.get(
        `${TMDB_BASE_URL}/movie/${id}?api_key=${apiKey}&language=en-US&include_adult=false`,
      ),
      axios.get(
        `${TMDB_BASE_URL}/movie/${id}/videos?api_key=${apiKey}&language=en-US&include_adult=false`,
        
      ),
      axios.get(
        `${TMDB_BASE_URL}/movie/${id}/credits?api_key=${apiKey}&language=en-US&include_adult=false`,
        
      ),
    ]);

    if(movieRes)
        console.log("Movide Data ",movieRes.data)

    if (!movieRes || !movieRes.data) {
      return apiResponse(false, "Failed to fetch movie data",400)
    }
    if (!videosRes ||!videosRes.data) {
      return apiResponse(false, "Failed to fetch movie data",400)
    }
    if (!creditsRes || !creditsRes.data) {
      return apiResponse(false, "Failed to fetch movie data",400)
    }
    const movies=movieRes.data? movieRes.data:null
    const videos=videosRes.data? videosRes.data:null
    const credits=creditsRes.data? creditsRes.data:null

    
   return apiResponse(true,"Movie data fetched successfully",200,{
    movies,
    videos,
    credits,
   })
  } catch (error) {
    return apiResponse(false,"Error fetching Movie data",500)
  }
}
