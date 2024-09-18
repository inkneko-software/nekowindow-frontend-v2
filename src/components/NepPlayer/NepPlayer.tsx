'use client'
import { Box, Fade, Paper, Popper, Slider, Stack, Typography } from "@mui/material"
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import React from "react"
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded'
import PauseRoundedIcon from '@mui/icons-material/PauseRounded'
import AspectRatioRoundedIcon from '@mui/icons-material/AspectRatioRounded'
import FullscreenRoundedIcon from '@mui/icons-material/FullscreenRounded'
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded'
import AdaptionSwitchPanel from "./AdaptionSwitchPanel"
import SpeedRateSwitchPanel from "./SpeedRateSwitchPanel"
import VolumePanel from "./VolumePanel"
import ProgressBar from "./ProgressBar"

interface NepPlayerProps {
  src: string
  title: string
}

type PlayerWindowState = 'normal' | 'browser-full' | 'screen-full';


const sxControls = {
  width: "100%",
  display: "flex",
  flexDirection: "row",
  bgcolor: 'rgba(0, 0, 0, 0.8)',
}

const sxCommonButton = {
  color: "#e3e3e3",
  fontWeight: 'bold',
  ":hover": {
    fontWeight: "bolder",
    color: "#ffffff"
  }
}



const NepPlayer: React.FC<NepPlayerProps> = ({ src, title }) => {
  //视频标题
  const [paused, setPaused] = React.useState(true);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [volume, setVolume] = React.useState(0);
  const [bufferedTimeRanges, setBufferedTimeRanges] = React.useState<TimeRanges>();

  const [windowState, setWindowState] = React.useState<PlayerWindowState>('normal')
  const [isBriefMode, setIsBriefMode] = React.useState(false);

  const volumeButtonRef = React.useRef(null)
  const [volumePanelOpen, setVolumePanelOpen] = React.useState(false)

  const videoRef = React.useRef<HTMLVideoElement>();
  // React.useEffect(() => {
  //     let spentMinutes = Math.floor(props.currentTime / 60).toString().padStart(2, '0')
  //     let spentSeconds = Math.floor(props.currentTime % 60).toString().padStart(2, '0')

  //     let durationMinutes = Math.floor(props.duration / 60).toString().padStart(2, '0')
  //     let durationSeconds = Math.floor(props.duration % 60).toString().padStart(2, '0')

  //     setVideoTime(`${spentMinutes}:${spentSeconds} / ${durationMinutes}:${durationSeconds}`);
  // }, [props.duration, props.currentTime])

  React.useEffect(() => {
    var video = document.getElementById("nep-player-video") as HTMLVideoElement;
    console.log(video)
    if (video === null) {
      return;
    }

    video.onclick = () => {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }

    }

    video.onmousemove = (event) => {
      // document.dispatchEvent(new CustomEvent("active-player-controls", { detail: { fade: true } }))
    }

    video.onmouseleave = (event) => {
      // setShowControls(false);
    }

    //video事件监听
    video.ondurationchange = (event) => {
      setDuration(video.duration)
    }

    video.ontimeupdate = () => {
      setCurrentTime(video.currentTime)
      setBufferedTimeRanges(video.buffered)
      setDuration(video.duration)
    }

    video.onpause = () => {
      setPaused(true)
    }

    video.onplay = () => {
      setPaused(false)
    }

    document.onfullscreenchange = (event) => {
      if (document.fullscreenElement === null) {
        // onFullscreenChange("normal")
      }
    }

    video.src = src;

    var player = document.getElementById("nep-player-wrap") as HTMLDivElement;

    var inactiveHandle: NodeJS.Timeout | number | undefined = undefined;

    inactiveHandle = setTimeout(() => {
      setIsBriefMode(true);
      inactiveHandle = undefined;
    }, 1000);

    player.onmousemove = (event) => {
      setIsBriefMode(false);
      if (inactiveHandle !== undefined) {
        clearTimeout(inactiveHandle);
      }
      inactiveHandle = setTimeout(() => {
        setIsBriefMode(true);
        inactiveHandle = undefined;
      }, 2000);
    }

    player.onmouseleave = (event) => {
      setIsBriefMode(true);
      if (inactiveHandle !== undefined) {
        clearTimeout(inactiveHandle);
      }
    }

    var controllButtons = document.getElementById('nep-player-controll-btns') as HTMLDivElement;
    controllButtons.onmousemove = (event) => {
      event.stopPropagation();
      if (inactiveHandle !== undefined) {
        clearTimeout(inactiveHandle);
      }
    }


    return () => {
      video.onclick = null;
      video.onmousemove = null;
      video.onmouseleave = null;
      video.ontimeupdate = null;
      video.ondurationchange = null;
      video.onplay = null;
      video.onpause = null;
      document.onfullscreenchange = null;

      player.onmousemove = null;
      player.onmouseleave = null;
      controllButtons.onmousemove = null;
    }

  }, [src])

  const videoClick = () => {
  }

  const browserFullscreenClicked = () => {

  }

  const windowFullscreenClicked = () => {
  }

  const [adaptionSwitchPanelOpen, setAdaptionSwitchPanelOpen] = React.useState(false)
  const adaptionButtonRef = React.useRef(null)

  const [speedRateSwitchPanelOpen, setSpeedRateSwitchPanelOpen] = React.useState(false)
  const speedRateSwitchPanelRef = React.useRef(null)

  const calculateVideoTime = (): string => {
    if (duration === 0 || Number.isNaN(duration)) {
      return '00:00 / 00:00'
    }


    let spentMinutes = Math.floor(currentTime / 60).toString().padStart(2, '0')
    let spentSeconds = Math.floor(currentTime % 60).toString().padStart(2, '0')

    let durationMinutes = Math.floor(duration / 60).toString().padStart(2, '0')
    let durationSeconds = Math.floor(duration % 60).toString().padStart(2, '0')

    return `${spentMinutes}:${spentSeconds} / ${durationMinutes}:${durationSeconds}`
  }

  const handleProgressSeek = (newTime: number) => {
    setCurrentTime(newTime);
    var video = document.getElementById("nep-player-video") as HTMLVideoElement;
    video.currentTime = newTime;
  }

  return (
    <Box id='nep-player-wrap' sx={{ width: '100%', height: '100%', position: 'relative', backgroundColor: 'black', cursor: `${isBriefMode ? 'none' : 'unset'}` }} >
      {/* video标签 */}
      <Box component='video' id="nep-player-video" sx={{ width: '100%' }} />
      {/* 视频标题 */}
      <Box sx={{
        display: 'none',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        background: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0))',
      }}>
        <Typography variant='h5' sx={{ padding: '16px 16px 32px 16px', color: 'white' }}>{title}</Typography>
      </Box>
      {/* 控制组件 */}
      <Box sx={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        background: `${isBriefMode ? 'unset' : 'linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.6))'}`,
        opacity: `${isBriefMode ? '0' : '1'}`,
        transition: 'opacity 0.1s ease-in-out'
      }}>
        {/* 进度条 */}
        <ProgressBar style={{ marginTop: '32px' }} currentTime={currentTime} duration={duration} buffered={bufferedTimeRanges} onSeek={handleProgressSeek} />
        {/* 控制按钮 */}
        <Box id='nep-player-controll-btns' sx={{ display: 'flex', overflow: 'hidden' }}>
          {/* 暂停与播放 */}
          <IconButton sx={{ color: "#ffffff" }} size="large" >
            {paused ? <PlayArrowRoundedIcon /> : <PauseRoundedIcon />}
          </IconButton>
          {/* 时间 */}
          <Typography color="white" sx={{ margin: 'auto', fontSize: 12 }}>{calculateVideoTime()}</Typography>
          {/* 中间空白区域 */}
          <Box sx={{ flexGrow: 1 }} />
          {/* 清晰度选项按钮 */}
          <Button disableRipple sx={sxCommonButton} ref={adaptionButtonRef} onMouseEnter={() => setAdaptionSwitchPanelOpen(true)} onMouseLeave={() => setAdaptionSwitchPanelOpen(false)}>1080P</Button>
          {/* 清晰度选择面板 */}
          <AdaptionSwitchPanel open={adaptionSwitchPanelOpen} anchorEl={adaptionButtonRef.current} adaptions={[{ adaptionName: "超清1080P60", adaptionId: 1 }, { adaptionName: "超清 1080P", adaptionId: 1 }, { adaptionName: "高清 720P", adaptionId: 1 }, { adaptionName: "流畅 360P", adaptionId: 1 }]} onOpenStateChange={setAdaptionSwitchPanelOpen} onAdaptionSwitched={() => { }} />
          {/* 播放速度按钮 */}
          <Button disableRipple sx={sxCommonButton} ref={speedRateSwitchPanelRef} onMouseEnter={() => setSpeedRateSwitchPanelOpen(true)} onMouseLeave={() => setSpeedRateSwitchPanelOpen(false)} >倍速</Button>
          {/* 倍速按钮 */}
          <SpeedRateSwitchPanel onOpenStateChange={setSpeedRateSwitchPanelOpen} open={speedRateSwitchPanelOpen} anchorEl={speedRateSwitchPanelRef.current} />
          {/* 音量按钮 */}
          <IconButton
            ref={volumeButtonRef}
            sx={{ color: "#ffffff" }}
            size="large"
            onMouseEnter={() => setVolumePanelOpen(true)}
            onMouseLeave={() => setVolumePanelOpen(false)}>
            <VolumeUpRoundedIcon />
          </IconButton>
          {/* 音量面板 */}
          <VolumePanel open={volumePanelOpen} volume={volume} anchorEl={volumeButtonRef.current} onOpenStateChange={setVolumePanelOpen} onVolumeChange={(newVolume) => setVolume(newVolume)} />
          {/* 网页全屏按钮 */}
          <IconButton sx={{ color: "#ffffff" }} size="large" onClick={browserFullscreenClicked}><AspectRatioRoundedIcon /></IconButton>
          {/* 全屏按钮 */}
          <IconButton sx={{ color: "#ffffff" }} size="large" onClick={windowFullscreenClicked}><FullscreenRoundedIcon /></IconButton>
        </Box>
      </Box>
      {/* 简略进度条 */}
      <Box sx={{ position: 'absolute', bottom: 0, width: '100%', visibility: `${isBriefMode ? 'unset' : 'hidden'}`, transition: 'visibility 0.1s ease-in' }}>
        <ProgressBar style={{ marginTop: '32px' }} brief currentTime={currentTime} duration={duration} buffered={bufferedTimeRanges} onSeek={handleProgressSeek} />
      </Box>
      {/* 右下角暂停图标 */}
    </Box>
  )
}

export default NepPlayer;