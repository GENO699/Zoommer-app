import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import debounce from "lodash.debounce";

function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleSearch = debounce(async (query) => {
    try {
      const response = await fetch(
        `http://localhost:3000/product?search=${query}`
      );
      const data = await response.json();
      if (Array.isArray(data)) {
        setSearchResults(data);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearchResults([]);
    }
  }, 300);

  const handleInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    handleSearch(query);
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="w-[auto] h-[auto] flex relative">
      <input
        className="w-[480px] h-[50px] pl-8 rounded-xl border border-rose-400 dark:bg-slate-700"
        type="text"
        placeholder="ძიება"
        value={searchQuery}
        onChange={handleInputChange}
      />
      <FontAwesomeIcon
        className="absolute top-4 left-2 text-xl text-orange-600"
        icon={faMagnifyingGlass}
      />

      <ul>
        {searchResults.map((result) => (
          <li key={result.id} onClick={() => handleSelectProduct(result)}>
            {result.name}
          </li>
        ))}
      </ul>

      {selectedProduct && (
        <div>
          <h2>Selected Product:</h2>
          <p>{selectedProduct.name}</p>
        </div>
      )}
    </div>
  );
}

export default Search;
