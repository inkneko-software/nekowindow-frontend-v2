'use client'
import * as React from 'react'
import Box from '@mui/material/Box';

import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Button, Checkbox, Chip, Divider, FormControlLabel } from '@mui/material';
import Link from 'next/link';
import { UserControllerApi, Configuration } from '@api/codegen/user';
import { redirect } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';

export default function AccountAvatar() {
    const userAPI = new UserControllerApi(new Configuration({ credentials: 'include', basePath: process.env.NEXT_PUBLIC_API_SERVER }));

    const [info, setInfo] = React.useState({ uid: 0, avatarUrl: "", username: "" })
    React.useEffect(() => {
        const fetchData = async () => {
            const resp = await userAPI.myUserDetail();
            if (resp.code !== 0 || resp.data === undefined) {
                redirect("/error?reason=please_login_first");
            }

            setInfo({
                uid: resp.data.uid,
                avatarUrl: resp.data.avatarUrl,
                username: resp.data.username
            })
        }

        fetchData();
    }, [])

    const uploadFaceClicked = async () => {
        var faceInput: HTMLInputElement = document.getElementById('avatar-select-input') as HTMLInputElement;

        faceInput.onchange = async () => {
            if (faceInput.files === null || faceInput.files.length === 0) {
                return;
            }

            var resp = await userAPI.generateAvatarUploadURL();
            if (resp.code !== 0 || resp.data === undefined) {
                enqueueSnackbar<'error'>("获取头像上传链接失败：" + resp.message, { anchorOrigin: { horizontal: 'center', vertical: 'bottom' } });
                faceInput.files = null;
                return;
            }

            var file: File = faceInput.files[0]
            fetch(resp.data, { method: 'put', body: file })

            var updateResp = await userAPI.updateUserDetail({ updateUserDetailDTO: { avatarUrl: resp.data.split('?')[0] } });
            if (updateResp.code !== 0) {
                enqueueSnackbar<'error'>("更新头像失败：" + updateResp.message, { anchorOrigin: { horizontal: 'center', vertical: 'bottom' } });
                faceInput.files = null;
                return;
            }

            enqueueSnackbar<'success'>("上传成功", { anchorOrigin: { horizontal: 'center', vertical: 'bottom' } })
            setInfo({ ...info, avatarUrl: resp.data.split('?')[0] })
        }

        faceInput.click()
    }

    return (
        <Box  >
            <form>
                <input id="avatar-select-input" type="file" hidden={true} accept=".jpeg,.jpg,.png,.gif" multiple={false} />
            </form>
            <Typography>头像设置</Typography>
            <Divider sx={{ marginTop: 3, marginBottom: 3 }} />
            <Box sx={{ display: "flex", flexDirection: "column", marginBottom: 3 }}>
                <Avatar sx={{ margin: "0px auto", width: "100px", height: "100px", border: "1px solid #e3e3e3" }} src={info.avatarUrl} />
                <Button sx={{ width: "100px", margin: "24px auto" }} variant="contained" onClick={uploadFaceClicked}>点击上传</Button>
            </Box>

            <Divider sx={{ marginTop: 3, marginBottom: 3 }} />
        </Box>
    )
}