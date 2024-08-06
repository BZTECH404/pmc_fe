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
import  {baseurl}  from "../api";
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

function AdminUsers() {

  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [role, setRole] = useState('all');

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

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

<Grid container justify="flex-start">
  <Grid item>
    <Select value={role} onChange={handleRoleChange}>
      <MenuItem value="all">All</MenuItem>
      <MenuItem value="developer">Developer</MenuItem>
      <MenuItem value="society">Society</MenuItem>
    </Select>
  </Grid>
</Grid>


          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>phone</TableCell>
                  <TableCell>Role</TableCell>

                  <TableCell>Created At</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users && users
                  .filter((user) => user.name.includes(searchTerm) && (role === 'all' || user.role === role))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((user) => (
                    <TableRow key={user && user._id}>
                      <TableCell>{user && user.name}</TableCell>
                      <TableCell>{user && user.email}</TableCell>
                      <TableCell>{user && user.phone}</TableCell>

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
        </Container>
      </main>
    </div>
  )
}

export default AdminUsers