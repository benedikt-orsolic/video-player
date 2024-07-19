import "./App.css";

import { useState } from "react";

import VideoPlayer from "./components/video-player/VideoPlayer.jsx";

import VideoSelector from "./components/video-selector/VideoSelector.jsx";

export default function App() {
  const [currentVideo, setCurrentVideo] = useState(null);

  return (
    <div className="App">
      {currentVideo != null && (
        <VideoPlayer
          videoSrc={currentVideo.videoSrc}
          captionSrcs={currentVideo.captions}
        />
      )}
    </div>
  );
}
	// <VideoSelector setCurrentVideo={setCurrentVideo} />
