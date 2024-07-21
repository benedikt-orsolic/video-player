import { useEffect, useState } from "react";
import styles from "./VideoSelector.module.css";

import VideosService from "../../services/videos.ts";

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
    <section className={styles["video-selector"]}>
      <ul className={styles["video-selector__list"]}>
        {videosList.map((video, idx) => (
          <li key={video.title + idx}>
            <button
              className={
                styles["video-selector__button"] +
                (currentVideo != null && video.title === currentVideo.title
                  ? " " + styles["active"]
                  : "")
              }
              onClick={() => setCurrentVideo(video)}
            >
              <img className={styles["thumbnail"]} src={video.thumbSrc} />
              {video.title}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
