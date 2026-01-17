import { Box, Avatar, Typography, OutlinedInput, Button } from "@mui/material"
import { SxProps } from "@mui/system"
import * as React from "react"
import SentimentSatisfiedRoundedIcon from '@mui/icons-material/SentimentSatisfiedRounded';
// import * as commentApi from "@api/main/comment"
import useToast from "../Common/Toast"
import { useUserDetailContext } from "@components/Context/UserDetailContext";
export interface CommentInputProps {
    nkid: number,
    onCreateComment?: (comment_id:number, content: string)=>void
    sx?: SxProps
}

export default function CommentInput(props: CommentInputProps) {
    const { nkid, sx, ...others } = props
    const [comment, setComment] = React.useState("")
    const [Toast, makeToast] = useToast();
    const { userDetailVO } = useUserDetailContext()
    if (userDetailVO === null){
        return ;
    }

    const createComment = ()=>{
        // var req: commentApi.CreateCommentDTO = {
        //     nkid: nkid,
        //     vid:vid,
        //     content: comment
        // }
        // commentApi.CreateComment(req)
        // .then(res=>res.data)
        // .then(res=>{
        //     if (res.code !== 0){
        //         console.log(res)
        //         return;
        //     }

        //     var resp: commentApi.CreateCommentResponse = res.data
        //     props.onCreateComment(res.data.comment_id, comment)
        //     console.log(resp)
        //     setComment("")
        //     makeToast("评论成功")
        // })
    }

    

    return (
        <Box sx={{ ...sx, display: "flex", }}>
            {Toast}
            <Avatar src={userDetailVO.avatarUrl} />
            <Box sx={{ marginLeft: 2, display: "flex", flexDirection: "column", flexGrow: 1 }}>
                <OutlinedInput
                    multiline
                    sx={{ backgroundColor: "#f5f5f5", ":focus": { backgroundColor: "#e3e3e3" }, fontSize: "0.9rem", ".MuiInputBase-inputMultiline": { minHeight: "24px" } }}
                    value={comment}
                    onChange={(e) => { setComment(e.target.value) }}
                    placeholder="输入一条友善的评论"
                />
                <Box sx={{display:"flex", marginTop: 1}}>
                    <Box sx={{flexGrow: 1}}/>
                    <Button size='small' disableElevation startIcon={<SentimentSatisfiedRoundedIcon/>} sx={{ width: "fit-content",  bgcolor: "#f5f5f5", color: "black", ":hover": { bgcolor: "#e3e3e3" } }} variant="contained">表情</Button>
                    <Button size='small' disableElevation variant="contained" sx={{ marginLeft: 1,  }} onClick={createComment}>添加评论</Button>
                </Box>
            </Box>
        </Box>
    )
}