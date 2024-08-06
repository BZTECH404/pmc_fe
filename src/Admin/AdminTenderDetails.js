import React, { useEffect, useState } from 'react';
// import { Tabs, Tab } from '@material-ui/core';
import { Col, Dropdown, Row, Tabs } from 'react-bootstrap';
import { Tab, Nav, Modal, Form } from 'react-bootstrap';
import './AdminTenderDetails.css';
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

import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { mainListItems, secondaryListItems } from "./listItems";
import { Table, TableBody, TableCell, TableContainer, TablePagination, TableHead, TableRow } from '@material-ui/core';

// import axios from "axios";
// import Swal from "sweetalert2";
// import Chart from "./Chart";
// import Deposits from "./Deposits";
// import Orders from "./Orders";
import { useDropzone } from 'react-dropzone';
import CreateTender from "./CreateTender";
import Adminheader from "./Adminheader";
import Graph from "./Graph";
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { baseurl } from "../api";
// import { Nav } from 'react-bootstrap';

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

function AdminTenderDetails() {

    const classes = useStyles();
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        const fetchUsers = async () => {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${baseurl}/api/admin/users`, {
                headers: {
                    'Authorization': `${token}`
                }
            });
            setUsers(response.data.user);
        };
        fetchUsers();
    }, []);
    const [activeTab, setActiveTab] = useState('userData'); // State to track active tab

    const handleTabChange = (tabKey) => {
        setActiveTab(tabKey);
    };
    // 
    // const handleTabChange = (event, newValue) => {
    //     setTab(newValue);
    //   };

    const [selectedUser, setSelectedUser] = useState('');
    const [tenderDetails, setTenderDetails] = useState([]);
    const token = localStorage.getItem('token'); // get the token from local storage

    const handleSelect = async (eventKey) => {
        setSelectedUser(eventKey);
        const response = await axios.post(`${baseurl}/api/tender/user/post`, {
            usertender: eventKey
        }, {
            headers: {
                'Authorization': `${token}` // add the token to the request headers
            }
        });
        //console.log(response)
        setTenderDetails(response.data.data);
    }
    // 
    const [tenderList, setTenderList] = useState([]); // State to store the list of tenders

    // const handleSelect1 = async (eventKey) => {
    //     setTenderList(eventKey);

    //     // Fetch tenders for the selected user
    //     const response = await axios.get('${baseurl}/api/gettender');
    //     //console.log(response)
    //     setTenderList(response.data); // Assuming the response is an array of tenders
    // }

    const [tenders, setTenders] = useState([]);

    const [selectedTender, setSelectedTender] = useState(null);

    useEffect(() => {
        fetch(`${baseurl}/api/gettender`)
            .then(response => response.json())
            .then(data => setTenders(data.tenders));
    }, []);

    // 
    const [selectedTenderData, setSelectedTenderData] = useState([]);
    // const token = localStorage.getItem('token');

    const handleSelect1 = (tenderId) => {
        // //console.log(tenderId, 'tender')
        // //console.log(tenderId)
        const tender = tenders.find(tender => tender._id === tenderId);
        setSelectedTender(tender);
        axios.post(`${baseurl}/api/tender/user/find`, { name: tenderId }, {
            headers: { 'Authorization': ` ${token}` }
        })
            .then(response => {
                setSelectedTenderData(response.data.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    };
    //modal
    const [userToUpdate, setUserToUpdate] = useState(null);



    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
    const handleUpdateClick = (userData) => {
        //console.log(userData, 'user')
        setUserToUpdate(userData);
        handleShow();
    };
    //  
    // const [allotmentStatus, setAllotmentStatus] = useState(userToUpdate && userToUpdate.alloted ? 'Yes' : 'NO');
    // const bids = ['Bid 1', 'Bid 2', 'Bid 3']; // replace with actual bids
    const [allotmentStatus, setAllotmentStatus] = useState(
        userToUpdate ? (userToUpdate.alloted === 'inprogress' ? 'In Progress' : userToUpdate.alloted ? 'Yes' : 'No') : 'No'
    );
    const handleAllotmentChange = async (event) => {
        // //console.log(allotmentStatus, 'allotment')
        const newalloted = event.target.value
        setAllotmentStatus(newalloted);
        const isAlloted = newalloted === 'Yes' ? true : newalloted === 'No' ? false : 'inprogress';
        try {
            const data = await axios.put(`${baseurl}/api/update/${userToUpdate._id}`, { alloted: isAlloted });
            if (data.status === 200) {
                Swal.fire('Success', ' Allotment update sucessfully', 'success');

            }
        } catch (error) {
            console.error('Error:', error);
        }
        // if (event.target.value === 'Yes') {
        //     try {
        //         const data = await axios.put(`${baseurl}/api/update/${userToUpdate._id}`, { alloted: event.target.value });
        //         //console.log(data);
        //     } catch (error) {
        //         console.error('Error:', error);
        //     }
        // }
    };
    // 
    const [paidStatus, setPaidStatus] = useState(userToUpdate && userToUpdate.paid ? 'Paid' : 'Not Paid');

    const handlePaidStatusChange = async (event) => {
        const newStatus = event.target.value;
        //console.log(newStatus)
        setPaidStatus(newStatus);

        const isPaid = newStatus === 'Paid';
        //console.log(userToUpdate, 'user')
        try {
            const data = await axios.put(`${baseurl}/api/update/${userToUpdate._id}`, { paid: isPaid });
            // //console.log('updated', data.data.data)
            // setUserToUpdate(data.data.data)
            // setAllotmentStatus(data.data.data)
            if (isPaid) {
                Swal.fire('Success', 'Payment status updated successfully', 'success');
            } else {
                Swal.fire('Success', 'Payment status updated to Unpaid successfully', 'success');
            }
        } catch (error) {
            console.error('Failed to update paid status:', error);
        }
    };
    // 
    // console.

    const handleSaveFilesClick = async (data) => {
        //console.log(data)
        const zip = new JSZip();

        for (let i = 0; i < data.fileUrls.length; i++) {
            // //console.log(data.fileUrls[i],'h')
            const response = await fetch(data.fileUrls[i]);
            //console.log(response, 'res')
            const blob = await response.blob();
            const url = new URL(data.fileUrls[i]);
            const filename = url.pathname.split('/').pop();
            const fileExtension = filename.split('.').pop();

            // zip.file(`File ${i + 1}`, blob);
            zip.file(`File ${i + 1}.${fileExtension}`, blob);
        }

        const content = await zip.generateAsync({ type: "blob" });
        saveAs(content, `${data.usertender.name}.zip`);
    };
    return (
        <div className={classes.root}>
            <CssBaseline />
            <Adminheader />
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <TextField
                        label="Search"
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                    />
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Role</TableCell>
                                    <TableCell>Created At</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users
                                    .filter((user) => user.name.includes(searchTerm))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((user) => (
                                        <TableRow key={user._id}>
                                            <TableCell>{user.name}</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>{user.role}</TableCell>
                                            <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                        <TablePagination
                            component="div"
                            count={users.length}
                            page={page}
                            onChangePage={(event, newPage) => setPage(newPage)}
                            rowsPerPage={rowsPerPage}
                            onChangeRowsPerPage={(event) => {
                                setRowsPerPage(parseInt(event.target.value, 10));
                                setPage(0);
                            }}
                        />
                    </TableContainer>
                    <br />
                    {/*  */}
                    <Nav variant="tabs" defaultActiveKey="userData" onSelect={handleTabChange}>
                        <Nav.Item>
                            <Nav.Link eventKey="userData">User Data</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="tenderData">Tender Data</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    {/*  */}
                    {activeTab === 'userData' && (
                        <>
                            <Typography> Select user to view tender details</Typography>
                            <Dropdown onSelect={handleSelect}>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    {selectedUser ? users.find(user => user._id === selectedUser).name : "Select User"}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {users.map((user) => (
                                        <Dropdown.Item key={user._id} eventKey={user._id}>
                                            {user.name}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                            <br />
                            {tenderDetails.length > 0 ? (
                                <TableContainer component={Paper}>
                                    <Table className={classes.table} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Name</TableCell>
                                                <TableCell>Title</TableCell>
                                                <TableCell>State</TableCell>
                                                <TableCell>Tender Value</TableCell>
                                                <TableCell>Property History</TableCell>
                                                <TableCell>Scheme</TableCell>
                                                <TableCell>Emd</TableCell>
                                                <TableCell>Description</TableCell>
                                                <TableCell>Gross Area</TableCell>
                                                <TableCell>Ward</TableCell>
                                                <TableCell>CTS Number</TableCell>
                                                <TableCell>Start Date</TableCell>
                                                <TableCell>End Date</TableCell>
                                                <TableCell>Created At</TableCell>
                                                <TableCell>Document</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {tenderDetails.map((detail) => (
                                                console.log(detail, 'deytail')

                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            ) : (
                                <Typography>Please select a user to view tender details</Typography>
                            )}
                        </>
                    )}

                    {activeTab === 'tenderData' && (
                        <Container>
                            <br />
                            {activeTab === 'tenderData' && (
                                <>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                                            {selectedTender ? selectedTender.name : "Select Tender"}
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            {tenders.map((tender) => (
                                                <Dropdown.Item key={tender._id} onClick={() => handleSelect1(tender._id)}>
                                                    {tender.name}
                                                </Dropdown.Item>
                                            ))}
                                        </Dropdown.Menu>
                                    </Dropdown>

                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Payment proof</th>
                                                <th>Paid</th>
                                                <th>Created At</th>
                                                <th>Documnet URLs</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {selectedTenderData.map((data) => (
                                                <tr key={data._id}>
                                                    <td>{data._id}</td>
                                                    <td>{data.usertender.name}</td>
                                                    <td>{data.usertender.email}</td>
                                                    <td>
                                                        <Button variant="primary" onClick={() => window.open(data.file, "_blank")}>
                                                            View File
                                                        </Button>
                                                    </td>
                                                    <td>{data.paid.toString()}</td>
                                                    <td>{new Date(data.createdAt).toLocaleString()}</td>
                                                    <td>
                                                        {data.fileUrls && data.fileUrls.length > 0 ? (
                                                            // <Button variant="primary" onClick={() => handleSaveFilesClick(data)}></Button>
                                                                <a href={data.fileUrls[0]}>Save File</a>
                                                                
                                                           
                                                        ) : null}
                                                    </td>
                                                    <td>
                                                        <Button variant="warning" onClick={() => handleUpdateClick(data)} > {/* New update button */}
                                                            Update
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </>
                            )}
                            {/* ... (Tender Data Table) */}
                        </Container>
                    )}


                    {/*  */}
                    {/*  */}
                </Container>
            </main>
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>

                </Modal.Header>
                <Modal.Body>
                    {/*  */}

                    <Tabs
                        defaultActiveKey="profile"
                        id="uncontrolled-tab-example"
                        className="mb-3 "

                    >
                        <Tab eventKey="home" title="user" className='"nav-link active"' >
                            {userToUpdate && userToUpdate && (
                                <>
                                    <Form>
                                        <Row>
                                            <Col>
                                                <Form.Group controlId="formUserId">
                                                    <Form.Label>ID</Form.Label>
                                                    <Form.Control type="text" value={userToUpdate._id} readOnly />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Form.Group controlId="formUserEmail">
                                                    <Form.Label>Email</Form.Label>
                                                    <Form.Control type="text" value={userToUpdate.usertender.email} readOnly />
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Group controlId="formUserName">
                                                    <Form.Label>Name</Form.Label>
                                                    <Form.Control type="text" value={userToUpdate.usertender.name} readOnly />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Form>
                                </>
                            )}
                        </Tab>
                        <Tab eventKey="profile" title="Tender Details">
                            {userToUpdate && userToUpdate && (
                                <>
                                    <h4>Tender Details</h4>
                                    <hr />
                                    <Form>
                                        <Row>
                                            <Col>
                                                <Form.Group controlId="formTenderId">
                                                    <Form.Label>Tender Name</Form.Label>
                                                    <Form.Control type="text" value={userToUpdate.name.name} readOnly />
                                                </Form.Group>
                                                <Form.Group controlId="formTenderId">
                                                    <Form.Label>CTS Number</Form.Label>
                                                    <Form.Control type="text" value={userToUpdate.name.cts_number} readOnly />
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Group controlId="formTenderId">
                                                    <Form.Label>EMD</Form.Label>
                                                    <Form.Control type="text" value={userToUpdate.name.Emd} readOnly />
                                                </Form.Group>

                                                <Form.Group controlId="formTenderId">
                                                    <Form.Label>State</Form.Label>
                                                    <Form.Control type="text" value={userToUpdate.name.State} readOnly />
                                                </Form.Group>
                                            </Col>

                                        </Row>
                                        <Row>
                                            <Col>
                                                <Form.Group controlId="formTenderPropertyHistory">
                                                    <Form.Label>Property History</Form.Label>
                                                    <Form.Control as="textarea" rows={3} value={userToUpdate.name.property_history} readOnly />
                                                </Form.Group>
                                            </Col>

                                        </Row>
                                        <Row>
                                            <Col>
                                                <Form.Group controlId="formTenderDescription">
                                                    <Form.Label>Description</Form.Label>
                                                    <Form.Control as="textarea" rows={3} value={userToUpdate.name.description} readOnly />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Form.Group controlId="formTenderTenderValue">
                                                    <Form.Label>Tender Value</Form.Label>
                                                    <Form.Control type="text" value={userToUpdate.name.tender_value} readOnly />
                                                </Form.Group>
                                            </Col>
                                            <Row>
                                                <Form.Group controlId="formTenderTenderValue">
                                                    <Form.Label>title</Form.Label>
                                                    <Form.Control as="textarea" value={userToUpdate.name.title} readOnly />
                                                </Form.Group>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <Form.Group controlId="formTenderGrossArea">
                                                        <Form.Label>Gross Area</Form.Label>
                                                        <Form.Control type="text" value={userToUpdate.name.gross_area} readOnly />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Form.Group controlId="formTenderGrossArea">
                                                    <Form.Label>End Date</Form.Label>
                                                    <Form.Control type="text" value={userToUpdate.name.endDate} readOnly />
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Group controlId="formTenderGrossArea">
                                                    <Form.Label>Start Date</Form.Label>
                                                    <Form.Control type="text" value={userToUpdate.name.startDate} readOnly />
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                    </Form>
                                </>
                            )}
                        </Tab>
                        <Tab eventKey="bid" title="Bid Info">
                            {userToUpdate && userToUpdate && (
                                <>
                                    <Form>
                                        <Row>
                                            <Col>
                                                <Form.Group controlId="formUserId">
                                                    <Form.Label>Bid Date</Form.Label>
                                                    <Form.Control type="text" value={userToUpdate.createdAt} readOnly />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <br />
                                        <Row>
                                            <Col>
                                                <Form.Group controlId="formUserName">
                                                    <Form.Label style={{ textAlign: 'center' }}>Payment Proof</Form.Label>
                                                    <br />
                                                    <Button variant="primary" href={userToUpdate.file}  >
                                                        Download Payment Proof
                                                    </Button>
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Group controlId="formUserPaid">
                                                    <Form.Label>Paid</Form.Label>
                                                    <Form.Control as="select" value={paidStatus} onChange={handlePaidStatusChange}>
                                                        {/* <option>Select</option> */}
                                                        <option>Paid</option>
                                                        <option>Not Paid</option>
                                                    </Form.Control>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <br />
                                        <Form.Group controlId="formFileUrls">
                                            <Form.Label>File URLs</Form.Label>
                                            {userToUpdate.fileUrls.map((url, index) => (
                                                <Button key={index} variant="primary" onClick={() => window.open(url, "_blank")}>
                                                    Download File URL {index + 1}
                                                </Button>
                                            ))}
                                            <Form.Text>
                                                Total files: {userToUpdate.fileUrls.length}
                                            </Form.Text>
                                        </Form.Group>
                                        {/*  */}
                                        <hr />
                                        <Form.Group controlId="formAllotment">
                                            <Form.Label>Allotment</Form.Label>

                                            <Form.Control as="select" value={allotmentStatus} onChange={handleAllotmentChange}>
                                                <option>{allotmentStatus}</option>
                                                <option>No</option>
                                                <option>Yes</option>
                                                <option>In Progress</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Form>
                                </>
                            )}
                        </Tab>

                    </Tabs>
                    {/*  */}

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary">
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>

    )
}

export default AdminTenderDetails