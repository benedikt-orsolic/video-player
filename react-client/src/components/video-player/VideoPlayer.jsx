/*
 * note to future self, duplicate all video controls to the right of set styling captions
 * styling captions hover shows options, hover on other controls does note
 * going full screen sets entire header transparent, on hover removes transparent, captions style hover works the same
 *
 * full screen sets video-box full screen not video tag itself
 * video tag shall have sibling box of same dimensions as overlay, it shall contain annotations
 * annotations may be captions or positioned html elements
 *
 * or to make it simpler show video title in full screen and custom controls ( this is what youtube does)
 */

import { useState } from "react";

import useTrackCues from "./useTrackCues.js";
import Transcript from "./Transcript.jsx";
import VideoControls from "./controls/VideoControls.tsx";
import CaptionsControls from "./controls/CaptionsControls.tsx";
import Annotations from './annotations/Annotations.tsx';
import styles from "./VideoPlayer.module.css";

export default function VideoPlayer(props) {
  const { video } = props;

  if (video == null) {
    return (
      <section className={styles["video-container"]}>
        <div className={styles["video-container__video-box"]}>
          <CaptionsControls
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
    video: { videoSrc, captions, thumbSrc, annotations },
  } = props;

  const { setTextTrackList, textTrack, currentActiveCueIds } =
    useTrackCues(videoSrc);
  const [videoElementRef, setVideoElementRef] = useState(null);
  const [videoWrapperElement, setVideoWrapperElement] = useState(null);
  const [isAnnotationsEnabled, setIsAnnotationsEnabled] = useState(false);
	// console.log(textTrack != null && Object.values(textTrack.cues || {}).find(cue => currentActiveCueIds.includes(cue.id)).text);

	// const currentCue = Object.values(textTrack.cues).find(cue => currentActiveCueIds.includes(cue.id))[0];;

  return (
    <section className={styles["video-container"]}>
      <div
        className={styles["video-container__video-box"]}
        ref={(el) => setVideoWrapperElement(el)}
      >
        <VideoControls
          videoElement={videoElementRef}
          fullScreenContainer={videoWrapperElement}
          annotationsToggle={() =>
            setIsAnnotationsEnabled(!isAnnotationsEnabled)
          }
          captionsPseudoClassSelectorClass={
            styles["video-player__video__cue-cards-element"]
          }
        />
        {isAnnotationsEnabled && annotations != null && (<Annotations annotationList={annotations} videoElement={videoElementRef}/>
        )}
        <video
          className={
            styles["video-player__video__cue-cards-element"] +
            " " +
            styles["video-player__video"]
          }
          // this should not trigger rerenders since text tracks are updated
          // dynamically ( pointer stays the same )
          ref={(el) => {
            setVideoElementRef(el);
            setTextTrackList(el?.textTracks);
          }}
          // controls
          poster={thumbSrc}
          preload="none"
        >
          <source src={videoSrc}></source>
          {captions.map((captionSrc, idx) => {
            return (
              <track
                key={captionSrc.src}
                default={idx === 0}
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
