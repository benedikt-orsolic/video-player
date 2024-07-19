import "./App.css";

import { useEffect, useState } from "react";
import toWebVtt from "srt-webvtt";

import captionSrc from "./videos/video_1/captions.srt";
import video from "./videos/video_1/clip.mp4";

// <track default kind="captions" src={captions}></track>

console.log();
export default function App() {
  const [caption, setCaption] = useState(null);

  useEffect(() => {
    (async () => {
      const respons = await fetch(captionSrc);
      const captionsText = await respons.text();
      const webVtt = await toWebVtt(new Blob([captionsText]));

      setCaption(webVtt);
      console.log(webVtt);
    })();
  }, []);

  return (
    <div className="App">
      <Video
        videoSrc={video}
        captionSrcs={[{ label: "english", src: caption }]}
      />
    </div>
  );
}

function Video(props) {
  const { videoSrc, captionSrcs } = props;

  return (
    <video controls crossorigin="anonymous">
      <source src={videoSrc}></source>
      {captionSrcs.map((captionSrc, idx) => (
        <track
          key={captionSrc.src}
          deafult={idx === 0}
          label={captionSrc.label}
          kind="captions"
          src={captionSrc.src}
        >
          {console.log(captionSrc)}
        </track>
      ))}
    </video>
  );
}
