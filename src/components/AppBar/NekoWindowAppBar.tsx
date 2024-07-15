import { useState, useEffect, useRef } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import SearchIcon from '@mui/icons-material/Search';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import UpdateRounded from '@mui/icons-material/UpdateRounded';
import { Avatar, Button, Link, PopperPlacementType, Tab, Tabs, TextField, useTheme } from '@mui/material';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import CircleNotificationsOutlinedIcon from '@mui/icons-material/CircleNotificationsOutlined';
import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';
import RestoreOutlinedIcon from '@mui/icons-material/RestoreOutlined';
import SailingOutlinedIcon from '@mui/icons-material/SailingOutlined';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';

import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import { Popper, Paper, Fade, Stack } from '@mui/material';

// import LoginDialog from '@components/Auth/LoginDialog';
import theme from '@theme/theme';
import { UserDetailVO } from '@api/codegen/user';
import LoginDialog from '@components/LoginDialog/LoginDialog';

// const userapi = new UserControllerApi(new Configuration({ credentials: 'include' }))

interface INavigationButton {
    text: string,
    icon: React.ReactNode,
    badgeContent?: number,
    children?: React.ReactNode,
}

function NavigationButton(props: INavigationButton) {
    const [popperOpen, setPopperOpen] = useState(false)
    const anchorElement = useRef(null)
    return (
        <Box
            ref={anchorElement}
            onMouseEnter={() => setPopperOpen(true)}
            onMouseLeave={() => setPopperOpen(false)}>
            <IconButton
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    ':hover': {
                        color: theme.palette.primary.main
                    }
                }}
                href='/message/my'
                target='_blank'
                size='large'
                color='inherit'
                disableFocusRipple
                disableRipple
            >
                <Badge badgeContent={0} color='error'>
                    {props.icon}
                </Badge>
                <Typography variant='body2' >{props.text}</Typography>

            </IconButton>
            {
                typeof (props.children) !== undefined && <Popper open={popperOpen} anchorEl={anchorElement.current} transition >
                    {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={{ enter: 500, exit: 500 }}>
                            <Box sx={{ marginTop: 1 }}>
                                {props.children}
                            </Box>
                        </Fade>
                    )}
                </Popper>
            }
        </Box >

    )
}

interface INekoWindowAppBar {
    transparent?: boolean
}

