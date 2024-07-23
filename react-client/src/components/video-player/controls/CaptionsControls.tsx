import React, { useMemo, useReducer } from "react";

import styles from "./Captions.module.css";

export default function CaptionsControls(props: {videoTagClassNames: string, videoElement: HTMLVideoElement}) {
  const [_, forceUpdate] = useReducer((x) => x + 1, 0);
  const cuePseudoClassCssRule = useCaptionsControls(props.videoTagClassNames);

  if(cuePseudoClassCssRule == null) {
    console.error("Could not find css rul for video cue, not showing cue style controls")
    return null;
  }

  
  const currentColor = cuePseudoClassCssRule.style.color;
  const currentBackground = cuePseudoClassCssRule.style.backgroundColor;
  const currentSize = cuePseudoClassCssRule.style.fontSize;

  const colorList = [
    "black",
    "white",
    "lightgray",
    "gray",
    "blue",
    "red",
    "yellow",
    "green",
    "orange",
  ];

  return (
    <div className={styles.bar_placeholder}>
      <div className={styles.container}>
        <span className={styles["captions-styling__header"]}>CC</span>
        <table className={styles.table}>
          <tbody>
            <tr>
              <td>Text color: </td>
              <td>
                {colorList.map((color) => (
                  <button
                    className={
                      styles["captions-styling__body__button"] +
                      `${color === currentColor ? " " + styles["active"] : ""}`
                    }
                    key={color}
                    onClick={() => {
                      cuePseudoClassCssRule.style.color = color;
                      forceUpdate();
                    }}
                  >
                    {color}
                  </button>
                ))}
              </td>
            </tr>
            <tr>
              <td>Background color: </td>
              <td>
                {colorList.map((color) => (
                  <button
                    className={
                      styles["captions-styling__body__button"] +
                      `${
                        color === currentBackground
                          ? " " + styles["active"]
                          : ""
                      }`
                    }
                    key={color}
                    onClick={() => {
                      if (cuePseudoClassCssRule == null) {
                        return;
                      }
                      cuePseudoClassCssRule.style.backgroundColor = color;
                      forceUpdate();
                    }}
                  >
                    {color}
                  </button>
                ))}
              </td>
            </tr>
            <tr>
              <td>Font size:</td>
              <td>
                <input
                  onChange={(e) =>
                    (cuePseudoClassCssRule.style.fontSize =
                      e.target.value + "px")
                  }
                  min="6"
                  max="52"
                  placeholder={String(currentSize)}
                />
              </td>
            </tr>
            <tr>
              <td>Select caption source</td>
              <td>
                {props.videoElement?.textTracks != null && Object.values(props.videoElement.textTracks).map(track => (

                  <button
                    className={
                      styles["captions-styling__body__button"] +
                      `${
                        track.mode === "showing"
                          ? " " + styles["active"]
                          : ""
                      }`
                    }
                    key={track.label}
                    onClick={() => {

                      for(let i = 0; i<props.videoElement.textTracks.length; i++){
                        props.videoElement.textTracks[i].mode = "hidden";
                      }
                      track.mode="showing"
                    }}
                  >
                    {track.label}
                  </button>

                )
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}


function useCaptionsControls(videoTagClassName: string) {

  return useMemo(() => {
    let result: CSSStyleRule | null = null;
    const selectorText = `.${videoTagClassName}::cue`;

    outerLoop: for (const styleSheet of document.styleSheets) {
      // This should be CSSStyleRule according to dev tools
      for (const cssRule of (styleSheet.cssRules as unknown as CSSStyleRule[])) {

        if (cssRule.selectorText === selectorText) {
          result = cssRule;
          break outerLoop;
        }
      }
    }


    return result;
  }, []);


}