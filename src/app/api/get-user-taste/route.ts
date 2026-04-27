import { apiResponse } from "@/lib/apiResponse";
import dbConnect from "@/lib/dbConnect";
import { getUserTaste } from "@/lib/getUserTaste";
import { authOptions } from "@/lib/options";
import { UserTasteModel } from "@/model/UserTaste.model";
import { MovieData } from "@/types/MovieData";
import { UserTasteInput } from "@/types/UserTaste";
import axios from "axios";
import { getServerSession, User } from "next-auth";

export async function GET(req: Request) {
  let TMDB_BASE_URL = process.env.TMDB_BASE_URL;
  let TMDB_API_KEY = process.env.TMDB_API_KEY;
  const allowedFields = [
    "likedGenres",
    "favorites",
    "recentlyLiked",
    "alreadyWatched",
    "watchlist",
  ] as const;

  type allowedField = (typeof allowedFields)[number];

  await dbConnect();
  try {
    const { searchParams } = new URL(req.url);
    const field = searchParams.get("field");

    if (!field) {
      return apiResponse(false, "Field is missing", 400);
    }
    if (!allowedFields.includes(field as allowedField)) {
      return apiResponse(false, "Invalid field", 400);
    }

    const safeField: allowedField = field as allowedField;

    const session = await getServerSession(authOptions);
    const user: User = session?.user as User;

    if (!user || !user._id || !session)
      return apiResponse(false, "Not Authorized", 401);

    const getUserTasteResponse: UserTasteInput = await getUserTaste(user._id); //TODO:- clg user (check user.id and user._id for Oauth users)
    if (!getUserTasteResponse)
      return apiResponse(false, "Error in getting user taste", 400);

    if (!getUserTasteResponse[safeField]) {
      return apiResponse(
        false,
        `User's ${safeField} field does not exists`,
        400,
      );
    }
    if (getUserTasteResponse[safeField].length === 0) {
      return apiResponse(
        true,
        `User's ${safeField} field is empty`,
        200,
        getUserTasteResponse[safeField],
      );
    }

    getUserTasteResponse[safeField] &&
      console.log("Field data:- ", getUserTasteResponse[safeField]);
    //now we will check if field is likedGenres or not :-
    if (safeField === "likedGenres") {
      return apiResponse(
        true,
        "Fetched Liked Genres",
        200,
        getUserTasteResponse[safeField],
      );
    }

    //take field data to search from tmdb api
    // we will create func. that search with tmdb id:-

    async function searchMovieByIdWithTMDB(id: string) {
      const movieId = Number(id);
      const res = await axios.get(
        `${TMDB_BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}&language=en-US&include_adult=false`,
        {},
      );


      if (!res.data) return null;
      console.log("Res from TMDB :- ", res.data)
      const temp = res.data;
      

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
        reason: null,
      }));

      return movies;
    }

    // now we will return data:-

    const res = await Promise.allSettled(
      getUserTasteResponse[safeField].map(async (id: string) => {
        const data: MovieData[] | null = await searchMovieByIdWithTMDB(id);
        
        if (!data || !data.length) return null;
        if (data.length === 0) return null;

        return data;
      }),
    );

    const rawResults: (MovieData[] | null)[] = res.map((r) => {
      if (r.status === "fulfilled" && r.value?.length) {
        return r.value;
      }
      return null;
    });
    console.log("raw results ", rawResults);
    const flattened: (MovieData[] | null)[] = rawResults.flatMap(
      (movie: any) => (movie ? movie : []),
    );

    const seen = new Set<number>();

    const uniqueMovies: (MovieData[] | null)[] = flattened.filter(
      (movie: any) => {
        if (seen.has(movie.id)) {
          return false;
        }
        seen.add(movie.id);
        return true;
      },
    );

    if (uniqueMovies.length === 0) {
      return apiResponse(false, "No movie found from TMDB", 400);
    }

    return apiResponse(true, "Movie data fetched via TMDB", 200, uniqueMovies);
  } catch (error) {
    return apiResponse(
      false,
      "Something unexpected error occured in getting users' taste data",
      400,
    );
  }
}
