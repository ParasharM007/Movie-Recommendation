"use client";

import MoviesRow from "components/MoviesRow";

import NotAuthPage from "@/helpers/NotAuthPage";
import { ExpectedResponse } from "@/types/ExpectedResponse";
import { MovieData } from "@/types/MovieData";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { ErrorType } from "@/types/ErrorType";
import MoviesRowSkeleton from "components/MoviesRowSkeleton";

type Props={
    field:string,
    message:React.ReactNode
}
export default function ProfileData({ field , message}:Props) {
  const token= useSession()
    const router = useRouter();
    
    
    const {
      isError,
      isLoading,
      data: movies,
    } = useQuery<ExpectedResponse<(MovieData[] | null)[]>, AxiosError<ErrorType>>(
    {
      queryKey: [field],
      queryFn: async () => {
        const res: AxiosResponse = await axios.get(
          `/api/get-user-taste?field=${field}`,
        );
        return res.data.data;
      },
    },
  );
  
   
     if (token.status === "unauthenticated") {
      return (
        <div className="min-h-screen flex flex-col justify-center items-center">
          {/* we are receiving message as React.ReactNode so we can pass jsx , string etc.  */}
          <NotAuthPage message="Please Login First" />
          <button
            onClick={() => router.replace(`/sign-in`)}
            className="inline-flex justify-center cursor-pointer rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition"
          >
            Login
          </button>
        </div>
      );
    }
  return (
    <div className="">
      {isError && (
        <div>
          <div className="min-h-screen flex flex-col justify-center items-center">
            {/* message will be dynamic:- */}
            <NotAuthPage message={message} />

            <button
              onClick={() => window.location.reload()}
              className="inline-flex justify-center cursor-pointer rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition"
            >
              try again
            </button>
          </div>
        </div>
      )}
      {isLoading ? (
        <section>
          <MoviesRowSkeleton />

         
        </section>
      ) : ( 
        <>
           {!isError && movies &&
              <div className="ml-10">

              <MoviesRow movies={movies} field ={field} />
              </div>
           }
        </>
       )}
    </div>
  );
}
