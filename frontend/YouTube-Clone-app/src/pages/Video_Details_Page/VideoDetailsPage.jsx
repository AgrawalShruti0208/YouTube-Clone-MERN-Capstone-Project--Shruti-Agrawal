import MainDetailsComponent from "../../components/VideoDetailsPage/MainDetailsComponent.jsx";
import { useParams } from "react-router-dom";

function VideoDetailsPage() {
    
    const params = useParams();
    const video_id = params.id;

    
    return ( 
        <>
            <MainDetailsComponent videoID={video_id}/>
        </>
     );
}

export default VideoDetailsPage;




