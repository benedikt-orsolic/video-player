import { useEffect, useState } from "react";

import VideosService from "../../services/videos.js";

export default function VideoSelector(props) {
  const { setCurrentVideo } = props;
  const [videosList, setVideosList] = useState(null);

  useEffect(() => {
    (async () => {
      const videos = await VideosService.getVideos();
      setVideosList(videos);
    })();
  }, []);

  if (videosList == null) {
    return <h4>Loading video list</h4>;
  }

  return videosList.map((video) => (
    <button key={video.title} onClick={() => setCurrentVideo(video)}>
      {video.title}
    </button>
  ));
}
