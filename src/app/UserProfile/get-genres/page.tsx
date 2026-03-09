"use client";
import { ExpectedResponse } from "@/types/ExpectedResponse";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function GenreSelection() {
  
  const token = useSession();
  const router =useRouter()


  

  type ErrorType = {
    message: string;
  };

  const {
    isLoading,
    isError,
    data: genres,
    isFetched
  } = useQuery<ExpectedResponse<string[]>, AxiosError<ErrorType>>({
    queryKey: ["Liked-Genres"],
    queryFn: async () => {
      const res: AxiosResponse = await axios.get(
        `/api/get-user-taste?field=likedGenres`,
      );
      return res.data;
    },
    staleTime:20*1000,
    enabled:token.status === "authenticated"
  });
  useEffect(() => {
  if (!isLoading && genres?.data) {
    toast.success("Favorite genres fetched successfully");
  }
}, [isLoading, genres]);

   if (token.status === "unauthenticated") {

    return  <div className="h-auto flex items-center justify-center  px-4">
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
               Please login first
              </h2>

              <div className="mt-6 flex flex-col gap-3">
                <button
                  onClick={() => router.replace(`/sign-in`)}
                  className="inline-flex justify-center cursor-pointer rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
  }
  return (<>
  

     {
      isError && 
      !isLoading && (
        <>
          <div className="min-h-screen flex items-center justify-center  px-4">
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

    
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4">
      {!isError && <h1 className="text-3xl font-bold mb-2">Your 5 Favorite Genres</h1>}

      <div className="flex flex-wrap justify-center gap-5 m-5 max-w-3xl">
       { !isLoading?(
      genres?.data &&
        genres?.data.map((genre: string) => {
          return (
            <button
            key={genre}
            className='
            w-24 h-24 rounded-full flex items-center cursor-pointer justify-center text-sm font-semibold 
            bg-purple-600 scale-110 shadow-lg shadow-purple-500/50'>
            {genre}
            </button>
          )
        })
      ):(
        <div className="w-24 h-24">
          <Loader2 className=" text-gray-100 w-24 h-24 animate-spin"/>
        </div>
      )}
      
        </div>
        {!isLoading && !isError && <button className="p-2 m-2 rounded-lg flex items-center justify-center cursor-pointer text-sm font-semibold 
        bg-gray-600 scale-110 shadow-lg shadow-gray-500/50 " onClick={()=>router.replace(`/genres-selection`)}>Update genres...</button>}
        </div>
    </>)
}
