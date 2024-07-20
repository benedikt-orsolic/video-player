import { useState } from "react";

import useTrackCues from "./useTrackCues.js";
import CaptionsStyling from "./CaptionsStyling.jsx";
import Transcript from "./Transcript.jsx";
import styles from "./VideoPlayer.module.css";

export default function VideoPlayer(props) {
  const { video } = props;

  if (video == null) {
    return (
      <section className={styles["video-container"]}>
        <div className={styles["video-container__video-box"]}>
          <CaptionsStyling
            videoTagClassNames={
              styles["video-player__video__cue-cards-element"]
            }
          />
          <div className="video-player__video--skeleton"></div>
        </div>
        <Transcript
          textTrack={null}
          currentActiveCueIds={null}
          videoElementRef={null}
        />
      </section>
    );
  }

  return (
    <VideoPlayerInner
      // this fixes video not changing on src change
      // looks like it might be ignoring react updates or something
      key={video.videoSrc}
      video={video}
    />
  );
}

function VideoPlayerInner(props) {
  const {
    video: { videoSrc, captions },
  } = props;

  const { setTextTrackList, textTrack, currentActiveCueIds } =
    useTrackCues(videoSrc);
  const [videoElementRef, setVideoElementRef] = useState();

  return (
    <section className={styles["video-container"]}>
      <div className={styles["video-container__video-box"]}>
        <CaptionsStyling
          videoTagClassNames={styles["video-player__video__cue-cards-element"]}
        />
        <video
          className={styles["video-player__video__cue-cards-element"]}
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
                  deafult=""
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
