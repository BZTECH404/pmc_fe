import React, { useEffect, useState } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import axios from 'axios';
// import Swal from 'sweetalert2'
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
import Swal from 'sweetalert2';

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
import { baseurl } from "../api";

// import axios from "axios";
// import Swal from "sweetalert2";
// import Chart from "./Chart";
// import Deposits from "./Deposits";
// import Orders from "./Orders";
import { useDropzone } from 'react-dropzone';
// import CreateTender from "./CreateTender";
import Adminheader from "../Admin/Adminheader";
// import Graph from "./Graph";
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

function Bank() {
    const classes = useStyles();
    const [formData, setFormData] = useState({
        account_holder_name: '',
        account_number: '',
        bank_ifsc: '',
        bank_name: '',
        account_type: '',
        bank_branch: '',
        bank_user:''
    });

    const [users, setUsers] = useState([]);
    useEffect(() => {
        const fetchUsers = async () => {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${baseurl}/api/admin/users`, {
                headers: {
                    'Authorization': `${token}`
                }
            });
            const societyUsers = response.data.user.filter(user => user.role === 'society');
            setUsers(societyUsers);
        };
        fetchUsers();
    }, [])

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post(`${baseurl}/api/addbank`, formData, {
                headers: {
                    'Authorization': `${token}`
                }
            });
            if (response.status === 201) {
               alert('Bank already added');
               setFormData('') // reset the form
            } else {
                //console.log(response.data);
            }
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <div className={classes.root}>
            <CssBaseline />
            <Adminheader />
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group as={Row} className="mb-3" controlId="formSocietyName">
                            <Form.Label column sm="2">
                               Account Holder Name
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    type="text"
                                    placeholder="Account Holder Name"
                                    name="account_holder_name"
                                    value={formData.account_holder_name}
                                    onChange={handleChange}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formEmail">
                            <Form.Label column sm="2">
                               Bank Account Number
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    type="text"
                                    placeholder="Bank Account Number"
                                    name="account_number"
                                    value={formData.account_number}
                                    onChange={handleChange}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                            <Form.Label column sm="2">
                                Bank Name
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    type="text"
                                    placeholder="Bank Name"
                                    name="bank_name"
                                    value={formData.bank_name}
                                    onChange={handleChange}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formPhoneNumber">
                            <Form.Label column sm="2">
                               Account Type
                            </Form.Label>
                            <Col sm="10">

                                <Form.Control
                                    type="text"
                                    placeholder="account type"
                                    name="account_type"
                                    value={formData.account_type}
                                    onChange={handleChange}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formAddSociety">
                            <Form.Label column sm="2">
                                Bank Branch
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    type="text"
                                    placeholder="bank branch"
                                    name="bank_branch"
                                    value={formData.bank_branch}
                                    onChange={handleChange}
                                />
                            </Col>
                        </Form.Group>

                        {/*  */}
                        <Form.Group as={Row} className="mb-3" controlId="formAddSociety">
                            <Form.Label column sm="2">
                                Bank IFSC
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    type="text"
                                    placeholder="bank branch"
                                    name="bank_ifsc"
                                    value={formData.bank_ifsc}
                                    onChange={handleChange}
                                />
                            </Col>
                        </Form.Group>

                        {/*  */}
                        <Form.Group as={Row} className="mb-3" controlId="formSelectUser">
                            <Form.Label column sm="2">
                                Select User
                            </Form.Label>
                            <Col sm="10">
                                <Form.Select name="bank_user" value={formData.bank_user} onChange={handleChange}>
                                    {users.map((user, index) => (
                                        <option key={index} value={user._id}>{user.name}</option>
                                    ))}
                                </Form.Select>
                            </Col>
                        </Form.Group>
                        {/* <Form.Group as={Row} className="mb-3" controlId="formAddSociety"> */}
                        <div className="d-grid gap-2">
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </div>
                    </Form>
                </Container>
            </main>
        </div>
    )
}

export default Bank