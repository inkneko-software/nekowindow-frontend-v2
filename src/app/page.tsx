"use client"
import * as React from 'react';
import Box from '@mui/material/Box';
import NekoWindowAppBar from '@components/AppBar/NekoWindowAppBar';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import VideoCard from '@components/VideoCard/VideoCard';
// import { Configuration, VideoControllerApi } from '@components/api/codegen/video';
// var videoAPI = new VideoControllerApi(new Configuration({ credentials: "include" }))

export default function HomePage() {
  const video = {
    cover_img: '/home_banner03.jpg',
    title: '一个测试标题，竟然支持两行，还带文本过长省略！',
    watched: 12345,
    duration: 300,
    date: 1720957061236,
    danmaku_nums: 678,
    uploader: '示例上传者',
    uid: 1,
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: "column" }}>
      <NekoWindowAppBar transparent={true} />
      <Box sx={{ background: "url('/images/home_banner/01_1920x192.png')", height: "192px", backgroundPosition: "bottom" }} />
      <Box sx={{
        margin: "24px 10%"
      }}>
        <Grid spacing={3} container columns={{ xs: 12, sm: 12, lg: 15, xl: 15 }} >
          {
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(val => {
              return (
                <Grid item xs={3} key={val}>
                  <VideoCard video={video} />
                </Grid>
              )
            })
          }
        </Grid>
        <Typography variant='h5' sx={{ margin: "24px 0px" }}>测试分区</Typography>
        <Grid spacing={3} container columns={{ xs: 12, sm: 12, lg: 15, xl: 15 }} >
          {
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(val => {
              return (
                <Grid item xs={3} key={val}>
                  <VideoCard video={video} />
                </Grid>
              )
            })
          }
        </Grid>
        <Typography variant='h5' sx={{ margin: "24px 0px" }}>测试分区</Typography>
        <Grid spacing={3} container columns={{ xs: 12, sm: 12, lg: 15, xl: 15 }} >
          {
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(val => {
              return (
                <Grid item xs={3} key={val}>
                  <VideoCard video={video} />
                </Grid>
              )
            })
          }
        </Grid>
      </Box>

    </Box>
  );
}
