import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import LayersIcon from "@material-ui/icons/Layers";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { Link, useNavigate } from 'react-router-dom';
import ExtensionIcon from '@mui/icons-material/Extension';
import DisplaySettingsRoundedIcon from '@mui/icons-material/DisplaySettingsRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import ContactMailRoundedIcon from '@mui/icons-material/ContactMailRounded';
import DomainAddIcon from '@mui/icons-material/DomainAdd';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
// import AssignmentIcon from "@material-ui/icons/Assignment";
// const navigate = useNavigate();
export const mainListItems = (

  <div>
    <ListItem button component={Link} to="/society/list">
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Society DashBoard" />
      {/*  */}


    </ListItem>

    {/*  */}
    {/* <ListItem button component={Link} to="/society/list/user">
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Society DashBoard" /> */}
      {/*  */}


    {/* </ListItem> */}

    {/*  */}
    {/*  */}
    {/* <ListItem button component={Link} to="/admin/society">
      <ListItemIcon>
        <DomainAddIcon />
      </ListItemIcon>
      <ListItemText primary="Create Society" />
    </ListItem> */}

    {/* <ListItem button component={Link} to="/admin/society/list">
      <ListItemIcon>
        <FormatListNumberedIcon />
      </ListItemIcon>
      <ListItemText primary="Society tender" />
    </ListItem> */}
    {/*  */}
    {/* <ListItem button component={Link} to="/admin/Folder">
      <ListItemIcon>
        <ExtensionIcon />
      </ListItemIcon>
      <ListItemText primary="Tender Files" />
    </ListItem> */}

    {/* <ListItem button component={Link} to="/admin/users">
      <ListItemIcon>
        <AccountCircleRoundedIcon />
      </ListItemIcon>
      <ListItemText primary="User" />

    </ListItem> */}

    {/* <ListItem button component={Link} to="/admin/tenders">
      <ListItemIcon>
        <DisplaySettingsRoundedIcon />
      </ListItemIcon>
      <ListItemText primary="Tender" /> */}

    {/* </ListItem> */}
    {/* <ListItem button component={Link} to="/admin/users">
      <ListItemIcon>
        <AccountCircleRoundedIcon />
      </ListItemIcon>
      <ListItemText primary="User" />

    </ListItem> */}
    {/* logout */}


    {/*  */}
    {/* <ListItem button component={Link} to="/admin/tenders">
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Folder" />

    </ListItem> */}
    {/* <ListItem button component={Link} to="/admin/tenders/details">
      <ListItemIcon>
        <ContactMailRoundedIcon />
      </ListItemIcon>
      <ListItemText primary="Tender Details" />

    </ListItem> */}
    {/*  */}

    {/*  */}
    <ListItem
      button
      component={Link}
      to="/"
      onClick={() => {
        localStorage.clear();
      }}
    >
      <ListItemIcon>
        <LogoutRoundedIcon />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItem>
    {/*  */}
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>
  </div>
);
