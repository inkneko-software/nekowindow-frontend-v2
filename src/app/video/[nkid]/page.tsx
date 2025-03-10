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
import RecommendPannel from '@components/Recommend/RecommendPanel';
import CoinIcon from '@components/Icons/CoinIcon';
import CoinIconFilled from '@components/Icons/CoinIconFilled';
import FormatColorTextRoundedIcon from '@mui/icons-material/FormatColorTextRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';

import Head from 'next/head';
import DefaultErrorPage from 'next/error'
import { useRouter } from 'next/navigation';
import NepPlayer, { CustomDanmakuEvent } from '@components/NepPlayer/NepPlayer';
import { Configuration, UploadUserVO, VideoControllerApi } from '@api/codegen/video';


const SocialSection = styled('div')(({ theme }) => ({
  marginTop: "5px",
  height: '500px',
  width: '100%',
  // backgroundColor: "purple"
}));

export default function VideoPage({ params }: { params: { nkid: number } }) {
  const videoapi = new VideoControllerApi(new Configuration({ credentials: 'include', basePath: process.env.NEXT_PUBLIC_API_SERVER }));

  const theme = useTheme();
  const router = useRouter();

  const [post, setPost] = React.useState({
    nkid: 1,
    title: "标题加载中",
    description: "",
    uid: 0,
    vid: 0,
    cid: 0,
    visit: 0,
    danmaku: 0,
    coin: 0,
    collection: 0,
    comment: 0,
    created_at: new Date(0),
    tags: ['123'],
    partition: "",
    dash_mpd_path: ''
  })

  const [uploader, setUploader] = React.useState<UploadUserVO>({
    userId: 0,
    username: "用户加载中",
    sign: "",
    avatarUrl: "",
    fans: 0
  })

  const [danmaku, setDanmaku] = React.useState("");

  React.useEffect(() => {
    videoapi.getVideoPostDetail({ nkid: params.nkid }).then(res => {
      if (res.data) {
        var shit = res.data.videos[0].dashMpdUrl as string;
        console.log(shit)
        setUploader(res.data.uploader)
        setPost({ ...post, title: res.data.title as string, tags: res.data.tags as string[], dash_mpd_path: shit, description: res.data.description as string, created_at: res.data.createdAt });
      }
    })
  }, [])

  const handleSendDanmaku = () => {
    var danmakuInput = document.getElementById("danmaku-input") as HTMLInputElement;
    var danmaku = danmakuInput.value
    if (danmaku.trim() === '') {
      return;
    }

    var event = new CustomEvent<CustomDanmakuEvent>("danmaku::insert", {
      detail: {
        content: danmaku
      }
    })
    document.dispatchEvent(event);
    danmakuInput.value = "";
  }

  const handleDanmakuInputKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendDanmaku();
    }
  }





  // nkid = "m5y7OJLqxN4lrogz"
  //BkRaVzLXArZOgKDp/source.mpd
  //D2nx6dWlP5WJyK0Q/source.mpd
  //m5y7OJLqxN4lrogz/source.mpd
  const [memberInfo, setMemberInfo] = React.useState({
    face_url: "",
    nick: "",
  })

  let uploadColor = "black";
  if (true) {
    uploadColor = "#ef5350"
  }

  // if (post.nkid === 0) {
  //   return (
  //     <Box sx={{ width: "100vw", height: "100vh", display: "flex" }}>
  //       <Typography sx={{ margin: "auto" }}>您所查询的稿件不存在，或已删除</Typography>
  //     </Box>
  //   )
  // }

  // const onMemberInfoUpdate = (member) => {
  //     setMemberInfo(member)
  // }

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
        <Box sx={{ display: "flex", flexDirection: "column", flex: '1 ' }}>
          {/* 视频标题 与 视频详细信息 */}
          <Box sx={{ height: '64px', display: "flex", flexDirection: "column", margin: '16px 0px', marginRight: "auto" }}>
            {/* 视频标题 */}
            <Typography sx={{ marginLeft: post.title.charAt(0) === '【' ? '-0.5em' : '0px' }} variant="h5" noWrap component="div">
              {post.title}
            </Typography>
            {/* 视频详细信息 */}
            <Typography sx={{ color: "gray", margin: '8px 0px' }} variant='body2' component="div">
              {`${post.visit}播放 · 总弹幕数${post.danmaku}`} &nbsp; &nbsp;{`${post.created_at.toLocaleString()}`}
            </Typography>
          </Box>
          {/* 播放器 */}
          <Box sx={{
            minWidth: '706px', //最低适配到1360x768
            width: '100%',
            minHeight: 'calc(100vh - 68px - 84px - 60px - 40px - 24px - 13px)',
            aspectRatio: '16 / 9',
            borderRadius: '4px',
            overflow: 'hidden'
          }}>
            <NepPlayer title={'测试标题'} src={post.dash_mpd_path} />
          </Box>
          {/* 弹幕控制面板 */}
          <Paper sx={{ display: "flex", padding: "0px 10px", borderRadius: "0", height: "40px" }} elevation={1}>
            <Typography sx={{ margin: 'auto 0' }} variant="body2">1人正在看,已装填500条弹幕</Typography>
            <FormControlLabel control={<Switch />} label="弹幕" sx={{ marginLeft: 10, fontSize: "2px" }} />
            <Paper sx={{ flexGrow: 1, display: "flex", margin: "5px", bgcolor: "#eeeeee" }}>
              <IconButton><FormatColorTextRoundedIcon /></IconButton>
              <InputBase id='danmaku-input' sx={{ flexGrow: 1, fontSize: '12px' }} placeholder="装填弹幕~" onKeyUp={handleDanmakuInputKeyUp} ></InputBase>
              <Button variant="contained" startIcon={<SendRoundedIcon />} onClick={handleSendDanmaku}>发送</Button>
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
              <Chip label={post.partition} size="small" onClick={() => { }} />
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
              <CommentPanel face_url={memberInfo.face_url} nick={memberInfo.nick} vid={post.vid} nkid={post.nkid} />
            </SocialSection>
            {/* <RecommentPannel/> */}
          </Box>
        </Box>

        {/* 右侧 */}
        <Box sx={{ display: "flex", flexDirection: "column", marginLeft: 2, width: '420px' }}>
          {/* up主信息 */}
          <Box sx={{ margin: "16px 0px", display: "flex", flexDirection: "row", height: "64px" }}>
            <Avatar src={uploader.avatarUrl} />
            <Box sx={{ marginLeft: "8px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
              <Typography sx={{ fontSize: "0.9em" }} variant="h6" component="div" style={{ color: uploadColor }}>
                {uploader.username}
              </Typography>
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
          <DanmakuPanel />
          {/* 推荐 */}
          <RecommendPannel sx={{ marginTop: 3 }} />
        </Box>
      </Container >
    </Box >
  )
}


