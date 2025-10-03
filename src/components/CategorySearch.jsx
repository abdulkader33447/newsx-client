import { useState } from "react";
import { PiMagnifyingGlassLight } from "react-icons/pi";

const CategorySearch = ({ categories, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  return (
    <div className="relative mb-5 w-48">
      <PiMagnifyingGlassLight className="absolute top-1/2 left-2 transform -translate-y-1/2 text-gray-500" />
      <input
        type="text"
        name="search"
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearch}
        className="text-black bg-white rounded p-2 pl-8 w-full focus:outline-none focus:border-none"
      />
    </div>
  );
};

export default CategorySearch;
