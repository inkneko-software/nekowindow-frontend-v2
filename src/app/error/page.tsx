'use client'

import { Typography } from "@mui/material";
import { useSearchParams } from "next/navigation";

const ErrorPage = () => {
    const params = useSearchParams();
    const reason = params.get("reason") || '未知错误';
    return (
        <Typography>{reason}</Typography>
    )
}

export default ErrorPage;