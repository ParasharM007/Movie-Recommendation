// we have to search movie via ai for logged in user then tmdb search,
// if ai fails then directly tmdb
//if logged out user, then directly tmdb

import { apiResponse } from "@/lib/apiResponse";
import dbConnect from "@/lib/dbConnect";
import { getHomeData } from "@/lib/getHomeData";
import { getUserTaste } from "@/lib/getUserTaste";
import { generateRecommendations } from "@/lib/groq";
import { authOptions } from "@/lib/options";
import { searchQuerySchema } from "@/schemas/searchqueryschema";
import { MovieData } from "@/types/MovieData";
import { UserTasteInput } from "@/types/UserTaste";
import axios from "axios";
import { getServerSession, User } from "next-auth";

export async function GET(req: Request) {
  let TMDB_BASE_URL = "https://api.themoviedb.org/3";
  let TMDB_API_KEY = process.env.TMDB_API_KEY;
  await dbConnect();
  try {
    const { searchParams } = new URL(req.url);
    const queryParam = {
      query: searchParams.get("query") ?? undefined,
    };
    const result = searchQuerySchema.safeParse(queryParam);

    if (!result.success) {
      return apiResponse(false, "Do not exceed characters limit 100", 400);
    }
    let query = result.data.query; // string | undefined
    console.log("This is the query for ai search ", query);
    if (!query) return apiResponse(false, "search query is missing", 400);

    const session = await getServerSession(authOptions);
    const user: User = session?.user as User;

    async function searchQueryWithTMDB(query: string, reason?:string) {
      const res = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
        params: {
          query: query,
          api_key: TMDB_API_KEY,
        },
      });

      if (!res.data) return null;
       
      const temp = user?( res.data.results?.[0] || null): (res.data.results)  // we will assign whole results in temp if user is not logged in

      const arr = Array.isArray(temp) ? temp : [temp];
      const movies: MovieData[] = arr.map((tmdbData: any) => ({
    

        id: tmdbData.id,
        title: tmdbData.title || tmdbData.name,
        genre: null,
        poster: tmdbData.poster_path
          ? `https://image.tmdb.org/t/p/w500${tmdbData.poster_path}`
          : null,
        rating: tmdbData.vote_average ?? null,
        overview: tmdbData.overview ?? "",
        reason: reason ?? null, // no AI reason for logged out user
      }));
      
      return movies;
    }
    if (!session || !user) {
      // User should be able to search via TMDB search:-

      const data: MovieData[] | null = await searchQueryWithTMDB(query);
      console.log("Data:-  ", data);
      if (!data || !data.length)
        return apiResponse(false, "Couldn't find movie", 400);
      if (data.length === 0)
        return apiResponse(true, "Didn't find any movie with this query", 200);
      return apiResponse(true, "User is searching without login ", 200, data);
    }
    if (user) {
      //Now user is logged in and searching something:-
      //we will take user's taste by UserTaste collection:-

      if (user._id) {
        const userTaste: UserTasteInput = await getUserTaste(user._id);
        console.log("UserTaste:- ", userTaste);
        const titles = await generateRecommendations(userTaste, query);
        console.log("Ai data currently for search:- ",titles)
  

        //We have to search ai given titles via tmdb:-
        if (!titles.aiEmpty) {
          const res = await Promise.allSettled(
            titles.recommendations.slice(0, 5).map(async (rec: any) => {
              const data: MovieData[] | null = await searchQueryWithTMDB(rec?.title, rec?.reason);
              console.log("Data:-  ", data);
              if (!data || !data.length) return null;
              if (data.length === 0) return null;

              return data;
            }),
          );
          const rawResults: (MovieData[] | null)[]= res.map((r)=>{
            if(r.status==='fulfilled'&& r.value?.length){
              return r.value

            }
        })
          console.log("raw results ",rawResults)
          const flattened: (MovieData[] | null)[] = rawResults.flatMap((movie:any) => (movie ? movie : []));

          const seen = new Set<number>();

          const uniqueMovies: (MovieData[] | null)[] = flattened.filter((movie:any) => {
            if (seen.has(movie.id)) {
              return false;
            }
            seen.add(movie.id);
            return true;
          });
         

          if (uniqueMovies.length === 0) {
            return apiResponse(
              false,
              "No movies found from TMDB after ai suggestions",
              400,
            );
          }

          return apiResponse(
            true,
            "AI based recommendations fetched according to search",
            200,
            uniqueMovies,
          );
        }

        //If recommendations are not available , we will have to search via TMDB:-
        if (
          !titles|| titles.aiEmpty) {
          console.log("Searching with TMDB directly ");


         try {
           const data: MovieData[] | null = await searchQueryWithTMDB(query);
           console.log("Data:-  ", data);
           if (!data || !data.length)
             return apiResponse(false, "Couldn't find movie", 400);
           if (data.length === 0)
             return apiResponse(
               true,
               "Didn't find any movie with this query",
               200,
             );
             return apiResponse(
               true,
               "Ai response failed, searched with TMDB directly ",
               200,
               data,
             );
         } catch (error) {
           return apiResponse(false, "Couldn't find movie", 400);
          
         }
        }
      
    }
  }
  



} catch {
    return apiResponse(false, "Something went wrong", 500);
  }
}
