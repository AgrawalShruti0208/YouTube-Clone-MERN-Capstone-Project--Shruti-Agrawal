/* ---------------Search Form Component---------------- */
import { useState, useEffect} from "react";
import { useLocation } from 'react-router-dom';

function SearchBar({ setResults }) {
    const [input,setInput] = useState("");
    const location = useLocation();  // Hook to listen for changes in URL

  // Clear the input when the URL changes
  useEffect(() => {
    setInput(""); // Clear the input value on URL change
  }, [location]); // Triggered when `location` changes

    const fetchData=(value)=>{
      fetch("http://localhost:3000/videos")
      .then((response) => response.json())
      .then((json) => {
        const result = json.filter((video) => {
          return (
            value &&
            video &&
            video.videoTitle &&
            video.videoTitle.toLowerCase().includes(value.toLowerCase())
          );
        });
        setResults(result);
      });
  };
    function handleChange(value){
      //handle when value of input changes
      setInput(value); //set the input value
      fetchData(value); //call fetch data function with this value

    }

    return ( 
        <div className='searchForm flex items-center bg-[#d5d3d3] justify-center m-3 rounded-2xl pl-2 pr-2 custom-lgDesktop:h-8'>
            <input type="text" 
              placeholder='Search YouTube' 
              value={input}
              onChange={(e)=>handleChange(e.target.value)}
              className='bg-transparent outline-none border-none w-[90%] text-[#141313]'
            />
            <button type='submit'>
              <i className='bx bx-search'></i>
            </button>
        </div>
     );
}

export default SearchBar;