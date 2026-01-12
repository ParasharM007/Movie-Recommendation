export type UserTasteInput  = {
  userId:string ,
  likedGenres: string[];
  recentlyLiked: string[];
  favorites: string[];
  alreadyWatched: string[];
  watchlist: string[];
};

export function buildUserPrompt(
  user?: UserTasteInput ,
  searchQuery?: string
) {

   if (!user) return "";
  const hasSearch = Boolean(searchQuery);

  return `
User Profile:
- Preferred Genres: ${user.likedGenres.length ? user.likedGenres.join(", ") : "None"}
- Recently Liked: ${user.recentlyLiked.length ? user.recentlyLiked.join(", ") : "None"}
- Favorites: ${user.favorites.length ? user.favorites.join(", ") : "None"}
- Already Watched: ${user.alreadyWatched.length ? user.alreadyWatched.join(", ") : "None"}
- WatchList: ${user.watchlist.length ? user.watchlist.join(", ") : "None"}

Search Intent:
${hasSearch ? `"${searchQuery}"` : "None (personalized homepage discovery mode)"}

TASK:
${
  hasSearch
    ? `- Recommend EXACTLY 5 movies or TV series that best match the search intent.
       - Search relevance must be prioritized over genre.`
    : `- For EACH genre in Preferred Genres, recommend EXACTLY 10 movies or TV series.
       - These recommendations will be shown as separate genre sections on the homepage.`
}
`;
}
