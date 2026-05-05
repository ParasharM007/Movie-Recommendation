'use client'
import { useFetchTrending } from "@/helpers/hooks/useFetchTrending";
import { MovieData } from "@/types/MovieData";
import { ChevronRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export async function TrendingRow({initialTrending}:{initialTrending:MovieData[]}) {
  const router = useRouter()

  const {data:movies, isError, isLoading} = useFetchTrending(initialTrending)
  return (
    <section className="px-6 md:px-16 mt-10">
      <div className="flex">
   

      {/* <h2 className="text-2xl font-bold  text-white mb-4">
        🔥 Trending Movies -
      </h2> */}
         <h1 className="text-lg bg-red-600 px-3 py-1 rounded-full font-semibold">
          🎬 <span className="text-white"> Trending Now </span>
        </h1>
        <span className="font-extrabold mt-1">----</span>
<ChevronRight className="w-6 h-6 mt-1.5" />
 
            {isLoading && <Loader2 className=" text-white animate-spin m-1" />}
 
      </div>


      <div className="relative">
  <div className="flex gap-4 overflow-x-auto scrollbar-hide overflow-y-hidden px-2 py-4 scroll-smooth scrollbar-hide">

    { movies && movies?.length !== 0 ?( movies?.map((movie: any) => (
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
        ))
      ):(
        !isLoading &&  <div className="flex bg-gray-600/90 p-4 rounded-3xl justify-center items-center min-w-full">
            <h1 className="text-white text-3xl font-medium">
              No trending movies available
            </h1>
          </div>
      )
        }
      </div>
      </div>
    </section>
  );
}