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

    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 text-center">
         <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-200">

       <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
         </div>
          <p>Setting up your profile...</p>
      </div>
      </div>
  )
}
