
'use client'
import { useUpdateUserTaste } from "@/helpers/hooks/mutation/useUpdateUserTaste";
import { useQueryClient } from "@tanstack/react-query";
import { Star, Trash2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function MoviesRow({ movies,field }: any) {
  const router = useRouter();
  const queryClient = useQueryClient();
   
  const pathname = usePathname();
  console.log("Field:- ",field)
  type payLoad={
    action:string,
    field:string,
    data:string | string[]
}
  const { mutate } = useUpdateUserTaste()
    
    const handleRemove = (
    e: React.MouseEvent<HTMLButtonElement>,
    movieId: string
  ) => {
    e.stopPropagation();
    const data:payLoad={
      action:'remove',
      field:field,
      data:movieId
    }
    mutate(data,{
      onSuccess:()=>{
        queryClient.invalidateQueries({
  queryKey: [field],
});
      }
    })

  };
  return (
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
            {/* Show remove button only on /profile/library */}
            {pathname.startsWith("/profile/library") && (
              <button
  onClick={(e) => handleRemove(e, movie.id)}
  className="
    absolute top-10 right-2 z-20
    flex items-center justify-center
    cursor-pointer
    h-9 w-9
    rounded-full
    bg-black/65 backdrop-blur-sm
    text-white
    shadow-md
    transition-all duration-200
    hover:bg-red-500 hover:rotate-30 hover:scale-110
    active:scale-95
  "
>
  <Trash2 className="size-4" />
</button>
            )}

            <div className="relative aspect-[2/3] overflow-hidden">
              <img
                src={movie.poster}
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
