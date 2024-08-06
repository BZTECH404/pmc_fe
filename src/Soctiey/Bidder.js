import React, { useEffect, useState } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import axios from 'axios';
import Swal from 'sweetalert2'
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';


import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
// import { mainListItems, secondaryListItems } from "./listItems";
import { Table, TableBody, TableCell, TableContainer, TablePagination, TableHead, TableRow } from '@material-ui/core';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

// import axios from "axios";
// import Swal from "sweetalert2";
// import Chart from "./Chart";
// import Deposits from "./Deposits";
// import Orders from "./Orders";
import { useDropzone } from 'react-dropzone';
// import CreateTender from "./CreateTender";
import Adminheader from "../Admin/Adminheader";
import SocietyHeader from './SocietyHeader';
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Paper, TablePagination } from '@material-ui/core';
import  {baseurl}  from "../api";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex"
    },
    toolbar: {
        paddingRight: 24 // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "0 8px",
        ...theme.mixins.toolbar
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    menuButton: {
        marginRight: 36
    },
    menuButtonHidden: {
        display: "none"
    },
    title: {
        flexGrow: 1
    },
    drawerPaper: {
        position: "relative",
        whiteSpace: "nowrap",
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    drawerPaperClose: {
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up("sm")]: {
            width: theme.spacing(9)
        }
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        // content which is class of main needs to be flex and column direction
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        height: "100vh",
        overflow: "auto"
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4)
    },
    paper: {
        padding: theme.spacing(2),
        display: "flex",
        overflow: "auto",
        flexDirection: "column"
    },
    fixedHeight: {
        height: 240
    },
    // added the footer class
    footer: {
        padding: theme.spacing(2),
        marginTop: "auto",
        backgroundColor: "white",
        // just this item, push to bottom
        alignSelf: "flex-end"
    }
}));
export default function Bidder() {
    const classes = useStyles();
    const token = localStorage.getItem('token');

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}` // Use the token here
        }
    };
    // 
    const [tenders, setTenders] = useState([]);
    const [selectedTender, setSelectedTender] = useState('');

    useEffect(() => {
        axios.get(`${baseurl}/api/tenders/society`, config)
            .then(response => {
                // //console.log(response.data.data);
                setTenders(response.data.data);
            });
    }, []);

    const handleTenderChange = (event) => {
        setSelectedTender(event.target.value);
    };
    // 

    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);


    //   const config = {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization': `${token}` // Use the token here
    //     }
    //   };
    // const body = {
    //     tenderId: "65dca8b952e1f291c6cb3bad"
    // };

    const [tableData, setTableData] = useState([]);
    useEffect(() => {
        if (selectedTender) {
            const body = { tenderId: selectedTender };

            axios.post(`${baseurl}/api/society-tenders`, body, config)
                .then(response => {
                    //console.log(response);
                    if (response.status === 400) {

                        setTableData([]);
                    } else {
                        setTableData(response.data.data);
                    }
                });
        }
    }, [selectedTender]);


    const limitText = (text, limit = 10) => {
        const words = text.split(' ');
        if (words.length > limit) {
            return (
                <>
                    {words.slice(0, limit).join(' ')}{' '}
                    <a href="#" onClick={(e) => {
                        e.preventDefault();
                        Swal.fire({
                            title: 'Details',
                            text: text,
                            confirmButtonText: 'Close'
                        });
                    }}>Show More</a>
                </>
            );
        }
        return text;
    };

    return (
        <>
            <CssBaseline />
            {/* <SocietyHeader /> */}
            <main className={classes.content}>
                {/* <div className={classes.appBarSpacer} /> */}
                {/* <Container maxWidth="lg" className={classes.container}> */}
                <Paper className={classes.paper}>
                    <Typography style={{ textAlign: 'center' }}>
                        Bidder List
                    </Typography>
                    <Select value={selectedTender} onChange={handleTenderChange}>
                        {tenders.map((tender) => (
                            <MenuItem key={tender._id} value={tender._id}>{tender.name}</MenuItem>
                        ))}
                    </Select>
                    {tableData.length === 0 ? (
                <Typography variant="h6">No data for selected tender</Typography>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Role</TableCell>
                                <TableCell>Created At</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableData.map((row) => (
                                <TableRow key={row._id}>
                                    <TableCell>{row.usertender.name}</TableCell>
                                    <TableCell>{row.usertender.email}</TableCell>
                                    <TableCell>{row.usertender.role}</TableCell>
                                    <TableCell>{row.createdAt}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
                </Paper>
                {/* </Container> */}
            </main>
        </>
    )
}
