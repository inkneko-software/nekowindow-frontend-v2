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
import { useSearchParams } from 'next/navigation';
import PostEditDialog from './PostEditDialog';
import DeleteConfirmDialog from './DeleteConfirmDialog';



const UploadHome: React.FC = () => {
  const videoAPI = new VideoControllerApi(new Configuration({ credentials: "include", basePath: process.env.NEXT_PUBLIC_API_SERVER }))
  const videoManagementAPI = new VideoManagementControllerApi(new Configuration({ credentials: "include", basePath: process.env.NEXT_PUBLIC_API_SERVER }))

  const [uploadDialogOpen, setUploadDialogOpen] = React.useState(false)
  const [tabIndex, setTabIndex] = React.useState(0)
  const [uploadedVideos, setUploadedVideos] = React.useState<UserUploadedVideoStatisticsVO[]>([]);

  const [selectedEditingPost, setSelectedEditingPost] = React.useState<null | UserUploadedVideoStatisticsVO>(null);
  const [selectedDeletingPost, setSelectedDeletingPost] = React.useState<null | UserUploadedVideoStatisticsVO>(null);
  const searchParams = useSearchParams();
  const requestUpload = searchParams.get("requestUpload");
  React.useEffect(() => {
    videoManagementAPI.getUploadedVideos().then(res => {
      setUploadedVideos(res.data as UserUploadedVideoStatisticsVO[])
    })

    //通过该参数控制是否默认打开上传框
    if (requestUpload == "1") {
      setUploadDialogOpen(true);
    }
  }, [])

  const calculateTranscodeProgress = (vo: UserUploadedVideoStatisticsVO) => {
    let count = 0;
    for (let videoResource of vo.uploadedVideoPostResourceVOS) {
      if (videoResource.conversionState === 3) {
        count++;
      }
    }
    console.log(count, vo)
    return `${count}/${vo.uploadedVideoPostResourceVOS.length} 视频转码完成`
  }

  const calculateDuration = (vo: UserUploadedVideoStatisticsVO) => {
    let duration = 0;
    for (let videoResource of vo.uploadedVideoPostResourceVOS) {
      if (videoResource.duration) {
        duration += videoResource.duration;
      }
    }
    return `${Math.floor(duration / 60).toString().padStart(2, '0')}:${Math.floor(duration % 60).toString().padStart(2, '0')}`;
  }

  const handleDeleteVideoPost = () => {
    if (selectedDeletingPost === null) return;

    videoManagementAPI.deleteVideoPost({ nkid: selectedDeletingPost.nkid }).then(res => {
      setSelectedDeletingPost(null);
      videoManagementAPI.getUploadedVideos().then(res => {
        setUploadedVideos(res.data as UserUploadedVideoStatisticsVO[])
      })
    })
  }
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <UploadDialog open={uploadDialogOpen} onClose={() => setUploadDialogOpen(false)} />
      {selectedEditingPost !== null && <PostEditDialog open={true} onClose={() => setSelectedEditingPost(null)} post={selectedEditingPost} />}
      {selectedDeletingPost !== null && <DeleteConfirmDialog open={true} onClose={() => setSelectedDeletingPost(null)} post={selectedDeletingPost} onConfirm={handleDeleteVideoPost} />}
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
              <TableCell sx={{ paddingLeft: '32px' }} width='35%'>稿件</TableCell>
              <TableCell>状态</TableCell>
              <TableCell>公开范围</TableCell>
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
                      <Box component='a' href={`/video/${val.nkid}`} target='_blank' sx={{ position: 'relative', minWidth: '127px', minHeight: '72px', width: '127px', height: '72px', borderRadius: '8%', overflow: 'hidden', border: '1px #e3e3e3 solid' }}>
                        <Box component='img' sx={{ width: '100%', height: '100%', positoin: 'absolute' }} src={val.coverUrl} />
                        <Box sx={{ borderRadius: '16%', position: 'absolute', bottom: 0, right: '4px', overflow: 'hidden' }}>
                          <Typography sx={{ backgroundColor: 'rgba(0,0,0,0.6)', color: 'white', padding: '2px 4px' }} variant='caption'>{calculateDuration(val)}</Typography>
                        </Box>
                      </Box>
                      {/* 视频标题与说明 */}
                      <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: '16px', justifyContent: 'space-evenly' }}>
                        <Typography variant='body2'>{val.title}</Typography>
                        <Typography variant='body2' color='#a0a0a0'>{val.description.length === 0 ? "暂无简介" : val.description}</Typography>
                        <Box sx={{ display: 'flex', flex: '0 0 auto' }}>
                          <Button variant='outlined' size='small' sx={{ boxShadow: 'unset' }} onClick={() => setSelectedEditingPost(val)} >编辑</Button>
                          <Button variant='outlined' size='small' sx={{ marginLeft: "8px", boxShadow: 'unset' }} onClick={() => setSelectedDeletingPost(val)}>删除</Button>


                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell >
                      <Box sx={{ marginLeft: "8px", display: 'flex', flexDirection: 'column' }}>
                        <Typography variant='caption' >{`共${val.uploadedVideoPostResourceVOS.length}个视频`}</Typography>
                        <Typography variant='caption' >{calculateTranscodeProgress(val)}</Typography>
                        <Typography variant='caption' >审核中</Typography>
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