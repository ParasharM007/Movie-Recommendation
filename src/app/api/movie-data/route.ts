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
  
         

    const [movieRes, videosRes, creditsRes] = await Promise.all([
      axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`,
      ),
      axios.get(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}&language=en-US`,
        
      ),
      axios.get(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=en-US`,
        
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
