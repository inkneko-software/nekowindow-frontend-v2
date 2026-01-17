import { SecondaryCommentVO } from "@api/codegen/comment"
import { Box, Avatar, Typography, Paper, IconButton, Button } from "@mui/material"
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded';


interface SecondaryCommentItemProps {
    secondaryComment: SecondaryCommentVO
}
const SecondaryCommentItem = ({ secondaryComment }: SecondaryCommentItemProps) => {
    var commentTime = new Date(secondaryComment.createdAt)

    return (
        <Box sx={{display: "flex", flexDirection: "row", margin: "16px 0px"}}>
            <Avatar src={secondaryComment.commentUserVO.avatarUrl} sx={{width: '32px', height: '32px'}} ></Avatar>
            <Box sx={{marginLeft: 3}}>
                <Box sx={{display: "flex", flexDirection:"row"}}>
                    <Box sx={{display:"flex"}}>
                        <Typography sx={{color: "rgb(239, 83, 80)"}}>{secondaryComment.commentUserVO.username}</Typography>
                        <Paper sx={{margin:"auto 8px",width:"24px", height:"14px",color:"white", bgcolor:"red", textAlign:"center", fontSize:"0.75em", lineHeight:"14px"}}>lv5</Paper>
                    </Box>
                    <Typography sx={{margin: 'auto 8px', whiteSpace:"pre-line"}} variant="body2">{secondaryComment.content}</Typography>
                </Box>
                <Box sx={{display:"flex"}}>
                    <Typography sx={{color: "gray", fontSize:"0.9rem"}}>{`${commentTime.getFullYear()}-${(commentTime.getMonth()+1).toString().padStart(2,"0")}-${commentTime.getDate().toString().padStart(2,"0")} ${commentTime.toLocaleTimeString()}`}</Typography>
                    <IconButton sx={{ padding: 0, margin:"auto 0px auto 24px", color:"gray", ":hover": { color: "#2196f3" } }} disableRipple >
                        <ThumbUpRoundedIcon sx={{ width: "14px", height: "14px", }} />
                        <Typography variant="subtitle2" sx={{ marginLeft:"4px" }}>{secondaryComment.likesCount}</Typography>
                    </IconButton>
                    <Button variant="text" sx={{padding:0, marginLeft:"16px", color:"gray", minWidth:"16px"}}>回复</Button>
                </Box>
            </Box>
        </Box>
    )
}

export default SecondaryCommentItem