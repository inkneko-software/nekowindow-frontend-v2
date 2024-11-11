import * as React from 'react'
import Box from '@mui/material/Box';

import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Button, Checkbox, Chip, Divider, FormControlLabel } from '@mui/material';
import Link from 'next/link';
import { Configuration, UserControllerApi } from '@api/codegen/user';
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';


export default async function AccountHome() {
  var clientCookies = cookies()
  console.log(clientCookies.toString());
  const userAPI = new UserControllerApi(new Configuration({ credentials: 'include', basePath: process.env.NEXT_PUBLIC_API_SERVER, headers:{'Cookie': clientCookies.toString() } }));

  const myUserDetailResponse = await userAPI.myUserDetail();
  if (myUserDetailResponse.code !== 0 || myUserDetailResponse.data === undefined){
    redirect('/error?reason=please_login_first')
  }

  const myUserDetail = myUserDetailResponse.data

  var expColor = "#ff905a"
  var currentLevel = "LV 1"
  var currentLevelExp = 1000;
  var currentLevelProgress = (myUserDetail.exp / currentLevelExp) * 100

  return (
    <Box>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Avatar sx={{ width: "64px", height: "64px" }} src={myUserDetail.avatarUrl} />
        <Box sx={{ display: "flex", flexDirection: "column", marginLeft: 2, flexGrow: 1 }}>
          <Typography variant="h6">{myUserDetail.username}</Typography>
          <Box sx={{ height: "25px", display: "flex", marginTop: 1 }}>
            <Box sx={{ display: "flex", flexGrow: 1 }}>
              <Box sx={{ height: "100%", width: "50px", borderRadius: "4px 8px 8px 4px", backgroundColor: expColor, textAlign: 'center', color: "white" }} > {currentLevel}</Box>
              <Box sx={{ height: "100%", flexGrow: 1, borderRadius: "8px 4px 4px 8px ", background: `linear-gradient(90deg, ${expColor} ,${currentLevelProgress}%, white ${currentLevelProgress}% )`, border: `1px solid ${expColor}` }} />
            </Box>
            <Box sx={{ margin: "0px 16px" }}>{myUserDetail.exp} / {currentLevelExp}</Box>
            <Link href="/account/myinfo" passHref>
              <Button sx={{ marginRight: 1, marginLeft: 5 }} variant="contained">修改资料</Button>
            </Link>
            <Link href={`/space/${myUserDetail.uid}`} passHref>
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