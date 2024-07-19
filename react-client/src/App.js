import "./App.css";

import {useEffect, useState} from "react";
import toWebVtt from "srt-webvtt";

import VideoPlayer from './components/video-player/VideoPlayer.jsx';
import captionSrc from "./videos/video_1/captions.srt";
import captionSrcHr from "./videos/video_1/captions_hr.srt";
import video from "./videos/video_1/clip.mp4";

export default function App() {
  const [captionsList, setCaptionList] = useState([]);

  useEffect(() => {
    (async () => {
      setCaptionList([
        {label : "english", src : await convertSrtSrcToVtt(captionSrc)},
        {label : "hrvatski", src : await convertSrtSrcToVtt(captionSrcHr)},
      ]);
    })();
  }, []);

  return (<div className = "App">
          <VideoPlayer videoSrc = {
               video} captionSrcs = { captionsList } />
    </div>);
}

async function convertSrtSrcToVtt(srtSrc) {
  const respons = await fetch(srtSrc);
  const captionsText = await respons.text();
  const webVtt = await toWebVtt(new Blob([ captionsText ]));

  return webVtt;
}

