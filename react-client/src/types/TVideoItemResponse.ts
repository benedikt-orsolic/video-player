import { TCaptionsItem } from "./TCaptionsItem";
import { TAnnotation } from "./TAnnotation";
export type TVideoItemResponse = {
  // Video source URL
  videoSrc: string;
  title: string;
  thumbSrc: string;
  captions: TCaptionsItem[];
  annotations?: TAnnotation[];
};
