import HeroBanner from "./HeroBanner";
import { TrendingRow } from "./TrendingRow";
import UserInitialFeed from "./UserInitialFeed";



async function getMoviesForFeed() {
 try {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/movie-suggest`, {
    next: { revalidate: 60 }, // 60 seconds 
  });
 
  if (!res.ok) {
    console.log("Movies couldn't fetch from server component passing null for react query")
    return null
  }
 
  const data = await res.json();
 
  return data.data; 
 } catch (error) {
  console.log("Something unexpected error occured, passing null")
  return null
  
 }
}
async function getTrendingMovies() {
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
  return null
  
 }
}
export default async function Home() {
 const movies = await getMoviesForFeed();
 const trendings = await getTrendingMovies()

  
 return <>
 <HeroBanner />
  <TrendingRow initialTrending={trendings} />
  <UserInitialFeed initialMovies={movies}/>
 </>
}
