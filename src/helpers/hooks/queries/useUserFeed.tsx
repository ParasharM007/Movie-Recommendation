
import { recommedationsForUserFeed } from "@/helpers/services/fetchUserFeed";
import { ErrorType } from "@/types/ErrorType";
import { ExpectedResponse } from "@/types/ExpectedResponse";
import { MovieData } from "@/types/MovieData";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { useSession } from "next-auth/react";



  // export const useUserFeed=(initialMovies:MovieData[] | null)=>{
  export const useUserFeed=()=>{
    

  const { data: session, status } = useSession();

  return useQuery<MovieData[],ErrorType>({
    queryKey: ["movie-recommendations", session?.user?._id || null
    ],
    queryFn: recommedationsForUserFeed,
    // initialData: initialMovies ?? undefined,
    staleTime: 1000 * 60,   //60 sec
    refetchOnWindowFocus: false,
    retry:1,
    enabled: status !== "loading",
  })
  }