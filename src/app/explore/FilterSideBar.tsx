"use client";
import { Filter } from "lucide-react";
import { useState } from "react";

const genresList = [
  { id: 28, name: "Action" },
  { id: 53, name: "Thriller" },
  { id: 35, name: "Comedy" },
  { id: 18, name: "Drama" },
  { id: 878, name: "Sci-Fi" },
];

export default function FilterSidebar({ filters, setFilters }: any) {

  const [open, setOpen] = useState(false);

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
    <div>
    {/* {!open && ( */}
   <button
    className="fixed top-20 left-4 md:top-62 md:left-1 lg:top-5 lg:left-30 z-50   text-white 
              h-12 w-12  rounded-full 
             flex items-center justify-center " 
    onClick={(e) => {
      e.stopPropagation();
      setOpen(prev=>!prev);
    }}
  >
    <Filter size={28} />
  </button>
  {/* )} */}
  

      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-black/3
          ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          />

    <div className={`
      lg:bg-black/10 fixed lg:z-30 w-64 h-[95vh] lg:h-[55vh] z-50  bg-gradient-to-r from-black/90 to-black/70
      transition-all duration-300 ease-in-out p-2 border rounded-xl lg:space-y-0 space-y-6
      ${open?"opacity-100 -translate-x-1 lg:translate-x-15" : "opacity-0 -translate-x-5"} 
      `}>
      <h2 className="text-xl font-semibold">Filters</h2>

      
      <div>
        <p className="mb-2 text-sm text-gray-400">Genres</p>
        <div className="flex flex-wrap gap-2">
          {genresList.map((genre) => (
            <button
              key={genre.id}
              onClick={() => toggleGenre(genre.id)}
              className={`px-3 py-1 my-1 cursor-pointer rounded-full text-sm border ${
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

      
      <div>
        <p className="my-2 text-sm text-gray-400">Minimum Rating</p>
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
        <p className="text-sm my-2">{filters.rating} ⭐</p>
      </div>

      
      <div>
        <p className="my-2 text-sm  text-gray-400">Release Year</p>
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

      
      <button
        onClick={() =>
          setFilters({
            genres: [],
            rating: 0,
            yearFrom: "",
            yearTo: "",
          })
        }
        className="w-full cursor-pointer bg-purple-600 border-purple-600 my-2 py-2 rounded-lg"
      >
        Reset Filters
      </button>
    </div>
</div>
  );
}