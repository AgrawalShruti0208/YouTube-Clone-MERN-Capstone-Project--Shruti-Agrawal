import { useState } from "react";
import SearchBar from "./SearchFunctionality/SearchBar.jsx";
import SearchResultDisplay from "./SearchFunctionality/SearchResultDisplay.jsx";

function SearchFunctionality() {

  const [results,setResults] = useState("");

  return ( 
    <div className="SearchFunctionalityDiv flex flex-col relative ">
      <SearchBar setResults={setResults}/>
      {results && results.length > 0 &&<SearchResultDisplay results={results} />}
    </div>
   );
}

export default SearchFunctionality;