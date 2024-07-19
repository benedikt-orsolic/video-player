export default function Transcript(props) {
  const { textTrack, currentActiveCueIds } = props;

  if (textTrack == null) {
    return <h3>Select closed captions on video to se transcript</h3>;
  }

  return (
    <div>
      {Object.values(textTrack.cues || {}).map((textCueItem) => {
        return (
          <TranscriptItem
            key={textCueItem.id}
            textCueItem={textCueItem}
            currentActiveCueIds={currentActiveCueIds}
          />
        );
      })}
    </div>
  );
}

function TranscriptItem(props) {
  const { textCueItem, currentActiveCueIds } = props;

  return (
    <>
      <span>{textCueItem.startTime}</span>
      <span
        style={{
          color: !currentActiveCueIds.includes(textCueItem.id)
            ? "black"
            : "red",
        }}
      >
        {textCueItem.text}
      </span>
      <br />
    </>
  );
}
