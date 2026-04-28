// export const runtime = "nodejs";
import { generateRecommendations } from "@/lib/groq";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../../../lib/options";
import { apiResponse } from "@/lib/apiResponse";
import { getUserTaste } from "@/lib/getUserTaste";

import dbConnect from "@/lib/dbConnect";
import { searchQuerySchema } from "@/schemas/searchqueryschema";
import axios from "axios";
import { getHomeData } from "@/lib/getHomeData";
import { MovieData } from "@/types/MovieData";
import { UserTasteInput } from "@/types/UserTaste";
export async function GET(req: Request) {
  
  let TMDB_API_KEY = process.env.TMDB_API_KEY;
  let TMDB_BASE_URL = process.env.TMDB_BASE_URL
  await dbConnect();
  try {
   

    const session = await getServerSession(authOptions);
    const user: User = session?.user as User;

    if (!session || !user) {
      console.log("Sess:- ", session);
      console.log("user:- ", user);
      
        const result: MovieData[] = await getHomeData(); // we r getting data of type MovieData[]

        if (!result)
          return apiResponse(
            false,
            "error occured in getting home page data via TMDB",
            400,
          );

        return apiResponse(
          true,
          "Home page data fetched via TMDB",
          200,
          result,
        );
      
    } else {
      //Now user is logged in :-
      //we will take user's taste by UserTaste collection:-

      if (user._id) {
      const userTaste: UserTasteInput = await getUserTaste(user._id);
        console.log("UserTaste:- ", userTaste);
            const titles = await generateRecommendations(userTaste);
            console.log("Ai data currently for home page:- ",titles)

          //If recommendations are not available , we will just send response to show hardcoded genres by TMDB:-
          if (!titles || titles.aiEmpty) {
            console.log("Searching with TMDB directly ")
             //Case :- ai fails during home page:-
              //We will directly use TMDB api using hardcoded genres :-
              const result:MovieData[] =await getHomeData()

      if(!result)  return apiResponse(false,"error occured in getting home page data via TMDB",400)

      return apiResponse(true, "Home page data fetched via TMDB",200,result)
            }
          

      //At this point we have recommendations titles, we will just put tmdb search api:-

      // const titles = {
      //   mode: "default",
      //   recommendations: [
      //     {
      //       title: "Action",
      //       type: "genre",
      //       items: [
      //         {
      //           title: "The Dark Knight",
      //           type: "movie",
      //           reason:
      //             "Recommended action movies with intense fight scenes and gripping storylines",
      //         },
      //         {
      //           title: "Mad Max: Fury Road",
      //           type: "movie",
      //           reason:
      //             "Suggested action movies with high-octane stunts and adrenaline-fueled action",
      //         },
      //         {
      //           title: "The Avengers",
      //           type: "movie",
      //           reason:
      //             "Based on your interest in superhero movies with epic battles and team-ups",
      //         },
      //         {
      //           title: "John Wick",
      //           type: "movie",
      //           reason:
      //             "Recommended action movies with stylized fight choreography and intense action sequences",
      //         },
      //         {
      //           title: "Mission: Impossible - Fallout",
      //           type: "movie",
      //           reason:
      //             "Suggested action movies with thrilling stunts and high-stakes espionage",
      //         },
      //         {
      //           title: "The Bourne Identity",
      //           type: "movie",
      //           reason:
      //             "Recommended action movies with fast-paced action and a gripping mystery",
      //         },
      //       ],
      //     },
      //     {
      //       title: "Comedy",
      //       type: "genre",
      //       items: [
      //         {
      //           title: "The Hangover",
      //           type: "movie",
      //           reason:
      //             "Recommended comedies with outrageous humor and memorable characters",
      //         },
      //         {
      //           title: "Superbad",
      //           type: "movie",
      //           reason:
      //             "Suggested comedies with relatable coming-of-age themes and hilarious dialogue",
      //         },
      //         {
      //           title: "The 40-Year-Old Virgin",
      //           type: "movie",
      //           reason:
      //             "Based on your interest in comedies with quirky characters and awkward humor",
      //         },
      //         {
      //           title: "Bridesmaids",
      //           type: "movie",
      //           reason:
      //             "Recommended comedies with female-led casts and hilarious ensemble performances",
      //         },
      //         {
      //           title: "Monty Python and the Holy Grail",
      //           type: "movie",
      //           reason:
      //             "Suggested comedies with absurd humor and medieval parody",
      //         },
      //         {
      //           title: "Airplane!",
      //           type: "movie",
      //           reason:
      //             "Recommended comedies with rapid-fire jokes and slapstick humor",
      //         },
      //       ],
      //     },
      //     {
      //       title: "Drama",
      //       type: "genre",
      //       items: [
      //         {
      //           title: "The Shawshank Redemption",
      //           type: "movie",
      //           reason:
      //             "Recommended dramas with powerful storytelling and emotional depth",
      //         },
      //         {
      //           title: "The Social Network",
      //           type: "movie",
      //           reason:
      //             "Suggested dramas with gripping true stories and complex characters",
      //         },
      //         {
      //           title: "12 Years a Slave",
      //           type: "movie",
      //           reason:
      //             "Based on your interest in dramas that tackle difficult subjects with sensitivity and nuance",
      //         },
      //         {
      //           title: "The Pursuit of Happyness",
      //           type: "movie",
      //           reason:
      //             "Recommended dramas with inspiring true stories and uplifting messages",
      //         },
      //         {
      //           title: "Schindler's List",
      //           type: "movie",
      //           reason:
      //             "Suggested dramas that explore historical events with thought-provoking themes",
      //         },
      //         {
      //           title: "The Pianist",
      //           type: "movie",
      //           reason:
      //             "Recommended dramas with powerful performances and emotional resonance",
      //         },
      //       ],
      //     },
      //     {
      //       title: "Horror",
      //       type: "genre",
      //       items: [
      //         {
      //           title: "The Shining",
      //           type: "movie",
      //           reason:
      //             "Recommended horror movies with classic atmosphere and psychological tension",
      //         },
      //         {
      //           title: "The Exorcist",
      //           type: "movie",
      //           reason:
      //             "Suggested horror movies with chilling supernatural themes and intense scares",
      //         },
      //         {
      //           title: "The Texas Chain Saw Massacre",
      //           type: "movie",
      //           reason:
      //             "Based on your interest in horror movies with raw intensity and graphic violence",
      //         },
      //         {
      //           title: "Halloween",
      //           type: "movie",
      //           reason:
      //             "Recommended horror movies with iconic villains and suspenseful storytelling",
      //         },
      //         {
      //           title: "The Ring",
      //           type: "movie",
      //           reason:
      //             "Suggested horror movies with eerie atmosphere and supernatural mystery",
      //         },
      //         {
      //           title: "Get Out",
      //           type: "movie",
      //           reason:
      //             "Recommended horror movies with social commentary and psychological complexity",
      //         },
      //       ],
      //     },
      //     {
      //       title: "Romance",
      //       type: "genre",
      //       items: [
      //         {
      //           title: "Titanic",
      //           type: "movie",
      //           reason:
      //             "Recommended romance movies with epic love stories and memorable performances",
      //         },
      //         {
      //           title: "The Notebook",
      //           type: "movie",
      //           reason:
      //             "Suggested romance movies with sweeping romance and emotional depth",
      //         },
      //         {
      //           title: "La La Land",
      //           type: "movie",
      //           reason:
      //             "Based on your interest in romance movies with musical numbers and romantic fantasy",
      //         },
      //         {
      //           title: "The Proposal",
      //           type: "movie",
      //           reason:
      //             "Recommended romance movies with witty banter and comedic chemistry",
      //         },
      //         {
      //           title: "Crazy, Stupid, Love.",
      //           type: "movie",
      //           reason:
      //             "Suggested romance movies with relatable characters and heartfelt moments",
      //         },
      //         {
      //           title: "When Harry Met Sally",
      //           type: "movie",
      //           reason:
      //             "Recommended romance movies with classic dialogue and romantic development",
      //         },
      //       ],
      //     },
      //     {
      //       title: "Science Fiction",
      //       type: "genre",
      //       items: [
      //         {
      //           title: "Blade Runner",
      //           type: "movie",
      //           reason:
      //             "Recommended science fiction movies with thought-provoking themes and philosophical questions",
      //         },
      //         {
      //           title: "The Matrix",
      //           type: "movie",
      //           reason:
      //             "Suggested science fiction movies with innovative special effects and complex action sequences",
      //         },
      //         {
      //           title: "Inception",
      //           type: "movie",
      //           reason:
      //             "Based on your interest in science fiction movies with mind-bending plots and visual spectacle",
      //         },
      //         {
      //           title: "Interstellar",
      //           type: "movie",
      //           reason:
      //             "Recommended science fiction movies with epic scope and scientific accuracy",
      //         },
      //         {
      //           title: "Arrival",
      //           type: "movie",
      //           reason:
      //             "Suggested science fiction movies with thought-provoking themes and emotional resonance",
      //         },
      //         {
      //           title: "Her",
      //           type: "movie",
      //           reason:
      //             "Recommended science fiction movies with nuanced exploration of human relationships and technology",
      //         },
      //       ],
      //     },
      //     {
      //       title: "Thriller",
      //       type: "genre",
      //       items: [
      //         {
      //           title: "Se7en",
      //           type: "movie",
      //           reason:
      //             "Recommended thrillers with dark atmosphere and intense suspense",
      //         },
      //         {
      //           title: "Memento",
      //           type: "movie",
      //           reason:
      //             "Suggested thrillers with complex storytelling and mind-bending plot twists",
      //         },
      //         {
      //           title: "Shutter Island",
      //           type: "movie",
      //           reason:
      //             "Based on your interest in thrillers with atmospheric settings and psychological complexity",
      //         },
      //         {
      //           title: "The Silence of the Lambs",
      //           type: "movie",
      //           reason:
      //             "Recommended thrillers with chilling villains and intense cat-and-mouse chases",
      //         },
      //         {
      //           title: "Fight Club",
      //           type: "movie",
      //           reason:
      //             "Suggested thrillers with subversive themes and social commentary",
      //         },
      //         {
      //           title: "Gone Girl",
      //           type: "movie",
      //           reason:
      //             "Recommended thrillers with twisty plots and complex characters",
      //         },
      //       ],
      //     },
      //   ],
      // };

      if (titles) {
        async function searchTMDB(title: string, type: "movie" | "tv") {
          // const endpoint = type === "movie" ? "search/movie" : "search/tv";

       try {
           const res = await axios.get(
             // `${TMDB_BASE_URL}/${endpoint}?query=${encodeURIComponent(title)}&api_key=${TMDB_API_KEY}&include_adult=false`,
             // `${TMDB_BASE_URL}/movie?query=${encodeURIComponent(title)}&api_key=${TMDB_API_KEY}&include_adult=false`,
              
       `${TMDB_BASE_URL}/search/movie`,
       {
         params: {
           api_key: TMDB_API_KEY,
           query: title,
           include_adult: false,
           language: "en-US",
         },
         timeout: 5000,
       }
     );
           
 
           if (!res.data) return null;
           return res.data.results?.[0] || null; // take best match
       } catch (error:any) {
        console.log("TMDB error:", error.message);
    return null;
       }
        }

        let tmdbResults: MovieData[];

          //Data is required for home page:-
          const rawResults: (MovieData | null)[] = await Promise.all(
            titles.recommendations.flatMap((rec: any) =>
              rec.items.map(async (item: any) => {
               try {
                const tmdbData: any = await searchTMDB(
                  `${item.title}`,
                  item.type as "movie" | "tv",
                );
                if (!tmdbData) return null;

                return {
                  id: tmdbData.id,
                  title: tmdbData.title || tmdbData.name,
                  genre: rec.title,
                  poster: tmdbData.poster_path,
                  rating: tmdbData.vote_average,
                  overview: tmdbData.overview,
                  reason: item.reason, // AI personalization
                };
                
      } catch {
        return null; 
      }
              }),
            ),
          );
          tmdbResults = rawResults.filter(
            (movie): movie is MovieData => movie !== null,
          );
          if (tmdbResults.length === 0) {
            return apiResponse(
              false,
              "No movies found from TMDB after ai suggestions",
              404,
            );
          }
  
          return apiResponse(
            true,
            "AI based recommendations fetched according to search",
            200,
            tmdbResults,
          );
        }
      }
    }
    } catch (error) {
      console.error("An unexpected error occured!" + error);
      return apiResponse(false, "Internal server error", 500);
    }
    }

