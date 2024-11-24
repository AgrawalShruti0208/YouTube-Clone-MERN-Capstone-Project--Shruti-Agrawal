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
                    
                        <SwiperSlide className="slider-item" >
                            <Link to={`/Videos/All`} >  
                                    <button className="slider-button" id="DefaultBtn">All</button>
                                
                            </Link> 
                        </SwiperSlide>
                    
                    
                        <SwiperSlide className="slider-item">
                            
                            <Link to={`/Videos/Music`}>   
                                    <div className="slider-button">Music</div>
                                
                            </Link>
                        </SwiperSlide>
                    
                        <SwiperSlide className="slider-item">
                            
                                <Link to={`/Videos/Films`}>
                                    
                                    <div className="slider-button">Films</div>
                                </Link>
                            
                        </SwiperSlide>

                        <SwiperSlide className="slider-item">
                            
                                <Link to={`/Videos/Comedy`}>
                                        
                                    <div className="slider-button">Comedy</div>
                                
                                </Link>
                            
                        </SwiperSlide>

                        <SwiperSlide className="slider-item">
                            
                                <Link to={`/Videos/Travel`}>
                                        
                                    <div className="slider-button">Travel</div>
                                </Link>
                            
                        </SwiperSlide>

                        <SwiperSlide className="slider-item">
                            
                                <Link to={`/Videos/Gaming`}>
                                        
                                    <div className="slider-button">Gaming</div>
                                </Link>
                            
                        </SwiperSlide>

                        <SwiperSlide className="slider-item">
                            
                                <Link to={`/Videos/Podcasts`}>
                                        
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