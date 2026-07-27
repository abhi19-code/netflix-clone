function SearchBar({ searchText, setSearchText }) {
  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Search movie..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      <button disabled>
        Auto Search
      </button>
    </div>
  );
}

export default SearchBar;