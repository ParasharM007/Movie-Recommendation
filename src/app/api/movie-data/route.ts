import { apiResponse } from "@/lib/apiResponse";
import dbConnect from "@/lib/dbConnect";
import { getUserTaste } from "@/lib/getUserTaste";
import { authOptions } from "@/lib/options";
import { UserTasteInput } from "@/types/UserTaste";
import axios from "axios";
import { getServerSession, User } from "next-auth";

export async function GET(req: Request) {
  await dbConnect();
  try {
    const session = await getServerSession(authOptions);
        const user: User = session?.user as User;
    
        if (!user || !user._id || !session)
          return apiResponse(false, "Not Authorized", 401);
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return apiResponse(false,"MovieId is missing",400)
    }

    const apiKey = process.env.TMDB_API_KEY;
  
    
    const userTaste:UserTasteInput = await getUserTaste(user._id)
     
         if(!userTaste) return apiResponse(false,"Error occurred in finding user taste",400)
     
         

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
    userTaste
   })
  } catch (error) {
    return apiResponse(false,"Error fetching Movie data",500)
  }
}
