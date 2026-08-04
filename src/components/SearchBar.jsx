function SearchBar({ value, onChange }) {
  return (
    <label className="searchBar">
      <span className="srOnly">Search studies</span>
      <span aria-hidden="true">⌕</span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search studies, journals, or keywords"
        autoComplete="off"
      />
      {value && (
        <button type="button" onClick={() => onChange('')} aria-label="Clear search">
          ×
        </button>
      )}
    </label>
  )
}

export default SearchBar
