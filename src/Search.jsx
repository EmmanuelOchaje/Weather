import React from "react";

const Search = ({ search, setSearch, handleSearch }) => {
  return (
    <div className="flex justify-center">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded-lg p-1"
        placeholder="Enter City Name"
      />
      <button
        onClick={handleSearch}
        className="bg-black text-white p-1 rounded-lg ml-2"
      >
        Search
      </button>
    </div>
  );
};

export default Search;
