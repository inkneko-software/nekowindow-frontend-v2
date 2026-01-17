"use client"
import * as React from 'react';
import Box from '@mui/material/Box';
import NekoWindowAppBar from '@components/AppBar/NekoWindowAppBar';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import VideoCard from '@components/VideoCard/VideoCard';
import { Configuration, HomeRecommendVO, PartitionInfo, VideoControllerApi, VideoPostBriefVO } from '@api/codegen/video';




export default function HomePage() {
  var videoAPI = new VideoControllerApi(new Configuration({ credentials: "include", basePath: process.env.NEXT_PUBLIC_API_SERVER }))

  const video = {
    nkid: 1,
    cover_img: '/home_banner03.jpg',
    title: '一个测试标题，竟然支持两行，还带文本过长省略！',
    watched: 12345,
    duration: 300,
    date: 1720957061236,
    danmaku_nums: 678,
    uploader: '示例上传者',
    uid: 1,
  };

  const [partitions, setPartitions] = React.useState<PartitionInfo[]>([]);
  const [partitionVideos, setPartitionVideos] = React.useState<VideoPostBriefVO[][]>([]);

  React.useEffect(() => {
    (async () => {
      var homeRecommendRes = await videoAPI.getHomeRecommend();
      var homeRecommend = homeRecommendRes.data as HomeRecommendVO;
      for (var i = 0; i < homeRecommend.partitionVideos.length; ++i) {
        for (var j = 0; homeRecommend.partitionVideos[i].length < 10; ++j) {
          homeRecommend.partitionVideos[i].push({
            nkid: 1,
            coverUrl: '/home_banner01.jpg',
            title: '一个测试标题，竟然支持两行，还带文本过长省略！',
            createdAt: new Date(1720957061236),
            duration: 300,
            visit: 0,
            partitionId: 0,
            partitionName: '测试分区',
            uploader: {
              userId: 1,
              username: '测试上传者',
              sign: '',
              avatarUrl: '',
              fans: 0
            },
            description: '',
            tags: []
          });
        }
      }
      setPartitions(homeRecommend.partitions);
      setPartitionVideos(homeRecommend.partitionVideos);

      console.log(homeRecommend?.partitionVideos)
    })()
  }, [])

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
        {
          partitions.map((partition, index) => {
            return (
              <Box key={`partition-${index}`}>
                <Typography variant='h5' sx={{ margin: "24px 0px" }}>{partition.partitionName}</Typography>
                <Grid spacing={3} container columns={{ xs: 12, sm: 12, lg: 15, xl: 15 }} >
                  {
                    partitionVideos[index].map((val, i) => {
                      return (
                        <Grid item xs={3} key={`${index}-${i}`}>
                          <VideoCard video={{
                            nkid: val.nkid as number,
                            cover_img: val.coverUrl as string,
                            title: val.title as string,
                            watched: val.visit,
                            duration: val.duration,
                            date: (new Date(val.createdAt as Date)).getTime(),
                            danmaku_nums: 678,
                            uploader: val.uploader.username,
                            uid: 1,
                          }} />
                        </Grid>
                      )
                    })
                  }
                </Grid>
              </Box>
            )
          })
        }

      </Box>

    </Box>
  );
}
