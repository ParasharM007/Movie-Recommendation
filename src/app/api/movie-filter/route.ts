import { apiResponse } from "@/lib/apiResponse";
import dbConnect from "@/lib/dbConnect";
import { MovieData } from "@/types/MovieData";
import axios from "axios";


export async function POST(req: Request) {
  await dbConnect();
  try {
    const body = await req.json();
    const { genres, rating, yearFrom, yearTo, sortBy, page } = body as {
      genres: string[];
      rating: number;
      yearFrom: string;
      yearTo: string;
      sortBy: string;
      page:number;
    };

    if (body) console.log("Filters:- ", body);

    const buildQuery = () => {
      const params = new URLSearchParams();

      if (genres && genres.length && genres.length !== 0)
        params.append("with_genres", genres.join(","));

      if (rating >= 0) params.append("vote_average.gte", rating.toString());

      if (yearFrom)
        params.append("primary_release_date.gte", `${yearFrom}-01-01`);

      if (yearTo) params.append("primary_release_date.lte", `${yearTo}-12-31`);

      if (sortBy) params.append("sort_by", sortBy);
      
      params.append("vote_count.gte", "50");   // to get movie with minimum vote count of 50
      params.append("page", page.toString())

      return params.toString();
    };

    const query = buildQuery();
    if (query) console.log("query:- ", query);

    //TODO:- send this query to tmdb api
  
 
        const { data } = await axios.get(
         `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&${query}`,
          // {
            // params: {
            //  query              //this will send query as ?query= .... in url but we want to send query directly right after ?...
            // },
          // },
        );

        if (data) console.log("Get Filter Page data ", data);

        //we have to return this kind of data (same as retun type after ai search):-
        // id: tmdbData.id,
        // title: tmdbData.title || tmdbData.name,
        // genre: rec.title,
        // poster: tmdbData.poster_path,
        // rating: tmdbData.vote_average,
        // overview: tmdbData.overview,
        // reason: item.reason, // AI personalization

        const movies:MovieData[] = data.results.map((tmdbData: any) => ({
          id: tmdbData.id,
          title: tmdbData.title || tmdbData.name,
          genre: null,
          poster: tmdbData.poster_path
            ? `https://image.tmdb.org/t/p/w500${tmdbData.poster_path}`
            : null,
          rating: tmdbData.vote_average ?? null,
          overview: tmdbData.overview ?? "",
          reason: null, // no AI reason on filter page
        }));

        return apiResponse(true, "Success", 200,movies);
      }
    
      catch (error) {
        return apiResponse(false, "Something went wrong",400)
      }
    } 
   
   
  


      
    