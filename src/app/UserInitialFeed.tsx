"use client";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { useSession } from "next-auth/react";
import { ExpectedResponse } from "../types/ExpectedResponse";
import HeroBanner from "./HeroBanner";
import MoviesRow from "../../components/MoviesRow";

import { useMemo } from "react";
import { MovieData } from "@/types/MovieData";
import { Loader2 } from "lucide-react";
import SkeletonCard from "components/skeletonCard";
import { useUserFeed } from "@/helpers/hooks/useUserFeed";


export default function UserInitialFeed({initialMovies}:any) {
  
   const {
    data: movies,
    isLoading,
    isError,
  }= useUserFeed(initialMovies)

  
  const groupByGenre = (movies: MovieData[]) => {
    //make em unique:-
    const seen = new Set();

    const uniqueMovies = movies.filter((movie) => {
      if (seen.has(movie.id)) return false;
      seen.add(movie.id);
      return true;
    });
    return uniqueMovies.reduce<Record<string, MovieData[]>>((acc, movie) => {
      const genre = movie.genre || "Others";

      if (!acc[genre]) {
        acc[genre] = [];
      }

      acc[genre].push(movie);
      return acc;
    }, {});
  };
  const moviesByGenre = useMemo(
    () => (movies ? groupByGenre(movies) : {}),
    [movies],
  );
  if (moviesByGenre)
    console.log("This is the genre vise movies: ", moviesByGenre);
  return (
    <main className="bg-black text-white  min-h-screen">
      

      {isError && !isLoading && (
        <>
          <div className="h-auto flex items-center justify-center  px-4">
            <div className="w-full max-w-md rounded-xl shadow-lg p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <svg
                  className="h-6 w-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v2m0 4h.01M5.07 19h13.86c1.54 0 2.5-1.67 1.73-3L13.73 4c-.77-1.33-2.69-1.33-3.46 0L3.34 16c-.77 1.33.19 3 1.73 3z"
                  />
                </svg>
              </div>

              <h2 className="mt-4 text-xl font-semibold text-white">
                Error in data loading
              </h2>

              <div className="mt-6 flex flex-col gap-3">
                <button
                  onClick={() => window.location.reload()}
                  className="inline-flex justify-center cursor-pointer rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition"
                >
                  try again
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {isLoading ? (
        <section>
          <h2 className="text-xl font-semibold m-10 flex gap-2 ">
            Loading Movies... <Loader2 className=" animate-spin" />
          </h2>

          <div
            className="grid 
             grid-cols-2 
             sm:grid-cols-3 
             md:grid-cols-4 
             lg:grid-cols-5 
             xl:grid-cols-6 
             gap-1"
          >
            {[...Array(12)].map((_, i) => (
              <SkeletonCard scale={0.75} key={i} />
            ))}
          </div>
        </section>
      ) : (
        <>
          {Object.entries(moviesByGenre).map(([genre, movies]) => (
            <section key={genre} className="mx-7">
              <h2 className="text-xl mx-10 font-semibold">{genre}</h2>

              <div className="flex gap-4 overflow-x-auto">
                <MoviesRow movies={movies} />
              </div>
            </section>
          ))}
        </>
      )}
    </main>
  );
}
