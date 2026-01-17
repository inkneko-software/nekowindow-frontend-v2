import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, InputAdornment, OutlinedInput, styled, Switch, TextField, Typography } from "@mui/material";
import React from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { CollectionGroupVO } from "@api/codegen/collection";

export interface UpdateCollectionGroupDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: (name: string, description: string) => void;
    collectionGroup: CollectionGroupVO
}


const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
    '&:active': {
        '& .MuiSwitch-thumb': {
            width: 15,
        },
        '& .MuiSwitch-switchBase.Mui-checked': {
            transform: 'translateX(9px)',
        },
    },
    '& .MuiSwitch-switchBase': {
        padding: 2,
        '&.Mui-checked': {
            transform: 'translateX(12px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: '#1890ff',
                ...theme.applyStyles('dark', {
                    backgroundColor: '#177ddc',
                }),
            },
        },
    },
    '& .MuiSwitch-thumb': {
        boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
        width: 12,
        height: 12,
        borderRadius: 6,
        transition: theme.transitions.create(['width'], {
            duration: 200,
        }),
    },
    '& .MuiSwitch-track': {
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor: 'rgba(0,0,0,.25)',
        boxSizing: 'border-box',
        ...theme.applyStyles('dark', {
            backgroundColor: 'rgba(255,255,255,.35)',
        }),
    },
}));

export default function UpdateCollectionGroupDialog({ open, onClose, onConfirm, collectionGroup }: UpdateCollectionGroupDialogProps) {
    const [name, setName] = React.useState(collectionGroup.name);
    const [description, setDescription] = React.useState(collectionGroup.description);
    const handleConfirm = () => {
        onConfirm(name, description)
    }

    const handleNameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length > 20) return;
        setName(e.target.value);
    }
    const handleDescriptionChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length > 200) return;
        setDescription(e.target.value);
    }
    return (
        <Dialog open={open} sx={{ ".MuiPaper-root": { width: '360px' } }}>
            <Box sx={{ display: 'flex', padding: 1 }}>
                <Typography variant='h5' noWrap sx={{ margin: "auto auto auto 16px" }}>修改收藏夹</Typography>
                <IconButton sx={{ margin: "auto 12px auto auto" }} onClick={onClose}>
                    <CloseOutlinedIcon />
                </IconButton>
            </Box>
            <Divider sx={{ marginBottom: '16px' }} />
            <DialogContent>
                <Box sx={{ display: 'flex' }}>
                    <Typography>名称</Typography>
                    <Typography variant='caption' sx={{ color: 'red', margin: 'auto 0px auto 2px' }}>*</Typography>
                </Box>
                <OutlinedInput placeholder="快来给你的收藏夹命名吧" fullWidth size='small' sx={{ marginTop: '8px' }}
                    value={name}

                    onChange={handleNameChanged}
                    endAdornment={
                        <InputAdornment position="end">
                            <Typography>{`${name.length}/20`}</Typography>
                        </InputAdornment>
                    }
                />
                <Typography sx={{ marginTop: '8px' }}>公开</Typography>
                <AntSwitch defaultChecked />
                <Typography sx={{ marginTop: '8px' }}>描述</Typography>
                <OutlinedInput placeholder="可以简单描述下你的收藏夹" fullWidth multiline rows={5} size='small' sx={{ marginTop: '8px' }}
                    value={description}
                    onChange={handleDescriptionChanged}
                    endAdornment={
                        <InputAdornment position="end" sx={{}}>
                            <Typography>{`${description.length}/200`}</Typography>
                        </InputAdornment>
                    }
                />
                <Box sx={{ display: 'flex', marginTop: '16px' }}>
                    <Button onClick={onClose} sx={{ flexGrow: '1', marginRight: '8px' }} variant='outlined'>取消</Button>
                    <Button onClick={handleConfirm} sx={{ flexGrow: '1', marginLeft: '8px' }} variant="contained">保存</Button>
                </Box>
            </DialogContent>

        </Dialog>
    )

}