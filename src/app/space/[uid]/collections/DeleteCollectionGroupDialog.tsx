import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import React from "react";

export interface DeleteCollectionGroupDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: (name: string, description: string) => void;
}
export default function DeleteCollectionGroupDialog({ open, onClose, onConfirm }: DeleteCollectionGroupDialogProps) {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const handleConfirm = () => {
        onConfirm(name,description)
    }
    return (
        <Dialog open={open}>
            <DialogTitle>删除收藏夹</DialogTitle>
            <DialogContent>
                <Typography>确定删除这个收藏夹吗？</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>取消</Button>
                <Button onClick={handleConfirm} color='error'>删除</Button>
            </DialogActions>
        </Dialog>
    )

}