"use client";
import { ExpectedResponse } from "@/types/ExpectedResponse";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";

const genres = [
  "Action",
  "Comedy",
  "Drama",
  "Romance",
  "Thriller",
  "Horror",
  "Sci-Fi",
  "Fantasy",
  "Animation",
  "Adventure",
  "Crime",
  "Mystery",
  "Documentary",
  "Music",
  "Family",
];

export default function GenreSelection() {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const token = useSession();

  const toggleGenre = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    } else {
      if (selectedGenres.length >= 5) return;
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  type payLoad = {
    action: string;
    field: string;
    data: string[];
  };
  type ErrorType = {
    message: string;
  };
  type UserTasteData ={
    id:string,
    email:string,
    updatedField:string[]
  }
  const mutation = useMutation<
    ExpectedResponse<UserTasteData>,
    AxiosError<ErrorType>,
    payLoad
  >({
    mutationFn: async (data: payLoad) => {
      setLoading(true);
      const res:AxiosResponse = await axios.post(`/api/update-user-taste`, data);
      return res.data;
    },
  });
  const handleGenresSubmission = async () => {
    const data = {
      action: "add",
      field: "likedGenres",
      data: selectedGenres,
    };
    if (token) {
      mutation.mutate(data, {
        onSuccess: (res) => {
          toast("Genres added to liked list", {
            description: res.message || "Success",
          });
        },
        onError: (err) => {
          toast("Error in adding genres", {
            description:
              err.response?.data?.message ||
              err.message ||
              "Something went wrong",
          });
        },
        onSettled: () => {
          setLoading(false);
        },
      });
    }else{
      localStorage.setItem('likedGenres',JSON.stringify(selectedGenres))
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4">
      <h1 className="text-3xl font-bold mb-2">Choose Your 5 Favorite Genres</h1>
      <p className="text-gray-400 mb-8">Selected: {selectedGenres.length}/5</p>

      <div className="flex flex-wrap justify-center gap-5 max-w-3xl">
        {genres.map((genre) => {
          const isSelected = selectedGenres.includes(genre);
          return (
            <button
              key={genre}
              onClick={() => toggleGenre(genre)}
              className={`
                w-24 h-24 rounded-full flex items-center justify-center text-sm font-semibold
                transition-all duration-300
                ${
                  isSelected
                    ? "bg-purple-600 scale-110 shadow-lg shadow-purple-500/50"
                    : "bg-gray-800 hover:bg-gray-700"
                }
                ${selectedGenres.length >= 5 && !isSelected ? "opacity-50 cursor-not-allowed" : ""}
              `}
            >
              {genre}
            </button>
          );
        })}
        <button onClick={handleGenresSubmission}>Submit</button>
      </div>
    </div>
  );
}
