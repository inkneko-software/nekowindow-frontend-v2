'use client'
import { Box, Fade, Menu, MenuItem, Paper, Popper, Slider, Stack, Typography } from "@mui/material"
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
// import { Danmaku, NekoDanmakuEngine } from "@components/Danmaku/Danmaku"
import NekoDanmakuEngine, { DanmakuBullet } from "@components/Danmaku/Danmaku"
import MetricsPanel from "./MetricsPanel"
import { MediaPlayer } from "dashjs"
import { useVideoPostDetailContext } from "@app/video/[nkid]/context"

interface NepPlayerProps {
  src: string
  title: string,
  adaptions: {
    adaptionName: string,
    adaptionId: number,
  }[],
  danmakus?: DanmakuBullet[]
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

export interface CustomDanmakuEvent {
  content: string
}

export interface IVideoPlayBackRateEvnet {
  speedRate: string
}

export type FullscreenType = "normal" | "browser" | "window"

const NepPlayer: React.FC<NepPlayerProps> = ({ src, title, adaptions,danmakus }) => {
  const [paused, setPaused] = React.useState(true);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [volume, setVolume] = React.useState(0);
  const [bufferedTimeRanges, setBufferedTimeRanges] = React.useState<TimeRanges>();

  const [windowState, setWindowState] = React.useState<PlayerWindowState>('normal')
  //播放器统计信息面板的打开状态
  const [playerMetricsOpen, setPlayerMetricsOpen] = React.useState(false)

  const [isBriefMode, setIsBriefMode] = React.useState(false);

  //音量面板
  const volumeButtonRef = React.useRef(null)
  const [volumePanelOpen, setVolumePanelOpen] = React.useState(false)

  //video标签引用
  const videoRef = React.useRef<HTMLVideoElement>();

  //弹幕引擎
  const [danmakuEngine, setDanmakuEngine] = React.useState<NekoDanmakuEngine>();

  //当前播放的清晰度ID
  const [currentAdaptionId, setCurrentAdaptionId] = React.useState(0);

  //全屏状态
  const [fullscreen, setFullscreen] = React.useState<FullscreenType>("normal")

  //右键菜单信息
  const [contextMenu, setContextMenu] = React.useState<{ mouseX: number, mouseY: number } | null>(null);

  //播放器统计信息
  const [playerMatrics, setPlayerMatrics] = React.useState({
    codec: "",
    resolution: "",
    videoDataRate: 0,
    audtioDataRate: 0,
    downloadSpeed: 0,
    buffer: 0
  })

  // React.useEffect(() => {
  //     let spentMinutes = Math.floor(props.currentTime / 60).toString().padStart(2, '0')
  //     let spentSeconds = Math.floor(props.currentTime % 60).toString().padStart(2, '0')

  //     let durationMinutes = Math.floor(props.duration / 60).toString().padStart(2, '0')
  //     let durationSeconds = Math.floor(props.duration % 60).toString().padStart(2, '0')

  //     setVideoTime(`${spentMinutes}:${spentSeconds} / ${durationMinutes}:${durationSeconds}`);
  // }, [props.duration, props.currentTime])

  const [dashPlayer, setDashPlayer] = React.useState<any>(null);

  const postContext = useVideoPostDetailContext()

  React.useEffect(() => {
    //获取video标签
    var video = document.getElementById("nep-player-video") as HTMLVideoElement;
    if (video === null) {
      return;
    }

    if (postContext !== null){
          //弹幕引擎初始化
        var danmakuWrap = document.getElementById("nep-player-danmaku") as HTMLElement;
        var danmakuEngine = new NekoDanmakuEngine(danmakuWrap, postContext.videoPostDetail.videos[postContext.currentPart].videoId);
        if (danmakus){
          danmakuEngine.loadDanmakus(danmakus)
        }
        setDanmakuEngine(danmakuEngine);
    }


    //video事件监听
    video.onclick = () => {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }

    }

    //video事件监听
    video.ondurationchange = (event) => {
      setDuration(video.duration)
    }

    video.ontimeupdate = () => {
      setCurrentTime(video.currentTime)
      setBufferedTimeRanges(video.buffered)
      setDuration(video.duration)
      danmakuEngine.onprogress(video.currentTime)
    }

    video.onpause = () => {
      setPaused(true)
      danmakuEngine.onpause();
    }

    video.onplay = () => {
      setPaused(false)
      danmakuEngine.onplay()
    }

    document.onfullscreenchange = (event) => {
      if (document.fullscreenElement === null) {
        // onFullscreenChange("normal")
      }
    }


    //dash播放器初始化
    const loadDashPlayer = async () => {
      var dashMediaPlayer = MediaPlayer().create();
      // 设置初始清晰度为最高清晰度
      var cfg = {
        'streaming': {
          'abr': {
            'autoSwitchBitrate': {
              video: false
            }
          }
        }
      };
      //https://cdn.dashjs.org/v4.7.4/jsdoc/module-MediaPlayer.html#setQualityFor
      //切换清晰度需要关闭ABR的自动码率切换
      cfg.streaming.abr.autoSwitchBitrate['video'] = false;
      dashMediaPlayer.updateSettings(cfg);

      let defaultAdaptionId = adaptions.length - 1;
      setCurrentAdaptionId(adaptions[adaptions.length - defaultAdaptionId - 1].adaptionId);

      dashMediaPlayer.initialize(videoRef.current, src, true);
      //问题在于初始化的时候无法设置清晰度，需要循环重复设置才能设置成功

      let defaultQualityHandle = setInterval(()=>{
        dashMediaPlayer.setQualityFor("video", defaultAdaptionId, false);
        clearInterval(defaultQualityHandle)
      },1000)



      setDashPlayer(dashMediaPlayer);
      //事件注册
      // player.on(MediaPlayer.events["MANIFEST_LOADED"],onManifestLoaded);

      // dashCleanUp = ()=>{
      //     player.off(MediaPlayer.events["MANIFEST_LOADED"],onManifestLoaded);
      // }

      var lastLength = 0;
      //dash数据检测相关
      var handle = setInterval(() => {
        /* 计算网络连接速度 与 网络下载量*/
        //anyscript ...
        var dashMetrics = dashMediaPlayer.getDashMetrics()

        var httpMetrics = dashMetrics.getHttpRequests("video");
        var thisUpdate: any[] = httpMetrics.slice(lastLength)
        var downloaded = 0;
        for (var i = 0; i < thisUpdate.length; ++i) {
          var receivedDataSizeRange = thisUpdate[i].range.split('-')
          var receivedDataSize = parseInt(receivedDataSizeRange[1]) - parseInt(receivedDataSizeRange[0]);
          downloaded += receivedDataSize;
        }
        lastLength = httpMetrics.length;
        var bufferLevel = dashMetrics.getCurrentBufferLevel('video');


        var streamInfo: any = dashMediaPlayer.getActiveStream();
        var dashAdapter: any = dashMediaPlayer.getDashAdapter();

        if (dashMetrics && streamInfo) {
          streamInfo = streamInfo.getStreamInfo()
          const periodIdx = streamInfo.index;
          var videoRepSwitch: any = dashMetrics.getCurrentRepresentationSwitch('video');
          var audioRepSwitch: any = dashMetrics.getCurrentRepresentationSwitch('audio');
          if (videoRepSwitch === null) {
            return;
          }
          var bufferLevel = dashMetrics.getCurrentBufferLevel('video');
          var bitrate = videoRepSwitch ? Math.round(dashAdapter.getBandwidthForRepresentation(videoRepSwitch.to, periodIdx) / 1000) : NaN;
          var adaptation = dashAdapter.getAdaptationForType(periodIdx, 'video', streamInfo);
          var currentRep = adaptation.Representation_asArray.find(function (rep: any) {
            return rep.id === videoRepSwitch.to
          })
          var frameRate = currentRep.frameRate;
          var resolution = currentRep.width + 'x' + currentRep.height;
          //frameRate fix for situation like 24000/1001 = 23.xxxx fps
          var splitedFrameRate = frameRate.split("/")
          if (splitedFrameRate.length == 2) {
            frameRate = (splitedFrameRate[0] / splitedFrameRate[1]).toFixed(2)
          }
          var videoTrack = dashMediaPlayer.getCurrentTrackFor("video");
          var audioTrack = dashMediaPlayer.getCurrentTrackFor("audio");

          setPlayerMatrics({
            codec: `${videoTrack ? videoTrack.codec : ''};${audioTrack ? audioTrack.codec : ''};`,
            resolution: resolution + "@" + frameRate,
            buffer: bufferLevel,
            videoDataRate: dashAdapter.getBandwidthForRepresentation(videoRepSwitch.to, periodIdx) / 1000,
            audtioDataRate: dashAdapter.getBandwidthForRepresentation(audioRepSwitch.to, periodIdx) / 1000,
            downloadSpeed: downloaded
          })
          // console.log("network activity: ", (downloaded / 1024), 'kbps' , "buffer:", bufferLevel , "s", "resolution: ",resolution, "frameRate: ", frameRate, "videoBitrate: " ,bitrate ,"kbps" )

        }
      }, 1000)

    };

    if (src.endsWith('.mpd')){
      loadDashPlayer();
    }else{
      video.src = src;
    }



    var playerWrap = document.getElementById("nep-player-wrap") as HTMLDivElement;

    var inactiveHandle: NodeJS.Timeout | number | undefined = undefined;

    //页面加载后1秒后隐藏控制面板
    inactiveHandle = setTimeout(() => {
      setIsBriefMode(true);
      inactiveHandle = undefined;
    }, 1000);

    //鼠标移动时显示控制面板，隐藏简略模式的进度条
    playerWrap.onmousemove = (event) => {
      setIsBriefMode(false);
      if (inactiveHandle !== undefined) {
        clearTimeout(inactiveHandle);
      }
      inactiveHandle = setTimeout(() => {
        setIsBriefMode(true);
        inactiveHandle = undefined;
      }, 2000);
    }

    //鼠标移出时显示简略模式的进度条
    playerWrap.onmouseleave = (event) => {
      setIsBriefMode(true);
      if (inactiveHandle !== undefined) {
        clearTimeout(inactiveHandle);
      }
    }

    //右键菜单
    playerWrap.oncontextmenu = (event) => {
      event.preventDefault();
      setContextMenu(
        contextMenu === null
          ? {
            mouseX: event.clientX - 2,
            mouseY: event.clientY - 4,
          }
          : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
          // Other native context menus might behave different.
          // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
          null,
      );
    };

    //控制按钮移动时不隐藏控制面板
    var controllButtons = document.getElementById('nep-player-controll-btns') as HTMLDivElement;

    controllButtons.onmousemove = (event) => {
      event.stopPropagation();
      if (inactiveHandle !== undefined) {
        clearTimeout(inactiveHandle);
      }
    }


    //设置控制面板常显
    const activeEventListener = () => {
      setIsBriefMode(false);
      if (inactiveHandle !== undefined) {
        clearTimeout(inactiveHandle);
      }
    }

    //隐藏控制面板
    const dismissEventListener = () => {
      setIsBriefMode(true);
    }


    //倍速切换
    const speedRateEventListener = (e: CustomEvent<IVideoPlayBackRateEvnet>) => {
      video.playbackRate = parseFloat(e.detail.speedRate);
    }

    document.addEventListener("active-player-controls", activeEventListener)
    document.addEventListener("dismiss-player-controls", dismissEventListener)
    document.addEventListener("player-switch-speedrate", speedRateEventListener as EventListener)

    return () => {
      video.onclick = null;
      video.onmousemove = null;
      video.onmouseleave = null;
      video.ontimeupdate = null;
      video.ondurationchange = null;
      video.onplay = null;
      video.onpause = null;
      document.onfullscreenchange = null;

      playerWrap.onmousemove = null;
      playerWrap.onmouseleave = null;
      controllButtons.onmousemove = null;
      // danmakuEngine.destory();
    }

  }, [src])

