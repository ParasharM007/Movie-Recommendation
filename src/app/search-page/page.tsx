"use client";
import { ErrorType } from "@/types/ErrorType";
import { ExpectedResponse } from "@/types/ExpectedResponse";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import SkeletonCard from "components/skeletonCard";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const page = () => {
  const [query, setQuery] = useState("");
  const [recommendations, setRecommendations]:Array<any> = useState([]);
  const router= useRouter()

  const token = useSession();
  if (token) console.log("Token ", token.status);

   

  const mutation = useMutation<
  ExpectedResponse<any>,
  AxiosError<ErrorType>,
  string
  >({
   mutationFn:async()=>{
     const res: AxiosResponse = await axios.get(
        `/api/search-movie?query=${query}`,
      );
        
        
       const value = res.data?? [];
       return value
   }
  })

  const aiResponse = async (e:any) => {
    if (!query) {
    toast.error("Please search something first", {
      description: "search bar is empty",
    });
    return
    
  }

 
    if (query) {
      try {
      mutation.mutate(query,{
        onSuccess:(value)=>{
          toast.success("Data fetched successfully",{
            description:value.message || ""
          })
          setRecommendations(Array.isArray(value.data) ? value.data : [value.data]);
        },
        onError:(err)=>{
            toast.error("Error during searching data",
              {
                description:err.response?.data.message || "error occured"
              }
            )
        },
       
      })


      } catch (error) {
        toast.error("Error in getting data", {
          description: "something went wrong while searching data",
        });
      }
    }
  };
  return (
    <div className="min-h-screen bg-black text-white">

      <div className="relative z-20 h-full flex flex-col items-center justify-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold m-10 text-center">
          Search Movies
        </h1>

        <div className="flex align-middle justify-center w-full max-w-2xl">
          <input
            type="text"
            placeholder="Search by title, genre, mood..."
            className="w-full px-6 py-4 rounded-full bg-neutral-900/80
                         text-white placeholder-gray-400
                         outline-none border border-neutral-700
                         focus:border-purple-500 transition"
            onChange={(e)=>setQuery(e.target.value)}
            onKeyDown={(e)=>{ if(e.key==="Enter") aiResponse(e)}}
          />
           {!mutation.isPending ? (<button className="text-white m-1 p-2 px-5 cursor-pointer border rounded-full border-gray-100" onClick={(e)=>aiResponse(e)}>Search</button>):(<Loader2  className="animate-spin m-1 mt-3 "/>)}
        </div>
        <div
          className="flex items-center justify-between
          px-3 py-2 m-2"  >
             
           { token.status === "authenticated" ? 
           <p className="text-sm px-4 font-medium text-white">AI mode enabled</p>
           :<p className="text-sm px-4 font-medium text-white">Search results will be based on TMDB</p>
           }
        </div>
      </div>

        
      <section className=" flex flex-col items-center px-6 md:px-12 mt-10">
        {recommendations.length!==0 && <h2 className="text-2xl font-semibold mb-6">Search Results</h2>}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {recommendations.length!==0 &&  recommendations.map((movie:any, index:any) => (
            <div
              key={index}
              className="flex gap-4 bg-neutral-900/60
                         rounded-xl p-4
                         hover:bg-neutral-800/70
                         transition cursor-pointer"
                         onClick={()=>router.push(`/movie-details/${movie.id}`)}
            >
              
              <img
                src={movie.poster}
                alt="movie poster"
                className="w-28 h-40 object-cover rounded-lg"
                
              />

              
              <div className="flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold">
                    {movie.title}
                  </h3>

                  <p className="text-sm text-gray-400 mt-1">
                    {movie.rating}
                  </p>

                  <p className="text-sm text-gray-300 mt-3 line-clamp-3">
                   {movie.overview}
                  </p>
                </div>

                
               { token.status ==='authenticated' && <div className="mt-4">
                  <span className="text-xs text-purple-400 font-medium">
                    Why suggested
                  </span>
                  <p className="text-xs text-gray-200 mt-1">
                    {movie.reason}
                  </p>
                </div>}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default page;
