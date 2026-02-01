import CoinIconFilled from "@components/Icons/CoinIconFilled";
import { Dialog, DialogTitle, Stack, DialogContent, Typography, DialogActions, Button, IconButton, Box, Select, Checkbox, FormControlLabel, FormGroup, Tooltip } from "@mui/material";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import BCoinIcon from "@components/Icons/BCoinIcon";
import { useState } from "react";

interface PostVideoCoinDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: (coinNum: number, isLikeVideoChecked: boolean) => void;
    isLastCoin: boolean;
}
export default function PostVideoCoinDialog({ open, onClose, onConfirm, isLastCoin }: PostVideoCoinDialogProps) {
    const [coinNum, setCoinNum] = useState(isLastCoin ? 1 : 2);
    const [isLikeVideoChecked, setIsLikeVideoChecked] = useState(true);

    return (
        <Dialog open={open} onClose={onClose} sx={{ display: 'flex', flexDirection: 'column', ".MuiPaper-root": { width: '360px' } }}>
            <IconButton sx={{ margin: "auto 12px auto auto" }} onClick={onClose}>
                <CloseOutlinedIcon />
            </IconButton>
            <Typography variant="h6" sx={{ margin: '0px auto' }}>给UP主投上 <span style={{ color: '#5ab2d4', fontSize: '1.5em' }}>{coinNum}</span> 枚硬币</Typography>

            <Box sx={{ display: 'flex', margin: '32px 64px' }}>
                <Box sx={[{ width: '156px', aspectRatio: '1 / 2', border: '2px dashed #cecece', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', ':hover': { borderColor: '#5ab2d4', cursor: 'pointer', color: '#5ab2d4' } }, coinNum === 1 && { border: '2px solid #5ab2d4', color: '#5ab2d4' }]}
                    onClick={() => setCoinNum(1)}>
                    <BCoinIcon />
                </Box>
                <Tooltip title={isLastCoin ? '已达投币上限' : ''}>
                    <Box sx={[{ width: '156px', aspectRatio: '1 / 2', border: '2px dashed #cecece', borderRadius: '8px', marginLeft: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center', ':hover': { borderColor: '#5ab2d4', cursor: 'pointer', color: '#5ab2d4' } }, coinNum === 2 && { border: '2px solid #5ab2d4', color: '#5ab2d4' }, isLastCoin && { ':hover': { cursor: 'not-allowed', borderColor: 'red' } }]}
                        onClick={isLastCoin ? () => { } : () => setCoinNum(2)}>
                        <BCoinIcon sx={{ marginTop: '-8px', marginLeft: '8px' }} />
                        <BCoinIcon sx={{ marginTop: '8px', marginLeft: '-8px' }} />
                    </Box>
                </Tooltip>
            </Box>
            <FormGroup>
                <FormControlLabel control={<Checkbox checked={isLikeVideoChecked} onChange={(e) => setIsLikeVideoChecked(e.target.checked)} size='small' sx={{ marginLeft: '64px' }} />} label="同时点赞内容" />
            </FormGroup>
            <Box sx={{ display: 'flex', margin: '16px auto' }}>
                <Button onClick={() => { onConfirm(coinNum, isLikeVideoChecked) }} variant="contained" disableElevation size='small' sx={{ height: '28px', margin: '0px auto' }}>确定</Button>
            </Box>

        </Dialog>
    )
}