import "./App.css";

import { useState } from "react";

import VideoPlayer from "./components/video-player/VideoPlayer.jsx";
import VideoSelector from "./components/video-selector/VideoSelector.jsx";

export default function App() {
  const [currentVideo, setCurrentVideo] = useState(null);

  return (
    <main className="main__video-container">
      <VideoPlayer
        video={currentVideo}
      />
      <VideoSelector
        currentVideo={currentVideo}
        setCurrentVideo={setCurrentVideo}
      />
    </main>
  );
}
