import { useState } from "react";

import useTrackCues from "./useTrackCues.js";
import CaptionsStyling from "./CaptionsStyling.jsx";
import Transcript from "./Transcript.jsx";

export default function VideoPlayer(props) {
  const { videoSrc, captionSrcs } = props;
  const videoTagClassNames = ["video-player__video"];

  const { setTextTrackList, textTrack, currentActiveCueIds } = useTrackCues();
  const [videoElementRef, setVideoElementRef] = useState();

  return (
    <>
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
        crossOrigin="anonymous"
        style={{
          width: "100%",
          "::cue": {
            color: "red",
          },
        }}
      >
        <source src={videoSrc}></source>
        {captionSrcs.map((captionSrc, idx) => (
          <track
            key={captionSrc.src}
            deafult={idx === 0}
            label={captionSrc.label}
            kind="captions"
            src={captionSrc.src}
          ></track>
        ))}
      </video>
      <Transcript
        textTrack={textTrack}
        currentActiveCueIds={currentActiveCueIds}
        videoElementRef={videoElementRef}
      />
    </>
  );
}
