import React from 'react';
import SlideshowOutlinedIcon from '@mui/icons-material/SlideshowOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import { Box, styled, Typography } from '@mui/material';

interface VideoCardProps {
  video: {
    //封面图片链接
    cover_img: string,
    //标题
    title: string,
    //观看数
    watched: number,
    //时长
    duration: number,
    //上传时间
    date: number,
    //弹幕数
    danmaku_nums: number,
    //上传者昵称
    uploader: string,
    //上传者用户ID
    uid: number,
  },
  //宽度
  width?: number,
  //高度
  height?: number,
}

const VideoCard: React.FC<VideoCardProps> = ({ video, width, height }) => {
  const { cover_img, title, watched, duration, danmaku_nums, uploader } = video;

  // 格式化时长函数
  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        width: width || 'auto',
        height: height || 'auto'
      }}>
      <Box sx={{ position: 'relative', borderRadius: 1, overflow: 'hidden', width: '100%' }}>
        <img src={cover_img} alt={title} style={{ display: 'block', width: '100%', height: 'auto' }} />
        <Box
          sx={{
            display: 'flex',
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
            padding: 1,
            boxSizing: 'border-box',
          }}
        >
          <SlideshowOutlinedIcon sx={{ fontSize: 16 }} />
          <Typography sx={{ margin: '0 6px 0 2px' }} variant='caption'>{watched}</Typography>
          <ArticleOutlinedIcon sx={{ fontSize: 16 }} />
          <Typography sx={{ margin: '0 6px 0 2px' }} variant='caption'>{danmaku_nums}</Typography>
          <Typography sx={{ marginLeft: 'auto', marginRight: 0 }} variant='caption'>{formatDuration(duration)}</Typography>
        </Box>
      </Box>
      <Typography
        sx={{
          padding: '2px 0px', 
          marginTop: '6px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          '-webkit-box-orient': 'vertical',
          '-webkit-line-clamp': '2',
          fontSize: '0.95em',
          lineHeight: '1.5em',
          height: '3em',
        }}
      >
        {title}
      </Typography>
      <Box sx={{ color: 'rgb(129, 129, 129)', display: 'flex' }}>
        <Typography variant='subtitle2'>{`${uploader} · 6-30`}</Typography>
      </Box>
    </Box>
  );
};

export default VideoCard;