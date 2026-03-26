export function SortDropdown({ sort, setSort }: any) {
  return (
    <select
      value={sort}
      onChange={(e) => {
        setSort(e.target.value)
        
      }}
      className="text-white px-4 bg-gray-700  py-2 rounded-lg"
    >
      <option value="popularity.desc">🔥 Most Popular</option>
      <option value="vote_average.desc">⭐ Top Rated</option>
      <option value="primary_release_date.desc">🆕 Latest</option>
      <option value="primary_release_date.asc">📅 Oldest</option>
    </select>
  );
}