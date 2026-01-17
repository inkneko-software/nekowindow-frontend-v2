'use client'
import { Box, Paper, Typography } from "@mui/material";
import * as React from "react";

interface VideoPostInfo {
    nkid: number,
    archive_url: string,
    title: string,
    visit: number,
    danmaku: number,
    duration: number,
    created_at: number,
    nick?:string
}

interface VideoPostBreifCardProps {
    post: VideoPostInfo,
    variant?: "row-item" | "row-full-item" | "column-item"
    sx?: any
}

export default function VideoPostBriefCard(props: VideoPostBreifCardProps) {
    const { post, sx, variant, ...others } = props;

    const sxItemHover = {
        cursor: "pointer",
        color: "dodgerblue",
    }

    const sxSmallItem = {
        padding: "1px",
        width: "100%",
        display: 'flex',
        flexDirection: 'column',
        textDecoration: 'none'
    }

    var itemSx = sxSmallItem;

    // if (variant === undefined || variant === "column-item") {
    //     itemSx = sxSmallItem;
    // } else if (variant === "row-item") {
    //     itemSx = sxListItem;
    // }


    const [shader, setShader] = React.useState(0);
    return (
        <Paper
            component='a'
            href={`/video/${post.nkid}`}
            target='_blank'
            elevation={shader}
            onMouseOver={() => { setShader(3) }}
            onMouseOut={() => { setShader(0) }}
            sx={{ ...sx, ...itemSx, '&:hover': { ...sxItemHover } }}
        >
            <Paper
                sx={{
                    display: "flex",
                    flexGrow: 1,
                    width: "100%",
                    height: '130px',
                    backgroundImage: `url(${post.archive_url})`,
                    backgroundSize: 'cover'
                }}
            >
                <Box
                    sx={{
                        margin: "auto 0px 0px 0px",
                        padding: 1,
                        paddingTop: 3,
                        color: "#ffffff",
                        backgroundImage: "linear-gradient(180deg,rgba(0,0,0,0) 0%,rgba(0,0,0,.8) 100%)",
                        width: "100%"
                    }}
                >
                    播放0，弹幕0
                </Box>
            </Paper>
            <Typography variant="body2" sx={{ padding: 1 }}>{post.title}</Typography>
        </Paper>
    )
}
//sx={{flexGrow: 1, width: '100%', height: 'auto'，backgroundImage:`url(${post.archive_url})`}}

// function PreviewBox(src, title) {
//     src = "/0f72e98bad36b6cde68fa1df4c88dda540ab9b1e.jpg@2560w_1440h_1c.webp";
//     title = "动物自然纪录片《小小世界 2021》第二季 全6集 1080P超清";
// }