'use client'
import * as React from 'react'
import Box from '@mui/material/Box';

import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Button, Checkbox, Chip, Divider, FormControlLabel } from '@mui/material';
import Link from 'next/link';


export default function AccountHome() {
  const [info, setInfo] = React.useState({ uid: 0, face_url: "", nick: "", exp: 0 })
  // React.useEffect(() => {
  //     member.GetUser(null)
  //         .then(res => res.data)
  //         .then(res => {
  //             if (res.code !== 0) {
  //                 window.location.href = "/"
  //             }

  //             var getuserdto: member.GetUserDTO = res.data
  //             setInfo({
  //                 uid: getuserdto.uid,
  //                 face_url: getuserdto.face_url,
  //                 nick: getuserdto.nick,
  //                 exp: getuserdto.exp
  //             })
  //         })
  // }, [])

  var expColor = "#ff905a"
  var currentLevel = "LV 1"
  var currentLevelExp = 1000;
  var currentLevelProgress = (info.exp / currentLevelExp) * 100

  return (
    <Box>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Avatar sx={{ width: "64px", height: "64px" }} src={info.face_url} />
        <Box sx={{ display: "flex", flexDirection: "column", marginLeft: 2, flexGrow: 1 }}>
          <Typography variant="h6">{info.nick}</Typography>
          <Box sx={{ height: "25px", display: "flex", marginTop: 1 }}>
            <Box sx={{ display: "flex", flexGrow: 1 }}>
              <Box sx={{ height: "100%", width: "50px", borderRadius: "4px 8px 8px 4px", backgroundColor: expColor, textAlign: 'center', color: "white" }} > {currentLevel}</Box>
              <Box sx={{ height: "100%", flexGrow: 1, borderRadius: "8px 4px 4px 8px ", background: `linear-gradient(90deg, ${expColor} ,${currentLevelProgress}%, white ${currentLevelProgress}% )`, border: `1px solid ${expColor}` }} />
            </Box>
            <Box sx={{ margin: "0px 16px" }}>{info.exp} / {currentLevelExp}</Box>
            <Link href="/account/myinfo" passHref>
              <Button sx={{ marginRight: 1, marginLeft: 5 }} variant="contained">修改资料</Button>
            </Link>
            <Link href={`/space/${info.uid}`} passHref>
              <Button variant="outlined" >个人空间</Button>
            </Link>
          </Box>
        </Box>
      </Box>

      <Divider sx={{ margin: "16px 0px" }} />

      <Box>
        <Typography>每日奖励</Typography>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box sx={{ display: "flex" }}>
            <FormControlLabel control={<Checkbox defaultChecked />} sx={{ pointerEvents: "none", flexGrow: 1 }} label="每日登录" />
            <Chip label="硬币+1" size="small" color="info" />
            <Chip label="经验值+5" size="small" color="info" sx={{ marginLeft: 1 }} />
          </Box>
          <Box sx={{ display: "flex" }}>
            <FormControlLabel control={<Checkbox />} sx={{ pointerEvents: "none", flexGrow: 1 }} label="观看视频" />
            <Chip label="经验值+5" size="small" color="info" variant='outlined' />
          </Box>
          <Box sx={{ display: "flex" }}>
            <FormControlLabel control={<Checkbox />} sx={{ pointerEvents: "none", flexGrow: 1 }} label="视频投币" />
            <Chip label="经验值+5" size="small" color="info" variant='outlined' />
          </Box>
        </Box>
      </Box>

    </Box>
  )
}