'use client'
import * as React from 'react';
import { Avatar, Box, Chip, Container, Divider, IconButton, Paper, Stack, styled, Toolbar, Typography, useTheme, Slider, Popper, Fade, SvgIcon, Button, Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemText, ListItemButton, RadioGroup, Radio, FormControlLabel, InputBase, Switch, TextField } from "@mui/material";
import NekoWindowAppBar from "@components/AppBar/NekoWindowAppBar";
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import ReplyRoundedIcon from '@mui/icons-material/ReplyRounded';
import CommentPanel from '@components/Comment/CommentPanel';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import DanmakuPanel from '@components/Danmaku/DanmakuPanel';
import RecommendPanel from '@components/Recommend/RecommendPanel';
import CoinIcon from '@components/Icons/CoinIcon';
import CoinIconFilled from '@components/Icons/CoinIconFilled';
import FormatColorTextRoundedIcon from '@mui/icons-material/FormatColorTextRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';

import Head from 'next/head';
import DefaultErrorPage from 'next/error'
import { useRouter } from 'next/navigation';
import { Configuration as VideoAPIConfiguration, UploadUserVO, VideoControllerApi, VideoPostDetailVO } from '@api/codegen/video';
import { Configuration as DanmakuAPIConfiguration, DanmakuControllerApi } from '@api/codegen/danmaku';

import { useVideoPostDetailContext } from './context';
import dynamic from 'next/dynamic';
import { DanmakuBullet } from '@components/Danmaku/Danmaku';
import Link from 'next/link';

const NepPlayer = dynamic(() => import('@components/NepPlayer/NepPlayer'), { ssr: false });
const CustomDanmakuEvent = dynamic(() => import('@components/NepPlayer/NepPlayer'), { ssr: false });

const SocialSection = styled('div')(({ theme }) => ({
  marginTop: "5px",
  height: '500px',
  width: '100%',
  // backgroundColor: "purple"
}));

/**
 * 
  视频质量	代号	说明
  1080P 60帧	10	原视频帧率>=60帧。转码后码率不高于8Mbps
  1080P 高码率	11	原视频帧率小于60帧，但码率大于3Mbps。转码后码率不高于8Mbps
  1080P	12	最高码率3Mbps，帧率不超过59帧
  720P	20	最高码率1Mbps
  360P	30	最高码率500Kbps
  */
