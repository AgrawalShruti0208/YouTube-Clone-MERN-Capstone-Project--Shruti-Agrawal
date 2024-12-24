import { Link } from "react-router-dom";
import SearchResultDiv from "./SearchResultDiv";

function SearchResultDisplay({results, setShowResults}) {
    return (  
        <div className="SearchResultDisplay z-[500] bg-slate-200 absolute top-[50px]">

           {results.map((result) => {
                return <Link key={result._id} to={`/Video/${result._id}`} onClick={()=>setShowResults(false)}><SearchResultDiv result={result.videoTitle} /></Link>
            })}

        </div>
    );
}

export default SearchResultDisplay;