import { discoverWithTMDB } from "@/helpers/services/tmdbDiscoverAPI";
import { MovieData } from "@/types/MovieData";
import axios from "axios";

export async function getHomeData() {
  const genres = [
    { name: "Action", id: 28 },
    { name: "Comedy", id: 35 },
    { name: "Drama", id: 18 },
    { name: "Sci-Fi", id: 878 },
    { name: "Thriller", id: 53 },
  ];
  try {
    const results:MovieData[][] = await Promise.all(
      genres.map(async (genre) => {
      const movies = discoverWithTMDB(genre.id.toString() ,genre.name)
      return movies
    }
    ),
    );
   const flatResult:MovieData[] =results.flat()
    return flatResult
  } catch (error) {
    throw error;
  }
}
