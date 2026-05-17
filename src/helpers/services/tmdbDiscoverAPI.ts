import { MovieData } from "@/types/MovieData";
import axios from "axios";

export async function discoverWithTMDB(genreId:string, genreName:string){
    let TMDB_BASE_URL = process.env.TMDB_BASE_URL

     const { data } = await axios.get(
          `${TMDB_BASE_URL}/discover/movie`,
          {
            params: {
              api_key: process.env.TMDB_API_KEY,
              with_genres: genreId,
              sort_by: "popularity.desc",
              vote_count_gte: 20,
              page: 1,
              include_adult: false,
              language:"en-US",
            },
          },
          
        );

        // if (data) console.log("Get Home Page data ", data);

        //we have to return this kind of data (same as retun type after ai search):-
        // id: tmdbData.id,
        // title: tmdbData.title || tmdbData.name,
        // genre: rec.title,
        // poster: tmdbData.poster_path,
        // rating: tmdbData.vote_average,
        // overview: tmdbData.overview,
        // reason: item.reason, // AI personalization

        const movies:MovieData[] = data.results.slice(0, 6).map((tmdbData: any) => ({
          id: tmdbData.id,
          title: tmdbData.title || tmdbData.name,
          genre: genreName,
          poster: tmdbData.poster_path
            ? `https://image.tmdb.org/t/p/w500${tmdbData.poster_path}`
            : null,
          rating: tmdbData.vote_average ?? null,
          overview: tmdbData.overview ?? "",
          reason: null, // no AI reason on homepage
        }));

        return movies;
      }
