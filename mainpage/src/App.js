import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [showButton, setShowButton] = useState(false);

  // Function to show or hide the "Back to Top" button
  const checkScrollTop = () => {
    if (!showButton && window.scrollY > 400) { // Show button after scrolling 400px
      setShowButton(true);
    } else if (showButton && window.scrollY <= 400) { // Hide button when scrolling up
      setShowButton(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Smooth scroll to top
    });
  };

  // Listen for the scroll event to toggle the button visibility
  useEffect(() => {
    window.addEventListener('scroll', checkScrollTop);

    // Clean up the event listener
    return () => {
      window.removeEventListener('scroll', checkScrollTop);
    };
  }, [showButton]);

  // Initialize screen dimensions state
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);

  // Use useEffect to update the dimensions when the window is resized
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);
    };

    // Add resize event listener
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Generate video data with random thumbnails based on screen dimensions
  const videos = [
    { id: 1, title: 'Video 1', thumbnail: `https://picsum.photos/${screenWidth}/${screenHeight}.jpg`, url: '#' },
    { id: 2, title: 'Video 2', thumbnail: `https://picsum.photos/${screenWidth}/${screenHeight}.jpg`, url: '#' },
    { id: 3, title: 'Video 3', thumbnail: `https://picsum.photos/${screenWidth}/${screenHeight}.jpg`, url: '#' },
    { id: 4, title: 'Video 4', thumbnail: `https://picsum.photos/${screenWidth}/${screenHeight}.jpg`, url: '#' },
    { id: 5, title: 'Video 5', thumbnail: `https://picsum.photos/${screenWidth}/${screenHeight}.jpg`, url: '#' },
    { id: 6, title: 'Video 6', thumbnail: `https://picsum.photos/${screenWidth}/${screenHeight}.jpg`, url: '#' },
    { id: 7, title: 'Video 7', thumbnail: `https://picsum.photos/${screenWidth}/${screenHeight}.jpg`, url: '#' },
    { id: 8, title: 'Video 8', thumbnail: `https://picsum.photos/${screenWidth}/${screenHeight}.jpg`, url: '#' },
    { id: 9, title: 'Video 9', thumbnail: `https://picsum.photos/${screenWidth}/${screenHeight}.jpg`, url: '#' },
    { id: 10, title: 'Video 10', thumbnail: `https://picsum.photos/${screenWidth}/${screenHeight}.jpg`, url: '#' },
    { id: 11, title: 'Video 11', thumbnail: `https://picsum.photos/${screenWidth}/${screenHeight}.jpg`, url: '#' },
    { id: 12, title: 'Video 12', thumbnail: `https://picsum.photos/${screenWidth}/${screenHeight}.jpg`, url: '#' },
  ];

  return (
    <div className="App">
      {/* Top Header for Logo */}
      <header className="header">
        <img 
          src="TUBIFY.png" 
          alt="Logo" 
          className="logo" 
        />
        <span className="logo-text">TUBIFY</span>
      </header>

      {/* Main content with iframe and right panel */}
      <div className="main-content">
        <div className="iframe-container">
          <div className="menu">
            <div className="menu-item">Home</div>
            <div className="menu-item">Search</div>
            <div className="menu-item">Top Videos</div>
            <div className="menu-item">Account</div>
            <div className="menu-item">Settings</div>
          </div>
          <div className="navbar">Search</div>  
        </div>
        <div className="content">
          <div className="video-gallery">
            {videos.map((video) => (
              <div className="video-card" key={video.id}>
                <a href={video.url}>
                  <img src={video.thumbnail} alt={video.title} className="thumbnail" />
                  <p className="video-title">{video.title}</p>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Back to Top button */}
      {showButton && (
        <button className="back-to-top" onClick={scrollToTop}>↑</button>
      )}
    </div>
  );
}

export default App;