const NekoWindowAppBar: React.FC<INekoWindowAppBar> = ({ transparent }) => {
    const theme = useTheme();
    const [loginDialogOpen, setLoginDialogOpen] = useState(false);
    const [userInfo, setUserInfo] = useState<UserDetailVO>();
    const [messagePopperOpen, setMessagePopperOpen] = useState(false);
    const [activityPopperOpen, setActivityPopperOpen] = useState(false)
    const [collectionPopperOpen, setCollectionPopperOpen] = useState(false)
    const [historyPopperOpen, setHistoryPopperOpen] = useState(false)
    const [atTop, setAtTop] = useState(true);
    const messageButtonRef = useRef<HTMLElement>(null);


    useEffect(() => {
        const scrollHandler = () => {
            if (window.scrollY !== 0) {
                setAtTop(false);
            } else {
                setAtTop(true);
            }
        };
        document.addEventListener('scroll', scrollHandler)
        return () => {
            document.removeEventListener('scroll', scrollHandler)
        }
        //     console.log('load 1')
        //     userapi.myUserDetail()
        //         .then(res => res.data)
        //         .then(userInfoResponse => {
        //             setUserInfo(userInfoResponse)
        //         })
        //         .catch()

    }, [])

    return (
        <Box sx={{ width: '100%', minWidth: '1360px', }}>
            <AppBar position='fixed' sx={[{ minWidth: '1360px', bgcolor: '#ffffff', color: '#000000', zIndex: "2000" }, transparent === true && atTop && { bgcolor: "rgba(0,0,0,0)", color: '#ffffff', boxShadow: "unset" }]}>
                <Toolbar>
                    {/* 网站标题 */}
                    <Typography variant='h6' noWrap component='div' onClick={() => { document.location = '/' }} sx={{ cursor: 'pointer', width: '40%' }}>{'墨云视窗'} </Typography>
                    {/* 搜索框 */}
                    <Box sx={{ width: '20%', marginLeft: 'auto', padding: "2px 12px", marginRight: 'auto', display: 'flex', border: '1px solid', borderColor: theme.palette.text.disabled, borderRadius: '12px', justifyContent: 'center', bgcolor: "#f5f5f5" }}>
                        <InputBase sx={{ width: '100%', padding: "6px 6px", ".MuiInputBase-input": { padding: "2px 6px", borderRadius: '2px', ":focus": { backgroundColor: "#e3e3e3" } }, }} size='small' placeholder='搜索你的视频' />
                        <IconButton sx={{ margin: "auto 2px", padding: "2px 2px" }}>
                            <SearchIcon sx={{ color: '#000000' }} />
                        </IconButton>
                    </Box>
                    {/* 右侧菜单 */}
                    <Box sx={{ display: 'flex', flexDirection: 'row', width: '40%' }} >
                        {/* 登录与用户信息*/}
                        {
                            userInfo === undefined && <Button sx={{ margin: 'auto 0px auto auto', color: 'inherit' }} variant='text' onClick={() => setLoginDialogOpen(true)}>
                                登录
                            </Button>
                        }
                        {
                            userInfo !== undefined && <NavigationButton text='' icon={<Avatar src={userInfo?.avatarUrl} />}>
                                <Paper sx={{ padding: 3, display: 'flex', flexDirection: 'column' }}>
                                    <Avatar sx={{ margin: '12px auto' }} src={userInfo?.avatarUrl} />
                                    <Typography sx={{ margin: '6px auto' }} variant='body2' >{userInfo?.username}</Typography>
                                    <Typography sx={{ margin: '6px auto' }} variant='caption'>{`硬币: ${0} 经验: ${userInfo?.exp}`}</Typography>
                                    <Stack direction='row' sx={{ width: '100%', paddingLeft: 2, paddingRight: 2 }}>
                                        <Button sx={{ width: '100%', color: 'black', '&:hover': { color: '#2196f3' } }} >
                                            {userInfo?.fans}<br />{'粉丝'}
                                        </Button>
                                        <Button sx={{ width: '100%', color: 'black', '&:hover': { color: '#2196f3' } }}>
                                            {userInfo?.subscribes}<br />{'关注'}
                                        </Button>
                                    </Stack>
                                    <Button
                                        size='medium'
                                        startIcon={<AccountBoxOutlinedIcon />}
                                        endIcon={<ChevronRightOutlinedIcon />}
                                        sx={{ display: 'flex', color: '#212121', textAlign: 'left', justifyContent: 'flex-start', ':hover': { background: '#e0e0e0' } }}
                                        href={`/account/home`}
                                        target='_blank'
                                    >
                                        <Typography variant='body2' sx={{ marginRight: 'auto' }}>账户中心</Typography>
                                    </Button>
                                    <Button
                                        size='medium'
                                        startIcon={<AutoAwesomeOutlinedIcon />}
                                        endIcon={<ChevronRightOutlinedIcon />}
                                        sx={{ display: 'flex', color: '#212121', textAlign: 'left', justifyContent: 'flex-start', ':hover': { background: '#e0e0e0' } }}
                                        href={`/space/${userInfo?.uid}`}
                                        target='_blank'
                                    >
                                        <Typography variant='body2' sx={{ marginRight: 'auto' }}>我的空间</Typography>
                                    </Button>
                                    <Button
                                        size='medium'
                                        startIcon={<ExitToAppOutlinedIcon />}
                                        endIcon={<ChevronRightOutlinedIcon />}
                                        // onClick={logout}
                                        href='/logout'
                                        sx={{ display: 'flex', color: '#212121', textAlign: 'left', justifyContent: 'flex-start', ':hover': { background: '#e0e0e0' } }}
                                    >
                                        <Typography variant='body2' sx={{ marginRight: 'auto' }}>退出登录</Typography>
                                    </Button>
                                </Paper>
                            </NavigationButton>
                        }
                        {/* 消息 */}
                        <NavigationButton text='消息' icon={<MailOutlineOutlinedIcon />}>
                            <Paper sx={{ padding: 3 }}>
                                <Stack direction={'column'} >
                                    <Button href='/message/my'>我的消息</Button>
                                    <Button href='/message/sysmsg'>系统消息</Button>
                                    <Button href='/message/likes'>收到的赞</Button>
                                    <Button href='/message/comments'>回复我的</Button>
                                </Stack>
                            </Paper>
                        </NavigationButton>

                        {/* 动态 */}
                        <NavigationButton text='动态' icon={<SailingOutlinedIcon />}>
                            <Paper sx={{ padding: 3 }}>
                                <Stack direction={'column'} >
                                    <Button href='/message/my'>我的消息</Button>
                                    <Button href='/message/sysmsg'>系统消息</Button>
                                    <Button href='/message/likes'>收到的赞</Button>
                                    <Button href='/message/comments'>回复我的</Button>
                                </Stack>
                            </Paper>
                        </NavigationButton>
                        {/* 收藏 */}
                        <NavigationButton text='收藏' icon={<StarBorderRoundedIcon />}>
                            <Paper sx={{ padding: 3 }}>
                                <Stack direction={'column'} >
                                    <Button href='/message/my'>我的消息</Button>
                                    <Button href='/message/sysmsg'>系统消息</Button>
                                    <Button href='/message/likes'>收到的赞</Button>
                                    <Button href='/message/comments'>回复我的</Button>
                                </Stack>
                            </Paper>
                        </NavigationButton>
                        {/* 历史 */}
                        <NavigationButton text='历史' icon={<RestoreOutlinedIcon />}>
                            <Paper sx={{ padding: 3 }}>
                                <Stack direction={'column'} >
                                    <Button href='/message/my'>我的消息</Button>
                                    <Button href='/message/sysmsg'>系统消息</Button>
                                    <Button href='/message/likes'>收到的赞</Button>
                                    <Button href='/message/comments'>回复我的</Button>
                                </Stack>
                            </Paper>
                        </NavigationButton>
                        <Button onClick={() => userInfo === null ? setLoginDialogOpen(true) : window.open('/posts/upload', '_blank')} variant='contained' startIcon={<FileUploadOutlinedIcon />} sx={{ height: 30, margin: 'auto 5px' }} >投稿</Button>
                    </Box>
                </Toolbar>
            </AppBar>
            <LoginDialog open={loginDialogOpen} onClose={() => setLoginDialogOpen(false)} />
        </Box>

    )
}

export default NekoWindowAppBar;