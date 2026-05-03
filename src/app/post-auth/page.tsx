"use client";
import { useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";

export default function PostAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();

 const syncGenresMutation = useMutation({
  mutationFn: async (genres: string[]) => {
    const res:AxiosResponse = await axios.post("/api/update-user-taste", genres);
    return res.data
  },
  onSuccess: () => {
    
    localStorage.removeItem("guestLikedGenres");
    
  },
  onError: (err) => {
    console.error("Failed to sync genres", err);
  }
 
});
useEffect(() => {
  const genres = JSON.parse(localStorage.getItem("guestLikedGenres") || "[]");

  if (session && genres.length) {
    syncGenresMutation.mutate(genres);
  }
  router.replace(`/`)
}, [session]);



  return (


    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black px-4">

      <div className="w-full max-w-md rounded-2xl border border-gray-800 bg-black/60 backdrop-blur-md shadow-2xl p-8 text-center">

        
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-600/20 border border-red-500/30">
          <Loader2 className="h-8 w-8 animate-spin text-red-500" />
        </div>

        
        <h2 className="mt-6 text-xl font-semibold text-white">
          Setting up your profile...
        </h2>

        
        <p className="mt-2 text-sm text-gray-400">
          Preparing your personalized movie experience 🍿
        </p>


      </div>
    </div>
  );
}
  