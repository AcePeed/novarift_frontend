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

const getTimeFormat = (secs: number) => {
  let str = "";
  str = `${Math.floor(secs)%60}`
  if(Math.floor(secs)%60<10){
    str = 0+str
  }
  str = `${Math.floor(secs/60)%60}:`+str
  if(Math.floor(secs/60)%60<10){
    str = 0+str
  }
  if(secs/3600>=1){
    str = `${Math.floor(secs/3600)}:`+str
  }
  return str;
};

export default function Player(props: { params: { id: string } }) {
  const [volume, setVolume] = useState(60);
  const [playing, setPlaying] = useState(true);
  const [loading, setLoading] = useState(true);
  const videoRef = useRef(null);
  const progressRef = useRef(null);
  const clickedOnProgress = useRef(false);
  const noInteraction = useRef(null);
  const VideoLayoutLoaded = useRef(false);
  const [Times, SetTimes] = useState([0,0])

  const toggleVideo = () => {
    console.log("toggle");
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
    } else {
      let cur = videoRef.current as unknown as {
        pause: Function;
        play: Function;
      };
      cur.pause();
      cur.play();
    }
  };

  const fullscreen = (e: any) => {
    e.preventDefault();
    let elem = document.getElementsByClassName(
      "video-container"
    )[0] as unknown as any;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else if (elem.requestFullscreen) {
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
      const noInterCurr = noInteraction.current as unknown as any;
      noInterCurr.style.display = "flex";
      noInterCurr.addEventListener("click", (e: any) => {
        play();
        noInterCurr.style.display = "none";
      });
    });

    video.addEventListener("timeupdate", () => {
      let curr = (video.currentTime / video.duration) * 100;
      if (video.ended) {
        setPlaying(false);
      }
      try {
        (
          document.querySelector(".video-inner") as unknown as any
        ).style.width = `${curr}%`;
        SetTimes([video.currentTime,video.duration])
      } catch (e) {}
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
      clickedOnProgress.current = false;
    });
    const removeLoading = (e: any) => {
      VideoLayoutLoaded.current = true;
      setLoading(false);
    };
    addEventListener("load", (e: any) => {
      VideoLayoutLoaded.current = true;
    });
    video.addEventListener("loadeddata", removeLoading);
    video.addEventListener("playing", removeLoading);

    video.addEventListener("waiting", (e: any) => {
      setLoading(true);
    });
    video.addEventListener("canplay", (e: any) => {
      VideoLayoutLoaded.current = true;
      setLoading(false);
    });

    const keyDownHandler = (e: any) => {
      if (e.keyCode == 39) {
        ward(+10);
      } else if (e.keyCode == 37) {
        ward(-10);
      } else if (e.keyCode == 32) {
        toggleVideo();
      } else if (e.keyCode == 70) {
        fullscreen(e);
      }
      console.log(e.keyCode);
    };

    document.addEventListener("keydown", keyDownHandler);

    const vidLoader = document.getElementsByClassName("video-loader")[0];
    vidLoader.addEventListener("click", toggleVideo);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
      video.removeEventListener("loadeddata", removeLoading);
      video.removeEventListener("playing", removeLoading);
      vidLoader.removeEventListener("click", toggleVideo);
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
          src={"/api/video/" + props.params.id}
          autoPlay
          id="videoPlayer"
        ></video>
        <div
          className="video-controls"
          style={
            VideoLayoutLoaded.current
              ? { display: "flex" }
              : { display: "none" }
          }
        >
          <div className="video-controls-button-container">
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
            <div className="video-title">Shaz3aam</div>
            <FontAwesomeIcon icon={faClosedCaptioning} />
            <FontAwesomeIcon onClick={fullscreen} icon={faExpand} />
          </div>
          <div draggable={false} className="video-timeline" ref={progressRef}>
            <div className="video-time">{getTimeFormat(Times[0])}</div>
            <div className="video-bar">
              <div className="video-inner"></div>
            </div>
            <div className="video-end">{getTimeFormat(Times[1])}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
