export default function Transcript(props) {
  const { textTrack, currentActiveCueIds } = props;

  if (textTrack == null) {
    return <h3>Select closed captions on video to se transcript</h3>;
  }

  return (
    <div class="transcript">
      <h4 class="transcript__header">Transcript</h4>
      <TranscriptBody
        textTrack={textTrack}
        currentActiveCueIds={currentActiveCueIds}
      />
    </div>
  );
}

function TranscriptBody(props) {
  const { textTrack, currentActiveCueIds } = props;

  if (textTrack == null) {
    return <h3>Select closed captions on video to se transcript</h3>;
  }

  return (
    <table className="transcript__body_table">
      {Object.values(textTrack.cues || {}).map((textCueItem) => {
        return (
          <TranscriptItem
            key={textCueItem.id}
            textCueItem={textCueItem}
            currentActiveCueIds={currentActiveCueIds}
          />
        );
      })}
    </table>
  );
}

function TranscriptItem(props) {
  const { textCueItem, currentActiveCueIds } = props;

  return (
    <tr
      className={
        "transcript__item" +
        (currentActiveCueIds.includes(textCueItem.id)
          ? " transcript__item__active"
          : "")
      }
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
