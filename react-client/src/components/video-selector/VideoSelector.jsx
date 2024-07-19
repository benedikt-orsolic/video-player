import { useEffect, useState } from "react";

import VideosService from "../../services/videos.js";

export default function VideoSelector(props) {
  const { currentVideo, setCurrentVideo } = props;
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

  return (
    <section className="video-selector">
      <ul className="video-selector__list">
        {videosList.map((video) => (
          <li key={video.title}>
            <button
              className={
                "video-selector__button" +
                (currentVideo != null && video.title === currentVideo.title
                  ? " active"
                  : "")
              }
              onClick={() => setCurrentVideo(video)}
            >
              {video.title}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
