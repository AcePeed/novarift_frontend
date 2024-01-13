"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faBackward,
  faForward,
  faVolumeHigh,
  faVolumeLow,
  faVolumeMute,
  faExpand,
  faClosedCaptioning,
} from "@fortawesome/free-solid-svg-icons";
import "./player.css";
import { useEffect, useRef, useState } from "react";
import Loading from "@/app/lib/loading";

export default function Player(props: { params: { id: string } }) {
  const [volume, setVolume] = useState(60);
  const [playing, setPlaying] = useState(true);
  const [loading, setLoading] = useState(true);
  const videoRef = useRef(null);
  const progressRef = useRef(null);
  const clickedOnProgress = useRef(false);
  const noInteraction = useRef(null);

  const toggleVideo = () => {
    setPlaying((oldV) => {
      let cur: { pause: Function; play: Function };
      cur = videoRef.current as unknown as { pause: Function; play: Function };
      if (oldV) {
        cur.pause();
      } else {
        cur.play();
      }
      return !oldV;
    });
  };

  const pause = () => {
    if (playing) {
      toggleVideo();
    }
  };
  const play = () => {
    if (!playing) {
      toggleVideo();
    }
  };

  const fullscreen = (e: any) => {
    e.preventDefault();
    let elem = videoRef.current as unknown as any;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE11 */
      elem.msRequestFullscreen();
    }
  };
  const ward = (seconds: number) => {
    let curr = videoRef.current as unknown as any;
    setLoading(true);
    curr.currentTime = curr.currentTime + seconds;
  };

  useEffect(() => {
    let video = videoRef.current as unknown as any;
    video.play().catch((e: any) => {
      console.log(e);
      const noInterCurr = (noInteraction.current as unknown as any)
      noInterCurr.style.display = "flex";
      noInterCurr.addEventListener('click',(e:any)=>{
        play()
        noInterCurr.style.display='none'
      })
    });

    video.addEventListener("timeupdate", () => {
      let curr = (video.currentTime / video.duration) * 100;
      if (video.ended) {
        setPlaying(false);
      }
      (
        document.querySelector(".video-inner") as unknown as any
      ).style.width = `${curr}%`;
    });
    let progressBar = progressRef.current as unknown as any;

    const mouseMove = (e: any) => {
      let positionBar = progressBar.getBoundingClientRect();
      let percent = (e.clientX - positionBar.left) / progressBar.offsetWidth;
      if (percent < 0) {
        percent = 0;
      }
      if (percent > 1) {
        percent = 1;
      }
      (
        document.querySelector(".video-inner") as unknown as any
      ).style.width = `${percent * 100}%`;
      video.currentTime = video.duration * percent;
    };
    progressBar.addEventListener("mousedown", (e: any) => {
      mouseMove(e);
      clickedOnProgress.current = true;
      addEventListener("mousemove", mouseMove);
    });
    addEventListener("mouseup", (e): any => {
      removeEventListener("mousemove", mouseMove);
      toggleVideo();
      clickedOnProgress.current = false;
    });
    const removeLoading = (e: any) => {
      setLoading(false);
    };
    video.addEventListener("loadeddata", removeLoading);
    video.addEventListener("playing", removeLoading);

    video.addEventListener("waiting", (e: any) => {
      setLoading(true);
    });
    video.addEventListener("canplay", (e: any) => {
      setLoading(false);
    });

    const keyDownHandler = (e: any) => {
      if (e.keyCode == 39) {
        ward(+10);
      } else if (e.keyCode == 37) {
        ward(-10);
      } else if (e.keyCode == 32) {
        toggleVideo();
      }
      console.log(e.keyCode);
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
      video.removeEventListener("loadeddata", removeLoading);
      video.removeEventListener("playing", removeLoading);
    };
  }, []);

  return (
    <div>
      <div className="video-container">
        <div
          className="video-loader"
          style={loading ? { opacity: 1 } : { opacity: 0 }}
        >
          <Loading />
        </div>
        <div className="video-no-interaction" ref={noInteraction}>
          Click to start the video
        </div>
        <video
          ref={videoRef}
          src="/api/video/extend/Shazam/Shazam.Fury.Of.The.Gods.2023.1080p.WEBRip.x264.AAC5.1-[YTS.MX].mp4"
          autoPlay
          id="videoPlayer"
        ></video>
        <div className="video-controls">
          <FontAwesomeIcon
            className="video-play"
            icon={playing ? faPause : faPlay}
            onClick={toggleVideo}
          />
          <FontAwesomeIcon
            onClick={() => {
              ward(-10);
            }}
            className="video-backward"
            icon={faBackward}
          />
          <FontAwesomeIcon
            onClick={() => {
              ward(+10);
            }}
            className="video-forward"
            icon={faForward}
          />
          <FontAwesomeIcon
            icon={
              volume > 50
                ? faVolumeHigh
                : volume > 0
                ? faVolumeLow
                : faVolumeMute
            }
          />
          <div draggable={false} className="video-timeline" ref={progressRef}>
            <div className="video-bar">
              <div className="video-inner"></div>
            </div>
          </div>
          <FontAwesomeIcon icon={faClosedCaptioning} />
          <FontAwesomeIcon onClick={fullscreen} icon={faExpand} />
        </div>
      </div>
    </div>
  );
}
