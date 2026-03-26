"use client";
import NotAuthPage from "@/helpers/NotAuthPage";
import { ExpectedResponse } from "@/types/ExpectedResponse";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function GetGenre() {
  const token = useSession();
  const router = useRouter();

  type ErrorType = {
    message: string;
  };

  const {
    isLoading,
    isError,
    data: genres,
  } = useQuery<ExpectedResponse<string[]>, AxiosError<ErrorType>>({
    queryKey: ["Liked-Genres"],
    queryFn: async () => {
      const res: AxiosResponse = await axios.get(
        `/api/get-user-taste?field=likedGenres`,
      );
      return res.data;
    },
    staleTime: 20 * 1000,
    enabled: token.status === "authenticated",
  });
  useEffect(() => {
    if (!isLoading && genres?.data) {
      toast.success("Favorite genres fetched successfully");
    }
  }, [isLoading, genres]);

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
    <>
      {isError && !isLoading && (
        <>
          <div className="min-h-screen flex flex-col justify-center items-center">
            <NotAuthPage message="Error in data loading" />

            <button
              onClick={() => window.location.reload()}
              className="inline-flex justify-center cursor-pointer rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition"
            >
              try again
            </button>
          </div>
        </>
      )}

      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4">
        {!isError && (
          <h1 className="text-yellow-300/80 text-4xl font-medium m-5 p-4">Your 5 Favorite Genres</h1>
        )}

        <div className="flex flex-wrap justify-center gap-5 m-5 max-w-3xl">
          {!isLoading ? (
            genres?.data &&
            genres?.data.map((genre: string) => {
              return (
                <button
                  key={genre}
                  className="
            w-24 h-24 rounded-full flex items-center cursor-pointer justify-center text-sm font-semibold 
            bg-purple-600 scale-110 shadow-lg shadow-purple-500/50"
                >
                  {genre}
                </button>
              );
            })
          ) : (
            <div className="w-24 h-24">
              <Loader2 className=" text-gray-100 w-24 h-24 animate-spin" />
            </div>
          )}
        </div>
        {!isLoading && !isError && (
          <button
            className="p-2 m-2 rounded-lg flex items-center justify-center cursor-pointer text-sm font-semibold 
        bg-gray-600 scale-110 shadow-lg shadow-gray-500/50 "
            onClick={() => router.replace(`/genres-selection`)}
          >
            Update genres...
          </button>
        )}
      </div>
    </>
  );
}
