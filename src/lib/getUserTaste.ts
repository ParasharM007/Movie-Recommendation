import { UserTasteInput } from "@/types/UserTaste";
import { UserTasteModel } from "../model/UserTaste.model";


export async function getUserTaste(userId: string): Promise<UserTasteInput> {
  const doc = await UserTasteModel
    .findOne({ userId })
    .lean<{
      userId: string;
      likedGenres?: string[];
      recentlyLiked?: string[];
      favorites?: string[];
      alreadyWatched?: string[];
      watchlist?: string[];
    } | null>();

  return {
    userId,
    likedGenres: doc?.likedGenres ?? [],
    recentlyLiked: doc?.recentlyLiked ?? [],
    favorites: doc?.favorites ?? [],
    alreadyWatched: doc?.alreadyWatched ?? [],
    watchlist: doc?.watchlist ?? []
  };
}
