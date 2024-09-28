import { Avatar, Box, Divider, Paper, Typography,IconButton,Button } from "@mui/material";
import React from "react";
import {Comment} from "../api/main/comment"
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded';
export interface CommentItemProps{
    comment: Comment,
    sx?: any
}

function CommentItem (props: CommentItemProps){
    var followComment = (
        <></>
    )
    var commentTime = new Date(props.comment.created_at * 1000)
    return (

        <Box sx={{display: "flex", flexDirection: "row", ...props.sx}}>
            <Avatar src={props.comment.face_url}></Avatar>
            <Box sx={{marginLeft: 3}}>
                <Box sx={{display: "flex", flexDirection:"column"}}>
                    <Box sx={{display:"flex"}}>
                        <Typography sx={{color: "rgb(239, 83, 80)"}}>{props.comment.nick}</Typography>
                        <Paper sx={{margin:"auto 8px",width:"24px", height:"14px",color:"white", bgcolor:"red", textAlign:"center", fontSize:"4px", lineHeight:"14px"}}>lv5</Paper>
                    </Box>
                    <Typography sx={{marginTop:2, marginBottom: 2, whiteSpace:"pre-line"}} variant="body2">{props.comment.content}</Typography>
                </Box>
                <Box sx={{display:"flex"}}>
                    <Typography sx={{color: "gray", fontSize:"0.9rem"}}>{`${commentTime.getFullYear()}-${(commentTime.getMonth()+1).toString().padStart(2,"0")}-${commentTime.getDate().toString().padStart(2,"0")} ${commentTime.toLocaleTimeString()}`}</Typography>
                    <IconButton sx={{ padding: 0, margin:"auto 0px auto 24px", color:"gray", ":hover": { color: "#2196f3" } }} disableRipple >
                        <ThumbUpRoundedIcon sx={{ width: "14px", height: "14px", }} />
                        <Typography variant="subtitle2" sx={{ marginLeft:"4px" }}>0</Typography>
                    </IconButton>
                    <Button variant="text" sx={{padding:0, marginLeft:"16px", color:"gray", minWidth:"16px"}}>回复</Button>
                </Box>
                {followComment}
            </Box>
        </Box>
    )
}

export default CommentItem;