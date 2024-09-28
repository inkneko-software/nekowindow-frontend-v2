import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';

import Box from '@mui/material/Box';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const DanmakuPanelWrap = styled('div')(({ theme }) => ({
    backgroundColor: 'white',
    borderRadius: '4px',
    // height: 'calc(100vh - 73px - 100px - 62px)',
    // overflowY: "scroll",

    // "::-webkit-scrollbar": {
    //     width: "5px",
    //     display: "none"
    // },
    // "::-webkit-scrollbar-track": {
    //     background: "#f1f1f1",

    // },
    // "::-webkit-scrollbar-thumb": {
    //     background: "#888"
    // },
    // "::-webkit-scrollbar-thumb:hover":{
    //     background:"#555"
    // },
    // "&:hover": {
    //     "::-webkit-scrollbar": {
    //         width: "5px",
    //         opacity: 1
    //     },
    // }

}));

const TableContainerWrap = styled(TableContainer)(({ theme }) => ({
    maxHeight: 'calc(100vh - 68px - 84px - 60px - 40px - 24px - 34px)',
    overflowX: "hidden",
    overflowY: "hidden",
    "::-webkit-scrollbar": {
        width: "5px",
    },
    "::-webkit-scrollbar-track": {
        background: "#f1f1f1",

    },
    "::-webkit-scrollbar-thumb": {
        background: "#e3e3e3"
    },
    "::-webkit-scrollbar-thumb:hover": {
        background: "#e3e3e3"
    },
    "&:hover": {
        overflowY: "scroll",
        "::-webkit-scrollbar": {
            width: "5px",
            opacity: 1
        },
    }
}))

function createData(name, calories, fat) {
    return { name, calories, fat };
}

var rows = [
];

//TODO: 使用react-visualize进行列表优化
for (var i = 0; i < 30; i++) {
    rows.push(createData('00:' + i.toString().padStart(2, '0'), "测试弹幕测试弹幕测试弹幕测试弹幕测试弹幕测试弹幕", "05-03 19:00"));
}


export default function DanmakuPanel(props) {
    return (
        <DanmakuPanelWrap>
            <Accordion elevation={0} sx={{borderRadius: '4px'}}>
                <AccordionSummary
                    sx={{ bgcolor: "#eeeeee" }}
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography variant="body1" >弹幕列表</Typography>

                </AccordionSummary>
                <AccordionDetails sx={{ padding: 0 }} elevation={0}>
                    <TableContainerWrap component={Paper} >
                        <Table sx={{ width: '100%' }} size="small" aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>时间</TableCell>
                                    <TableCell align="left" sx={{ paddingLeft: 0, paddingRight: 0 }} >内容</TableCell>
                                    <TableCell align="left" sx={{ paddingLeft: 0, paddingRight: 0 }} >发送时间</TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell component="th" scope="row">
                                            <Box sx={{ textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden", width: "40px", display: "block", fontSize: "1em" }}>
                                                {row.name}
                                            </Box>
                                        </TableCell>
                                        <TableCell align="left" sx={{ paddingLeft: 0, paddingRight: 0 }} >
                                            <Box sx={{ textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden", width: "160px", display: "block", fontSize: "1em" }}>
                                                {row.calories}
                                            </Box>
                                        </TableCell>
                                        <TableCell align="left" sx={{ paddingLeft: 0, paddingRight: 0 }}>
                                            <Box sx={{ textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden", display: "block", fontSize: "1em" }}>
                                                {row.fat}
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainerWrap>
                </AccordionDetails>
            </Accordion>

        </DanmakuPanelWrap>
    )
}