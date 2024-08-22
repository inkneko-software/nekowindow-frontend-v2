'use client'
import { Box } from "@mui/material"
import React from "react"


const activeControls = (fade?: boolean) => {
  document.dispatchEvent(new CustomEvent("active-player-controls", { detail: { fade: false } }))
  console.log("go")
}

const dismissControls = (fade?: boolean) => {
  document.dispatchEvent(new CustomEvent("dismiss-player-controls"))
}

const speedRateSwitch = (speedRate: string) => {
  document.dispatchEvent(new CustomEvent("player-switch-speedrate", { detail: { speedRate: speedRate } }))
}




export interface ProgressBarProps {
  buffered: TimeRanges | undefined,
  duration: number,
  currentTime: number,
  onSeek: (newCurrentTime: number) => void,
  sx?: any,
  style?: any,
  brief?: boolean
}

const ProgressBar = (props: ProgressBarProps) => {
  const sliderWrapRef = React.useRef<HTMLDivElement>(null)
  const sliderBufferedRef = React.useRef<HTMLDivElement>(null)
  const sliderPlayedRef = React.useRef<HTMLDivElement>(null)

  const [isSeeking, setIsSeeking] = React.useState(false);
  const [progressPercent, setProgressPercent] = React.useState(0);

  //更新进度
  React.useEffect(() => {
    if (!isSeeking) {
      var percentage = props.currentTime / props.duration;
      if (percentage < 0) {
        percentage = 0;
      } else if (percentage > 1) {
        percentage = 1;
      }

      setProgressPercent(percentage)
    }
  }, [props.currentTime, isSeeking])

  // 进度条点击
  React.useEffect(() => {
    if (sliderWrapRef.current === null) {
      return;
    }

    var sliderWrap: HTMLDivElement = sliderWrapRef.current

    // 鼠标进入时，进入进度拖拽模式
    sliderWrap.onmousedown = (event) => {
      if (event.button === 0) {
        setIsSeeking(true);
      }
    }

    // 鼠标离开时，退出进度条拖拽模式，并进行seek操作
    document.onmouseup = (event) => {
      if (isSeeking && event.button === 0) {
        setIsSeeking(false);
        var bindpos = sliderWrap.getBoundingClientRect()
        var percentage = (event.x - bindpos.x) / bindpos.width;
        if (percentage < 0) {
          percentage = 0;
        } else if (percentage > 1) {
          percentage = 1;
        }
        props.onSeek(props.duration * percentage);

      }
    }

    // 
    document.onmousemove = (event) => {
      if (isSeeking) {
        var bindpos = sliderWrap.getBoundingClientRect()
        var percentage = (event.x - bindpos.x) / bindpos.width;
        if (percentage < 0) {
          percentage = 0;
        } else if (percentage > 1) {
          percentage = 1;
        }
        setProgressPercent(percentage);
      }
    }


    return () => {
      sliderWrap.onclick = null;
      document.onmousemove = null;
    }
  }, [props.duration, isSeeking])

  //进度条更新
  // React.useEffect(() => {
  //     var progress = props.currentTime / props.duration;
  //     if (isNaN(progress) === true) {
  //         progress = 0;
  //     }
  //     sliderPlayedRef.current.style.transform = "translateX(-" + (sliderPlayedRef.current.clientWidth * (1 - progress)) + "px)";

  //     if (props.buffered === undefined) {
  //         return;
  //     }
  //     let currentTime = props.currentTime;
  //     if (props.buffered.length === 0) {
  //         sliderBufferedRef.current.style.transform = "translateX(-" + (sliderBufferedRef.current.clientWidth + "px)");
  //     }

  //     for (let i = 0; i < props.buffered.length; ++i) {
  //         if (currentTime >= props.buffered.start(i) && currentTime < props.buffered.end(i)) {
  //             let bufferedPercentage = props.buffered.end(i) / props.duration;
  //             sliderBufferedRef.current.style.transform = "translateX(-" + (sliderBufferedRef.current.clientWidth * (1 - bufferedPercentage)) + "px)";
  //         }
  //     }
  // }, [props.duration, props.currentTime, props.buffered])

  const calculateProgressPercent = () => {
    var progress = progressPercent;
    if (isNaN(progress) === true) {
      progress = 0;
    }
    return progress;
  }

  const calculatePlayedTransform = (): string => {
    if (sliderPlayedRef.current === null) {
      return ""
    }
    return "scaleX(" + calculateProgressPercent() + ")"
    // return  "translateX(-" + (sliderPlayedRef.current.clientWidth * (1 - progress)) + "px)"
  }

  const calculateBufferedTransform = (): string => {
    if (sliderBufferedRef.current === null) {
      return ""
    }

    var ret = "scaleX(" + 0 + ")"
    if (props.buffered === undefined) {
      return ret;
    }

    let currentTime = props.currentTime;
    if (props.buffered.length === 0) {
      return ret
    }

    // var currentBufferdInPlayRange = "translateX(-" + sliderBufferedRef.current.clientWidth + "px)";
    for (let i = 0; i < props.buffered.length; ++i) {
      if (currentTime >= props.buffered.start(i) && currentTime < props.buffered.end(i)) {
        let bufferedPercentage = props.buffered.end(i) / props.duration;
        ret = "scaleX(" + bufferedPercentage + ")"
        // currentBufferdInPlayRange = "translateX(-" + (sliderBufferedRef.current.clientWidth * (1 - bufferedPercentage)) + "px)";
      }
    }
    return ret;
    // return currentBufferdInPlayRange;
  }


  return (
    <Box ref={sliderWrapRef}
      sx={[
        props.sx,
        {
          height: "12px",
          display: 'flex',
          flexDirection: 'row',
          cursor: 'pointer',
          position: 'relative',
          left: '0',
          userSelect: 'none'
        },
        !props.brief && {
          margin: "0px 10px"
        }
      ]}
      style={props.style}
    >
      {/* 已缓冲进度 */}
      <Box
        ref={sliderBufferedRef}
        sx={{
          transform: calculateBufferedTransform(),
          height: "2px",
          backgroundColor: '#adadad',
          width: '100%',
          zIndex: '3',
          position: 'absolute',
          bottom: '0',
          left: '0',
          transformOrigin: '0',
          userSelect: 'none'

        }}
      />
      {/* 浮标 */}
      <Box
        component="div"
        sx={[{
          height: "20px",
          width: "20px",
          zIndex: "10000",
          position: "absolute",
          background: "url(/cat.svg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          transition: `left ${isSeeking ? 0 : 0.2}s ease-in-out`,
          userSelect: 'none'

        },
        props.brief === true && { display: "none" }
        ]}
        style={{ left: `calc(${calculateProgressPercent() * 100}% - 10px)` }} />
      {/* 已播放进度 */}
      <Box
        ref={sliderPlayedRef}
        sx={{
          transform: calculatePlayedTransform(),
          height: "2px",
          backgroundColor: '#1899da',
          width: '100%',
          zIndex: '3',
          position: 'absolute',
          bottom: '0',
          left: '0',
          transformOrigin: '0',
          transition: `transform  ${isSeeking ? 0 : 0.2}s ease-in-out`,
          userSelect: 'none'
        }} />
      {/* 未播放进度 */}
      <Box sx={{
        height: "2px", backgroundColor: 'rgba(255,255,255,0.2)',
        width: '100%',
        zIndex: '2',
        position: 'absolute',
        bottom: '0',
        left: '0',
        transformOrigin: '0',
        userSelect: 'none'
      }} />
    </Box>
  )
}

export default ProgressBar;