"use client"
import React from 'react'
import Box from '@mui/material/Box';
import NekoWindowAppBar from '@components/AppBar/NekoWindowAppBar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import theme from '@theme/theme';
import { Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs } from '@mui/material';
import { UploadDialog } from './UploadDialog';

import { Configuration, PartitionInfo, UserUploadedVideoStatisticsVO, VideoControllerApi, VideoManagementControllerApi, VideoPostBriefVO } from '@api/codegen/video';

var videoAPI = new VideoControllerApi(new Configuration({ credentials: "include" }))

var videoManagementAPI = new VideoManagementControllerApi(new Configuration({ credentials: "include" }))

const UploadHome: React.FC = () => {
  const [uploadDialogOpen, setUploadDialogOpen] = React.useState(true)
  const [tabIndex, setTabIndex] = React.useState(0)
  const [uploadedVideos, setUploadedVideos] = React.useState<UserUploadedVideoStatisticsVO[]>([]);

  React.useEffect(() => {
    videoManagementAPI.getUploadedVideos().then(res => {
      setUploadedVideos(res.data as UserUploadedVideoStatisticsVO[])
    })
  }, [])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <UploadDialog open={uploadDialogOpen} onClose={() => setUploadDialogOpen(false)} />
      <Box sx={{ display: 'flex', margin: '32px 32px 8px 32px' }}>
        <Typography sx={{ marginRight: '16px' }} variant='h5' >内容管理</Typography>
        <Button startIcon={<DriveFolderUploadOutlinedIcon />} onClick={() => setUploadDialogOpen(true)}>新建投稿</Button>
      </Box>
      <Tabs sx={{ borderBottom: '1px #e3e3e3 solid' }} value={tabIndex} onChange={(e, n) => setTabIndex(n)}>
        <Tab label='视频' />
        <Tab label='直播' />
        <Tab label='播放列表' />
        <Tab label='课程' />
      </Tabs>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ paddingLeft: '32px' }} width='35%'>视频</TableCell>
              <TableCell >公开范围</TableCell>
              <TableCell>日期</TableCell>
              <TableCell >观看次数</TableCell>
              <TableCell >评论数</TableCell>
              <TableCell >弹幕数</TableCell>
              <TableCell >硬币数</TableCell>
              <TableCell >收藏量</TableCell>
              <TableCell >赞与不喜欢的比例</TableCell>
            </TableRow>

          </TableHead>
          <TableBody>
            {
              uploadedVideos.map(val => {
                return (
                  <TableRow >
                    <TableCell sx={{ paddingLeft: '32px', display: 'flex' }}>
                      {/* 视频封面 */}
                      <Box component='a' href={`/video/${val.nkid}`} target='_blank' sx={{ position: 'relative', width: '127px', height: '72px', borderRadius: '8%', overflow: 'hidden', border: '1px #e3e3e3 solid' }}>
                        <Box component='img' sx={{ width: '100%', height: '100%', positoin: 'absolute' }} src={val.coverUrl} />
                        <Box sx={{ borderRadius: '16%', position: 'absolute', bottom: 0, right: '4px', overflow: 'hidden' }}>
                          <Typography sx={{ backgroundColor: 'rgba(0,0,0,0.6)', color: 'white', padding: '2px 4px' }} variant='caption'>12:34:56</Typography>
                        </Box>
                      </Box>
                      {/* 视频标题与说明 */}
                      <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: '16px', justifyContent: 'space-evenly' }}>
                        <Typography variant='body2'>{val.title}</Typography>
                        <Typography variant='body2' color='#a0a0a0'>{val.description}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell >公开范围</TableCell>
                    <TableCell>{new Date(val.createdAt as Date).toLocaleDateString()}</TableCell>
                    <TableCell >观看次数</TableCell>
                    <TableCell >评论数</TableCell>
                    <TableCell >弹幕数</TableCell>
                    <TableCell >硬币数</TableCell>
                    <TableCell >收藏量</TableCell>
                    <TableCell >赞与不喜欢的比例</TableCell>
                  </TableRow>
                )
              })
            }

          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default UploadHome;