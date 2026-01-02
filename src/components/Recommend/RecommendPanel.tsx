import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import VideoPostBriefListItem from "../Media/VideoPostBriefListItem";

interface RecommendPannelProps {
    sx?: any
}
function RecommendPanel(props: RecommendPannelProps) {
    const {sx, ...others} = props
    var postInfo = {
        nkid: 3,
        archive_url: "/home_banner01.jpg",
        title: "动物自然纪录片《小小世界 2021》第二季 全6集 1080P超清",
        visit: 0,
        danmaku: 0,
        duration: 0,
        created_at: new Date().getUTCMilliseconds(),
        uploader_name:"LegendLXH",
        uploader_id: 1
    }
    var data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] // video info json

    return (
        <Box sx={{...sx}}>
            <Typography variant="h6" sx={{lineHeight:"40px"}}>视频推荐</Typography>
            <Stack sx={{ ustifyContent: "right", marginLeft: 'auto', }} >
                {data.map((val, index) => {
                    return <VideoPostBriefListItem key={index} post={postInfo} sx={{}} />
                })}
            </Stack>
        </Box>

    )
}

export default RecommendPanel;