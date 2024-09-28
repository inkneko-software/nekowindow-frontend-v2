'use client'
import * as React from 'react'
import Box from '@mui/material/Box';

import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Button, Checkbox, Chip, Divider, FormControlLabel } from '@mui/material';
import Link from 'next/link';
export interface AccountAvatarProps {
    hidden?: boolean
}

export default function AccountAvatar(props: AccountAvatarProps) {
    const [info, setInfo] = React.useState({ uid: 0, face_url: "", nick: "", exp: 0 })
    const faceInputRef = React.useRef(null)
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

    const uploadFaceClicked = ()=>{
        // var faceInput: HTMLInputElement = faceInputRef.current
        // faceInput.onchange = ()=>{
        //     var file: File = faceInput.files[0]
        //     filesystemAPI.uploadFace(file)
        //     .then(res=>res.data)
        //     .then(res=>{
        //         if (res.code !== 0){
        //             makeToast(`${res.reason} - ${res.message}`, "error")
        //             return;
        //         }
        //         var resp: filesystemAPI.UploadFaceResponse = res.data;
        //         setInfo((prev)=>{return {...prev, face_url:resp.host + resp.path}})
        //         console.log(resp)

        //         memberAPI.UpdateFace(resp.host + resp.path, resp.face_pid)
        //         .then(res=>res.data)
        //         .then(res=>{
        //             if (res.code !== 0){
        //                 makeToast(`${res.reason} - ${res.message}`, "error")
        //             }
        //             makeToast("上传成功")
        //             setInterval(()=>{window.location.reload()}, 1000)
        //         })
        //         .catch(err=>{
        //             makeToast("更新失败")
        //         })


        //     })
        //     .catch(err=>{
        //         makeToast("更新失败")
        //     })
        // }

        // faceInputRef.current.click()
    }

    return (
        <Box hidden={props.hidden} >
            <form>
                <input ref={faceInputRef} type="file" hidden={true} accept=".jpeg,.jpg,.png,.gif" multiple={false} />
            </form>
            <Typography>头像设置</Typography>
            <Divider sx={{ marginTop: 3, marginBottom: 3 }} />
            <Box sx={{ display: "flex", flexDirection:"column", marginBottom: 3}}>
                <Avatar sx={{margin:"0px auto", width:"100px", height:"100px", border:"1px solid #e3e3e3"}} src={info.face_url}  />
                <Button sx={{width:"100px", margin:"24px auto"}} variant="contained" onClick={uploadFaceClicked}>点击上传</Button>
            </Box>

            <Divider sx={{ marginTop: 3, marginBottom: 3 }} />
        </Box>
    )
}