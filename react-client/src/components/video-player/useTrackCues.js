import { useState, useEffect } from "react";

export default function useTrackCues() {
  const [textTrack, setTextTrack] = useState(null);
  const [currentActiveCueIds, setCurrentActiveCueIds] = useState([]);
  const [textTrackList, setTextTrackList] = useState(null);

  useEffect(() => {
    if (textTrackList == null) {
      return;
    }
    textTrackList.onchange = (e) => {
      const trackList = e.target;

      for (const key in trackList) {
        if (isNaN(Number(key))) continue;
        const track = trackList[key];
        if (track.mode === "showing") {
          console.log(track);
          track.oncuechange = (e) => {
            const cueList = e.target.activeCues;
            const currentActiveCues = Object.values(cueList).map(
              (cue) => cue.id,
            );
            setCurrentActiveCueIds(currentActiveCues);
          };
          setTextTrack(track);

          break;
        }
      }
    };
  }, [textTrackList]);

  return {
    setTextTrackList,
    currentActiveCueIds,
    textTrack,
  };
}
