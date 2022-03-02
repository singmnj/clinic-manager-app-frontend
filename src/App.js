import React from 'react';
import { Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';

import TablePage from './components/TablePage';
import DashboardPage from './components/DashboardPage';
import AddPatientPage from './components/AddPatientPage';
import Layout from './components/Layout';
import RequireAuth from './components/RequireAuth';
import LoginPage from './components/LoginPage';
import PersistLogin from './components/PersistLogin';

const App = () => {
  return(
    <Routes>
      <Route path="/login" element={<LoginPage />} />
        {/* we want to protect these routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<DashboardPage />}/>
            <Route path="patients" element={<TablePage />}/>
            <Route path="add_patient" element={<AddPatientPage />}/>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default App;