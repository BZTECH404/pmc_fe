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

function Society() {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    add_society: '',
    role: 'society'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${baseurl}/api/register`, formData);
      // Handle success, maybe redirect user or show a success message
      //console.log('Registration successful');
    } catch (error) {
      // Handle error, maybe show an error message
      console.error('Registration failed:', error);
    }
  };
  // 
  const [users, setUsers] = useState([]);
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

  // 
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
                Society Name
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  placeholder="Society Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formEmail">
              <Form.Label column sm="2">
                Email
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
              <Form.Label column sm="2">
                Password
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formPhoneNumber">
              <Form.Label column sm="2">
                Phone
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="tel"
                  placeholder="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formAddSociety">
              <Form.Label column sm="2">
                Society Address 
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  placeholder="Add Society"
                  name="add_society"
                  value={formData.add_society}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>

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

export default Society