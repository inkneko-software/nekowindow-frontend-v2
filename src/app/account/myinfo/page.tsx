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
import {zhCN} from 'date-fns/locale/zh-CN';


export default function AccountMyInfo() {

    const [timeValue, setTimeValue] = React.useState<Date|null>(new Date('2014-08-18T21:11:54'));
    const [info, setInfo] = React.useState({
        uid: 0,
        nick: "",
        sign: "",
        exp: 0,
        gender: "",
        face_url: "",
        birth: ""
    })
    const [updatedInfo, setUpdatedInfo] = React.useState(info)


    // React.useEffect(() => {
    //     member.GetUser(null)
    //         .then(res => res.data)
    //         .then(res => {
    //             if (res.code !== 0) {
    //                 window.location.href = "/"
    //             }

    //             var getuserdto: member.GetUserDTO = res.data
    //             setInfo(getuserdto)
    //             setUpdatedInfo(getuserdto)
    //             setTimeValue(new Date(getuserdto.birth))
    //             console.log(timeValue, getuserdto)
    //         })
    // }, [])



    const handleChange = (newValue: Date | null) => {
        setTimeValue(newValue);
        // setUpdatedInfo((prev) => { return { ...prev, birth: `${newValue.getFullYear()}-${(newValue.getMonth() + 1).toString().padStart(2, "0")}-${newValue.getDate().toString().padStart(2, "0")}`}})
    };

    const onSaveClicked = () => {
        // var dto: member.UpdateMemberInfoDTO
        // console.log(info, updatedInfo)
        // if (info.birth !== updatedInfo.birth) {
        //     dto = {...dto, birth: updatedInfo.birth}
        // }
        // if (info.nick !== updatedInfo.nick) {
        //     dto = {...dto, nick: updatedInfo.nick}
        // }
        // if (info.sign !== updatedInfo.sign) {
        //     dto = {...dto, sign: updatedInfo.sign}
        // }
        // if (info.gender !== updatedInfo.gender) {
        //     dto = {...dto, gender: updatedInfo.gender}
        // }
        // member.UpdateMemberInfo(dto)
        // .then(res=>res.data)
        // .then(res=>{
        //     if (res.code !== 0){
        //         makeToast(`${res.reason} - ${res.message}`, "error")
        //         return;
        //     }
        //     setInfo(updatedInfo)
        //     makeToast("保存成功")

        // })
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
                <OutlinedInput placeholder='请输入昵称' sx={{ height: "28px" }} value={updatedInfo.nick} onChange={(event) => { setUpdatedInfo((prev) => { return { ...prev, nick: event.target.value } }) }} />
            </Box>
            <Box sx={{ display: "flex", marginBottom: 3 }}>
                <Typography sx={{ width: "100px", textAlign: "left" }}>个人说明：</Typography>
                <OutlinedInput placeholder='请输入个人说明' sx={{ height: "28px", flexGrow: 1 }} value={updatedInfo.sign} onChange={(event) => { setUpdatedInfo((prev) => { return { ...prev, sign: event.target.value } }) }} />
            </Box>
            <Box sx={{ display: "flex", marginBottom: 3 }}>
                <Typography sx={{ width: "100px", textAlign: "left" }}>性别：</Typography>
                <RadioGroup row value={info.gender}  >
                    <FormControlLabel value="男" control={<Radio size="small" />} label="男" />
                    <FormControlLabel value="女" control={<Radio size="small" />} label="女" />
                    <FormControlLabel value="保密" control={<Radio size="small" />} label="保密" />
                </RadioGroup>
            </Box>
            <Box sx={{ display: "flex", marginBottom: 3 }}>
                <Typography sx={{ width: "100px", textAlign: "left" }}>生日：</Typography>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                        value={timeValue}
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