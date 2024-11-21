import { Link } from "react-router-dom";
import SeachFunctionality from "./SearchFunctionality";

function NavigationSideBar() {

    function handleShowMenu(){
        const mainArea = document.querySelector('.MainContentArea');
        const sideMenu = document.querySelector('.sidebar');
        const header = document.querySelector('.Header');
        const logo = document.querySelector('.HeaderLogo');

        // If Side Menu is Closed, make changes to open it
        if(sideMenu.classList.contains('hideComponent')){
            sideMenu.classList.replace('hideComponent','showComponent');
            mainArea.classList.replace('left-0','left-[32%]');
            header.classList.replace('ml-0.5','ml-[32%]');
            logo.classList.replace('visible','invisible'); 
            
    
            
        }// If Side Menu is Open, make changes to close it
        else if(sideMenu.classList.contains('showComponent')){
            sideMenu.classList.replace('showComponent','hideComponent');
            mainArea.classList.replace('left-[32%]','left-0');
            header.classList.replace('ml-[32%]','ml-0.5');
            logo.classList.replace('invisible','visible');
            
        }


    }

    function handleShowSearchForm(){
        const searchForm = document.querySelector('.SearchInApp');
        if(searchForm.classList.contains('hideComponent')){
          searchForm.classList.replace('hideComponent','flex');
        }
      }
    
    function handleHideSearchForm(){
        const searchForm = document.querySelector('.SearchInApp');
    
        if(searchForm.classList.contains('flex')){
          searchForm.classList.replace('flex','hideComponent');
        }
    }
    
    return (
        <div className='HeaderComponent'>
          {/*---------------------------NAVIGATION SIDE BAR SECTION---------------------- */}
            <section className="sidebar hideComponent fixed top-0 left-0 w-[30%] h-[100%] bg-[#ffffff] shadow-2xl p-3 border-gray-100 border-2 z-[1000]">
                  <div className="Logo flex items-center">
                      <img className="h-7" src="/YouTube Logo.JPG" alt="YouTube Logo" />
                  </div>
                  {/* Side Navigation Bar */}
                  <ul className="side-menu top mt-5 flex flex-col gap-2 w-[100%]">
    
                      <li>
                          <Link to="/">
                              <i className='bx bxs-home' ></i>
                              <span className="text">Home</span>
                          </Link>
                      </li>
                      <li>
                          <Link to="#" className="text-blue-600">
                              <i className='bx bx-user-circle' ></i>
                              <span className="text">Sign in</span>
                          </Link>
                      </li>
    
                  </ul>
                  
            </section>
          {/*---------------------------HEADER SECTION---------------------- */}
            <section className='Header flex items-center justify-between p-1 relative w-[100%] ml-0.5 border-b-2 border-spacing-1'>
    
              <button className='showMenu z-[100] absolute top-12 left-4 bg-[#eceaea] w-10 h-8' onClick={handleShowMenu}>
                <i className='bx bx-menu bx-rotate-180'></i>
              </button>
              
              <div className="HeaderLogo flex items-center visible">
                <img className="h-9" src="/YouTube Logo.JPG" alt="YouTube Logo" />
              </div>
    
              <div className="SearchInApp hideComponent items-center absolute bg-[#eaeaea] top-0 left-0 w-[100%] h-[100%]">
                <button className='backFromSearch w-[10%]' onClick={handleHideSearchForm} >
                  <i className='bx bx-arrow-back'></i>
                </button>
                {/* SearchForm Component */}
                <div className="searchFormComponent w-[90%]">
                    <SeachFunctionality/>
                </div>
                
              </div>
                
              {/* Extra button to display searchForm */}
                <button className='showSeachForm' onClick={handleShowSearchForm}>
                    <i className='bx bx-search'></i>
                </button>
              
    
              <div className='UserProfile hidden'>
                <i className='bx bx-user-circle' ></i>
              </div>
    
              
    
            </section>
          
          
          
        </div>
    )
}

export default NavigationSideBar;