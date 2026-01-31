'use client'
import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import VideoPostBriefListItem from "../Media/VideoPostBriefListItem";
import { Configuration, HomeRecommendVO, VideoControllerApi, VideoPostBriefVO } from "@api/codegen/video";

interface RecommendPannelProps {
    sx?: any
}
function RecommendPanel(props: RecommendPannelProps) {
    const videoAPI = new VideoControllerApi(new Configuration({ credentials: "include", basePath: process.env.NEXT_PUBLIC_API_SERVER }))
    const { sx, ...others } = props
    var postInfo = {
        nkid: 3,
        archive_url: "/home_banner01.jpg",
        title: "动物自然纪录片《小小世界 2021》第二季 全6集 1080P超清",
        visit: 0,
        danmaku: 0,
        duration: 0,
        created_at: new Date().getUTCMilliseconds(),
        uploader_name: "LegendLXH",
        uploader_id: 1
    }
    var data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] // video info json

    var [recommend, setRecommend] = React.useState<VideoPostBriefVO[]>([])
    React.useEffect(() => {
        (async () => {
            var homeRecommendRes = await videoAPI.getHomeRecommend();
            var homeRecommend = homeRecommendRes.data as HomeRecommendVO;
            var allVids = []
            for (let i = 0; i < homeRecommend.partitionVideos.length; ++i){
                allVids.push(...homeRecommend.partitionVideos[i])
            }
            setRecommend(allVids)
        })()
    }, [])
    return (
        <Box sx={{ ...sx }}>
            <Typography variant="h6" sx={{ lineHeight: "40px" }}>视频推荐</Typography>
            <Stack sx={{ ustifyContent: "right", marginLeft: 'auto', }} >
                {recommend.map((post, index) => {
                    return <VideoPostBriefListItem key={index} post={{
                        nkid: post.nkid,
                        archive_url: post.coverUrl,
                        title: post.title,
                        visit: post.visit,
                        danmaku: 0,
                        duration: post.duration,
                        created_at: new Date(post.createdAt).getTime(),
                        uploader_name: post.uploader.username,
                        uploader_id: post.uploader.userId
                    }} sx={{}} />
                })}
            </Stack>
        </Box>

    )
}

export default RecommendPanel;