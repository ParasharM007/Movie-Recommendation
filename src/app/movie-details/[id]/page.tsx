"use client";

import  { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Play, Star } from "lucide-react";
import { useParams } from "next/navigation";

export default function MovieDetailsPage() {
  const [Id, setId] = useState<string>(""); // default: Avengers Infinity War :-299536
  const [movie, setMovie] = useState<any>({});
  const [videos, setVideos] = useState<any>({});
  const [credits ,setCredits]=useState<any>({})
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

   const { id } =useParams<{ id: string }>();
    if(!id){
      return <h1>Couldn't find movie id</h1>
    }
      

  const fetchMovie = async () => {
    setLoading(true);
    setError("");

    try {
      const [res] = await Promise.all([
        axios.get(`/api/movie-data?id=${id}`),
      ]);
        console.log("Here is Movie Data in frontend ",res.data.data)
      setMovie(res.data.data.movies);
      setVideos(res.data.data.videos.results)
      setCredits(res.data.data.credits)
      
    } catch (err) {
      setError("Failed to load movie details.")
      
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovie();
    
  }, [id]);

  const trailerLinks = useMemo(() => {
    if (!videos?.length) return [];

    return videos
      .filter((v:any) => v.site === "YouTube" && (v.type === "Trailer" || v.type === "Teaser"))
      .slice(0, 3);
  }, [videos]);

  if(trailerLinks )console.log("Trailer ",trailerLinks)

  const bgImage =
    movie?.backdrop_path
      ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
      : movie?.poster_path
      ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
      : "";

  return (
    <div className="min-h-screen text-white bg-black relative">
      {/* Background */}
      {bgImage ? (
        <div
          className="fixed inset-0 -z-10"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ) : null}

      {/* Overlay */}
      <div className="fixed inset-0 -z-10 bg-black/70" />
      <div className="fixed inset-0 -z-10 bg-gradient-to-t from-black via-black/50 to-black/10" />

      <main className="mx-auto max-w-5xl px-4 py-10">
        
        {/* Error */}
        {error ? (
          <div className="mb-6 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-100">
            {error}
          </div>
        ) : null}

        {/* Loading */}
        {loading ? (
          <p className="text-white/70">Loading movie details...</p>
        ) : movie ? (
          <section className="grid grid-cols-1 gap-8 md:grid-cols-[380px_1fr]">
            {/* Poster */}
            <div className="rounded-3xl overflow-hidden border border-white/10 bg-white/5">
              <img
                src={
                  movie?.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "https://via.placeholder.com/500x750?text=No+Poster"
                }
                alt={movie?.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Details */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">{movie?.title}</h1>

              <p className="mt-2 text-sm text-white/60">
                {movie?.release_date || "—"} • {movie?.original_language?.toUpperCase() || "—"}
              </p>

              {/* Rating */}
              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                <Star className="h-4 w-4 text-yellow-300" />
                <span className="font-semibold">{movie?.vote_average || "—"}</span>
                <span className="text-white/60 text-sm">({movie?.vote_count || 0} votes)</span>
              </div>

              {/* Genres */}
              <div className="mt-5 flex flex-wrap gap-2">
                {(movie?.genres || []).map((g: any) => (
                  <span
                    key={g.id}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80"
                  >
                    {g.name}
                  </span>
                ))}
              </div>

              {/* Overview */}
              <div className="mt-7">
                <h2 className="text-lg font-semibold">Overview</h2>
                <p className="mt-2 text-sm leading-7 text-white/75">
                  {movie?.overview || "No overview available."}
                </p>
              </div>

              {/* Trailer Links */}
              <div className="mt-8">
                <h2 className="text-lg font-semibold">Trailers</h2>

                {trailerLinks.length ? (
                  <div className="mt-3 space-y-3">
                    {trailerLinks.map((v: any) => (
                      <button
                        key={v.id}
                        onClick={() =>
                          window.open(`https://www.youtube.com/watch?v=${v.key}`, "_blank")
                        }
                        className="w-full flex items-center justify-between cursor-pointer rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/10"
                      >
                        <div className="text-left">
                          <p className="text-sm font-semibold line-clamp-1">{v.name}</p>
                          <p className="text-xs text-white/60">{v.type}</p>
                        </div>

                        <div className="rounded-full border border-white/10 bg-white/5 p-2">
                          <Play className="h-4 w-4" />
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="mt-2 text-sm text-white/60">No trailers found.</p>
                )}
              </div>
            </div>
          </section>
        ) : (
          <p className="text-white/60">No movie data.</p>
        )}
      </main>
    </div>
  );
}
