import { Paper, Box, Typography, IconButton, Divider } from "@mui/material";

import React from "react";
import CloseIcon from '@mui/icons-material/Close';

export interface MetricsPanelProps {
    playerMetricsOpen: boolean,
    playerMatrics: {
        codec: string,
        resolution: string,
        videoDataRate: number,
        audtioDataRate: number,
        downloadSpeed: number,
        buffer: number
    },
    onMetricsPanelOpen: (open: boolean) => void
}

export default function MetricsPanel({ playerMetricsOpen, playerMatrics, onMetricsPanelOpen }: MetricsPanelProps) {
    return (
        <Paper sx={[{ background: "black", opacity: "0.85", color: "white", position: "absolute", top: "8px", left: "8px", padding: "5px 10px", width: "600px", height: "fit-content" }, !playerMetricsOpen && { display: "none" }]}>
            <Box sx={{ display: "flex" }}>
                <Typography sx={{ margin: "auto" }}>视频统计数据</Typography>
                <Box sx={{ flexGrow: 1 }} />
                <IconButton onClick={() => onMetricsPanelOpen(false)} sx={{ color: "#fff" }}><CloseIcon /></IconButton>
            </Box>
            <Divider sx={{ borderColor: "#fff" }} />
            <Box sx={{ display: "flex" }}>
                <Typography variant="body2" sx={{ minWidth: "150px" }}>player: </Typography>
                <Typography variant="caption" sx={{ flexGrow: 1 }}>neko-player-DASH</Typography>
            </Box>
            <Box sx={{ display: "flex" }}>
                <Typography variant="body2" sx={{ minWidth: "150px" }}>codec: </Typography>
                <Typography variant="caption" sx={{ flexGrow: 1 }}>{playerMatrics.codec}</Typography>
            </Box>
            <Box sx={{ display: "flex" }}>
                <Typography variant="body2" sx={{ width: "150px" }}>resolution: </Typography>
                <Typography variant="caption" sx={{ flexGrow: 1 }}>{playerMatrics.resolution}</Typography>
            </Box>
            <Box sx={{ display: "flex" }}>
                <Typography variant="body2" sx={{ width: "150px" }}>video datarate: </Typography>
                <Typography variant="caption" sx={{ flexGrow: 1 }}>{playerMatrics.videoDataRate} Kbps</Typography>
            </Box>
            <Box sx={{ display: "flex" }}>
                <Typography variant="body2" sx={{ width: "150px" }}>audio datarate: </Typography>
                <Typography variant="caption" sx={{ flexGrow: 1 }}>{playerMatrics.audtioDataRate} Kbps</Typography>
            </Box>
            <Box sx={{ display: "flex" }}>
                <Typography variant="body2" sx={{ width: "150px" }}>download speed: </Typography>
                <Typography variant="caption" sx={{ flexGrow: 1 }}>{(playerMatrics.downloadSpeed / 1024 / 1024).toFixed(2)} MBps</Typography>
            </Box>
        </Paper>

    )
}