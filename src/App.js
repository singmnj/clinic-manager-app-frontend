import React from 'react';
import { ToastContainer } from 'react-toastify';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Navbar';
import TablePage from './components/TablePage';
import DashboardPage from './components/DashboardPage';
import AddPatientPage from './components/AddPatientPage';

const App = () => (
  <BrowserRouter>
    <div className="container-fluid">
      <div className="row">
        <div className="col-2 m-0 p-0 position-fixed" style={{'width': '250px'}}>
          <Navbar />
        </div>
        <div className="col-10 mt-3 mb-3" style={{'margin-left': '250px'}}>
          <Routes>
            <Route path="/" element={<DashboardPage />}/>
            <Route path="/patients" element={<TablePage />}/>
            <Route path="/add_patient" element={<AddPatientPage />}/>
          </Routes>
        </div>
      </div>
    </div>
    <ToastContainer />
  </BrowserRouter>
);

export default App;