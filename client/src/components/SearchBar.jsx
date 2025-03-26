import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState("");

    const handleSearch = (e) => {
        setQuery(e.target.value);
        if (onSearch) {
            onSearch(e.target.value);
        }
    };

    return (
        <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 w-full max-w-md bg-white shadow-sm">
            <FaSearch className="text-gray-500 mr-2" />
            <input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={handleSearch}
                className="w-full outline-none bg-transparent text-gray-900"
            />
        </div>
    );
};

export default SearchBar;
