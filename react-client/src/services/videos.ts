import toWebVtt from "srt-webvtt";

import caption1Src from "../videos/video_1/captions.srt";
import caption1SrcHr from "../videos/video_1/captions_hr.srt";
import video1 from "../videos/video_1/clip.mp4";
import thumb1 from "../videos/video_1/thumb.png";
import caption2 from "../videos/video_2/captions.srt";
import video2 from "../videos/video_2/clip.mp4";
import thumb2 from "../videos/video_2/thumb.png";

import { TVideoItemResponse } from "../types/TVideoItemResponse";
import Annotations from "../components/video-player/annotations/Annotations";

export default class VideoService {
  static async getVideos() : Promise<TVideoItemResponse[]> {
    let response: TVideoItemResponse[] = [
      {
        videoSrc : video1,
        title : "video 1",
        thumbSrc : thumb1,
        captions : [
          {
            label : "english",
            src : await convertSrtSrcToVtt(caption1Src),
          },
          {
            label : "hrvatski",
            src : await convertSrtSrcToVtt(caption1SrcHr),
          },
        ],
        annotations: [
          {
            startTime: 0,
            endTime: 15,
            text: "Hello world",
            positionTop: 50,
            positionLeft: 50,
          },{
            startTime: 0,
            endTime: 15,
            text: "Hello world again",
            positionTop: 25,
            positionLeft: 25,
          },
          {
            startTime: 5,
            endTime: 15,
            text: "Hello world and again",
            positionTop: 75,
            positionLeft: 75,
          }
        ]
      },
      {
        videoSrc : video2,
        title : "video 2",
        thumbSrc : thumb2,
        captions : [
          {label : "english", src : await convertSrtSrcToVtt(caption2)},
        ],
      },
    ];

    if (true) {

      for (let i = 0; i < 100; i++) {
                  response.push(structuredClone(response[i%2]));
      }
    }

    return response;
  }
}

async function convertSrtSrcToVtt(srtSrc: string): Promise<string> {
  const response = await fetch(srtSrc);
  const captionsText = await response.text();
  const webVtt = await toWebVtt(new Blob([ captionsText ]));

  return webVtt;
}
