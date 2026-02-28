import { useRouter } from "next/navigation";


export default function MoviesRow({ movies }: any) {
 const router = useRouter()
  return (
    <div className="relative group">
      <div className="flex space-x-4 overflow-x-auto px-6 py-4 ">
        {(movies || []).map((movie: any) => (
          <div
            key={movie.id}
            className="min-w-[160px] hover:scale-105 transition-transform"
            onClick={()=>router.push(`/movie-details/${movie.id}`)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster}`}
              alt={movie.title}
              className="w-full rounded-md"
            />
            <p className="text-sm mt-2 truncate">{movie.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
