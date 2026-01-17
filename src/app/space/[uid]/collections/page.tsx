'use client'
import { Avatar, Box, Button, Divider, Grid, IconButton, Pagination, Paper, Popper, Stack, Typography } from "@mui/material";

import VideoPostBriefCard from "@components/Media/VideoPostBriefCard"
import SpaceMemberCard from "@components/Space/SpaceMemberCard";
import OndemandVideoOutlinedIcon from '@mui/icons-material/OndemandVideoOutlined';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded';

import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';

import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';


import SpaceCollectionVideoCard from "@components/DataDisplay/SpaceCollectionVideoCard"
import { Configuration as VideoConfiguration, VideoControllerApi } from "@api/codegen/video";
import { Configuration as CollectionConfiguration, CollectionControllerApi, CollectionGroupVO, CollectionVideoPostVO } from "@api/codegen/collection";

import { useState, useEffect } from "react";
import { Create } from "@mui/icons-material";
import CreateCollectionGroupDialog from "./CreateCollectionGroupDialog";
import useToast from "@components/Common/Toast";
import UpdateCollectionGroupDialog from "./UpdateCollectionGroupDialog";
import DeleteCollectionGroupDialog from "./DeleteCollectionGroupDialog";
export default function SpaceCollection({ params }: { params: { uid: number } }) {


    const videoAPI = new VideoControllerApi(new VideoConfiguration({ credentials: "include", basePath: process.env.NEXT_PUBLIC_API_SERVER }))
    const collectionAPI = new CollectionControllerApi(new CollectionConfiguration({ credentials: "include", basePath: process.env.NEXT_PUBLIC_API_SERVER }))
    const [selectedGroup, setSelectedGroup] = useState(0)
    const [collectionGroups, setCollectionGroups] = useState<CollectionGroupVO[]>([])
    const [collectionGroupVideos, setCollectionGroupVideos] = useState<CollectionVideoPostVO[]>([])

    const [createCollectionDialogOpen, setCreateCollectionDialogOpen] = useState(false)
    const [selectedUpdatingCollectionGroup, setSelectedUpdatingCollectionGroup] = useState<CollectionGroupVO | null>(null)
    const [selectedDeletingCollectionGroup, setSelectedDeletingCollectionGroup] = useState<CollectionGroupVO | null>(null)

    const [Toast, makeToast] = useToast();

    useEffect(() => {
        const fetchCollectionGroup = async () => {
            let res = await collectionAPI.getCollectionGroups();
            if (res.code !== 0 || res.data === undefined) {
                return;
            }
            setCollectionGroups(res.data)
            if (res.data.length > 0) {
                handleCollectionGroupChange(res.data[0].groupId)
            }
        }
        fetchCollectionGroup()

    }, [params.uid])


    var cards = [1, 2, 3, 4, 5, 6];
    var postInfo = {
        nkid: 21,
        archive_url: "/0f72e98bad36b6cde68fa1df4c88dda540ab9b1e.jpg@2560w_1440h_1c.webp",
        title: "动物自然纪录片《小小世界 2021》第二季",
        visit: 0,
        danmaku: 0,
        duration: 0,
        created_at: new Date().getTime()
    }
    // var data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15] // video info json




    const handleCreateCollectionGroup = (name: string, description: string) => {
        collectionAPI.createCollectionGroup({
            name: name,
            description: description
        }).then(res => {
            if (res.code !== 0 || res.data === undefined) {
                makeToast(res.message, 'error')
                return;
            }
            setCollectionGroups([...collectionGroups, res.data])
            setCreateCollectionDialogOpen(false)
            makeToast(res.message)
        })
    }

    const handleCollectionGroupChange = (groupId: number) => {
        collectionAPI.getCollectionVideoPosts({ collectionGroupId: groupId }).then(res => {
            if (res.code !== 0 || res.data === undefined) {
                makeToast(res.message, 'error')
                return;
            }

            setCollectionGroupVideos(res.data)
            setSelectedGroup(groupId)
        })
    }

    const handleUpdateCollectionGroup = (name: string, description: string) => {
        if (selectedUpdatingCollectionGroup === null) {
            return;
        }

        collectionAPI.updateCollectionGroup({
            collectionGroupId: selectedUpdatingCollectionGroup.groupId,
            name: name,
            description: description
        }).then(res => {
            if (res.code !== 0) {
                makeToast(res.message, 'error')
                return;
            }
            setCollectionGroups(prev => prev.map(collectionGroup => {
                if (collectionGroup.groupId === selectedUpdatingCollectionGroup.groupId) {
                    return { ...collectionGroup, name: name, description: description }
                }
                return collectionGroup
            }))
            makeToast(res.message)
            setSelectedUpdatingCollectionGroup(null)
        })
    }

    const handleDeleteCollectionGroup = () => {
        if (selectedDeletingCollectionGroup === null) {
            return;
        }

        collectionAPI.deleteCollectionGroup({
            collectionGroupId: selectedDeletingCollectionGroup.groupId
        }).then(res => {
            if (res.code !== 0) {
                makeToast(res.message, 'error')
                return;
            }
            setCollectionGroups(prev => prev.filter(collectionGroup => collectionGroup.groupId !== selectedDeletingCollectionGroup.groupId))
            makeToast(res.message)
            setSelectedDeletingCollectionGroup(null)
        })
    }

    return (
        <Box sx={{ height: "100%" }}>
            {Toast}
            {
                createCollectionDialogOpen && <CreateCollectionGroupDialog open={createCollectionDialogOpen} onClose={() => setCreateCollectionDialogOpen(false)} onConfirm={handleCreateCollectionGroup} />
            }
            {
                selectedUpdatingCollectionGroup !== null && <UpdateCollectionGroupDialog open={true} onClose={() => setSelectedUpdatingCollectionGroup(null)} onConfirm={handleUpdateCollectionGroup} collectionGroup={selectedUpdatingCollectionGroup} />
            }
            {
                selectedDeletingCollectionGroup !== null && <DeleteCollectionGroupDialog open={true} onClose={() => setSelectedDeletingCollectionGroup(null)} onConfirm={handleDeleteCollectionGroup} />
            }
            <Box sx={{ display: "flex", height: "100%", marginBottom: 2 }}>
                <List sx={{ '.Mui-selected': { backgroundColor: "#2196f3!important", color: "white" }, bgcolor: "#f3f3f3", width: "256px", height: "auto", borderRight: "1px solid rgba(0, 0, 0, 0.12)", overflow: "auto" }}>
                    <ListItemButton onClick={() => setCreateCollectionDialogOpen(true)} >
                        <ListItemText primary={'新建收藏'} sx={{ whiteSpace: "pre-wrap" }} primaryTypographyProps={{ variant: "body2" }} />
                        <AddBoxRoundedIcon />

                    </ListItemButton>
                    <Divider />
                    {
                        collectionGroups.map((collectionGroup, i) => {
                            return (
                                <ListItemButton selected={collectionGroup.groupId === selectedGroup} key={i} onClick={() => handleCollectionGroupChange(collectionGroup.groupId)} sx={{ ':hover': { ".menu-button": { display: 'inline-flex' } } }}>
                                    <FolderOutlinedIcon />
                                    <ListItemText primary={collectionGroup.name} sx={{ whiteSpace: "pre-wrap", marginLeft: '8px' }} primaryTypographyProps={{ variant: "body2", textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }} />
                                    <Box className="menu-button"
                                        sx={{ marginLeft: 'auto', display: 'none', position: 'reletive', ':hover': { '.menu-button-action': { display: 'flex' } } }}
                                        onClick={(e) => e.stopPropagation()}
                                        onMouseDown={(e) => e.stopPropagation()}
                                    >
                                        <IconButton size='small' disableRipple sx={{ padding: '0px 0px', color: 'inherit' }}><MoreVertOutlinedIcon /></IconButton>
                                        <Paper className='menu-button-action' sx={{ display: 'none', position: 'absolute', right: 0, top: '32px', flexDirection: 'column', ":hover": { display: "flex" }, zIndex: 10000 }}>
                                            <Button onClick={() => { setSelectedUpdatingCollectionGroup(collectionGroup) }}>编辑信息</Button>
                                            <Button color='error' onClick={() => setSelectedDeletingCollectionGroup(collectionGroup)}>删除</Button>
                                        </Paper>
                                    </Box>

                                </ListItemButton>
                            )
                        })
                    }

                </List>
                <Paper sx={{ marginLeft: 1, padding: 1, width: "100%" }} elevation={0}>
                    {
                        collectionGroupVideos.length === 0 && <Typography variant="body1" sx={{ textAlign: "center", marginTop: "50px" }} >
                            暂无收藏
                        </Typography>
                    }
                    <Grid container spacing={2} columns={10} sx={{ marginTop: '8px' }}>
                        {
                            collectionGroupVideos.map((post, index) => {
                                return (
                                    <Grid item md={2} lg={2} xl={2} key={index} sx={{ width: "100px" }} >
                                        <SpaceCollectionVideoCard post={post} />
                                    </Grid>)
                            })
                        }
                    </Grid>
                    {/* <Pagination count={10} variant="outlined" shape="rounded" sx={{ ".MuiPagination-ul": { justifyContent: "center" } }} /> */}
                </Paper>
            </Box>

        </Box>
    )
}


