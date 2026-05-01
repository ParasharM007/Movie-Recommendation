import { UserTasteInput } from "@/types/UserTaste";
import { UserTasteModel } from "../model/UserTaste.model";


export async function getUserTaste(userId: string): Promise<UserTasteInput> {
  const doc = await UserTasteModel
    .findOne({ userId })
    .lean<{
      userId: string;
      likedGenres?: string[];
      favorites?: string[];
      alreadyWatched?: string[];
      watchlist?: string[];
    } | null>();

  return {
    userId,
    likedGenres: doc?.likedGenres ?? [],
    favorites: doc?.favorites ?? [],
    alreadyWatched: doc?.alreadyWatched ?? [],
    watchlist: doc?.watchlist ?? []
  };
}
