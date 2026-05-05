import { MovieData } from "@/types/MovieData";
import HeroBanner from "./HeroBanner";
import { TrendingRow } from "./TrendingRow";
import UserInitialFeed from "./UserInitialFeed";
import { ExpectedResponse } from "@/types/ExpectedResponse";



async function getMoviesForFeed():Promise<MovieData[]> {
 try {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/movie-suggest`, {
    next: { revalidate: 60 }, // 60 seconds 
  });
 
  if (!res.ok) {
    console.log("Movies couldn't fetch from server component passing null for react query")
    return []
  }
 
  const data = await res.json();
  console.log("Data in fetch userfeed:- ",data)
 
  return data.data; 
 } catch (error) {
  console.log("Something unexpected error occured, passing null")
  throw error
  
 }
}
async function getTrendingMovies():Promise<MovieData[]> {
 try {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/trending-movies`, {
    next: { revalidate: 60 }, // 60 seconds 
  });
 
  if (!res.ok) {
    console.log("Tendings couldn't fetch from server component passing null for react query")
    return []; 
    
  }
 
    const data = await res.json();
 
  return data.data; 
 } catch (error) {
  console.log("Something unexpected error occured, passing null")
  throw error
  
 }
}
export default async function Home() {
 const movies:MovieData[]= await getMoviesForFeed();
 const trendings:MovieData[] = await getTrendingMovies()

  
 return <>
 <HeroBanner />
  <TrendingRow initialTrending={trendings} />
  <UserInitialFeed initialMovies={movies}/>
 </>
}
