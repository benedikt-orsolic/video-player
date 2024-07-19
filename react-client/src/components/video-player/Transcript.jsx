import { useEffect, useState, useMemo, useReducer } from "react";

export default function Transcript(props) {
  const { textTrack, currentActiveCueIds, videoElementRef } = props;
  const [isAutoScrollEnabled, setIsAutoScrollEnabled] = useState(true);

  if (textTrack == null) {
    return (
      <div className="transcript">
        <h3>Select closed captions on video to se transcript</h3>
      </div>
    );
  }

  return (
    <div className="transcript">
      <h4 className="transcript__header">Transcript</h4>
      <button
        className="transcript__toggle-auto-scroll"
        onClick={() => setIsAutoScrollEnabled(!isAutoScrollEnabled)}
      >
        {isAutoScrollEnabled ? "disable auto scroll" : "enable auto scroll"}
      </button>
      <div className="transcript__body_table__container">
        <TranscriptBody
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
    <table className="transcript__body_table">
      <tbody>
        {Object.values(textTrack.cues || {}).map((textCueItem) => {
          return (
            <TranscriptItem
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
  } = props;
  const isActive = currentActiveCueIds.includes(textCueItem.id);
  const [tabelRowEl, setTableRowEl] = useState(null);

  useEffect(() => {
    if (tabelRowEl == null || !isActive || !isAutoScrollEnabled) {
      return;
    }

    tabelRowEl.scrollIntoView(true);
  }, [tabelRowEl, isActive, isAutoScrollEnabled]);

  return (
    <tr
      ref={(el) => setTableRowEl(el)}
      className={
        "transcript__item" + (isActive ? " transcript__item__active" : "")
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
  const resutl = str.replaceAll(tagsRegEx, "");
	console.log(resutl);
	return resutl
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
