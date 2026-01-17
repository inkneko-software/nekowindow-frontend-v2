import { Container, Divider, Typography, Box } from "@mui/material";
import CommentInput, { CommentInputProps } from "./CommentInput";
import CommentItem from "./CommentItem";
import { CommentControllerApi, CommentPageVO, Configuration } from "@api/codegen/comment";
import { useEffect, useState } from "react";
import { useUserDetailContext } from "@components/Context/UserDetailContext";

interface CommentPanelProps {
    objectId: number,
    idType: 'VIDEO' | 'ACTIVITY',
}
function CommentPanel({ objectId, idType }: CommentPanelProps) {
    const commentAPI = new CommentControllerApi(new Configuration({ credentials: "include", basePath: process.env.NEXT_PUBLIC_API_SERVER }))
    const [commentPageVO, setCommentPageVO] = useState<CommentPageVO | null>(null)
    
    useEffect(() => {
        commentAPI.getComment({ objectId: objectId, idType: idType })
        .then(res=>{
            if (res.code !== 0 || res.data === undefined) {
                return;
            }
            setCommentPageVO(res.data)
        })
    }, [])

    return (
        <Box sx={{ width: '100%', margin: 0, padding: 0, display: "flex", flexDirection: "column" }} >
            <Typography variant="h5" sx={{ paddingTop: 1, paddingBottom: 1 }}>评论</Typography>
            <CommentInput
              nkid={objectId} 
              sx={{ margin: 3 }} 
              />
            <Divider></Divider>
            <Box sx={{ width: '100%', margin: 0, padding: 0, display: "flex", flexDirection: "column" }} >
                <Box hidden={commentPageVO !== null} sx={{ textAlign: "center", marginTop: 10, marginBottom: 10 }}>
                    加载评论中...
                </Box>

                {commentPageVO !== null && commentPageVO.comments.map((comment, index) => {
                    return (
                        <div key={comment.commentId}>
                            <CommentItem comment={comment} />
                            <Divider></Divider>
                        </div >
                    )
                })}

                <Box hidden={commentPageVO === null || commentPageVO.comments.length === 0} sx={{ textAlign: "center", marginTop: 10, marginBottom: 10 }}>
                    暂无更多评论
                </Box>
            </Box>
        </Box>
    )
}

export default CommentPanel;