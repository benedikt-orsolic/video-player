import React from "react";
import CaptionsControls from "./CaptionsControls.tsx";

import PlayPauseControl from "./PlayPauseControl.tsx";
import FullScreenControl from "./FullScreenControl.tsx";
import AnnotationToggle from "./AnnotationsControl.tsx";
import styles from "./VideoControls.module.css";

export default function VideoControls(props: {
  videoElement: HTMLVideoElement;
  fullScreenContainer: HTMLElement;
  annotationsToggle: () => void;
  captionsPseudoClassSelectorClass: string;
}) {
  if (props.videoElement == null) {
    return;
  }
  return (
    <ul className={styles.controls}>
      <li>
      <CaptionsControls
        videoTagClassNames={props.captionsPseudoClassSelectorClass}
        videoElement={props.videoElement}
      />
      </li>
      <li>
        <PlayPauseControl videoElement={props.videoElement} />
      </li>
      <li>
        <FullScreenControl fullScreenContainer={props.fullScreenContainer} />
      </li>
      <li>
        <AnnotationToggle toggle={props.annotationsToggle} />
      </li>
    </ul>
  );
}
