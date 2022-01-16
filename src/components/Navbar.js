import React from 'react';
import { NavLink } from "react-router-dom";

const Navbar = () => {
    return(
      <nav className="p-3 text-white bg-dark min-vh-100">
        <a className="text-white text-decoration-none" href="/">
          <span className="fs-4">CMA</span>
        </a>
        <hr/>
        <ul className ="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <NavLink to="/" className="nav-link text-white">Home</NavLink>
          </li>
          <li>
            <NavLink to="/patients" className="nav-link text-white">Patients</NavLink>
          </li>
          <li>
            <NavLink to="/add_patient" className="nav-link text-white">Add Patient</NavLink>
          </li>
        </ul>
      </nav>
    );
};

export default Navbar;