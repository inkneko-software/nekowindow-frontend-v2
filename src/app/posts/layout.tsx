'use client'
import React, { Suspense } from 'react';
import NekoWindowAppBar from '@components/AppBar/NekoWindowAppBar';
import { Box, Container, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import VideoSettingsRoundedIcon from '@mui/icons-material/VideoSettingsRounded';
import AssessmentRoundedIcon from '@mui/icons-material/AssessmentRounded';
import SupervisorAccountRoundedIcon from '@mui/icons-material/SupervisorAccountRounded';
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SnackbarProvider } from 'notistack';

const ListNavigationButton = ({ target }: { target: { href: string, caption: string, icon: React.ReactNode } }) => {
    const name = usePathname();
    return (
        <Link href={target.href} passHref >
            <ListItemButton sx={{ margin: '2px 8px' }} selected={name === target.href}>
                <ListItemIcon>{target.icon}</ListItemIcon>
                <ListItemText primary={target.caption} />
            </ListItemButton>
        </Link>
    )
}

const PostsLayout = ({ children }: { children: React.ReactNode }) => {
    const navigations = [
        {
            href: '/posts/home',
            caption: '创作中心',
            icon: <HomeRoundedIcon />
        },
        {
            href: '/posts/analyze',
            caption: '数据统计',
            icon: <AssessmentRoundedIcon />
        },
        {
            href: '/posts/myposts',
            caption: '内容管理',
            icon: <VideoSettingsRoundedIcon />
        },
        {
            href: '/posts/fans',
            caption: '粉丝管理',
            icon: <SupervisorAccountRoundedIcon />
        },
        {
            href: '/posts/chats',
            caption: '互动管理',
            icon: <ChatRoundedIcon />
        },
        {
            href: '/posts/income',
            caption: '收益管理',
            icon: <HomeRoundedIcon />
        },
    ]
    return (
        <SnackbarProvider>
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
                <NekoWindowAppBar />
                <Toolbar sx={{ visibility: 'hidden' }} />
                <Box sx={{ flex: '1 0 auto', display: 'flex' }}>
                    <List sx={{ width: '256px', borderRight: '1px #e3e3e3 solid', flexShrink: 0 }}>

                        {/* <ListItemButton>我的数据</ListItemButton>
                    <ListItemButton>视频上传</ListItemButton>
                    <ListItemButton>稿件管理</ListItemButton>
                    <ListItemButton>互动管理</ListItemButton>
                    <ListItemButton>视频收益</ListItemButton> */}
                        <List sx={{ '.Mui-selected': { backgroundColor: "#2196f3!important", color: "white", borderRadius: '4px' } }}>
                            {
                                navigations.map(navigation => {
                                    return <ListNavigationButton target={navigation} key={navigation.href} />
                                })
                            }
                        </List>
                    </List>
                    <Box sx={{ flex: '1 1 auto' }}>
                        <Suspense fallback={null}>
                            {children}
                        </Suspense>
                    </Box>
                </Box>


            </Box>
        </SnackbarProvider>
    )
}

export default PostsLayout;