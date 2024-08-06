import React, { useEffect, useState } from "react";
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
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { mainListItems, secondaryListItems } from "./listItems";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { Modal, Button, TextField } from '@material-ui/core';
import { baseurl } from "../api";

import axios from "axios";
import Swal from "sweetalert2";
// import Chart from "./Chart";
// import Deposits from "./Deposits";
// import Orders from "./Orders";
import { useDropzone } from 'react-dropzone';
import CreateTender from "./CreateTender";
import Adminheader from "./Adminheader";
import Graph from "./Graph";
import { ToastContainer, toast } from 'react-toastify';
import { getPredefinedUrl, triggerFunction } from "./SignedUrl";
// import { ToastContainer, toast } from 'react-toastify/dist/react-toastify.cjs.development';
import 'react-toastify/dist/ReactToastify.css';
function Copyright() {
    // classes created because it is needed in the footer.
    const classes = useStyles();
    return (
        <Container className={classes.footer}>
            <Typography variant="body2" color="textSecondary" align="center">
                {"Copyright © "}
                <Link color="inherit" href="https://material-ui.com/">
                    Your Website
                </Link>{" "}
                {new Date().getFullYear()}
                {"."}
            </Typography>
        </Container>
    );
}

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


export default function Dashboard() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    // 
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
    //   api call for tender
    const [openModal, setOpenModal] = useState(false);
    const [modalContent, setModalContent] = useState('');

    const handleOpen = (content) => {
        setModalContent(content);
        setOpenModal(true);
    };

    const handleClose = () => {
        setOpenModal(false);
    };

    const [data, setData] = useState([]);
    const [count, setCount] = useState(0);
    const tenderData = async () => {
        const res = await axios.get(`${baseurl}/api/gettender`);
        //console.log(res.data.count, 'res');
        setData(res.data.tenders);
        setCount(res.data.count);
    }
    // upload file
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileExtension, setFileExtension] = useState('');
    const [isFileSelected, setIsFileSelected] = useState(false);
    const [url, setUrl] = useState('');
    const [folderName, setFolderName] = useState('');
    const [file, setFile] = useState(null);
    const [key,setKey]=useState('')
    const { getRootProps, getInputProps } = useDropzone({
        accept: 'application/pdf', // change this if you want to accept other file types
        onDrop: (acceptedFiles) => {
            setFile(acceptedFiles[0]);
            const file = acceptedFiles[0]
            if (file) {
                const fileExtension = file.name
                setSelectedFile(file);
                setFileExtension(fileExtension);
                let arr1 = triggerFunction(fileExtension, folderName)
                console.log(arr1)
                setUrl(arr1[0]);
                setKey(arr1[1])
                setIsFileSelected(true);
            } else {
                setSelectedFile(null);
                setFileExtension('')
                setIsFileSelected(false);
            }
        },
    });

    // const handleSubmit = async (event) => {
    //     event.preventDefault();

    //     const formData = new FormData();
    //     formData.append('folderName', folderName);
    //     formData.append('file', file);
    //     // ${baseurl}
    //     try {
    //         const response = await axios.post(`${baseurl}/api/upload/document`, formData, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data',
    //                 Authorization: `${localStorage.getItem('token')}`,
    //             },
    //         });
    //         if (response.status === 200) {
    //             setFolderName(''); // clear folder name
    //             setFile(null); // clear file
    //             Swal.fire('Success', 'File uploaded successfully', 'success'); // show success alert
    //             return
    //         }
    //         //console.log(response.data);
    //     } catch (error) {
    //         Swal.fire('Error', 'file uploading error', 'error'); // show success alert

    //         console.error(error);
    //     }
    // };
    //

    const handleUpload = async(event) => {
        event.preventDefault();
        // // upload to S3
        if (!selectedFile){
        Swal.fire('Error', 'Please Select file', 'error');
         return;
        }
        const token = localStorage.getItem('token');

        const reader = new FileReader();
        reader.onload = async (event) => {
            const fileContent = event.target.result;


            console.log('Selected File Extension:', fileExtension);
            console.log('File Content:', fileContent);

            try {

                const responseFile = await fetch(url, {
                    method: 'PUT',
                    body: fileContent,
                    headers: {
                        'Content-Type': 'application/octet-stream', // Set appropriate content type
                    },
                    mode: 'cors', // Enable CORS
                });
                if (!responseFile.ok) {
                    throw new Error('Network response was not ok');
                }
                console.log('File uploaded successfully:', responseFile);
                // Reload page after successful submission
                // window.location.reload();

                // Clear form data after submission
                setFolderName(''); // clear folder name
                setFile(null); // clear file

            } catch (error) {
                console.error('Error:', error);
            }
        };

        reader.readAsArrayBuffer(selectedFile);

        // Upload to MongoDB

        const body={
            folderName:folderName,
            file:getPredefinedUrl(key)


        }
        console.log(body)
        try {
            const response = await axios.post(`${baseurl}/api/upload/document`, body, {
                headers: {
                    // 'Content-Type': 'multipart/form-data',
                    Authorization: `${localStorage.getItem('token')}`,
                },
            });
            if (response.status === 200) {
                setFolderName(''); // clear folder name
                setFile(null); // clear file
                Swal.fire('Success', 'File uploaded successfully', 'success'); // show success alert
                return
            }
            console.log(response.data);
            setSelectedFile(null);
        } catch (error) {
            Swal.fire('Error', 'file uploading error', 'error'); // show success alert

            console.error(error);
        }

    };
    // 
    const [develo, setDevelo] = useState([]);
    const [developerCount, setDeveloperCount] = useState(0);
    const totalUser = async () => {
        const token = localStorage.getItem('token');

        axios.get(`${baseurl}/api/admin/users`, {
            headers: {
                Authorization: `${token}`
            }
        })
            .then(response => {
                // //console.log(response, 'res');

                setUserCount(response.data.count);
                let developerCount = 0;
                response.data.user.map((item, index) => {
                    //console.log(item.role, 'item')
                    if (item.role === 'developer') {
                        developerCount++;
                        setDevelo(item);
                    }
                })
                setDeveloperCount(developerCount);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }
    const [userCount, setUserCount] = useState(0);
    //console.log(develo)
    // 
    const [pay, setPay] = useState([]);

    useEffect(() => {
        axios.get(`${baseurl}/api/admin/getdetails/tender`)
            .then(response => {
                setPay(response.data.data.slice(-2));
                // toast.success("Hi")
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);
    // 
    useEffect(() => {
        tenderData()
        totalUser()
    }, []);

    return (
       
        <div className={classes.root}>
            
            <CssBaseline />
            <ToastContainer/>
            <Adminheader />

            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>


                        <Grid item xs={12} md={4} lg={3}>
                            <Paper className={classes.paper}>
                                <Typography variant="h6" component="h3">
                                    All Tenders : {count}
                                </Typography>
                            </Paper>
                        </Grid>
                        {/* total user */}
                        <Grid item xs={12} md={4} lg={3}>
                            <Paper className={classes.paper}>
                                <Typography variant="h6" component="h3">
                                    Total users: {userCount}
                                </Typography>
                            </Paper>
                        </Grid>
                        {/*  */}
                        <Grid item xs={12} md={4} lg={3}>
                            <Paper className={classes.paper}>
                                <Typography variant="h6" component="h3">
                                    Total developer : {developerCount}
                                </Typography>
                            </Paper>
                        </Grid>

                        <Grid item xs={12} md={4} lg={3}>
                            <Paper className={classes.paper}>
                                <Typography variant="h6" component="h3">
                                    Total Society : 0
                                </Typography>
                            </Paper>
                        </Grid>
                        {/* Chart */}

                        <Grid item xs={12} md={12} lg={12}>

                            <Paper className={classes.paper}>
                                <Typography style={{ textAlign: 'center' }}>
                                    Tenders List
                                </Typography>
                                <br />
                                <table className="table align-middle mb-0 bg-white">
                                    <thead className="bg-light">
                                        <tr>
                                            <th>#</th>
                                            <th>Title</th>
                                            <th>State</th>
                                            <th>Property History</th>
                                            <th>Description</th>
                                            <th>EMD</th>
                                            <th>Tender Value</th>
                                            <th>Gross Area</th>
                                            <th>Document</th>
                                            <th>Ward</th>
                                            <th>CTS Number</th>
                                            <th>Start Date</th>
                                            <th>Start Date</th>
                                            <th>Start Date</th>
                                            <th>Start Date</th>
                                            <th>Start Date</th>

                                            <th>End Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data && data.slice(0, 3).map((item, index) => (

                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.title}</td>
                                                <td>{item.State}</td>
                                                <td>{limitText(item.property_history)}</td>
                                                <td>{limitText(item.description)}</td>
                                                <td>{item.Emd}</td>
                                                <td>{item.tender_value}</td>
                                                <td>{item.gross_area}</td>
                                                <td>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={() => window.open(item.doc, "_blank")}
                                                    >
                                                        View
                                                    </Button>
                                                </td>
                                                <td>{item.ward}</td>
                                                <td>{item.cts_number}</td>
                                                <td>{item.startDate}</td>
                                                <td>{item.endDate}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </Paper>
                        </Grid>
                        {/* Recent Deposits */}

                        {/* Recent Orders */}
                        <Grid container direction="row" spacing={3} justify="center">
                            <Grid item xs={12} md={8} lg={5}>
                                <Paper className={classes.paper}>
                                    <Graph />
                                    {/* <CreateTender /> */}
                                </Paper>
                            </Grid>
                        
                        </Grid>

                    </Grid>
                    {/*  */}

                    {/*     */}
                </Container>
                <Copyright />
            </main>
            <Modal
                open={openModal}
                onClose={handleClose}
            >
                <div>{modalContent}</div>
            </Modal>
        </div>
    );
}
