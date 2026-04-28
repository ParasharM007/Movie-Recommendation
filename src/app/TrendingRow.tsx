import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { ChevronRight, Heading1 } from "lucide-react";
import { useRouter } from "next/navigation";

export function TrendingRow() {
  const router = useRouter()
  const fetchTrendingMovies=async()=>{
   try {
    const res:AxiosResponse<any>= await axios.get(`/api/trending-movies`)
    if(!res) return null
    console.log("Trendign moveiooghwifjpwj ",res.data.data)
    return res.data.data

   } catch (error) {
    console.log("Something went wrong while fetching trending movies")
    return null
    
   }
  }
  const {data:movies, isError, isLoading} = useQuery(
    {
      queryKey:["Trending"],
      queryFn:fetchTrendingMovies,
    }
  )
  return (
    <section className="px-6 md:px-16 mt-10">
      <div className="flex">
   

      <h2 className="text-2xl font-bold text-white mb-4">
        🔥 Trending Movies -
      </h2>
<ChevronRight className="w-6 h-6 mt-1.5" />
      </div>

    <div> {movies?.length ===0 && <h1>No trending movies are available</h1>}</div>

      <div className="relative">
  <div className="flex gap-4 overflow-x-auto scrollbar-hide overflow-y-hidden px-2 py-4 scroll-smooth scrollbar-hide">

    {movies?.length !== 0 && movies?.map((movie: any) => (
      <div
        key={movie.id}
        onClick={() => router.push(`/movie-details/${movie.id}`)}
        className="flex-shrink-0 w-[160px] md:w-[200px] cursor-pointer transition-transform duration-300 hover:scale-110"
      >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              className="rounded-lg"
              alt={movie.title}
            />
            <p className="text-sm mt-2 text-gray-300">
              {movie.title}
            </p>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}