  React.useEffect(() => {
    if (danmakuEngine === undefined) {
      return;
    }

    const handleInsertDanmaku = (data: Event) => {
      var e = data as CustomEvent<CustomDanmakuEvent>
      // danmakuEngine.insertDanmaku({
      //   //弹幕id
      //   danmaku_id: 0,
      //   //内容
      //   content: e.detail.content,
      //   //出现时间（秒）
      //   progress: currentTime,
      //   // 颜色
      //   color: 0xffffff,
      //   // 是否已发送
      //   fired: false
      // });
    }

    (async()=>{
      
    })()

    document.addEventListener("danmaku::insert", handleInsertDanmaku)
    return () => {
      document.removeEventListener("danmaku::insert", handleInsertDanmaku)
    }
  }, [danmakuEngine, currentTime])

  React.useEffect(() => { 
    if (danmakuEngine === undefined || danmakus === undefined) {
      return;
    }

    danmakuEngine.loadDanmakus(danmakus)
  }, [danmakuEngine, danmakus])

  const videoClick = () => {
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
    if (danmakuEngine !== undefined) {
      danmakuEngine.onseek(newTime)
    }
  }

  const handleAdaptionChange = (adaptionId: number) => {
    //默认配置为自动选择视频码率
    var cfg = {
      'streaming': {
        'abr': {
          'autoSwitchBitrate': {
            video: true
          }
        }
      }
    };
    if (adaptionId === 0) {
      dashPlayer.updateSettings(cfg);
      setCurrentAdaptionId(adaptionId);
      return;
    }
    //首先获取当前清晰度对应的index，由于0是最低的码率，所以需要取反
    var selectedAdaptionIndex = adaptions.findIndex((item) => item.adaptionId === adaptionId);
    if (selectedAdaptionIndex === undefined) {
      throw new Error("Invalid adaption id");
    }
    selectedAdaptionIndex = adaptions.length - selectedAdaptionIndex - 1;

    //https://cdn.dashjs.org/v4.7.4/jsdoc/module-MediaPlayer.html#setQualityFor
    //切换清晰度需要关闭ABR的自动码率切换
    cfg.streaming.abr.autoSwitchBitrate['video'] = false;
    dashPlayer.updateSettings(cfg);
    dashPlayer.setQualityFor("video", selectedAdaptionIndex, false);
    setCurrentAdaptionId(adaptionId);
    // cfg.streaming.abr.autoSwitchBitrate[item.mediaType] = true;
    // self.player.updateSettings(cfg);
  }

