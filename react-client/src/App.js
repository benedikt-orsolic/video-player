import "./App.css";

import { useState } from "react";

import VideoPlayer from "./components/video-player/VideoPlayer.jsx";
import VideoSelector from "./components/video-selector/VideoSelector.jsx";

export default function App() {
  const [currentVideo, setCurrentVideo] = useState(null);

  return (
    <main className="main__video-container">
      {currentVideo != null && (
        <VideoPlayer
          // this fixes video not changing on src change
          // looks like it might be ignoring react updates or something
          key={currentVideo.videoSrc}
          video={currentVideo}
        />
      )}
      <VideoSelector
        currentVideo={currentVideo}
        setCurrentVideo={setCurrentVideo}
      />
    </main>
  );
}
