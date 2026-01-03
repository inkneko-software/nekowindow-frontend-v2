import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { UserUploadedVideoStatisticsVO } from '@api/codegen/video';

interface DeleteConfirmDialogProps {
    open: boolean;
    post: UserUploadedVideoStatisticsVO,
    onClose: () => void;
    onConfirm: () => void;
}
export default function DeleteConfirmDialog({open, post, onClose, onConfirm }: DeleteConfirmDialogProps) { 
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{`是否删除投稿：${post.title}`}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    删除后将无法恢复
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>取消</Button>
                <Button onClick={onConfirm} autoFocus>确定</Button>
            </DialogActions>
        </Dialog>
    )
}