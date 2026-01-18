'use client'
import { Box, Paper, Stack, Typography } from "@mui/material";
import OndemandVideoOutlinedIcon from '@mui/icons-material/OndemandVideoOutlined';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import * as React from "react";
import Link from "next/link";

interface VideoPostInfo {
    nkid: number,
    archive_url: string,
    title: string,
    visit: number,
    danmaku: number,
    duration: number,
    created_at: number,
    uploader_name: string,
    uploader_id: number,
}

interface VideoPostBriefListItemProps {
    post: VideoPostInfo,
    sx?: any
}

export default function VideoPostBriefListItem(props: VideoPostBriefListItemProps) {
    const { post, sx, ...others } = props;

    const sxItemHover = {
        cursor: "pointer",
        color: "dodgerblue",
    }

    const sxListItem = {
        padding: "1px",
        width: "100%",
        display: 'flex',
        flexDirection: 'row',
        textDecoration: 'none',
        marginBottom: 1
    }

    var itemSx = sxListItem;

    // if (variant === undefined || variant === "column-item") {
    //     itemSx = sxSmallItem;
    // } else if (variant === "row-item") {
    //     itemSx = sxListItem;
    // }


    const [shader, setShader] = React.useState(0);
    return (
        <Paper
            elevation={shader}
            sx={{ ...sx, ...itemSx, display: 'flex' }}
        >
            <Link href={'/video/' + post.nkid} target="_blank">
                <Paper
                    sx={{
                        margin: "auto",
                        display: "flex",
                        flexGrow: 1,
                        minWidth: "192px",
                        height: '96px',
                        backgroundImage: `url(${post.archive_url})`,
                        backgroundSize: 'cover',
                        backgroundPosition: "center",
                    }}
                >
                    {/* <Box
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
                </Box> */}
                </Paper>
            </Link>

            <Box sx={{ marginLeft: 1, marginRight: 1 }}>
                <Link href={'/video/' + post.nkid} target="_blank">

                    <Typography
                        sx={{
                            paddingTop: 1,
                            paddingBottom: 1,
                            height: (theme) => `calc(${theme.typography.body2.lineHeight} * ${theme.typography.body2.fontSize} * 2 + ${theme.spacing(0)})`,
                            display: "-webkit-box",
                            '-webkit-box-orient': "vertical",
                            WebkitLineClamp: 2,
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                            ':hover': {
                                color: "dodgerblue"
                            }
                        }}>
                        {post.title}
                    </Typography>
                </Link>

                <Link href={'/space/' + post.uploader_id} target="_blank">
                    <Typography variant="caption" sx={{ color: "gray", ':hover': { color: "dodgerblue" } }} component='div'>{post.uploader_name}</Typography>
                </Link>
                <Stack direction="row" sx={{ alignItems: "center" }}>
                    <OndemandVideoOutlinedIcon sx={{ height: 16, width: 16, color: "gray" }} />
                    <Typography variant="caption" sx={{ marginLeft: "3px", marginRight: 1 }}>{post.visit}</Typography>
                    <ArticleRoundedIcon sx={{ height: 16, width: 16, color: "gray" }} />
                    <Typography variant="caption" sx={{ marginLeft: "3px", marginRight: 1 }}>{post.danmaku}</Typography>
                </Stack>
            </Box>

        </Paper>
    )
}
