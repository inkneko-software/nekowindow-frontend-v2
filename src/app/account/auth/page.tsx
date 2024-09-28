'use client'
import * as React from 'react'
import Box from '@mui/material/Box';

import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Button, Checkbox, Chip, Divider, FormControlLabel, OutlinedInput } from '@mui/material';
import Link from 'next/link';

export interface AccountAuthProps {
    hidden?: boolean
}

export default function AccountAuth(props: AccountAuthProps) {
    const [info, setInfo] = React.useState({ uid: 0, face_url: "", nick: "", exp: 0 })
    React.useEffect(() => {
        // member.GetUser(null)
        //     .then(res => res.data)
        //     .then(res => {
        //         if (res.code !== 0) {
        //             window.location.href = "/"
        //         }

        //         var getuserdto: member.GetUserDTO = res.data
        //         setInfo({
        //             uid: getuserdto.uid,
        //             face_url: getuserdto.face_url,
        //             nick: getuserdto.nick,
        //             exp: getuserdto.exp
        //         })
        //     })
    }, [])

    return (
        <Box hidden={props.hidden} >
            <Typography>账户安全</Typography>
            <Divider sx={{ marginTop: 3, marginBottom: 3 }} />

            <Box sx={{ display: "flex", marginBottom: 3 }}>
                <Typography sx={{ width: "150px", textAlign: "left" }}>当前绑定邮箱：</Typography>
                <Typography>meleaf@qq.com</Typography>
            </Box>

            <Divider sx={{ marginTop: 3, marginBottom: 3 }} />
            <Button variant="contained" sx={{marginRight: 2}}>更换邮箱</Button>
            <Button variant="contained">修改密码</Button>
        </Box>
    )
}