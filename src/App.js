import React from 'react';
import { Route, NavLink, Routes, BrowserRouter } from "react-router-dom";
import TablePage from './components/TablePage';
import DashboardPage from './components/DashboardPage';

const App = () => (
  <div>
    <BrowserRouter>
      <div>
        <h1>Clinic Manager</h1>
        <ul className="header">
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/patients">Patients</NavLink></li>
        </ul>
        <div className="content">
          <Routes>
            <Route path="/" element={<DashboardPage />}/>
            <Route path="/patients" element={<TablePage />}/>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  </div>
);

export default App;