import { authOptions } from "@/lib/options";
import { MovieData } from "@/types/MovieData";
import axios from "axios";
import { getServerSession, User } from "next-auth";
import poster from '../../../public/image/poster_unavailable.png'

export async function searchQueryWithTMDB(query: string, reason?:string, genre?:string) {
   try { const session = await getServerSession(authOptions);
    const user: User = session?.user as User;
      let TMDB_BASE_URL = process.env.TMDB_BASE_URL;
  let TMDB_API_KEY = process.env.TMDB_API_KEY;
      const res = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
        params: {
          query: query,
          api_key: TMDB_API_KEY,
          include_adult: false,
        },
      });

      if (!res.data) return null;
       
      const temp = user?( res.data.results?.[0] || null): (res.data.results)  // we will assign whole results in temp if user is not logged in

      const arr = Array.isArray(temp) ? temp : [temp];
      console.log("array of tmdbData[] ",arr)
      const movies: MovieData[] = arr.map((tmdbData: any) => ({
    

        id: tmdbData.id,
        title: tmdbData.title || tmdbData.name,
        genre: genre ?? null,
        poster: tmdbData.poster_path
          ? `https://image.tmdb.org/t/p/w500${tmdbData.poster_path}`
          : poster.src,
        rating: tmdbData.vote_average ?? null,
        overview: tmdbData.overview ?? "",
        reason: reason ?? null, // no AI reason for logged out user
      }));
      
      return movies;
    } catch{
        return null; 

    }
    }