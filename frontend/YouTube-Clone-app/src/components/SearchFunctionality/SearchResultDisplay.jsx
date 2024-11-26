import { Link } from "react-router-dom";
import SearchResultDiv from "./SearchResultDiv";

function SearchResultDisplay({results}) {
    return (  
        <div className="SearchResultDisplay z-[500] bg-slate-200 absolute top-[50px]">

           {results.map((result) => {
                return <a href={`/Video/${result._id}`} key={result._id}><SearchResultDiv result={result.videoTitle}  /></a>
            })}

        </div>
    );
}

export default SearchResultDisplay;