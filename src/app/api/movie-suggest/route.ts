import { generateRecommendations } from "@/src/lib/groq";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../../../lib/options";
import { apiResponse } from "@/src/lib/apiResponse";
import { UserTasteModel } from "@/src/model/UserTaste.model";
import { getUserTaste } from "@/src/lib/getUserTaste";
import { UserTasteInput } from "@/src/lib/buildUserPrompt";
import dbConnect from "@/src/lib/dbConnect";
import { searchQuerySchema } from "@/src/schemas/searchqueryschema";
import axios from "axios";
export async function GET(req: Request) {

  let TMDB_BASE_URL = "https://api.themoviedb.org/3";
  let TMDB_API_KEY = process.env.TMDB_API_KEY;
  await dbConnect();
  

  // User and search query both needed:- 
  try {
   const { searchParams }=new URL(req.url)
        const queryParam= {
           query: searchParams.get("query")
        }
   const result = searchQuerySchema.safeParse(queryParam)
 
   if(!result.success){
   return  apiResponse(false,"Do not exceed characters limit 100",400)
}
console.log("Result of safeParse ",result)

if(!result.data ||!result.data.query){
 return apiResponse(false,"Something unexpected occured in query validation by zod",400)

}
      else{

        
        
        
      

  
    
  const { query } =result.data
 

   
    const session = await getServerSession(authOptions);
const user: User  = session?.user as User;

if(!session || !user || !user._id || query){
  // User should be able to search via TMDB search:- TODO
  async function searchQueryWithTMDB(query:string) {
  const res = await axios.get(
  `https://api.themoviedb.org/3/search/multi`,
  {
    params: {
      query: query,
      api_key: process.env.TMDB_API_KEY,
    },
  }
);


  if (!res.data) return null;
  return res.data.results?.[0] || null; // take best match
}
const data= await searchQueryWithTMDB(query)

  
   return apiResponse(true,"User is searching without login ",200,data)
  
}
else{
  //Now user is logged in and searching something:- 
  //we will take user's taste by UserTaste collection:-
  
  const userTaste:UserTasteInput =await getUserTaste(user._id)
  console.log("UserTaste:- ",userTaste)
  const titles = await generateRecommendations(userTaste,query)

if(!titles.recommendations){
  
   return apiResponse(false,"Recommendations are not available",400)
  
}
if(titles.recommendations.length===0){
   
   return apiResponse(false,"No Recommendations",400)

}
//At this point we have recommendations titles, we will just put tmdb search api:- 


async function searchTMDB(title: string, type: "movie" | "tv") {
  const endpoint = type === "movie" ? "search/movie" : "search/tv";

  const res = await axios.get(
    `${TMDB_BASE_URL}/${endpoint}?query=${encodeURIComponent(title)}&api_key=${TMDB_API_KEY}`
  );

  if (!res.data) return null;
  return res.data.results?.[0] || null; // take best match
}

const tmdbResults = await Promise.all(
  titles.recommendations.slice(0, 5).map(async (rec:any) => {
    const tmdbData = await searchTMDB(rec.title, rec.type as "movie" | "tv");

    if (!tmdbData) return null;

    return {
      id: tmdbData.id,
      title: tmdbData.title || tmdbData.name,
      type: rec.type,
      poster: tmdbData.poster_path,
      rating: tmdbData.vote_average,
      overview: tmdbData.overview,
      reason: rec.reason, // AI personalization
    };
  })
);

if(!tmdbResults){
 
   return apiResponse(false,"Error in searching data from TMDB ",400)
   

  }


  return  apiResponse(true, "Recommendations fetched according to search",200,tmdbResults)
    
}


  }


} catch (error) {
  
  console.error("An unexpected error occured!"+ error)
  throw error
  
}
}