const videoAdaptionsMap = new Map<string, string>();
videoAdaptionsMap.set("0", "自动");
videoAdaptionsMap.set("10", "1080P 60帧");
videoAdaptionsMap.set("11", "1080P 高码率");
videoAdaptionsMap.set("12", "1080P 高清");
videoAdaptionsMap.set("20", "720P 超清");
videoAdaptionsMap.set("30", "360P 流畅");
export default function VideoPage({ }) {
  const videoapi = new VideoControllerApi(new VideoAPIConfiguration({ credentials: 'include', basePath: process.env.NEXT_PUBLIC_API_SERVER }));
  const danmakuAPI = new DanmakuControllerApi(new DanmakuAPIConfiguration({ credentials: "include", basePath: process.env.NEXT_PUBLIC_API_SERVER }))


  const theme = useTheme();
  const router = useRouter();

  const videoPostDetailContext = useVideoPostDetailContext();

  if (!videoPostDetailContext) {
    throw new Error("videoPostDetailContext is null");
  }

  const nkid = videoPostDetailContext.nkid;
  const post = videoPostDetailContext.videoPostDetail;
  const video = post.videos[0];
  const videoAdaptions = video.videoAdaptions.split(',').map((adaption) => {
    return {
      adaptionName: videoAdaptionsMap.get(adaption) || "未知质量",
      adaptionId: parseInt(adaption)
    }
  });

  //这几个数据后续应该单独获取，从Layout中传递过来
  const danmaku = 0
  const comment = 0;
  const visit = post.visit;
  const partition = '';

  // 上传者信息
  const [uploader, setUploader] = React.useState<UploadUserVO>(videoPostDetailContext.videoPostDetail.uploader)

  // 当前登录用户信息
  const [memberInfo, setMemberInfo] = React.useState({
    face_url: "",
    nick: "",
  })

  const [danmakus, setDanmakus] = React.useState<DanmakuBullet[]>([])
  React.useEffect(() => {
    danmakuAPI.getChatRoomByVideoResourceId({ videoResourceId: videoPostDetailContext.videoPostDetail.videos[0].videoId }).then(res => {
      if (res.code !== 0 || res.data === null || res.data === undefined) {
        return;
      }
      var chatRoomId = res.data.chatId;
      if (chatRoomId === null || chatRoomId === undefined) {
        return;
      }

      danmakuAPI.getRecentDanmakuList({ chatRoomId: chatRoomId }).then(res => {
        if (res.data === null || res.data === undefined) {
          return;
        }
        setDanmakus(res.data.map(item => ({
          danmaku_id: item.messageId,
          content: item.content,
          progress: item.progress,
          color: item.colorHex,
          fired: false,
          created_at: item.createdAt,
        })))
      })
    })

    videoapi.logMetrics({videoId: post.videos[0].videoId});
  }, [videoPostDetailContext.nkid])

  const handleSendDanmaku = () => {
    var danmakuInput = document.getElementById("danmaku-input") as HTMLInputElement;
    var danmaku = danmakuInput.value
    if (danmaku.trim() === '') {
      return;
    }

    // var event = new CustomEvent<CustomDanmakuEvent>("danmaku::insert", {
    //   detail: {
    //     content: danmaku
    //   }
    // })
    // document.dispatchEvent(event);
    danmakuInput.value = "";
  }

  const handleDanmakuInputKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendDanmaku();
    }
  }

  return (
    <Box sx={{ minWidth: "1360px", minHeight: "768px" }}>
      <NekoWindowAppBar />
      <Toolbar />
      <Container
        maxWidth="xl"
        sx={{
          minWidth: "690px",
          disply: "flex",
          flexDirection: "row",
          justifyContent: 'center',
          marginTop: "5px",
          display: "flex",
        }} >
        {/* 左侧 */}
        <Box sx={{ display: "flex", flexDirection: "column", width: "75%" }}>
          {/* 视频标题 与 视频详细信息 */}
          <Box sx={{ height: '64px', display: "flex", flexDirection: "column", margin: '16px 0px', marginRight: "auto" }}>
            {/* 视频标题 */}
            <Typography sx={{ marginLeft: post.title.charAt(0) === '【' ? '-0.5em' : '0px' }} variant="h5" noWrap component="div">
              {post.title}
            </Typography>
            {/* 视频详细信息 */}
            <Typography sx={{ color: "gray", margin: '8px 0px' }} variant='body2' component="div">
              {`${visit}播放 · 总弹幕数${danmaku}`} &nbsp; &nbsp;{`${post.createdAt.toLocaleString()}`}
            </Typography>
          </Box>
          {/* 播放器 */}
          <Box sx={{
            minWidth: '706px', //最低适配到1360x768
            width: '100%',
            // minHeight: 'calc(100vh - 68px - 84px - 60px - 40px - 24px - 13px)',
            aspectRatio: '16 / 9',
            borderRadius: '4px',
            overflow: 'hidden'
          }}>
            <NepPlayer title={video.title} src={video.dashMpdUrl} adaptions={videoAdaptions} danmakus={danmakus} />
          </Box>
          {/* 弹幕控制面板 */}
          <Paper sx={{ display: "flex", padding: "8px 8px", borderRadius: "0", height: "40px"  }} elevation={2}>
            <Typography sx={{ margin: 'auto 0' }} variant="body2">1人正在看,已装填500条弹幕</Typography>
            <FormControlLabel control={<Switch />} label="弹幕" sx={{ marginLeft: 10, fontSize: "2px" }} />
            <Paper sx={{ flexGrow: 1, display: "flex", margin: "5px", bgcolor: "#eeeeee" }} elevation={0}>
              <IconButton><FormatColorTextRoundedIcon /></IconButton>
              <InputBase id='danmaku-input' sx={{ flexGrow: 1, fontSize: '12px' }} placeholder="装填弹幕~"   onKeyUp={handleDanmakuInputKeyUp} ></InputBase>
              <Button variant="contained" startIcon={<SendRoundedIcon />} onClick={handleSendDanmaku} disableElevation>发送</Button>
            </Paper>
          </Paper>
          {/* video info, like, coin, collections... */}
          <Box sx={{ width: '100%', marginTop: '10px', marginBottom: "10px" }}>
            <Stack direction="row"  >
              <IconButton sx={{ borderRadius: 7 }} ><ThumbUpRoundedIcon /><Typography variant="body2" sx={{ marginLeft: '5px' }}>1</Typography> </IconButton>
              <IconButton sx={{ borderRadius: 7 }} ><CoinIconFilled color="video_rating_control" /><Typography variant="body2" sx={{ marginLeft: '5px' }}>2</Typography> </IconButton>
              <IconButton sx={{ borderRadius: 7 }} ><StarRoundedIcon /><Typography variant="body2" sx={{ marginLeft: '5px' }}>0</Typography> </IconButton>
              <IconButton sx={{ borderRadius: 7 }} ><ReplyRoundedIcon /><Typography variant="body2" sx={{ marginLeft: '5px' }}>0</Typography> </IconButton>
            </Stack>
          </Box>
          <Divider sx={{ marginBottom: "10px" }} />
          {/* description and tags */}
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography variant='body2' sx={{ marginBottom: "10px", marginLeft: 1, whiteSpace: "pre-line" }}>{post.description}</Typography>
            <Stack direction="row" spacing={1}>
              <Chip label={partition} size="small" onClick={() => { }} />
              {
                post.tags.map((tag, index) => {
                  return <Chip label={tag} key={index} size="small" onClick={() => { }} />
                })
              }
            </Stack>
          </Box>
          {/* comment area */}
          <Box sx={{ display: 'flex' }}>
            <SocialSection>
              <CommentPanel face_url={memberInfo.face_url} nick={memberInfo.nick} vid={video.videoId} nkid={post.nkid} />
            </SocialSection>
            {/* <RecommentPannel/> */}
          </Box>
        </Box>

        {/* 右侧 */}
        <Box sx={{ display: "flex", flexDirection: "column", marginLeft: 2, minWidth: '420px', width: '25%' }}>
          {/* up主信息 */}
          <Box sx={{ margin: "16px 0px", display: "flex", flexDirection: "row", height: "64px" }}>
            <Link href={`/space/${uploader.userId}`} passHref target='_blank'>
              <Avatar src={uploader.avatarUrl} />
            </Link>
            <Box sx={{ marginLeft: "8px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
              <Link href={`/space/${uploader.userId}`} passHref target='_blank'>
                <Typography sx={{ fontSize: "0.9em" }} variant="h6" component="div" style={{ color: '#ef5350' }}>
                  {uploader.username}
                </Typography>
              </Link>
              <Typography sx={{ fontSize: "0.5em", color: "gray" }} variant="body2" component="div">
                {uploader.sign}
              </Typography>
            </Box>
            <Button variant='contained' sx={{ height: "28px", width: "90px", }}>关注</Button>
          </Box>
          {/* 视频选集 */}
          <Accordion sx={{ marginBottom: 1, marginTop: "0 !important", width: '100%', display: 'none' }}>
            <AccordionSummary sx={{ bgcolor: "#eeeeee" }}>
              <Typography>视频选集</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: 0, background: "#eeeeee" }}>
              <List sx={{ width: "100%" }}>
                <ListItemButton sx={{ margin: "2px 8px", background: "white", color: "#21b3ef" }}>
                  <Typography variant='body2' noWrap>01 综述</Typography>
                  <Box sx={{ flexGrow: 1, minWidth: "8px" }} />
                  <Typography variant='caption' sx={{ color: "gray" }}>15:21</Typography>
                </ListItemButton>
                <ListItemButton sx={{ margin: "2px 8px" }}>
                  <Typography variant='body2' noWrap>02 函数极限性质</Typography>
                  <Box sx={{ flexGrow: 1, minWidth: "8px" }} />
                  <Typography variant='caption' sx={{ color: "gray" }}>15:21</Typography>
                </ListItemButton>
                <ListItemButton sx={{ margin: "2px 8px" }}>
                  <Typography variant='body2' noWrap>03 数列极限</Typography>
                  <Box sx={{ flexGrow: 1, minWidth: "8px" }} />
                  <Typography variant='caption' sx={{ color: "gray" }}>15:21</Typography>
                </ListItemButton>
              </List>
            </AccordionDetails>
          </Accordion>
          {/* 弹幕面板/聊天面板 */}
          <DanmakuPanel danmakus={danmakus} />
          {/* 推荐 */}
          <RecommendPanel sx={{ marginTop: 3 }} />
        </Box>
      </Container >
    </Box >
  )
}


