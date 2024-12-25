import { useSwiper } from "swiper/react";

function SwipperNavigationBtns() {
    const swiper = useSwiper();
    return ( 
        <div className="swiper-nav-btns fixed block top-[78px] z-[500] w-[96%] lg:hidden">
            <div className="btnWrapper flex justify-between w-[100%]">
                <button onClick={()=>swiper.slidePrev()}>
                    <i className='bx bxs-chevron-left' ></i>
                </button>
                <button  onClick={()=>swiper.slideNext()}>
                    <i className='bx bxs-chevron-right' ></i>
                </button>

            </div>
            
        </div>
     );
}

export default SwipperNavigationBtns;