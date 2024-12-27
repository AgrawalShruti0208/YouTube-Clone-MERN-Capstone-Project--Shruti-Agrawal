import MainDetailsComponent from "../../components/VideoDetailsPage/MainDetailsComponent.jsx";
import { useEffect } from 'react';
import { useNavigate , useParams } from 'react-router-dom';

const VideoDetailsPage = () => {
    const navigateTo = useNavigate();

    const params = useParams();
    const video_id = params.id;
    

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            // Redirect to home route
            navigateTo('/');
            // Optionally, you can prevent the default action
            event.preventDefault();
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    return ( 
        <>
            <MainDetailsComponent videoID={video_id}/>
        </>
    );
};

export default VideoDetailsPage;




