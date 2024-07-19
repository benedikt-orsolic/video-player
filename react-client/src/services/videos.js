import toWebVtt from "srt-webvtt";

import caption1Src from "../videos/video_1/captions.srt";
import caption1SrcHr from "../videos/video_1/captions_hr.srt";
import video1 from "../videos/video_1/clip.mp4";
import caption2 from "../videos/video_2/captions.srt";
import video2 from "../videos/video_2/clip.mp4";

export default class VideoService {
  static async getVideos() {
    return [
      {
        videoSrc: video1,
        title: "video 1",
        captions: [
          {
            label: "english",
            src: await convertSrtSrcToVtt(caption1Src),
          },
          {
            label: "hrvatski",
            src: await convertSrtSrcToVtt(caption1SrcHr),
          },
        ],
      },
      {
        videoSrc: video2,
        title: "video 2",
        captions: [
          { label: "english", src: await convertSrtSrcToVtt(caption2) },
        ],
      },
    ];
  }
}

async function convertSrtSrcToVtt(srtSrc) {
  const respons = await fetch(srtSrc);
  const captionsText = await respons.text();
  const webVtt = await toWebVtt(new Blob([captionsText]));

  return webVtt;
}
