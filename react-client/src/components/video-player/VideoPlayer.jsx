import useTrackCues from "./useTrackCues.js";
import Transcript from "./Transcript.jsx";

export default function VideoPlayer(props) {
  const { videoSrc, captionSrcs } = props;

  const { setTextTrackList, textTrack, currentActiveCueIds } = useTrackCues();

  return (
    <>
      <video
        // this should not trigger rerenders since text tracks are updated
        // dynamicly ( pointer stays the same )
        ref={(el) => setTextTrackList(el?.textTracks)}
        controls
        crossOrigin="anonymous"
        style={{
          width: "100%",
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
      />
    </>
  );
}
