// src/components/SearchBar.js
import React from 'react';

const Search = ({ placeholder, onChange }) => {
  return (
    <div className="flex justify-center mt-5">
      <div className="relative text-gray-600 border border-zinc-500 rounded-full">
        <input
          type="search"
          name="search"
          placeholder={placeholder || 'Search'}
          className="bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none w-64"
          onChange={onChange}
        />
        <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
          <svg
            className="text-gray-600 h-4 w-4 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-3.91-3.59-7.03-7.5-7.5a7.518 7.518 0 0 0-7.5 7.5c0 3.91 3.59 7.03 7.5 7.5a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-7 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Search;
