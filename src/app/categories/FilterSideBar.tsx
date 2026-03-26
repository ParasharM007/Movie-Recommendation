"use client";
import { useState } from "react";

const genresList = [
  { id: 28, name: "Action" },
  { id: 53, name: "Thriller" },
  { id: 35, name: "Comedy" },
  { id: 18, name: "Drama" },
  { id: 878, name: "Sci-Fi" },
];

export default function FilterSidebar({ filters, setFilters }: any) {
  const toggleGenre = (id: number) => {
    setFilters((prev: any) => {
      const exists = prev.genres.includes(id);
      return {
        ...prev,
        genres: exists
          ? prev.genres.filter((g: number) => g !== id)
          : [...prev.genres, id],
      };
    });
  };

  return (
    <div className="w-64 h-auto border bg-gray-900 p-4 rounded-xl space-y-6">
      <h2 className="text-xl font-semibold">Filters</h2>

      {/* Genres */}
      <div>
        <p className="mb-2 text-sm text-gray-400">Genres</p>
        <div className="flex flex-wrap gap-2">
          {genresList.map((genre) => (
            <button
              key={genre.id}
              onClick={() => toggleGenre(genre.id)}
              className={`px-3 py-1 cursor-pointer rounded-full text-sm border ${
                filters.genres.includes(genre.id)
                  ? "bg-purple-600 border-purple-600"
                  : "border-gray-600"
              }`}
            >
              {genre.name}
            </button>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div>
        <p className="mb-2 text-sm text-gray-400">Minimum Rating</p>
        <input
          type="range"
          min="0"
          max="10"
          step="0.5"
          value={filters.rating}
          onChange={(e) =>
            setFilters({ ...filters, rating: Number(e.target.value) })
          }
          className="w-full cursor-pointer accent-purple-600"
        />
        <p className="text-sm mt-1">{filters.rating} ⭐</p>
      </div>

      {/* Year */}
      <div>
        <p className="mb-2 text-sm text-gray-400">Release Year</p>
        <input
          type="number"
          placeholder="From"
          value={filters.yearFrom}
          onChange={(e) =>
            setFilters({ ...filters, yearFrom: e.target.value })
          }
          className="w-full mb-2 px-2 py-1 rounded bg-gray-700"
        />
        <input
          type="number"
          placeholder="To"
          value={filters.yearTo}
          onChange={(e) =>
            setFilters({ ...filters, yearTo: e.target.value })
          }
          className="w-full px-2 py-1 rounded bg-gray-700"
        />
      </div>

      {/* Reset */}
      <button
        onClick={() =>
          setFilters({
            genres: [],
            rating: 0,
            yearFrom: "",
            yearTo: "",
          })
        }
        className="w-full cursor-pointer bg-purple-600 border-purple-600 py-2 rounded-lg"
      >
        Reset Filters
      </button>
    </div>
  );
}