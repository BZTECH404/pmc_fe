import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  HashRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import Tender from './Layouts/Tender';
import Tenderdetails from './Layouts/Tenderdetails';
import AdminPanel from './Layouts/Adminpannel';
import TenderDetailuser from './Layouts/TenderDetailuser';
import MyAccount from './Layouts/MyAccount';
import Admin from './Admin/Admin';
import AdminTender from './Admin/AdminTender';
import AdminUsers from './Admin/AdminUsers';
import AdminTenderDetails from './Admin/AdminTenderDetails';
import TenderFiles from './Admin/TenderFiles';
import Society from './Soctiey/Society';
import SocietyList from './Soctiey/SocietyList';
import Bank from './Admin/Bank';
import { ToastContainer, toast } from 'react-toastify';

// import Admin from './Layouts/Admin';


function App() {

  return (
    <HashRouter>
      <Routes>
      
        <Route path="/" element={<Tender />} />
        <Route path='/tender-details/:id' element={<Tenderdetails />} />
        <Route path='/user/tender' element={<TenderDetailuser />} />
        <Route exact path='/myaccount' element={<MyAccount />} />
        <Route exact path='/admin' element={<Admin />} />
        <Route exact path='/admin/tenders' element={<AdminTender />} />
        <Route exact path='/admin/users' element={<AdminUsers />} />
        <Route exact path='/admin/Folder' element={<TenderFiles />} />
        <Route exact path='/admin/society' element={<Society />} />
        <Route exact path="/society/list" element={<SocietyList />} />
        <Route exact path="/admin/society/bank" element={<Bank />} />
        {/* <Route exact path ="/society/list/user" element={} */}
        {/* <Route exact */}
        <Route exact path='/admin/tenders/details' element={<AdminTenderDetails />} />

      </Routes>
    </HashRouter>
  );
}

export default App;
