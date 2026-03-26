import { apiResponse } from "@/lib/apiResponse";
import dbConnect from "@/lib/dbConnect";
import { authOptions } from "@/lib/options";
import { User } from "next-auth";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!user || !user._id || !session)
    return apiResponse(false, "Not Authorized", 401);
  try {
    const body = await req.json();
    const { genres, rating, yearFrom, yearTo } = body as {
      genres: string[];
      rating: number;
      yearFrom: string;
      yearTo: string;
    };
  
    if(body) console.log("Filters:- ",body)
  
    const buildQuery = () => {
    const params = new URLSearchParams();
  
    if (genres && genres.length && genres.length!==0)
      params.append("with_genres", genres.join(","));
  
    if (rating >= 0)
      params.append("vote_average.gte",rating.toString());
  
    if (yearFrom)
      params.append("primary_release_date.gte", `${yearFrom}-01-01`);
  
    if (yearTo)
      params.append("primary_release_date.lte", `${yearTo}-12-31`);
  
    
  
    return params.toString();
  };
  
  const result= buildQuery()
    if (result) console.log("query:- ", result);
  
    //TODO:- send this query to tmdb api
  
    return apiResponse(true, "Success", 200);
  } catch (error) {
    
  }
}
