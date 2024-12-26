import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function VideoChannelInfo(props) {

    const channel = props.ChannelData;
    const video = props.VideoData;

    const [subscribeStatus, setSubscribeStatus] = useState("Subscribe");
    const [likeStatus, setLikeStatus] = useState(false);
    const [dislikeStatus, setDislikeStatus] = useState(false);
    const [numberOfLikes, setNumberOfLikes] = useState(video.videoLikes);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    const navigateTo = useNavigate();

    
    const jwtToken = localStorage.getItem("token");

    const openModal = (message) => {
        setModalMessage(message);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalMessage("");
    };

    const toggleLikeBtn = () => {
        const messageObj = { msg: "Like" };
        fetch(`https://youtube-clone-mern-capstone-project.onrender.com/video/${video._id}/update`, {
            method: 'PATCH',
            headers: new Headers({
                'Authorization': jwtToken ? `JWT ${jwtToken}` : "",
                "Content-Type": "application/json"
            }),
            body: JSON.stringify(messageObj)
        })
            .then(response => response.json())
            .then((data) => {
                if (data[0] === "Likes") {
                    setNumberOfLikes(data[1]);
                    setLikeStatus(true);
                    setDislikeStatus(false);
                    
                } else if(data == "User Authentication Failed!") {
                    openModal("Like this video?");
                }
            });
    };

    const toggleDislikeBtn = () => {
        const messageObj = { msg: "DisLike" };
        fetch(`https://youtube-clone-mern-capstone-project.onrender.com/video/${video._id}/update`, {
            method: 'PATCH',
            headers: new Headers({
                'Authorization': jwtToken ? `JWT ${jwtToken}` : "",
                "Content-Type": "application/json"
            }),
            body: JSON.stringify(messageObj)
        })
            .then(response => response.json())
            .then((data) => {
                if (data[0] === "Likes") {
                    setNumberOfLikes(data[1]);
                    setLikeStatus(false);
                    setDislikeStatus(true);
                    

                } else if(data == "User Authentication Failed!") {
                    openModal("Don't like this video?");
                }
            });
    };

    const toggleSubscription = () => {
        setSubscribeStatus((subscribeStatus === "Subscribe") ? "Unsubscribe" : "Subscribe");
    };

    function handleSignIn(){
        navigateTo("/UserSignUp");
    }

    return (
        <div className="VideoChannelInformation mr-2 mt-[-5px] w-[99%] custom-mid:px-2 custom-mid:flex custom-mid:w-[100%] custom-mid:justify-between custom-mid:items-center">
            <div className="line3 flex items-center justify-between w-[100%] custom-mid:w-[45%] custom-mid:flex custom-mid:justify-normal custom-mid:gap-3">
                <Link to={`/Channel/${channel._id}`} className="w-[65%] custom-mid:w-[62%]">
                    <div className="channelPart flex items-center gap-3 px-2 text-[0.9rem] w-[100%] custom-mid:px-0 custom-mid:text-[0.8rem]">
                        <img src={channel.owner_avatar} alt="Channel_avatar" />
                        <h5>{channel.channel_name}</h5>
                        <h5 className="text-gray-700 text-[0.8rem]">{channel.subscribers.split(" ")[0]}</h5>
                    </div>
                </Link>

                <button className="subscribeBtn w-[35%] p-2 px-3 rounded-3xl bg-black text-white custom-smaller:w-[31%] custom-smaller:p-1 custom-smaller:px-2 custom-smaller:text-sm custom-mid:w-[29%] custom-mid:p-1 custom-mid:px-2 custom-mid:text-sm" onClick={toggleSubscription}>
                    {subscribeStatus}
                </button>
            </div>
            <div className="line4 mt-5 px-1 flex gap-1 w-[100%] custom-mid:w-[48%] custom-mid:mt-0 custom-mid:px-0">
                <div className="likeDislike flex justify-center items-center gap-3 bg-[#eaeaea] px-3 py-2 rounded-full w-[42%] custom-mid:justify-center custom-mid:p-1">
                    <div className="likeBtn flex gap-2">
                        <button onClick={toggleLikeBtn}>
                            {likeStatus ? <i className='bx bxs-like bx-burst'></i> : <i className='bx bx-like bx-tada-hover bx-sm'></i>}
                        </button>
                        <div className="text-[1.1rem] font-medium custom-mid:text-base">{numberOfLikes}</div>
                    </div>
                    <h6 className="text-gray-400">|</h6>
                    <div className="dislikeBtn">
                        <button onClick={toggleDislikeBtn}>
                            {dislikeStatus ? <i className='bx bxs-dislike bx-burst'></i> : <i className='bx bx-dislike bx-tada-hover bx-sm'></i>}
                        </button>
                    </div>
                </div>
                <div className="shareBtn flex gap-1 items-center justify-center bg-[#eaeaea] px-4 py-1 rounded-full w-[27%] custom-mid:justify-center custom-mid:p-0">
                    <button><i className='bx bx-share bx-flip-horizontal bx-flashing-hover'></i></button>
                    <div className="text-[1.1rem] custom-mid:text-base">Share</div>
                </div>
                <div className="saveBtn flex gap-1 items-center justify-center bg-[#eaeaea] px-4 py-1 rounded-full w-[27%] custom-mid:justify-center custom-mid:p-0">
                    <button><i className='bx bx-bookmark bx-tada-hover'></i></button>
                    <div className="text-[1.1rem] custom-mid:text-base">Save</div>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className={`modal ${isModalOpen ? "likeModalOpen" : ""}`} onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h1 className="text-xl font-medium">{modalMessage}</h1>
                       
                        <p className="py-3 text-sm text-gray-600">Sign in to make your opinion count.</p>

                        <div className="modal-buttons flex justify-between w-[95%]">
                            <button className="cancel-btn flex justify-center items-center rounded-3xl w-[42%] text-sm" onClick={closeModal}>Cancel</button>
                            <button className="rounded-3xl flex justify-center items-center bg-black text-white w-[42%] text-sm" onClick={handleSignIn}>Sign in</button>
            
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default VideoChannelInfo;