  const onFullscreenChange = (newType: FullscreenType) => {
    if (danmakuEngine !== undefined){
      danmakuEngine.oncontainerchange()
    }
    if (newType !== "normal") {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    if (newType === "window") {
      var playerWrap = document.getElementById("nep-player-wrap") as HTMLDivElement;
      if (playerWrap !== null) {
        playerWrap.requestFullscreen();
      }

    }

    if (newType === "normal" && fullscreen === 'window') {
      document.exitFullscreen();
    }
    setFullscreen(newType)
  }

  const browserFullscreenClicked = () => {

    onFullscreenChange(fullscreen === "browser" ? "normal" : "browser")
  }

  const windowFullscreenClicked = () => {
    onFullscreenChange(fullscreen === "window" ? "normal" : "window")
  }
  const sxTitleHidden = {
    display: "none"
  }

  const sxTitleShow = {
    color: "#ffffff",
    width: "100%",
    padding: "10px",
    position: "absolute",
    backgroundImage: "linear-gradient(180deg,rgba(0,0,0,0.8) 9%,rgba(0,0,0,0.0) 100%)"
  }

  const sxPlayerScreen = {
    width: '100%',
    height: '100%'
  }
  
  const sxBrowserFullscreen = {
    position: "fixed",
    left: 0,
    top: 0,
    zIndex: 11000,
    width: "100%",
    height: "100% !important"
  }
  
  const sxWindowFullscreen = {
  }

  return (
    <Box id='nep-player-wrap' sx={[{ width: '100%', height: '100%', position: 'relative', backgroundColor: 'black', cursor: `${isBriefMode ? 'none' : 'unset'}` }, (fullscreen === "normal" ? {} : (fullscreen === "browser" ? sxBrowserFullscreen : sxWindowFullscreen))]} >
      {/* video标签 */}
      <Box component='video' id="nep-player-video" sx={{ width: '100%', height: '100%', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} ref={videoRef} />
      <Box id="nep-player-danmaku" sx={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }} onClick={() => {
        //弹幕界面实际上是覆盖在video上的，所以点击弹幕界面实际上是点击video，需要传递点击事件
        if (videoRef.current !== undefined) {
          videoRef.current.click();
        }
      }} />
      {/* 视频标题 */}

      <Box sx={{
        display: `${fullscreen === 'normal' ? 'none' : isBriefMode? 'none' : 'unset'}`,
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
          <AdaptionSwitchPanel open={adaptionSwitchPanelOpen} anchorEl={adaptionButtonRef.current} adaptions={adaptions} currentAdaptionId={currentAdaptionId} onOpenStateChange={setAdaptionSwitchPanelOpen} onAdaptionSwitched={handleAdaptionChange} />
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
      {/* DASH信息统计面板 */}
      <MetricsPanel playerMatrics={playerMatrics} playerMetricsOpen={playerMetricsOpen} onMetricsPanelOpen={setPlayerMetricsOpen} />
      {/* 右键菜单 */}
      <Menu onContextMenu={(e) => { setContextMenu(null); e.preventDefault(); }}
        open={contextMenu !== null}
        onClose={() => setContextMenu(null)}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
        sx={{ opacity: "0.85", }}
        MenuListProps={
          {
            sx: {
              bgcolor: "black",
              opacity: "0.85",
              color: "white"
            }
          }
        }

      >
        <MenuItem onClick={() => { setContextMenu(null) }} sx={{ margin: "0px 20px" }}>快捷键说明</MenuItem>
        {/* <Divider sx={{borderColor:"#fff", margin:"0px 36px"}}/> */}
        <MenuItem onClick={() => { setPlayerMetricsOpen(true); setContextMenu(null) }} sx={{ margin: "0px 20px" }}>视频统计信息</MenuItem>
      </Menu>
      {/* 右下角暂停图标 */}
    </Box>
  )
}

export default NepPlayer;