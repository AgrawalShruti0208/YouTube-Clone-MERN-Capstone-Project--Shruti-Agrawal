function SearchResultDiv({result}) {
    return ( 
        <div className="SearchResultDiv flex items-center justify-between mb-1  px-1 drop-shadow-md bg-white">
            <p className="line-clamp-1 w-[70%]">{result}</p>
            <button><i className='bx bx-link-external bx-sm' ></i></button>

        </div>
     );
}

export default SearchResultDiv;