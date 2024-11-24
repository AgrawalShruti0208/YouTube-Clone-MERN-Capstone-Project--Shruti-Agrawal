import {useState} from "react";
import { Link } from "react-router-dom";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// import Swiper core and required modules
import { Navigation} from 'swiper/modules';

import 'swiper/css/navigation';
import SwipperNavigationBtns from "./SwipperNavigationBtns.jsx";
// Import Swiper styles
import 'swiper/css';

function VideoCategoryBtns() {
    // State for storing the selected option. Default is "All"
        const [selectedOption, setSelectedOption] = useState("All")  
            
        // Function to handle the change in radio button selections
        function onValueChange(event){
            // Updating the state with the selected radio button's value
            setSelectedOption(event.target.value)
        }
    return (
        <div className= 'VideoDisplay pt-1'>
            {/* Component to display all the videos and filtered videos */}

            {/* Slider to show filter buttons */}
            <div className="filterButtonsSlider relative p-3">
                <Swiper className="z-50 swiperWrapper relative"
                    style={{
                        '--swiper-navigation-color': '#000',
                        '--swiper-navigation-size' : '20px',
                        '--swiper-navigation-sides-offset': '0px'
                      }}
                    modules={[Navigation]}
                    spaceBetween={10}
                    slidesPerView={4}
                    breakpoints={{
                        0: {
                          slidesPerView: 4,
                        },
                        768:{
                          slidesPerView:6,
                        },
                        1024:{
                            slidesPerView:7,
                        }
                    }}
    
                >
                    <SwipperNavigationBtns />
                    <form onSubmit={(e)=>e.preventDefault()} className="slider-width swiper-wrapper">
                    
                        <SwiperSlide className="slider-item">
                            <Link to={`/Videos/All`}>   
                                
                                    <input
                                        type="radio"
                                        value="All"
                                        // Checking this radio button if the selected option is "All"
                                        checked={selectedOption === "All"}
                                        onChange={onValueChange}/>
                                    <div className="slider-button">All</div>
                                
                            </Link> 
                        </SwiperSlide>
                    
                    
                        <SwiperSlide className="slider-item">
                            
                            <Link to={`/Videos/Music`}>   
                                    <input
                                        type="radio"
                                        value="Music"
                                        // Checking this radio button if the selected option is "Music"
                                        checked={selectedOption === "Music"}
                                        onChange={onValueChange}/>
                                    <div className="slider-button">Music</div>
                                
                            </Link>
                        </SwiperSlide>
                    
                        <SwiperSlide className="slider-item">
                            
                                <Link to={`/Videos/Films`}>
                                    <input
                                        type="radio"
                                        value="Films"
                                        // Checking this radio button if the selected option is "Films"
                                        onChange={onValueChange}
                                        checked={selectedOption === "Films"}/>
                                        
                                    <div className="slider-button">Films</div>
                                </Link>
                            
                        </SwiperSlide>

                        <SwiperSlide className="slider-item">
                            
                                <Link to={`/Videos/Comedy`}>
                                    <input
                                        type="radio"
                                        value="Comedy"
                                        // Checking this radio button if the selected option is "Comedy"
                                        onChange={onValueChange}
                                        checked={selectedOption === "Comedy"}/>
                                        
                                    <div className="slider-button">Comedy</div>
                                </Link>
                            
                        </SwiperSlide>

                        <SwiperSlide className="slider-item">
                            
                                <Link to={`/Videos/Travel`}>
                                    <input
                                        type="radio"
                                        value="Travel"
                                        // Checking this radio button if the selected option is "Travel"
                                        onChange={onValueChange}
                                        checked={selectedOption === "Travel"}/>
                                        
                                    <div className="slider-button">Travel</div>
                                </Link>
                            
                        </SwiperSlide>

                        <SwiperSlide className="slider-item">
                            
                                <Link to={`/Videos/Gaming`}>
                                    <input
                                        type="radio"
                                        value="Gaming"
                                        // Checking this radio button if the selected option is "Gaming"
                                        onChange={onValueChange}
                                        checked={selectedOption === "Gaming"}/>
                                        
                                    <div className="slider-button">Gaming</div>
                                </Link>
                            
                        </SwiperSlide>

                        <SwiperSlide className="slider-item">
                            
                                <Link to={`/Videos/Podcasts`}>
                                    <input
                                        type="radio"
                                        value="Podcasts"
                                        // Checking this radio button if the selected option is "Podcasts"
                                        onChange={onValueChange}
                                        checked={selectedOption === "Podcasts"}/>
                                        
                                    <div className="slider-button">Podcasts</div>
                                </Link>
                            
                        </SwiperSlide>

                    </form>
                    
                    
                </Swiper>

               
                
            </div>
            
                

            
            
            
            
            
            

        </div>
    );
}

export default VideoCategoryBtns;