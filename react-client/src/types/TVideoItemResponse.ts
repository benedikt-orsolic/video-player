import { TCaptionsItem } from "./TCaptionsItem";
export type TVideoItemResponse = {
  // Video source URL
  videoSrc: string;
  title: string;
  captions: TCaptionsItem[];
};
