import Image from "next/image";
import { Play, Info, TrendingDown } from "lucide-react";
import { TrendingRow } from "./TrendingRow";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function HeroBanner() {
  const router= useRouter()
  const targetRef = useRef<HTMLDivElement | null>(null)
  const handleScroll=()=>{
    targetRef.current?.scrollIntoView({
      block:'start',
      behavior:'smooth'
    })
  }
  return (
    <>
    <section className="relative h-[95vh] w-full overflow-hidden flex items-center">
      
      
      <Image
        src="/image/MovieRec_Background.jpg"
        alt="Featured Movie"
        fill
        priority
        className="object-cover scale-110 blur-[1px]"
      />

      
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 pointer-events-none" />

      
      <div className="relative z-20 px-6 md:px-16 max-w-2xl">
        

        
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mt-4 leading-tight">
          Don't Know What to Watch?
        </h1>

        
        <p className="text-gray-300 text-lg mt-4">
          Discover trending movies, hidden gems, and personalized picks — all in one place.
        </p>

        
        <div className="flex gap-4 mt-6">
          <button className="flex items-center gap-2 cursor-pointer bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
          // onClick={() => router.push(`/explore`)}
          onClick={handleScroll}
          >
            <Play size={20} /> Explore
          </button>

          {/* <button className="flex items-center gap-2 bg-gray-700/70 backdrop-blur-md text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition">
            <Info size={20} /> More Info
          </button> */}
        </div>
      </div>

      
      <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none" />
    </section>
    <div className="" ref={targetRef}>
    <TrendingRow />

    </div>
    </>
  );
}