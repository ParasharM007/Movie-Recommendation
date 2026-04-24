"use client";

import MoviesRow from "@/app/MoviesRow/page";
import SkeletonCard from "components/skeletonCard";

import NotAuthPage from "@/helpers/NotAuthPage";
import { ExpectedResponse } from "@/types/ExpectedResponse";
import { MovieData } from "@/types/MovieData";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

type Props={
    field:string,
    message:React.ReactNode
}
export default function ProfileData({ field , message}:Props) {
  const token= useSession()
    const router = useRouter();
  type ErrorType = {
    message: string;
  };
  const {
    isError,
    isLoading,
    data: movies,
  } = useQuery<ExpectedResponse<(MovieData[] | null)[]>, AxiosError<ErrorType>>(
    {
      queryKey: ["watch-list"],
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
    <div className="min-w-max">
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
          <h2 className="text-3xl text-white font-semibold m-18 p-4 flex gap-2 ">
            Loading Movies... <Loader2 className="size-8 animate-spin" />
          </h2>

          <div className="flex min-w-max gap-4 overflow-x-auto p-1 m-1">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        </section>
      ) : ( 
        <>
           {!isError && movies &&<section className="mx-7">

            <div className="flex gap-4 overflow-x-auto">
              <MoviesRow movies={movies} />
            </div>
          </section>}
        </>
       )}
    </div>
  );
}
