import { useEffect, useState, useReducer } from "react";
import styles from "./Transcript.module.css";

export default function Transcript(props) {
  const { textTrack, currentActiveCueIds, videoElementRef } = props;
  const [isAutoScrollEnabled, setIsAutoScrollEnabled] = useState(true);
  const [transcriptBodyContainer, setTranscriptBodyContainer] = useState(null);

  if (videoElementRef == null) {
    return (
      <div className={styles["transcript"]}>
        <h3>There is no video for which to show the transcript</h3>
      </div>
    );
  }

  if (textTrack == null) {
    return (
      <div className={styles["transcript"]}>
        <h3>Select closed captions on video to se transcript</h3>
      </div>
    );
  }

  return (
    <div className={styles["transcript"]}>
      <h4 className={styles["transcript__header"]}>Transcript</h4>
      <button
        className={styles["transcript__toggle-auto-scroll"]}
        onClick={() => setIsAutoScrollEnabled(!isAutoScrollEnabled)}
      >
        {isAutoScrollEnabled ? "disable auto scroll" : "enable auto scroll"}
      </button>
      <div
        ref={(el) => setTranscriptBodyContainer(el)}
        className={styles["transcript__body_table__container"]}
      >
        <TranscriptBody
          transcriptBodyContainer={transcriptBodyContainer}
          textTrack={textTrack}
          currentActiveCueIds={currentActiveCueIds}
          videoElementRef={videoElementRef}
          isAutoScrollEnabled={isAutoScrollEnabled}
        />
      </div>
    </div>
  );
}

function TranscriptBody(props) {
  const {
    textTrack,
    currentActiveCueIds,
    videoElementRef,
    isAutoScrollEnabled,
    transcriptBodyContainer,
  } = props;

  const [_, forceUpdate] = useReducer((x) => x + 1, 0);
  const handleCuesChange = () => {
    if (textTrack == null) {
      return;
    }

    if (textTrack.cues.length === 0) {
      requestAnimationFrame(handleCuesChange);
    }

    forceUpdate();
  };
  useEffect(() => {
    handleCuesChange();
  }, [textTrack]);

  if (textTrack == null) {
    return <h3>Select closed captions on video to se transcript</h3>;
  }

  return (
    <table className={styles["transcript__body_table"]}>
      <tbody>
        {Object.values(textTrack.cues || {}).map((textCueItem) => {
          return (
            <TranscriptItem
              transcriptBodyContainer={transcriptBodyContainer}
              key={textCueItem.id}
              videoElementRef={videoElementRef}
              textCueItem={textCueItem}
              currentActiveCueIds={currentActiveCueIds}
              isAutoScrollEnabled={isAutoScrollEnabled}
            />
          );
        })}
      </tbody>
    </table>
  );
}

function TranscriptItem(props) {
  const {
    textCueItem,
    currentActiveCueIds,
    videoElementRef,
    isAutoScrollEnabled,
    transcriptBodyContainer,
  } = props;
  const isActive = currentActiveCueIds.includes(textCueItem.id);
  const [tableRowEl, setTableRowEl] = useState(null);

  useEffect(() => {
    if (tableRowEl == null || !isActive || !isAutoScrollEnabled) {
      return;
    }

    transcriptBodyContainer.scrollTop = tableRowEl.offsetTop;
  }, [tableRowEl, isActive, isAutoScrollEnabled]);

  return (
    <tr
      ref={(el) => setTableRowEl(el)}
      className={
        styles["transcript__item"] + (isActive ? " " + styles["active"] : "")
      }
      onClick={(e) => (videoElementRef.currentTime = textCueItem.startTime)}
    >
      <td>{formatStartTime(textCueItem.startTime)}</td>
      <td
        dangerouslySetInnerHTML={{ __html: cleanOutHtmlTags(textCueItem.text) }}
      ></td>
    </tr>
  );
}

const tagsRegEx = /<(?!\/?(u|i|b)(>|\s))[^<]+?>/g;

function cleanOutHtmlTags(str) {
  return str.replaceAll(tagsRegEx, "");
}

function formatStartTime(startTime) {
  startTime = Math.round(startTime);
  const minutes = Math.floor(startTime / 60);
  const seconds = Math.round(startTime % 60);

  return `${padTimeValue(minutes)}:${padTimeValue(seconds)}`;
}

function padTimeValue(number) {
  return String(number).padStart(2, "0");
}
