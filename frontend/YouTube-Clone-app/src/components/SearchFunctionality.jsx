/* ---------------Search Form Component---------------- */
function SeachFunctionality() {
    return ( 
        <form action="#searchQuery" className='searchForm flex items-center bg-[#d5d3d3] justify-center m-3 rounded-2xl pl-2 pr-2'>
            <input type="text" placeholder='Search YouTube' className='bg-transparent outline-none border-none w-[90%] text-[#141313]'/>
            <button type='submit'>
              <i className='bx bx-search'></i>
            </button>
        </form>
     );
}

export default SeachFunctionality;