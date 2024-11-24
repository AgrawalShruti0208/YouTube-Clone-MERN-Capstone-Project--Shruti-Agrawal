import React from 'react'
import VideoCategoryBtns from '../../components/VideoCategoryBtns.jsx';
import DisplayCategoryVideos from '../../components/DisplayCategoryVideos.jsx'


import { useState, useEffect } from 'react';
import {useCustomFetch} from '../../utils/useCustomFetch.js'

function Home() {

    const [Videos_data, setVideosData] = useState([]);

    const FetchVideos_URL = 'http://localhost:3000/videos';

    const {fetchedData,err} = useCustomFetch(FetchVideos_URL);

    useEffect(()=>{
        if(fetchedData){
                setVideosData(fetchedData);
            
        }
    },[fetchedData]);

       

    if(err){ //if err is not null show error message
        alert(err); 
    }
    
    console.log(Videos_data);
    
    return ( 
        <>
            
            <DisplayCategoryVideos/>
        </>
     );
}

export default Home;