export default function Transcript(props) {
  const { textTrack, currentActiveCueIds, videoElementRef } = props;

  if (textTrack == null) {
    return <h3>Select closed captions on video to se transcript</h3>;
  }

  return (
    <div className="transcript">
      <h4 className="transcript__header">Transcript</h4>
      <TranscriptBody
        textTrack={textTrack}
        currentActiveCueIds={currentActiveCueIds}
        videoElementRef={videoElementRef}
      />
    </div>
  );
}

function TranscriptBody(props) {
  const { textTrack, currentActiveCueIds, videoElementRef } = props;

  if (textTrack == null) {
    return <h3>Select closed captions on video to se transcript</h3>;
  }

  return (
    <table className="transcript__body_table">
      <tboy>
        {Object.values(textTrack.cues || {}).map((textCueItem) => {
          return (
            <TranscriptItem
              key={textCueItem.id}
              videoElementRef={videoElementRef}
              textCueItem={textCueItem}
              currentActiveCueIds={currentActiveCueIds}
            />
          );
        })}
      </tboy>
    </table>
  );
}

function TranscriptItem(props) {
  const { textCueItem, currentActiveCueIds, videoElementRef } = props;

  return (
    <tr
      className={
        "transcript__item" +
        (currentActiveCueIds.includes(textCueItem.id)
          ? " transcript__item__active"
          : "")
      }
      onClick={(e) => (videoElementRef.currentTime = textCueItem.startTime)}
    >
      <td>{formatStartTime(textCueItem.startTime)}</td>
      <td>{textCueItem.text}</td>
    </tr>
  );
}

function formatStartTime(startTime) {
  startTime = Math.round(startTime);
  const minutes = Math.round(startTime / 60);
  const seconds = Math.round(startTime % 60);

  return `${padTimeValue(minutes)}:${padTimeValue(seconds)}`;
}

function padTimeValue(number) {
  return String(number).padStart(2, "0");
}
