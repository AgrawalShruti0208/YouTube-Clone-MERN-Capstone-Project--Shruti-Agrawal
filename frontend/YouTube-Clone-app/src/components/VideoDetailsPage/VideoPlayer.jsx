import React from 'react';

const VideoPlayer = ({ videoID }) => {
  
  window.addEventListener('error', (event) => {
    if (event.message.includes('googleads.g.doubleclick.net')) {
      event.preventDefault();
    }
  });

  if (!videoID) {
    return <p>No video to display.</p>; // Fallback if videoID is missing
  }

  return (
    <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 , borderRadius : '0.6rem'}}>
      <iframe
        src={`https://www.youtube.com/embed/${videoID}`}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          borderRadius : '0.6rem'
        }}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default VideoPlayer;