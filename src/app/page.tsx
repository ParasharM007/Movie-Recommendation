import { MovieData } from "@/types/MovieData";
import HeroBanner from "./HeroBanner";

import UserInitialFeed from "./UserInitialFeed";
import { ExpectedResponse } from "@/types/ExpectedResponse";
import TrendingRow from "./TrendingRow";



async function getMoviesForFeed():Promise<MovieData[] | null> {
 try {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/movie-suggest`, {
    next: { revalidate: 60 }, // 60 seconds 
  });
 
  if (!res.ok) {
    console.log("Movies couldn't fetch from server component passing null for react query")
    return null
  }
 
  const data = await res.json();
  console.log("Data in fetch userfeed:- ",data)
 
  return data.data; 
 } catch (error) {
  console.log("Something unexpected error occured, passing null")
  throw error
  
 }
}
async function getTrendingMovies():Promise<MovieData[] | null> {
 try {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/trending-movies`, {
    next: { revalidate: 60 }, // 60 seconds 
  });
 
  if (!res.ok) {
    console.log("Tendings couldn't fetch from server component passing null for react query")
    return null
    
  }
 
    const data = await res.json();
 
  return data.data; 
 } catch (error) {
  console.log("Something unexpected error occured, passing null")
  throw error
  
 }
}
export default async function Home() {
 const movies:MovieData[] | null= await getMoviesForFeed();
 const trendings:MovieData[] | null= await getTrendingMovies()

  
 return <>
 <HeroBanner />
  <TrendingRow initialTrending={trendings} />
  <UserInitialFeed initialMovies={movies}/>
 </>
}
