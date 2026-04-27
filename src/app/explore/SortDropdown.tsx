import { useState } from "react";
import { ChevronDown, Flame, Star, CalendarDays } from "lucide-react";

const options = [
  { value: "popularity.desc", label: "Most Popular", icon: Flame },
  { value: "vote_average.desc", label: "Top Rated", icon: Star },
  { value: "primary_release_date.desc", label: "Latest", icon: CalendarDays },
  { value: "primary_release_date.asc", label: "Oldest", icon: CalendarDays },
];

export function SortDropdown({ sort, setSort }:any) {
  const [open, setOpen] = useState(false);

  const selected = options.find((opt) => opt.value === sort);

  return (
    <div className="relative w-[220px]">
      
      
      <div
        onClick={() => setOpen(!open)}
        className="w-full flex items-center z-30 justify-between bg-[#1a1a1a] border border-gray-800 px-4 py-2 rounded-xl text-white hover:bg-[#222] transition"
      >
        <div className="flex items-center gap-2">
          {selected?.icon ?( 
            <>
            <selected.icon size={16} className="text-purple-400" />
            <span className="text-sm">{selected?.label}</span>
            </>
          ):(
            <>
            <Flame size={16} className="text-purple-400" />
            <span className="text-sm">Most Popular</span>
            </>
          )
        }
        </div>

        <ChevronDown
          size={18}
          className={`transition ${open ? "rotate-180" : ""}`}
        />
      </div>

      
      {open && (
        <div className="absolute mt-2 w-full bg-[#141414] border border-gray-800 rounded-xl shadow-lg overflow-hidden z-50">
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => {
                setSort(opt.value);
                setOpen(false);
              }}
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:bg-[#222] hover:text-white cursor-pointer transition"
            >
              <opt.icon size={16} className="text-purple-400" />
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}