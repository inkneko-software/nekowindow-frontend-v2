import { Box, Divider, Paper, Typography } from '@mui/material';
import React from 'react';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import Link from 'next/link';

export default function Home() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', margin: '16px 16px' }}>
      <Box sx={{ display: 'flex' }}>
        <Paper sx={{ width: '368px', padding: '32px 32px' }}>
          <Typography variant='h6'>频道分析</Typography>
          <Typography>当前订阅人数</Typography>
          <Typography variant='h5' fontWeight='large'>0</Typography>
          <Divider sx={{ margin: '16px 8px' }} />
          <Typography>摘要</Typography>
          <Typography variant='subtitle2'>过去一个月</Typography>
          <Typography>观看次数</Typography>
          <Typography>观看时长（小时）</Typography>
          <Divider sx={{ margin: '16px 8px' }} />

          <Typography>热门视频</Typography>
          <Typography>过去48小时·观看次数</Typography>
        </Paper>
        <Paper sx={{ width: '368px', padding: '16px 16px', display: 'flex', flexDirection: 'column', flex: '1 0 auto', marginLeft: '16px' }}>
          <Typography variant='h6' sx={{ padding: '16px 16px' }}>视频数据</Typography>
          <Box sx={{ display: 'flex' }}>
            <Paper sx={{ display: 'flex', flexDirection: 'column', padding: '16px 16px', backgroundColor: '#e1f6ff', margin: '16px 16px', flex: '1 1 auto' }}>
              <Typography>项目标签</Typography>
              <Typography variant='h6'>0</Typography>
            </Paper>
            <Paper sx={{ display: 'flex', flexDirection: 'column', padding: '16px 16px', backgroundColor: '#e1f6ff', margin: '16px 16px', flex: '1 1 auto' }}>
              <Typography>项目标签</Typography>
              <Typography>0</Typography>
            </Paper>
            <Paper sx={{ display: 'flex', flexDirection: 'column', padding: '16px 16px', backgroundColor: '#e1f6ff', margin: '16px 16px', flex: '1 1 auto' }}>
              <Typography>项目标签</Typography>
              <Typography>0</Typography>
            </Paper>
            <Paper sx={{ display: 'flex', flexDirection: 'column', padding: '16px 16px', backgroundColor: '#e1f6ff', margin: '16px 16px', flex: '1 1 auto' }}>
              <Typography>项目标签</Typography>
              <Typography>0</Typography>
            </Paper>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <Paper sx={{ display: 'flex', flexDirection: 'column', padding: '16px 16px', backgroundColor: '#e1f6ff', margin: '16px 16px', flex: '1 1 auto' }}>
              <Typography>项目标签</Typography>
              <Typography>0</Typography>
            </Paper>
            <Paper sx={{ display: 'flex', flexDirection: 'column', padding: '16px 16px', backgroundColor: '#e1f6ff', margin: '16px 16px', flex: '1 1 auto' }}>
              <Typography>项目标签</Typography>
              <Typography>0</Typography>
            </Paper>
            <Paper sx={{ display: 'flex', flexDirection: 'column', padding: '16px 16px', backgroundColor: '#e1f6ff', margin: '16px 16px', flex: '1 1 auto' }}>
              <Typography>项目标签</Typography>
              <Typography>0</Typography>
            </Paper>
            <Paper sx={{ display: 'flex', flexDirection: 'column', padding: '16px 16px', backgroundColor: '#e1f6ff', margin: '16px 16px', flex: '1 1 auto' }}>
              <Typography>项目标签</Typography>
              <Typography>0</Typography>
            </Paper>
          </Box>
        </Paper>
      </Box >

      <Box sx={{ display: 'flex', marginTop: '16px' }}>
        <Paper sx={{ flex: '2 0 auto', padding: '32px 32px', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex' }} >
            <Typography variant='h6'>评论</Typography>
            <Box sx={{ display: 'flex', marginLeft: 'auto' }} component={Link} href='/posts/chats' passHref>
              <Typography variant='subtitle2'>更多</Typography>
              <ChevronRightOutlinedIcon />
            </Box>

          </Box>
        </Paper>
        <Paper sx={{ flex: '1 0 auto', padding: '32px 32px', marginLeft: '16px' }}>
          <Typography variant='h6'>收益预览</Typography>
        </Paper>
      </Box >


    </Box >
  )
}