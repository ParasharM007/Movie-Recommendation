'use client'

import axios, { AxiosResponse } from 'axios'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { toast } from 'sonner'

const page = () => {
    const [query, setQuery] = useState('')
    const [recommendations, setRecommendations] :any=useState({})
    const token = useSession()
    if(token) console.log("Token ",token.status)
    const aiResponse = async ()=>{
        if(query){

            const res:AxiosResponse= await axios.get(`/api/movie-suggest?query=${query}`)
            try {
              token.status==='authenticated'? setRecommendations(res.data.data[0] || res.data.data):setRecommendations(res.data.data)
            } catch (error) {
              toast.error("Error in getting data",{
                description:"error in assigning recommedations"
              })
            }
            
            
        }

    }
  return (
    <div className="min-h-screen bg-black text-white">
      
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent z-10" />

        
        <div className="relative z-20 h-full flex flex-col items-center justify-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold m-10 text-center">
            Search Movies & Series
          </h1>

          
          <div className="w-full max-w-2xl">
            <input
              type="text"
              placeholder="Search by title, genre, mood..."
              className="w-full px-6 py-4 rounded-full bg-neutral-900/80
                         text-white placeholder-gray-400
                         outline-none border border-neutral-700
                         focus:border-purple-500 transition"
            />
          </div>
        </div>
      

      
      <section className="px-6 md:px-12 mt-10">
        <h2 className="text-2xl font-semibold mb-6">
          Search Results
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="flex gap-4 bg-neutral-900/60
                         rounded-xl p-4
                         hover:bg-neutral-800/70
                         transition cursor-pointer"
            >
              {/* poster */}
              <img
                src="/movie-poster.jpg"
                alt="movie poster"
                className="w-28 h-40 object-cover rounded-lg"
              />

              {/* details */}
              <div className="flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold">
                    Movie / Series Title
                  </h3>

                  <p className="text-sm text-gray-400 mt-1">
                    2024 • Action • 2h 10m
                  </p>

                  <p className="text-sm text-gray-300 mt-3 line-clamp-3">
                    A brief description of the movie or series storyline
                    that gives users an idea of what to expect.
                  </p>
                </div>

                {/* reason */}
                <div className="mt-4">
                  <span className="text-xs text-purple-400 font-medium">
                    Why suggested
                  </span>
                  <p className="text-xs text-gray-400 mt-1">
                    Because you watched action thrillers and liked
                    high-intensity movies.
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}



export default page