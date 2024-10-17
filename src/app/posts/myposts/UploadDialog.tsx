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
import { Chip, FormHelperText, Stack, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs } from '@mui/material';
import { Configuration, PartitionInfo, VideoControllerApi } from '@api/codegen/video';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import { useRouter } from 'next/navigation'

const videoapi = new VideoControllerApi(new Configuration({ credentials: 'include', basePath: process.env.basePath  }));
interface UploadDialogProps {
  open: boolean,
  onClose: () => void
}

export const UploadDialog: React.FC<UploadDialogProps> = ({ open, onClose }) => {
  const steps = [
    '视频信息',
    '内容审核',
    '公开范围',
  ];
  const [currentStep, setCurrentStep] = React.useState<number>(0);
  //是否已选择视频文件
  const [isVideoSelected, setIsVideoSelected] = React.useState(false);
  //视频预览链接
  const [videoPreviewUrl, setVideoPreviewUrl] = React.useState('');
  //封面预览链接
  const [coverPreviewUrl, setCoverPreviewUrl] = React.useState('');
  //视频上传预签名链接
  const [videoUploadUrl, setVideoUploadUrl] = React.useState('');
  //视频标题
  const [videoTitle, setVideoTitle] = React.useState('');
  //视频描述
  const [videoDescription, setVideoDescription] = React.useState('');
  //分区
  const [partitions, setPartitions] = React.useState<PartitionInfo[]>([]);
  //已选择的分区
  const [selectedPartition, setSelectedPartition] = React.useState(0);
  //当前分区推荐的标签
  const [recommendTags, setRecommendTags] = React.useState<string[]>([]);
  //已选择的标签
  const [tags, setTags] = React.useState<string[]>([]);
  //用户输入的标签
  const [inputTag, setInputTag] = React.useState('')

  const [errorHints, setErrorHints] = React.useState({
    title: '',
    video: '',
    partition: '',
  })

  const router = useRouter();

  React.useEffect(() => {
    videoapi.getPartitionList().then(res => {
      if (res.data !== undefined) {
        setPartitions(res.data)
      }
    })
  }, [])

  const handleSelectVideoFile = async () => {
    //清除错误提示
    setErrorHints({ ...errorHints, video: '' });
    try {
      var res1 = await videoapi.generateUploadUrl();
      if (res1.code !== 0) {
        //error handling
        return;
      }
      var videoUploadUrl = res1.data as string;

      var fileInput = document.getElementById("video-upload-input") as HTMLInputElement;
      fileInput.onchange = () => {
        var req = new XMLHttpRequest();
        req.onload = () => {
          var u = videoUploadUrl.split('?')[0];
          setVideoPreviewUrl(u);
        }

        if (fileInput.files !== null && fileInput.files.length > 0) {
          setIsVideoSelected(true);
          var file = fileInput.files[0];
          if (file !== null) {
            req.open('PUT', videoUploadUrl);
            req.send(file)
          }
        }
      }
      fileInput.click();


    } catch (e) {

    }

    /**
     export async function addMusic(title: string, file: Blob, translateTitle?: string, artistList?: Array<string>, onprogress?: (loaded: number, total: number) => void): Promise<ResponseMusic> {
var host: string = "";
if (typeof (window) !== "undefined" && typeof (window.electronAPI) !== "undefined") {
    //客户端
    if (heiMusicConfig === null) {
        await window.electronAPI.config.get().then(res => {
            heiMusicConfig = res;
        })
    }
    host = heiMusicConfig.apiHost
}

var request = new XMLHttpRequest();

return new Promise<ResponseMusic>((resolve, reject) => {
    request.open("post", host + "/api/v1/music/add");

    request.onload = (e) => {
        resolve(JSON.parse(request.response));
    }

    request.onerror = e => {
        reject(e);
    }
    request.upload.onloadstart = e =>{
        if (onprogress !== undefined) {
            onprogress(e.loaded, e.total);
        }
    }

    request.upload.onprogress = e => {
        if (onprogress !== undefined) {
            onprogress(e.loaded, e.total);
        }
    }

    var form = new FormData();
    form.set("title", title);
    form.set("file", file);
    if (translateTitle !== undefined) {
        form.set("translateTitle", translateTitle);
    }

    if (artistList !== undefined) {
        artistList.forEach(v => form.append("artistList", v));
    }
    request.send(form);
});

}
     */

  }

  /**
   * 重新选择文件的处理逻辑
   */
  const handleReupload = () => {
    setIsVideoSelected(false);
    setVideoPreviewUrl('');
    setVideoUploadUrl('');
  }

  /**
   * 分区更换选择的处理逻辑
   */
  const handlePartitionChange = (partitionId: number) => {
    setSelectedPartition(partitionId);
    videoapi.getPartitionRecommendTagList({ partitionId: partitionId }).then(res => {
      if (res.data !== undefined) {
        setRecommendTags(res.data)
      }
    })
  }

  /**
   * 添加选择的标签
   * 
   */
  const handleAddTag = (tagName: string) => {
    if (tags.indexOf(tagName) === -1) {
      setTags(prev => [...prev, tagName])
    }
  }

  /**
   * 移除标签
   * @param tagName 标签名称
   */
  const handleDeleteTag = (tagName: string) => {
    setTags(tags.filter(val => tagName !== val))
  }

  /**
   * 上传封面
   */
  const handleUploadCover = () => {
    var coverInput = document.getElementById('cover-upload-input') as HTMLInputElement;
    videoapi.generateCoverUploadUrl().then(res => {
      if (res.data !== undefined) {
        coverInput.onchange = () => {
          if (coverInput.files && coverInput.files.length !== 0) {
            var coverUploadUrl = res.data as string;
            var coverFile = coverInput.files[0];
            var req = new XMLHttpRequest();
            req.onload = () => {
              var u = coverUploadUrl.split('?')[0];
              setCoverPreviewUrl(u);
            }
            req.open('PUT', coverUploadUrl);
            req.send(coverFile)

          }
        }
        coverInput.click();
      }
    })
  }

  /**
   * 提交稿件信息
   */
  const handleCreatePost = () => {
    videoapi.createVideoPost({
      createVideoPostDTO: {
        title: videoTitle,
        description: videoDescription,
        coverUrl: coverPreviewUrl,
        videoUrl: videoPreviewUrl,
        partitionId: selectedPartition,
        tags: tags
      }
    }).then(res => {
      if (res.code !== 0) {
        enqueueSnackbar(res.message, { variant: 'error' })
        return;
      }

      enqueueSnackbar(res.message);
      setTimeout(() => {
        router.replace(`/video/${res.data?.nkid}`)
      }, 1000)
    })
  }

  /**
   * 跳转至下一个步骤
   */
  const handleNextStep = (targetStep: number) => {
    if (targetStep === currentStep) {
      return;
    }

    //稿件信息检查
    if (currentStep === 0) {
      var passed = true;
      //检查视频标题是否为空
      if (videoTitle === '') {
        setErrorHints(prev => ({ ...prev, title: '请填写视频标题' }))
        passed = false;
      }

      if (selectedPartition === 0) {
        setErrorHints(prev => ({ ...prev, partition: '请选择分区' }))
        passed = false;
      }

      if (videoPreviewUrl === '') {
        setErrorHints(prev => ({ ...prev, video: '请在上传完成后进行提交' }))
        passed = false;
      }

      if (!passed) {
        return;
      }
    }

    setCurrentStep(currentStep + 1);

  }

  return (
    <Dialog open={open} sx={{ display: 'flex', flexDirection: 'column', ".MuiPaper-root": { width: '960px', borderRadius: '18px', height: 'calc(100vh - 128px)' } }} maxWidth={false}>
      {/* 视频文件上传控件 */}
      <input type='file' hidden id='video-upload-input' />
      {/* 封面文件的上传控件 */}
      <input type='file' hidden id='cover-upload-input' />
      {/* 标题显示与关闭按钮 */}
      <Box sx={{ display: 'flex', padding: 1 }}>
        <Typography variant='h5' noWrap sx={{ margin: "auto auto auto 16px" }}>视频标题</Typography>
        <IconButton sx={{ margin: "auto 12px auto auto" }} onClick={onClose}>
          <CloseOutlinedIcon />
        </IconButton>
      </Box>
      <Divider sx={{ marginBottom: '16px' }} />
      {/* 稿件信息填写进度 */}
      <Stepper activeStep={currentStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={label} onClick={() => handleNextStep(index)}  >
            <StepLabel sx={{ cursor: 'pointer' }} >{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {
        /* 视频信息填写区域 */
        currentStep === 0 &&
        < Box sx={{ display: 'flex', padding: '16px 56px', overflowY: 'auto', scrollbarWidth: 'thin', flex: '1 1 auto' }}>
          {/* 左侧视频信息 */}
          <Box sx={{ display: 'flex', width: '66%', flexDirection: 'column' }}>
            <Typography variant='h5' fontWeight='bold' sx={{ marginBottom: 1 }}>视频信息</Typography>
            {/* 视频标题 */}
            <TextField
              sx={{ width: '100%', margin: '16px 0px' }}
              label="视频标题（必填）"
              InputLabelProps={{ shrink: true }}
              placeholder='添加一个可以描述你视频的标题'
              variant='outlined'
              autoFocus
              value={videoTitle}
              onChange={e => setVideoTitle(e.target.value)}
              onFocus={() => setErrorHints({ ...errorHints, title: '' })}
              error={errorHints.title !== ''}
              helperText={errorHints.title}
            />
            {/* 视频描述 */}
            <TextField
              sx={{ width: '100%', margin: '16px 0px' }}
              label="说明"
              InputLabelProps={{ shrink: true }}
              placeholder='向观看者介绍你的视频'
              multiline
              minRows={3}
              variant='outlined'
              value={videoDescription}
              onChange={e => setVideoDescription(e.target.value)}
            />
            {/* 封面 */}
            <Typography variant='subtitle1'>封面</Typography>
            <Typography variant='subtitle2' sx={{ color: theme.palette.text.secondary }}>设置与众不同的缩略图，吸引观看者注意。</Typography>
            <Box sx={{ display: 'flex', margin: '8px 0px' }}>
              <Box sx={{
                width: '151px',
                height: '82px',
                border: '1px black dashed',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                ':hover': { bgcolor: '#e3e3e3' }
              }}
                onClick={handleUploadCover}
              >
                {
                  coverPreviewUrl === '' &&
                  <>
                    <AddPhotoAlternateOutlinedIcon />
                    <Typography>上传封面</Typography>
                  </>
                }
                {
                  coverPreviewUrl !== '' &&
                  <Box component='img' src={coverPreviewUrl} sx={{ width: '100%', height: '100%' }} />
                }
              </Box>
            </Box>
            {/* 分区 */}
            <Typography variant='subtitle1' sx={{ marginTop: '8px' }}>分区</Typography>
            <Typography variant='subtitle2' sx={{ color: theme.palette.text.secondary }}>选择视频相对应的分区，物以类聚</Typography>
            <FormControl error={errorHints.partition !== ''}>
              <Select
                sx={{ width: 'fit-content', minWidth: '128px' }}
                onChange={e => handlePartitionChange(e.target.value as number)}
                defaultValue={0}
                onFocus={() => setErrorHints({ ...errorHints, partition: '' })}
              >
                <MenuItem value={0}>请选择分区</MenuItem>
                {
                  partitions.map((partition, index) => {
                    return <MenuItem value={partition.partitionId} key={index}>{partition.partitionName}</MenuItem>
                  })
                }
              </Select>
              <FormHelperText>{errorHints.partition}</FormHelperText>
            </FormControl>

            {/* 标签 */}
            <Typography variant='subtitle1' sx={{ marginTop: '8px' }}>标签</Typography>
            <Typography variant='subtitle2' sx={{ color: theme.palette.text.secondary }}>视频内容的标签</Typography>
            {/* 已选择标签 */}
            <Box sx={{ marginTop: '8px', display: 'flex', flexWrap: 'wrap' }}>
              {
                tags.map((tag, index) => {
                  return <Chip sx={{ margin: '4px 4px 4px 0px' }} label={tag} onDelete={() => handleDeleteTag(tag)} />
                })
              }
            </Box>
            {/* 标签输入框 */}
            <TextField
              sx={{ marginTop: '8px' }}
              placeholder='回车或点击按钮添加标签'
              InputProps={{
                endAdornment: <Button onClick={() => { handleAddTag(inputTag); setInputTag('') }}>添加</Button>,
              }}
              onChange={e => setInputTag(e.target.value)}
              onKeyUp={e => {
                if (e.key === 'Enter') {
                  handleAddTag(inputTag);
                  setInputTag('')
                }
              }}
              value={inputTag}
            />
            {/* 推荐标签 */}
            {
              recommendTags.length !== 0 &&
              <Typography variant='subtitle2' sx={{ color: theme.palette.text.secondary, marginTop: '8px' }}>分区推荐标签：</Typography>

            }
            <Box sx={{ marginTop: '8px', display: 'flex', flexWrap: 'wrap' }}>
              {
                recommendTags.map((tag, index) => {

                  return <Chip sx={{ margin: '4px 4px 4px 0px' }} label={tag} onClick={() => handleAddTag(tag)} />
                })
              }
            </Box>
            {/* 评论控制 */}
            <Typography variant='subtitle1' sx={{ marginTop: '8px' }}>评论</Typography>
            <Typography variant='subtitle2' sx={{ color: theme.palette.text.secondary }}>评论控制</Typography>

            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="enabled"
                name="radio-buttons-group"
                row
              >
                <FormControlLabel value="enabled" control={<Radio />} label="开启" />
                <FormControlLabel value="disabled" control={<Radio />} label="关闭" />
              </RadioGroup>
            </FormControl>
            {/* 视频水印 */}
            <Typography variant='subtitle1' sx={{ marginTop: '8px' }}>视频水印</Typography>
            <Typography variant='subtitle2' sx={{ color: theme.palette.text.secondary }}>将你的用户名注明于视频</Typography>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="disabled"
                name="radio-buttons-group"
                row
              >
                <FormControlLabel value="left_up" control={<Radio />} label="左上" />
                <FormControlLabel value="left_down" control={<Radio />} label="左下" />
                <FormControlLabel value="right_up" control={<Radio />} label="右上" />
                <FormControlLabel value="right_down" control={<Radio />} label="右下" />
                <FormControlLabel value="disabled" control={<Radio />} label="关闭" />
              </RadioGroup>
            </FormControl>
          </Box>
          {/* 右侧视频预览 */}
          <Box sx={{ display: 'flex', width: '33%', flexDirection: 'column', marginLeft: 2, backgroundColor: '#e3e3e3', marginTop: 7, height: 'fit-content', borderRadius: 2 }}>
            {
              !isVideoSelected &&
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '32px 0px' }}>
                <Button startIcon={<DriveFolderUploadOutlinedIcon />} variant='contained' onClick={handleSelectVideoFile}>选择文件</Button>
                <Typography sx={{ marginTop: '16px' }} variant='caption' >文件支持mp4,mkv，推荐使用h264/h265编码</Typography>
              </Box>
            }
            {
              videoPreviewUrl !== '' &&
              <>
                <Box sx={{ margin: 1, borderRadius: 2 }} component='video' src={videoPreviewUrl} controls></Box>
                <Typography variant='caption' sx={{ margin: 1 }}>视频链接</Typography>
                <Typography sx={{ margin: 1 }} noWrap>{videoPreviewUrl}</Typography>
              </>
            }
            {
              isVideoSelected &&
              <>
                <Typography variant='caption' sx={{ margin: 1 }}>文件名</Typography>
                <Typography variant='caption' sx={{ margin: 1 }}>2024-04-07 12-35-47.mkv</Typography>
                <Button onClick={handleReupload}>重新上传</Button>
              </>
            }
            {
              errorHints.video !== '' &&
              <FormHelperText error sx={{ margin: '8px auto' }}>{errorHints.video}</FormHelperText>
            }
          </Box>
        </Box>
      }
      {
        /* 视频信息填写区域 */
        currentStep === 1 &&
        < Box sx={{ display: 'flex', flexDirection: 'column', padding: '16px 56px', overflowY: 'auto', scrollbarWidth: 'thin', flex: '1 1 auto', }}>
          <Typography variant='h5' fontWeight='bold' sx={{ marginBottom: 1 }}>内容审核</Typography>
          <Typography variant='subtitle2' sx={{ color: theme.palette.text.secondary }}>视频内容将被人工审核</Typography>
          <Typography variant='subtitle2' sx={{ color: theme.palette.text.secondary }}>当前审核通道：快速</Typography>
        </Box>
      }
      {
        /* 视频信息填写区域 */
        currentStep === 2 &&
        < Box sx={{ display: 'flex', flexDirection: 'column', padding: '16px 56px', overflowY: 'auto', scrollbarWidth: 'thin', flex: '1 1 auto', }}>
          <Typography variant='h5' fontWeight='bold' sx={{ marginBottom: 1 }}>公开范围</Typography>
          <Typography variant='subtitle2' sx={{ color: theme.palette.text.secondary }}>定时发布</Typography>
          <Typography variant='subtitle2' sx={{ color: theme.palette.text.secondary }}>公开 / 私有</Typography>
          <Button variant='contained' sx={{ margin: 'auto auto', borderRadius: 8 }} onClick={handleCreatePost}> 提交</Button>

        </Box>
      }
      <Divider />
      <Box sx={{ display: 'flex', padding: '8px 16px' }}>
        <Typography sx={{ margin: 'auto auto auto 8px' }}>检查完毕</Typography>
        {
          currentStep != 0 &&
          <Button variant='outlined' sx={{ margin: 'auto 8px', borderRadius: 8 }} onClick={() => setCurrentStep(prev => prev - 1)}> 返回</Button>
        }
        {
          currentStep != 2 &&
          <Button variant='contained' sx={{ margin: 'auto 8px', borderRadius: 8 }} onClick={() => handleNextStep(currentStep + 1)}> 继续</Button>
        }
      </Box>
    </Dialog >
  )
}