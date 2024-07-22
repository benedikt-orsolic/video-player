import React, { useState } from "react";


export default function PlayPauseControl(props: {
  videoElement: HTMLVideoElement;
}) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <span
      onClick={() => {
        if (isPlaying) {
          props.videoElement.pause();
          setIsPlaying(false);
        } else {
          props.videoElement.play();
          setIsPlaying(true);
        }
      }}
      className="material-symbols-outlined"
    >
      {isPlaying ? "pause" : "play_arrow"}
    </span>
  );
}
