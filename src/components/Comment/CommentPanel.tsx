import { Container, Divider, Typography, Box } from "@mui/material";
import React from "react";
import CommentInput, { CommentInputProps } from "./CommentInput";
import CommentItem from "./CommentItem";
// import * as commentApi from "../api/main/comment"

function CommentPanel(props: CommentInputProps) {
    const [loaddingComments, setLoaddingComments] = React.useState(true)
    const [noMoreComments, setNoMoreComments] = React.useState(false)
    const [comments, setComments] = React.useState([
        // "求助，问：“”三字一共有多少笔画？\n答：▁▁▁▁",
        // "50级：\n100级：\n150级：",
        // "测试评论。",
        // "最离谱的是这个能量石居然是真货，货真价实的有能量，良心卖家啊",
        // "这要我想起了小学的居里夫人传记了，文章最后有句话在居里夫人死后的数年内在居里夫人的实验室和她的笔记上都在闪烁着淡淡的蓝光，我当时还以为是艺术加工的一种隐喻",
        // "记得几年前一新闻，一大哥在回家路上捡到一金属，觉得挺好，适合做钥匙扣，就直接揣兜了，当天晚上进医院，没一礼拜人就不在了——那个小金属棒是工业探伤仪里面的辐射源。\n不认识的金属，不要捡。除了发光发热，还要警惕五彩斑斓，锃光瓦亮。",
        // "有没有可能古代的诅咒就是辐射这类东西",
    ])

    // React.useEffect(() => {
    //     commentApi.GetVideoComment(props.nkid, props.vid)
    //         .then(res => res.data)
    //         .then(res => {
    //             if (res.code !== 0) {
    //                 console.log(res)
    //                 return;
    //             }

    //             var resp: commentApi.GetVideoCommentResponse = res.data
    //             if (resp !== null) {
    //                 setComments(resp);
    //             } else {
    //                 setNoMoreComments(true)
    //             }
    //             // setComments((prev) => {
    //             //     prev.push(
    //             //         // "求助，问：“”三字一共有多少笔画？\n答：▁▁▁▁",
    //             //         // "50级：\n100级：\n150级：",
    //             //         // "测试评论。",
    //             //         // "最离谱的是这个能量石居然是真货，货真价实的有能量，良心卖家啊",
    //             //         // "这要我想起了小学的居里夫人传记了，文章最后有句话在居里夫人死后的数年内在居里夫人的实验室和她的笔记上都在闪烁着淡淡的蓝光，我当时还以为是艺术加工的一种隐喻",
    //             //         // "记得几年前一新闻，一大哥在回家路上捡到一金属，觉得挺好，适合做钥匙扣，就直接揣兜了，当天晚上进医院，没一礼拜人就不在了——那个小金属棒是工业探伤仪里面的辐射源。\n不认识的金属，不要捡。除了发光发热，还要警惕五彩斑斓，锃光瓦亮。",
    //             //         // "有没有可能古代的诅咒就是辐射这类东西",

    //             //     );
    //             //     return prev
    //             // })
    //             setLoaddingComments(false)
    //             // setNoMoreComments(true)
    //         })


    // }, [])

    // const onCreateComment = (comment_id:number, content: string) => {
    //     setComments((prev) => {
    //         var newComment = {
    //             comment_id: comment_id, // uint32 `protobuf:"varint,1,opt,name=comment_id,json=commentId,proto3" json:"comment_id"`
    //             uid: 0, //       uint32 `protobuf:"varint,2,opt,name=uid,proto3" json:"uid"`
    //             nick: props.nick, //      string `json:"nick"`
    //             face_url: props.face_url, //    string `json:"face_url"`
    //             nkid: props.nkid, //      uint32 `protobuf:"varint,3,opt,name=nkid,proto3" json:"nkid"`
    //             vid: props.vid, //      uint32 `protobuf:"varint,4,opt,name=vid,proto3" json:"vid"`
    //             activity_id: 0, //  uint32 `protobuf:"varint,5,opt,name=activity_id,json=activityId,proto3" json:"activity_id"`
    //             content: content, //   string `protobuf:"bytes,6,opt,name=content,proto3" json:"content"`
    //             reply_cid: 0, //   uint32 `protobuf:"varint,7,opt,name=reply_cid,json=replyCid,proto3" json:"reply_cid"`
    //             reply_to_cid: 0, // uint32 `protobuf:"varint,8,opt,name=reply_to_cid,json=replyToCid,proto3" json:"reply_to_cid"`
    //             likes_count: 0, //  uint32 `protobuf:"varint,9,opt,name=likes_count,json=likesCount,proto3" json:"likes_count"`
    //             is_like: false,   //   bool   `protobuf:"varint,10,opt,name=is_like,json=isLike,proto3" json:"is_like"`
    //             created_at: new Date().getTime() / 1000,
    //             replies: []
    //         }
    //         return [newComment, ...prev];
    //     })
    //     if (noMoreComments){
    //         setNoMoreComments(false)
    //     }
    // }

    return (
        <Box sx={{ width: '100%', margin: 0, padding: 0, display: "flex", flexDirection: "column" }} >
            <Typography variant="h5" sx={{ paddingTop: 2, paddingBottom: 2 }}>评论</Typography>
            <CommentInput face_url={props.face_url} nick={props.nick} vid={props.vid} nkid={props.nkid} sx={{ margin: 3 }} />
            <Divider></Divider>
            <Box sx={{ width: '100%', margin: 0, padding: 0, display: "flex", flexDirection: "column" }} >
                <Box hidden={!loaddingComments} sx={{ textAlign: "center", marginTop: 10, marginBottom: 10 }}>
                    加载评论中...
                </Box>

                {/* {comments.map((comment, index) => {
                    return (
                        <div key={comment.comment_id}>
                            <CommentItem comment={comment} sx={{ margin: 3 }} />
                            <Divider></Divider>
                        </div >
                    )
                })} */}

                <Box hidden={!noMoreComments} sx={{ textAlign: "center", marginTop: 10, marginBottom: 10 }}>
                    暂无更多评论
                </Box>
            </Box>
        </Box>
    )
}

export default CommentPanel;