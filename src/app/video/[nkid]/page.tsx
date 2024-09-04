'use client'
import * as React from 'react';
import { Avatar, Box, Chip, Container, Divider, IconButton, Paper, Stack, styled, Toolbar, Typography, useTheme, Slider, Popper, Fade, SvgIcon, Button, Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemText, ListItemButton, RadioGroup, Radio, FormControlLabel, InputBase, Switch } from "@mui/material";
import NekoWindowAppBar from "@components/AppBar/NekoWindowAppBar";
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import ReplyRoundedIcon from '@mui/icons-material/ReplyRounded';
import CommentPanel from '@components/Comment/CommentPanel';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import NekoPlayer from '@components/Media/NekoPlayer';
import DanmakuPanel from '@components/Danmaku/DanmakuPanel';
import RecommendPannel from '@components/Recommend/RecommendPanel';
import CoinIcon from '@components/Icons/CoinIcon';
import CoinIconFilled from '@components/Icons/CoinIconFilled';
import FormatColorTextRoundedIcon from '@mui/icons-material/FormatColorTextRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';

import Head from 'next/head';
import DefaultErrorPage from 'next/error'
import { useRouter } from 'next/navigation';
import NepPlayer from '@components/NepPlayer/NepPlayer';

const SocialSection = styled('div')(({ theme }) => ({
  marginTop: "5px",
  height: '500px',
  width: '100%',
  // backgroundColor: "purple"
}));

export default function VideoPage() {
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
    created_at: 0,
    tags: [],
    partition: "",
    dash_mpd_path: ''
  })

  const [uploader, setUploader] = React.useState({
    uid: 0,
    nick: "用户加载中",
    sign: "",
    face_url: "",
  })



  // React.useEffect(() => {
  //     var nkid = router.query["nkid"] as string;
  //     if (nkid === undefined){
  //         return ()=>{}
  //     }

  //     nkid = nkid.substring(2);

  //     video.getVideoPost(nkid)
  //         .then(res => res.data)
  //         .then(res => {
  //             if (res.code !== 0) {
  //                 setPost({...post, nkid: 0})
  //                 return;
  //             }
  //             setPost({
  //                 nkid: nkid,
  //                 title: res.data.title,
  //                 description: res.data.description,
  //                 uid: res.data.uid,
  //                 vid: res.data.videos[0].vid,
  //                 cid: 0,
  //                 visit: res.data.videos[0].visit,
  //                 danmaku: res.data.videos[0].danmakus,
  //                 coin: 0,
  //                 collection: 0,
  //                 comment: 0,
  //                 created_at: parseInt(res.data.created_at),
  //                 tags: res.data.tags,
  //                 partition: res.data.partition,
  //                 dash_mpd_path: res.data.videos[0].dash_mpd_path
  //             })
  //         })
  //         .catch(err => {
  //             console.log("err", err)
  //         });

  //     if (post.nkid !== 0) {
  //         member.GetUser(post.uid)
  //             .then(res => res.data)
  //             .then(res => {
  //                 setUploader({
  //                     uid: res.data.uid,
  //                     nick: res.data.nick,
  //                     sign: res.data.sign,
  //                     face_url: res.data.face_url,
  //                 })
  //             })
  //     }
  // }, [router.query])




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

  if (post.nkid === 0) {
    return (
      <Box sx={{ width: "100vw", height: "100vh", display: "flex" }}>
        <Typography sx={{ margin: "auto" }}>您所查询的稿件不存在，或已删除</Typography>
      </Box>
    )
  }

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
              {`${post.visit}播放 · 总弹幕数${post.danmaku}`} &nbsp; &nbsp;{`${new Date(post.created_at * 1000).toLocaleString()}`}
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
            <NepPlayer title={'测试标题'} src="http://localhost:9000/nekowindow/upload/video/test.mp4" />
          </Box>
          <Paper sx={{ display: "flex", padding: "0px 10px", borderRadius: "0", height: "40px" }} elevation={1}>
            <Typography sx={{ margin: 'auto 0' }} variant="body2">1人正在看,已装填500条弹幕</Typography>
            <FormControlLabel control={<Switch />} label="弹幕" sx={{ marginLeft: 10, fontSize: "2px" }} />
            <Paper sx={{ flexGrow: 1, display: "flex", margin: "5px", bgcolor: "#eeeeee" }}>
              <IconButton><FormatColorTextRoundedIcon /></IconButton>
              <InputBase sx={{ flexGrow: 1, fontSize: '12px' }} placeholder="装填弹幕~" ></InputBase>
              <Button variant="contained" startIcon={<SendRoundedIcon />}>发送</Button>
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
            <Avatar src={uploader.face_url} />
            <Box sx={{ marginLeft: "8px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
              <Typography sx={{ fontSize: "0.9rem" }} variant="h6" component="div" style={{ color: uploadColor }}>
                {uploader.nick}
              </Typography>
              <Typography sx={{ fontSize: "0.5rem", color: "gray" }} variant="body2" component="div">
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


