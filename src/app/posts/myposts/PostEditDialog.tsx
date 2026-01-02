import { Configuration, UserUploadedVideoStatisticsVO, VideoControllerApi, VideoManagementControllerApi } from "@api/codegen/video";
import { Box, Dialog, Divider, FormControl, FormHelperText, IconButton, MenuItem, Select, Typography, useTheme } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

interface PostEditDialogProps {
    open: boolean,
    onClose: () => void,
    post: UserUploadedVideoStatisticsVO,
}

//该组件用于展示用户已上传的视频的详细信息，包括视频标题，视频描述和封面图像。用户通过该组件更新视频信息
import { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";

const PostEditDialog = (props: PostEditDialogProps) => {
    const videoapi = new VideoControllerApi(new Configuration({ credentials: 'include', basePath: process.env.NEXT_PUBLIC_API_SERVER }));
    const videoManagementAPI = new VideoManagementControllerApi(new Configuration({ credentials: 'include', basePath: process.env.NEXT_PUBLIC_API_SERVER }));
    const theme = useTheme();
    //视频标题
    const [title, setTitle] = useState(props.post.title);
    //视频描述
    const [description, setDescription] = useState(props.post.description);
    //视频封面
    const [coverPreviewUrl, setCoverPreviewUrl] = useState(props.post.coverUrl);
    //视频封面上传状态
    const [isUploadingCover, setIsUploadingCover] = useState(false);
    //当前分区推荐的标签
    const [recommendTags, setRecommendTags] = useState<string[]>([]);
    //已选择的标签
    const [tags, setTags] = useState<string[]>([]);
    //用户输入的标签
    const [inputTag, setInputTag] = useState('')

    // 使用了props.post作为原始数据，但在修改时不能修改原始数据，所以在初始化时将其复制到state中，并在props.post发生变更后重新复制
    useEffect(() => {
        setTitle(props.post.title);
        setDescription(props.post.description)
        setCoverPreviewUrl(props.post.coverUrl);
    }, [props.post, props.open]);

    /**
     * 保存视频信息
     */
    const handleSave = () => {
        // Add logic to save updated video information
        console.log("Updated Title:", title);
        console.log("Updated Description:", description);
        videoManagementAPI.updateVideoPost({ updatePostBriefDTO: { nkid: props.post.nkid, title: title, description: description, coverUrl: coverPreviewUrl } }).then(res => {

            props.onClose();
        })

    };

    /**
     * 处理封面修改
     */
    const handleChangeCover = () => {
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

    return (
        <Dialog open={props.open} sx={{ display: 'flex', flexDirection: 'column', ".MuiPaper-root": { width: '960px' } }}>
            <input type="file" id="cover-upload-input" accept="image/*" style={{ display: 'none' }} />
            {/* Dialog Header */}
            <Box sx={{ display: 'flex', padding: 1 }}>
                <Typography variant='h5' noWrap sx={{ margin: "auto auto auto 16px" }}>稿件信息编辑</Typography>
                <IconButton sx={{ margin: "auto 12px auto auto" }} onClick={props.onClose}>
                    <CloseOutlinedIcon />
                </IconButton>
            </Box>
            <Divider sx={{ marginBottom: '16px' }} />

            <Box sx={{ display: 'flex', flexDirection: 'column', padding: '16px 24px', overflowY: 'auto', scrollbarWidth: 'thin', flex: '1 1 auto' }}>
                {/* 视频标题 */}
                <TextField
                    fullWidth
                    value={title}
                    label="视频标题（必填）"
                    InputLabelProps={{ shrink: true }}
                    placeholder='添加一个可以描述你视频的标题'
                    variant='outlined'
                    onChange={(e) => setTitle(e.target.value)}
                    sx={{ margin: '16px 0px' }}
                />
                {/* 稿件描述 */}
                <TextField
                    label="视频描述"
                    placeholder="向观看者介绍你的视频"
                    InputLabelProps={{ shrink: true }}
                    variant='outlined'
                    fullWidth
                    multiline
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    sx={{ margin: '16px 0px' }}
                />
                {/* 封面 */}
                <Typography variant='subtitle1' >视频封面</Typography>
                <Typography variant='subtitle2' sx={{ color: theme.palette.text.secondary, marginBottom: 1 }}>设置与众不同的缩略图，吸引观看者注意。</Typography>
                <Box component='img' src={coverPreviewUrl} alt={props.post.title} sx={{ width: '151px', height: '82px', marginBottom: 2, cursor: 'pointer' }} onClick={handleChangeCover} />
                {/* 分区 */}
                <Typography variant='subtitle1'>分区</Typography>
                <Typography variant='subtitle2' sx={{ color: theme.palette.text.secondary, marginBottom: 1 }}>已上传稿件无法修改</Typography>

                <FormControl>
                    <Select
                        sx={{ width: 'fit-content', minWidth: '128px' }}
                        defaultValue={0}
                        disabled
                    >
                        <MenuItem value={0}>{props.post.partitionName}</MenuItem>

                    </Select>
                </FormControl>

                {/* 标签 */}
                <Typography variant='subtitle1' sx={{ marginTop: '8px' }}>标签</Typography>
                <Typography variant='subtitle2' sx={{ color: theme.palette.text.secondary }}>视频内容的标签</Typography>
                {/* 已选择标签 */}
                <Box sx={{ marginTop: '8px', display: 'flex', flexWrap: 'wrap' }}>
                    {
                        // props.post.tag.map((tag, index) => {
                        //     return <Chip sx={{ margin: '4px 4px 4px 0px' }} label={tag} onDelete={() => handleDeleteTag(tag)} />
                        // })
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



            </Box>
            {/* 底部动作按钮 */}
            <Divider sx={{ marginBottom: '16px' }} />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, padding: 1 }}>
                <Button onClick={handleSave} variant="contained" color="primary">保存</Button>
                <Button onClick={props.onClose} variant="outlined">取消</Button>
            </Box>
        </Dialog>
    );
};

export default PostEditDialog;