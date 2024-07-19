import "./App.css";

import { useEffect, useState } from "react";

import VideoPlayer from "./components/video-player/VideoPlayer.jsx";

import VideoSelector from "./components/video-selector/VideoSelector.jsx";
import captionSrc from "./videos/video_1/captions.srt";
import captionSrcHr from "./videos/video_1/captions_hr.srt";
import video from "./videos/video_1/clip.mp4";

export default function App() {
  const [currentVideo, setCurrentVideo] = useState(null);

  return (
    <div className="App">
      <VideoSelector setCurrentVideo={setCurrentVideo} />
      {currentVideo != null && (
        <VideoPlayer
          videoSrc={currentVideo.videoSrc}
          captionSrcs={currentVideo.captions}
        />
      )}
    </div>
  );
}
