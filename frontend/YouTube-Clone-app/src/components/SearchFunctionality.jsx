import { useState, useEffect, useRef } from "react";
import SearchBar from "./SearchFunctionality/SearchBar.jsx";
import SearchResultDisplay from "./SearchFunctionality/SearchResultDisplay.jsx";

function SearchFunctionality() {
  const [results, setResults] = useState("");
  const [showResults, setShowResults] = useState(false);
  const searchResultRef = useRef(null);

  // Close SearchResultDisplay if clicked outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchResultRef.current && !searchResultRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleResultsChange = (newResults) => {
    setResults(newResults);
    if (newResults && newResults.length > 0) {
      setShowResults(true); // Show results if there are results
    } else {
      setShowResults(false); // Hide results if there are no results
    }
  };

  return (
    <div className="SearchFunctionalityDiv flex flex-col relative">
      <SearchBar setResults={handleResultsChange} />
      {showResults && results.length > 0 && (
        <div ref={searchResultRef}>
          <SearchResultDisplay results={results} setShowResults={setShowResults} />
        </div>
      )}
    </div>
  );
}

export default SearchFunctionality;
