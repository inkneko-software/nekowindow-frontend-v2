'use client'
import React from 'react';
import NekoWindowAppBar from '@components/AppBar/NekoWindowAppBar';
import { Box, Container, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Toolbar, Typography } from '@mui/material';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import VideoSettingsRoundedIcon from '@mui/icons-material/VideoSettingsRounded';
import AssessmentRoundedIcon from '@mui/icons-material/AssessmentRounded';
import SupervisorAccountRoundedIcon from '@mui/icons-material/SupervisorAccountRounded';
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import FaceRoundedIcon from '@mui/icons-material/FaceRounded';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SnackbarProvider } from 'notistack';

const ListNavigationButton = ({ target }: { target: { href: string, caption: string, icon: React.ReactNode } }) => {
    const name = usePathname();
    return (
        <Link href={target.href} passHref >
            <ListItemButton sx={{ margin: '2px 8px' }} selected={name === target.href}>
                <ListItemIcon sx={{ color: 'inherit', minWidth: '34px' }}>{target.icon}</ListItemIcon>
                <ListItemText primary={target.caption} sx={{ whiteSpace: "pre-wrap" }} />
            </ListItemButton>
        </Link>
    )
}

const PostsLayout = ({ children }: { children: React.ReactNode }) => {
    const navigations = [
        {
            href: '/account/home',
            caption: '首       页',
            icon: <HomeRoundedIcon />
        },
        {
            href: '/account/myinfo',
            caption: '我的资料',
            icon: <VideoSettingsRoundedIcon />
        },
        {
            href: '/account/avatar',
            caption: '头像设置',
            icon: <FaceRoundedIcon />
        },
        {
            href: '/account/auth',
            caption: '账户安全',
            icon: <AssessmentRoundedIcon />
        },
    ]
    return (
        <SnackbarProvider>
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100%', }}>
                <NekoWindowAppBar />
                <Toolbar sx={{ visibility: 'hidden' }} />
                <Paper sx={{ flex: '1 0 auto', display: 'flex', width: "1024px", margin: "40px auto" }} elevation={2}>
                    <List sx={{ borderRight: '1px #e3e3e3 solid', backgroundColor: '#f3f3f3', '.Mui-selected': { backgroundColor: "#2196f3!important", color: "white", borderRadius: '4px', width: "160px" } }}>
                        <ListItem>
                            <ListItemText sx={{ textAlign: 'center' }}>账户中心</ListItemText>
                        </ListItem>
                        {
                            navigations.map(navigation => {
                                return <ListNavigationButton target={navigation} key={navigation.href} />
                            })
                        }
                    </List>
                    <Box sx={{ flex: '1 0 auto', margin: "16px 32px" }}>
                        {children}
                    </Box>
                </Paper>


            </Box>
        </SnackbarProvider>
    )
}

export default PostsLayout;