import { Box } from "@mui/material";

import * as React from 'react'
import NekoWindowAppBar from '@components/AppBar/NekoWindowAppBar';
import Head from 'next/head';

import Link from 'next/link'

import Toolbar from '@mui/material/Toolbar';
export default function Activity(){
    return (
        <Box >
            <Head>
                <title>动态</title>
            </Head>
            <NekoWindowAppBar/>
            <Toolbar/>

        </Box>
    )
}