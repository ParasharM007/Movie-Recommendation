
'use client'
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";

export default function MoviesRow({ movies }: any) {
  const router = useRouter();
  return (
    // <div className="relative group min-w-full">
    //   <div className="flex space-x-4 overflow-x-auto px-6 py-4 ">
    //     {movies && movies.length !== 0 ? (
    //       movies.map((movie: any) => (
    //         <div
    //           key={movie.id}
    //           className="min-w-[160px] hover:scale-105 cursor-pointer transition-transform"
    //           onClick={() => router.push(`/movie-details/${movie.id}`)}
    //         >
    //           <img
    //             src={`https://image.tmdb.org/t/p/w500${movie.poster}`}
    //             alt={movie.title}
    //             className="w-full rounded-md"
    //           />
    //           <p className="text-sm mt-2 truncate">{movie.title}</p>
    //         </div>
    //       ))
    //     ) : (
    //       <div className="flex bg-gray-600/90 p-4 rounded-3xl justify-center items-center min-w-full">
    //         <h1 className="text-white text-3xl font-medium">
    //           No movies available
    //         </h1>
    //       </div>
    //     )
    //   }

    //   </div>
    // </div>
     <section className="px-4 sm:px-6 md:px-8 py-6">
      
      <div
        className="
        grid gap-5
        grid-cols-2
        sm:grid-cols-3
        md:grid-cols-4
        lg:grid-cols-5
        xl:grid-cols-6
      "
      >
        {movies?.map((movie: any) => (
          <div
            key={movie.id}
            className="group relative bg-[#0f0f0f] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
             onClick={() => router.push(`/movie-details/${movie.id}`)}
          >
            
            <div className="relative aspect-[2/3] overflow-hidden">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster}`}
                alt={movie.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />

              
              <div className="absolute top-2 right-2 bg-black/70 px-2 py-1 rounded-lg flex items-center gap-1 text-xs text-yellow-400">
                <Star className="size-3 fill-yellow-400" />
                {movie.rating?.toFixed(1)}
              </div>
            </div>

            
            <div className="p-3 space-y-1">
              <h3 className="text-sm font-semibold text-white line-clamp-1">
                {movie.title}
              </h3>

              <p className="text-xs text-gray-400">
                {movie.release_date?.split("-")[0]}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
