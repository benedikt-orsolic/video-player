import { useState } from "react";

import useTrackCues from "./useTrackCues.js";
import CaptionsStyling from "./CaptionsStyling.jsx";
import Transcript from "./Transcript.jsx";

export default function VideoPlayer(props) {
  const {
    video: { videoSrc, captions },
  } = props;
  const videoTagClassNames = ["video-player__video"];

  const { setTextTrackList, textTrack, currentActiveCueIds } =
    useTrackCues(videoSrc);
  const [videoElementRef, setVideoElementRef] = useState();

  return (
    <section className="video-container">
      <div className="video-container__video-box">
        <CaptionsStyling videoTagClassNames={videoTagClassNames} />
        <video
          className={videoTagClassNames.join(" ")}
          // this should not trigger rerenders since text tracks are updated
          // dynamicly ( pointer stays the same )
          ref={(el) => {
            setVideoElementRef(el);
            setTextTrackList(el?.textTracks);
          }}
          controls
          preload="auto"
        >
          <source src={videoSrc}></source>
          {captions.map((captionSrc, idx) => {
            if (idx === 0) {
              return (
                <track
                  key={captionSrc.src}
                  deafult
                  label={captionSrc.label}
                  kind="captions"
                  src={captionSrc.src}
                ></track>
              );
            }
            return (
              <track
                key={captionSrc.src}
                label={captionSrc.label}
                kind="captions"
                src={captionSrc.src}
              ></track>
            );
          })}
        </video>
      </div>
      <Transcript
        textTrack={textTrack}
        currentActiveCueIds={currentActiveCueIds}
        videoElementRef={videoElementRef}
      />
    </section>
  );
}
