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
import Bidder from './Bidder';
import { baseurl } from "../api";

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

export default function SocietyList() {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);

  const token = localStorage.getItem('token');

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}` // Use the token here
    }
  };
  const apiEndpoint = `${baseurl}/api/tenders/society`;

  const tenderData = async () => {
    const res = await axios.get(apiEndpoint, config);
    //console.log(res.data.data, 'res');
    setData(res.data.data);
    setCount(res.data.count);
  }
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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [currentItem, setCurrentItem] = useState(null);
  const handleClick = (item) => (event) => {
    setAnchorEl(event.currentTarget);
    setCurrentItem(item);
  };

  // 
  useEffect(() => {
    tenderData();
  },[])
  // 

  // const [bid,setBid] = useState();
  
  // // const [data, setData] = useState([]);
  // const [searchTerm1, setSearchTerm1] = useState('');
  // const [page1, setPage1] = useState(0);
  // const [rowsPerPage1, setRowsPerPage1] = useState(10);

  // useEffect(() => {
  //   axios.get(`${baseurl}/api/society-tenders`,config)
  //     .then(response => {
  //       //console.log(response.data.data);
  //       setBid(response.data.data.map(item => item.name));
  //     });
  // }, []);

  // 

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <SocietyHeader />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
        <Paper className={classes.paper}>
            <Typography style={{ textAlign: 'center' }}>
              Tenders List
            </Typography>
            <br />
            {/* <TextField
              label="Search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            /> */}
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
                  <th>End Date</th>
                  {/* <th>Action</th> */}

                </tr>
              </thead>
              <tbody>
                {data && data.filter((item) => item.title.includes(searchTerm))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item, index) => (

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
            <TablePagination
              component="div"
              count={data ? data.length : 0}
              page={page}
              onChangePage={(event, newPage) => setPage(newPage)}
              rowsPerPage={rowsPerPage}
              onChangeRowsPerPage={(event) => {
                setRowsPerPage(parseInt(event.target.value, 10));
                setPage(0);
              }}
            />
          </Paper>
          <hr/>
              <Bidder/>
     
        </Container>
      </main>
    </div>
  )
}
