import React, { useState } from "react";

export default function FullScreenControl(props: {
  fullScreenContainer: HTMLElement;
}) {
  const [isFullScreen, setIsFullScreen] = useState(false);
  return (
    <span
      onClick={async () => {
        // this might have problems, it would be better to set state on event
        if (isFullScreen) {
          await document.exitFullscreen();
          setIsFullScreen(false);
        } else {
          await props.fullScreenContainer.requestFullscreen();
          setIsFullScreen(true);
        }
      }}
      className="material-symbols-outlined"
    >
      {isFullScreen ? "fullscreen_exit" : "fullscreen"}
    </span>
  );
}
