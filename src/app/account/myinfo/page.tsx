'use client'
import * as React from 'react'
import Box from '@mui/material/Box';

import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Button, Checkbox, Chip, Divider, FormControlLabel, OutlinedInput, Radio, RadioGroup, Stack } from '@mui/material';
import Link from 'next/link';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
// If you are using date-fns v3.x or v4.x, please import the v3 adapter
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import TextField from '@mui/material/TextField';
import { zhCN } from 'date-fns/locale/zh-CN';
import { Configuration, UserControllerApi } from '@api/codegen/user';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';


export default function AccountMyInfo() {

    const userAPI = new UserControllerApi(new Configuration({ credentials: 'include', basePath: process.env.NEXT_PUBLIC_API_SERVER }));

    const [info, setInfo] = React.useState({
        uid: 0,
        username: "",
        sign: "",
        exp: 0,
        gender: "",
        avatarUrl: "",
        birth: new Date()
    })

    React.useEffect(() => {
        const fetchData = async () => {
            let res = await userAPI.myUserDetail();
            let myUserInfo = res.data;
            if (myUserInfo !== undefined) {
                setInfo({
                    uid: myUserInfo.uid,
                    username: myUserInfo.username,
                    sign: myUserInfo.sign,
                    exp: myUserInfo.exp,
                    gender: myUserInfo.gender,
                    avatarUrl: myUserInfo.avatarUrl,
                    birth: myUserInfo.birth
                })
            }
        }

        fetchData();
    }, [])

    const handleChange = (newValue: Date | null) => {
        if (newValue !== null) {
            setInfo(prev => ({ ...prev, birth: newValue }))
        }
    };

    const onSaveClicked = async () => {

        let res = await userAPI.updateUserDetail({
            updateUserDetailDTO: {
                ...info
            }
        });

        if (res.code === 0) {
            enqueueSnackbar(res.message, { variant: 'success' })
        } else {
            enqueueSnackbar(res.message, { variant: 'error' })

        }
    }

    return (
        <Box  >
            <Typography>我的信息</Typography>
            <Divider sx={{ marginTop: 3, marginBottom: 3 }} />
            <Box sx={{ display: "flex", marginBottom: 3 }}>
                <Typography sx={{ width: "100px", textAlign: "left" }}>用户名：</Typography>
                <Typography>{'neko_' + info.uid}</Typography>
            </Box>
            <Box sx={{ display: "flex", marginBottom: 3 }}>
                <Typography sx={{ width: "100px", textAlign: "left" }}>昵称：</Typography>
                <OutlinedInput placeholder='请输入昵称' sx={{ height: "28px" }} value={info.username} onChange={(event) => { setInfo((prev) => { return { ...prev, username: event.target.value } }) }} />
            </Box>
            <Box sx={{ display: "flex", marginBottom: 3 }}>
                <Typography sx={{ width: "100px", textAlign: "left" }}>个人说明：</Typography>
                <OutlinedInput placeholder='请输入个人说明' sx={{ height: "28px", flexGrow: 1 }} value={info.sign} onChange={(event) => { setInfo((prev) => { return { ...prev, sign: event.target.value } }) }} />
            </Box>
            <Box sx={{ display: "flex", marginBottom: 3 }}>
                <Typography sx={{ width: "100px", textAlign: "left" }}>性别：</Typography>
                <RadioGroup row value={info.gender} onChange={e => setInfo(prev => ({ ...prev, gender: e.target.value }))} >
                    <FormControlLabel value="男" control={<Radio size="small" />} label="男" />
                    <FormControlLabel value="女" control={<Radio size="small" />} label="女" />
                    <FormControlLabel value="保密" control={<Radio size="small" />} label="保密" />
                </RadioGroup>
            </Box>
            <Box sx={{ display: "flex", marginBottom: 3 }}>
                <Typography sx={{ width: "100px", textAlign: "left" }}>生日：</Typography>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                        value={info.birth}
                        onChange={handleChange}
                    />
                </LocalizationProvider>
            </Box>
            <Divider sx={{ marginTop: 3, marginBottom: 3 }} />

            <Stack>
                <Button variant="contained" onClick={onSaveClicked}>保存</Button>
            </Stack>
        </Box >
    )
}