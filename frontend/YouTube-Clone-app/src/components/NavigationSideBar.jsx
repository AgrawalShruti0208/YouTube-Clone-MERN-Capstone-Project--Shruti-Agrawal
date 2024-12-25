import { Link } from "react-router-dom";
import SeachFunctionality from "./SearchFunctionality";
import { isTokenExpired } from "../utils/HelperFunctions.js";
import { useEffect,useState } from "react";
import {useDispatch , useSelector} from 'react-redux'
import { fetchUserData } from "../utils/userDataSlice.js";
import ProfileDropdown from "./ProfileDropdown.JSX";

function NavigationSideBar() {

  const [breakpoint, setBreakpoint] = useState("small"); // Default to "small"

  useEffect(() => {
    // Define media queries
    const mediumScreen = window.matchMedia("(min-width: 700px)");
    const smallScreen = window.matchMedia("(max-width: 699px)");

    // Function to update the breakpoint state
    const updateBreakpoint = () => {
      
      if (mediumScreen.matches) {
        setBreakpoint("medium");
      } else if (smallScreen.matches) {
        setBreakpoint("small");
      }

    };

    // Initial call to set the correct breakpoint
    updateBreakpoint();

    // Add listeners for breakpoint changes
    mediumScreen.addEventListener("change", updateBreakpoint);
    smallScreen.addEventListener("change", updateBreakpoint);

    // Cleanup listeners on unmount
    return () => {
      mediumScreen.removeEventListener("change", updateBreakpoint);
      smallScreen.removeEventListener("change", updateBreakpoint);
    };
  }, []);

    
    const jwtToken = localStorage.getItem("token");

    
    const dispatch = useDispatch();

    const Userdata =  useSelector(state => state.userData);

    useEffect(()=>{
            // dispatching action to fetch data from backend API and return the state of request
            if(localStorage.getItem("userEmail")){
              dispatch(fetchUserData(localStorage.getItem("userEmail")));
            }
            
    
    },[dispatch]);

    let userInfo;
    if(Userdata.user.length!=0){
      userInfo = Userdata.user[0];
    }
    

    if(jwtToken){
        

        if(isTokenExpired(jwtToken)){
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            localStorage.removeItem('userEmail');
            location.replace('/login')
            alert("JWT Token Expired! Please Login Again!");
            
        }
    
    }
    
    
    function handleShowMenu() {
      const mainArea = document.querySelector('.MainContentArea');
      const sideMenu = document.querySelector('.sidebar');
      const header = document.querySelector('.Header');
      const logo = document.querySelector('.HeaderLogo');
    
    
      // Determine margin values based on breakpoint
      const getMarginValues = () => {
        if (breakpoint=="medium") {
          return {
            mainLeft: "left-[19%]",
            headerMargin: "ml-[16%]",
          };
        } 

        return {
          mainLeft: "left-[35%]",
          headerMargin: "ml-[24%]",
        };

      };
    
      const { mainLeft, headerMargin } = getMarginValues();
    
      // If Side Menu is Closed, make changes to open it
      if (sideMenu.classList.contains('hideComponent')) {
        sideMenu.classList.replace('hideComponent', 'showComponent');
        mainArea.classList.replace('left-0', mainLeft);
        header.classList.replace('ml-0.5', headerMargin);
        logo.classList.replace('visible', 'invisible');
      }
      // If Side Menu is Open, make changes to close it
      else if (sideMenu.classList.contains('showComponent')) {
        sideMenu.classList.replace('showComponent', 'hideComponent');
        mainArea.classList.replace(mainLeft, 'left-0');
        header.classList.replace(headerMargin, 'ml-0.5');
        logo.classList.replace('invisible', 'visible');
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

    function handleLogOut(){
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('userEmail');
      location.replace("/");
    }
    
    const categories = ["Music","Films","Comedy","Travel","Gaming","Podcasts"];
    const categoryIcons = ['genres','movie','comedy_mask','travel','stadia_controller','podcasts'];
    
    return (
        <div className='HeaderComponent'>
          {/*---------------------------NAVIGATION SIDE BAR SECTION---------------------- */}
            <section 
              className="sidebar hideComponent fixed top-0 left-0 w-[25%] h-[100%] bg-[#ffffff] shadow-2xl p-3 border-gray-100 border-2 z-[1000]
              custom-mid:w-[16%]">
                  <div className="Logo flex items-center">
                      <img className="w-[100%] h-auto custom-mid:w-[70%] lg:w-[64%] custom-lgDesktop:w-[50%]" src="/YouTube Logo.JPG" alt="YouTube Logo" />
                  </div>
                 
                  {/* Side Navigation Bar */}
                  <ul className="side-menu top mt-5 flex flex-col gap-2 w-[100%]">
                    {userInfo==undefined &&
                      <>
                          
                          <li>
                              <Link to="/UserSignUp" className="text-blue-600">
                                  <i className='bx bx-user-circle' ></i>
                                  <span className="text">Sign in</span>
                              </Link>
                          </li>
                          

                      </>
                      
                    }
                    {userInfo!=undefined &&
                      <>

                          {console.log(userInfo)}
                          
                          <li className="bg-gray-100 p-2">
                            <div className="profile-container">
                              <img src={userInfo.user_avatar} alt="Profile Picture" className="profile-image" />
                            </div>
                            
                            <div className="profile-info flex flex-col gap-1 pt-2">
                              <span className="text-[1.1rem] font-bold">{userInfo.username}</span>
                              <button 
                                className="logout-btn bg-transparent text-sm text-gray-700 hover:text-red-600 font-semibold rounded-full focus:outline-none transition-all duration-200"
                                onClick={handleLogOut}
                              >
                                Logout
                              </button>
                        
                            </div>
                            
                          </li>
                        
                          
                          
                          
                      </>
                      
                        
                      }
                    <hr />
                    <li>
                      <Link to="/">
                        <i className='bx bxs-home' ></i>
                        <span className="text">Home</span>
                      </Link>
                    </li>
                    <hr />
                    <>
                      { categories.map((category,index)=>{
                          return <li key={index}>
                                    <Link to={`/Videos/${category}`}>
                                      <span className="material-symbols-outlined">{categoryIcons[index]}</span>
                                      <span className="text">{category}</span>
                                    </Link>
                                 </li> 
                      })
                        
                      }
                    </>
                    

    
                  </ul>
                  
            </section>
          {/*---------------------------HEADER SECTION---------------------- */}
            <section className='Header bg-white flex items-center justify-between gap-2 p-1 fixed z-[1000]  pb-5 custom-mid:pb-2  w-[100%] ml-0.5 border-b-2 border-spacing-1'>
    
              <button className='showMenu  bg-[#eceaea] w-[10%] custom-mid:w-[7%]  h-8 flex justify-center items-center lg:w-[6%] custom-lgDesktop:w-[4%]' onClick={handleShowMenu}>
                <i className='bx bx-menu bx-rotate-180'></i>
              </button>
              
              <div className="HeaderLogo absolute left-16 visible lg:left-20 custom-lgDesktop:left-22">
                <img className="h-9" src="/YouTube Logo.JPG" alt="YouTube Logo" />
              </div>

              {breakpoint=="small" &&(
                <>
                  <div className="SearchInApp  hideComponent items-center absolute bg-[#eaeaea] top-0 left-0 w-[100%] h-[100%]">
                    <button className='backFromSearch w-[10%]' onClick={handleHideSearchForm} >
                      <i className='bx bx-arrow-back'></i>
                    </button>
                    {/* SearchForm Component */}
                    <div className="searchFormComponent w-[90%]">
                        <SeachFunctionality/>
                    </div>

                  </div>
                  {/* Extra button to display searchForm */}
                    <button className='showSeachForm mr-2' onClick={handleShowSearchForm}>
                        <i className='bx bx-search'></i>
                    </button>
                </>
                
              )}

              {breakpoint == "medium" &&(
                <div className="HeaderSrcondPart w-[70%] flex items-center justify-between pr-4">
                  
                    <div className="searchFormComponent w-[70%]">
                        <SeachFunctionality/>
                    </div>
                  
                  
                  {userInfo==undefined &&
                      
                    <Link to="/UserSignUp" className="SignInBtn text-blue-600 bg-gray-50 border-2 border-gray-200 rounded-full w-[17%] flex items-center justify-center gap-2 p-1 hover:bg-blue-100 lg:w-[14%] custom-lgDesktop:w-[11%]">
                      <i className='bx bx-user-circle' ></i>
                      <span className="text">Sign in</span>
                    </Link>
                        
                  }

                  {userInfo != undefined &&(
                    <ProfileDropdown userInfo = {userInfo} handleLogOut={handleLogOut} />
                  )}
                </div>
                
              )}
              
                
              
              
    
              
    
              
    
            </section>
          
          
          
        </div>
    )
}

export default NavigationSideBar;