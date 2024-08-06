import React, { useEffect, useState } from 'react';
import { Col, Dropdown, Row, Tabs } from 'react-bootstrap';
import { Tab, Nav, Modal, Form } from 'react-bootstrap';
import './AdminTenderDetails.css';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, LinearProgress } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import axios from 'axios';
import FileViewer from 'react-file-viewer';
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
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { mainListItems, secondaryListItems } from "./listItems";
import { Table, TableBody, TableCell, TableContainer, TablePagination, TableHead, TableRow } from '@material-ui/core';
import { useDropzone } from 'react-dropzone';
import CreateTender from "./CreateTender";
import Adminheader from "./Adminheader";
import Graph from "./Graph";
import { CSVLink } from "react-csv";
import { baseurl } from "../api";
import { getPredefinedUrl, triggerFunction } from "./SignedUrl";
// 
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
function TenderFiles() {
    const classes = useStyles();
    const [uploadProgress, setUploadProgress] = useState(0);
    // 
    let [documents, setDocuments] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // 
    const [folders, setFolders] = useState([]);
    const [folderName2,setfolderName2]=useState('');
    useEffect(() => {
        const fetchFolders = async () => {
            try {
                const response = await axios.get(`${baseurl}/api/folders`, {
                    headers: {
                        Authorization: `${localStorage.getItem('token')}`,
                    },
                });
                console.log(response.data,'folders in s3');
                setFolders(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchFolders();
    }, []);


    const handleFolderChange2 = (event) => {
        setFolderName(event.target.value);
    };


    // const handleSubmit = async (event) => {
    //     event.preventDefault();

    //     const formData = new FormData();
    //     formData.append('folderName', folderName);
    //     formData.append('file', file);

    //     try {
    //         const response = await axios.post(`${baseurl}/api/upload/document`, formData, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data',
    //                 Authorization: `${localStorage.getItem('token')}`,
    //             },
    //             onUploadProgress: (progressEvent) => {
    //                 let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
    //                 setUploadProgress(percentCompleted);
    //             }
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
    //
    //
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileExtension, setFileExtension] = useState('');
    const [isFileSelected, setIsFileSelected] = useState(false);
    const [url, setUrl] = useState('');
    const [folderName, setFolderName] = useState('');
    const [file, setFile] = useState(null);
    const [key,setKey]=useState('')
    const { getRootProps, getInputProps } = useDropzone({
        accept: 'application/pdf', // change this if you want to accept other file types
        onDrop: async (acceptedFiles) => {
            setFile(acceptedFiles[0]);
            const file = acceptedFiles[0]
            if (file) {
                const fileExtension = file.name
                setSelectedFile(file);
                setFileExtension(fileExtension);
                let arr1 = await triggerFunction(fileExtension, folderName)
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

    //
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
            file:getPredefinedUrl(key)||"HI"


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
    // For Creating Folder
    const handleUploadFolder = async (event) => {
        event.preventDefault();
    
        const token = localStorage.getItem('token');
        // const folderName = 'your_folder_name_here'; // Set your folder name here
        const fileContent = 'your_string_content_here'; // Set your string content here
    
        console.log('Folder Name:', folderName);
        console.log('File Content:', fileContent);
    
        try {
            // Convert string to Blob
            const blob = new Blob([fileContent], { type: 'text/plain' });
    
            const formData = new FormData();
            formData.append('folderName', folderName);
            formData.append('file', blob, 'file.txt'); // Append the Blob as a file with filename 'file.txt'
    
            const response = await fetch(`${baseurl}/api/createfolder`, {
                method: 'POST', // Assuming your API endpoint is a PUT request
                body: formData,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    // 'Content-Type': 'multipart/form-data',
                },
            });
    
            if (response.ok) {
                console.log('File uploaded successfully');
                // Clear form data after submission
                setFolderName('');
                setFile(null);
            } else {
                const text = await response.text(); // Get the response body as text
                console.error('Error:', text);
                // Handle the error appropriately, for example, show an error message to the user
            }
    
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    // Function to generate a random string
    const generateRandomString = () => {
        const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const length = 10; // Define the length of the random string
        let result = '';
        for (let i = 0; i < length; i++) {
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        return result;
    };
    
  
    // 
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    useEffect(() => {
        // axios.get(`${baseurl}/api/get/documents`, {
        //     headers: {
        //         'Authorization': `${localStorage.getItem('token')}`
        //     }
        // })
        //     .then(response => {
        //         setDocuments(response.data.message);
        //         console.log(response.data)
        //     })
        //     .catch(error => {
        //         console.error('There was an error!', error);
        //     });
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    //
    const [selectedFolder, setSelectedFolder] = useState('');

    const handleFolderChange = (name) => {
        
        console.log(name)
        if (name.endsWith('/')) {
            name=name.slice(0, -1); // Remove the last character
        }
        const body={
            folderName:name
        }
        console.log(body)
        axios.post(`${baseurl}/api/get/document`,body,{
            headers: {
                'Authorization': `${localStorage.getItem('token')}`
            }
        })
            .then(response => {
                setDocuments(response.data.documents);
                documents=response.data.documents
                console.log(documents,"hi")
            })
            .catch(error => {
                console.error('There was an error!', error);
            });

    };

    // const filteredDocuments = selectedFolder
    //     ? documents.filter(document => document.folderName === selectedFolder)
    //     : documents;

    return (
        <div
            className={classes.root}

        >
            <CssBaseline />
            <Adminheader />
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>


                <Grid container spacing={3}>
    <Grid item xs={12} md={6} lg={6}>
        <Paper style={{ display: "inline-block" }} className={fixedHeightPaper}>
            <Typography variant="h5" component="h2">
                Upload Tender Docs
            </Typography>
            <form onSubmit={handleUpload}>
                <LinearProgress variant="determinate" value={uploadProgress} />
                <Select
                    label="Folder Name"
                    value={folderName}
                    onChange={handleFolderChange2}
                >
                    {folders.map((folder, index) => (
                        <MenuItem key={index} value={folder.folder}>
                            {folder.folder}
                        </MenuItem>
                    ))}
                </Select>
                <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop some files here, or click to select files</p>
                    {file && <p>Selected file: {file.name}</p>} {/* Display selected file name */}

                </div>
                <Button type="submit">Upload</Button>
            </form>
        </Paper>
    </Grid>
    <Grid item xs={12} md={6} lg={6}>
        <Paper  className={fixedHeightPaper}>
            <Typography variant="h5" component="h2">
                Create new Folder
            </Typography>
            <form onSubmit={handleUploadFolder}>
                <TextField
                    label="Folder Name"
                    value={folderName}
                    onChange={(e) => setFolderName(e.target.value)}
                />
                
                <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>First Name the Folder then proceed to upload file</p>
                </div>
                <Button type="submit">Create Folder and upload file</Button>
            </form>
        </Paper>
    </Grid>
</Grid>
       {/* <select onChange={handleFolderChange} style={{ width: '100%' }}>
                        <option value="">All</option>
                      
                        {[...new Set(documents.map(document => document.folderName))].map((folderName, index) => (
        <option key={index} value={folderName}>{folderName}</option>
    ))}
                        
</select>*/}






                    <hr />
                    <select value={folderName2} onChange={(event)=>{handleFolderChange(event.target.value)
                        setfolderName2(event.target.value)
                    }} style={{ width: '100%' }}>
                    {folders.map((folder, index) => (
                        <option key={index} value={folder.folder}>
                            {folder.folder}
                        </option>
                    ))}
                    </select>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Folder Name</TableCell>
                                    <TableCell>File Name</TableCell>
                                    <TableCell>Action</TableCell>
                                    <CSVLink data={documents}>Export to CSV</CSVLink>

                                </TableRow>
                            </TableHead>
                            <TableBody>

                              
                                
                                {documents.map((document,index) => (
                                    <TableRow key={index}>
                                        <TableCell>{folderName2}</TableCell>
                                        <TableCell>{(document.name).split("/")[1]}</TableCell>
                                        <Button href={document.url} download >Download</Button>
                                    </TableRow>
                                ))} 
                                {/* {documents.map((document) => (
                                    <TableRow key={document._id}>
                                        <TableCell>{document.folderName}</TableCell>
                                        <TableCell>{document.file}</TableCell>
                                        <Button href={document.file} download>Download</Button>
                                    </TableRow>
                                ))} */}
                            </TableBody>
                        </Table>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={documents.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    </TableContainer>
                </Container>

            </main>

        </div>
    )
}

export default TenderFiles