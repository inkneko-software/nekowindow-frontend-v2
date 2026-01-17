import { Avatar, Box, Divider, Paper, Typography, IconButton, Button } from "@mui/material";
import React from "react";
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded';
import { CommentVO } from "@api/codegen/comment";
import SecondaryCommentItem from "./SecondaryCommentItem";



export interface CommentItemProps {
    comment: CommentVO,
}

function CommentItem({ comment }: CommentItemProps) {
    var followComment = (
        <>
            {
                comment.initialSecondaryCommentPageVO.secondaryComments.map((secondaryComment) => (
                    <SecondaryCommentItem secondaryComment={secondaryComment} />
                ))
            }
            {
                comment.initialSecondaryCommentPageVO.total !== 0 && <Typography
                    variant="subtitle2"
                    sx={{ color: '#afafaf', ':hover': { color: '#3f7cff', cursor: "pointer" } }}
                >
                    共{comment.initialSecondaryCommentPageVO.total}条回复，点击查看
                </Typography>

            }
        </>

    )
    var commentTime = new Date(comment.createdAt)
    return (

        <Box sx={{ display: "flex", flexDirection: "row", margin: '16px 24px' }}>
            <Avatar src={comment.commentUserVO.avatarUrl}></Avatar>
            <Box sx={{ marginLeft: 3 }}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Box sx={{ display: "flex" }}>
                        <Typography sx={{ color: "rgb(239, 83, 80)" }}>{comment.commentUserVO.username}</Typography>
                        <Paper sx={{ margin: "auto 8px", width: "24px", height: "14px", color: "white", bgcolor: "red", textAlign: "center", fontSize: "4px", lineHeight: "14px" }}>lv5</Paper>
                    </Box>
                    <Typography sx={{ marginTop: 1, marginBottom: 1, whiteSpace: "pre-line" }} variant="body2">{comment.content}</Typography>
                </Box>
                <Box sx={{ display: "flex" }}>
                    <Typography sx={{ color: "gray", fontSize: "0.9rem" }}>{`${commentTime.getFullYear()}-${(commentTime.getMonth() + 1).toString().padStart(2, "0")}-${commentTime.getDate().toString().padStart(2, "0")} ${commentTime.toLocaleTimeString()}`}</Typography>
                    <IconButton sx={{ padding: 0, margin: "auto 0px auto 24px", color: "gray", ":hover": { color: "#2196f3" } }} disableRipple >
                        <ThumbUpRoundedIcon sx={{ width: "14px", height: "14px", }} />
                        <Typography variant="subtitle2" sx={{ marginLeft: "4px" }}>0</Typography>
                    </IconButton>
                    <Button variant="text" sx={{ padding: 0, marginLeft: "16px", color: "gray", minWidth: "16px" }}>回复</Button>
                </Box>
                {followComment}
            </Box>
        </Box>
    )
}

export default CommentItem;