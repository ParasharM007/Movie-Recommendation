import { UserTasteInput } from "@/types/UserTaste";

export function buildUserPrompt(
  user?: UserTasteInput ,
  searchQuery?: string
) {

   if (!user) return "";
  const hasSearch = Boolean(searchQuery);

  return `
User Profile:
- Preferred Genres: ${user.likedGenres.length ? user.likedGenres.join(", ") : "None"}
- Favorites: ${user.favorites.length ? user.favorites.join(", ") : "None"}
- Already Watched: ${user.alreadyWatched.length ? user.alreadyWatched.join(", ") : "None"}
- WatchList: ${user.watchlist.length ? user.watchlist.join(", ") : "None"}

Search Intent:
${hasSearch ? `"${searchQuery}"` : "None (personalized homepage discovery mode)"}

TASK:
${
  hasSearch
    ? `- Recommend EXACTLY 5 movies that best match the search intent.
       - Search relevance must be prioritized over genre.
       - Never recommend any title that appears in alreadyWatched.`
    : `- For EACH genre in Preferred Genres, recommend EXACTLY 6 movies.
       - These recommendations will be shown as separate genre sections on the homepage.
       - Never recommend any title that appears in alreadyWatched.`
}
`;
}
