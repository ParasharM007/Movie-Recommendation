export function SortDropdown({ sort, setSort }: any) {
  return (
    <select
      value={sort}
      onChange={(e) => {
        setSort(e.target.value)
        
      }}
      className="text-white px-4 bg-gray-700  py-2 rounded-lg"
    >
      <option value="popularity">🔥 Most Popular</option>
      <option value="rating">⭐ Top Rated</option>
      <option value="latest">🆕 Latest</option>
      <option value="oldest">📅 Oldest</option>
    </select>
  );
}