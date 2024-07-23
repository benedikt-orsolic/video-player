import React ,{useState, useEffect} from 'react';
import styles from './Annotations.module.css';
import { TAnnotation } from '../../../types/TAnnotation';

export default function Annotations(props: {
    annotationList: TAnnotation[];
    videoElement: HTMLVideoElement;
}) {
    const [currentAnnotations, setCurrentAnnotations] = useState<TAnnotation[]>([]);
    useEffect(() => {
        const handleVideoTimeChange = (e: HTMLVideoElementEventMap['timeupdate']) => {
            const currentSeconds = props.videoElement.currentTime
            const currentStamps = props.annotationList.filter(a => a.startTime <= currentSeconds && a.endTime > currentSeconds)

            setCurrentAnnotations(currentStamps)
        }

        props.videoElement.addEventListener('timeupdate', handleVideoTimeChange);
        return () => {
            props.videoElement.removeEventListener('timeupdate', handleVideoTimeChange);
        }
    })
    return (
        <div className={styles.annotations}>
            {currentAnnotations.map(a => <><span style={{top: a.positionTop + "%", left: a.positionLeft + "%"}}>{a.text}</span><br/></>)}
        </div>
    )
}