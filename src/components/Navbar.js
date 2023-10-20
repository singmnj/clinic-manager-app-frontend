import React from "react";
import { NavLink } from "react-router-dom";
import Logout from "./Logout";

const Navbar = () => {
	return (
		<div className="position-relative">
			<nav className="p-3 text-white bg-dark min-vh-100">
				<a className="text-white text-decoration-none" href="/">
					<span className="fs-4">CMA</span>
				</a>
				<hr />
				<ul className="nav nav-pills flex-column mb-auto">
					<li className="nav-item">
						<NavLink to="/" className="nav-link text-white">
							Home
						</NavLink>
					</li>
					<li>
						<NavLink to="/patients" className="nav-link text-white">
							Patients
						</NavLink>
					</li>
					<li>
						<NavLink to="/add_patient" className="nav-link text-white">
							Add Patient
						</NavLink>
					</li>
				</ul>
				<div className="position-absolute bottom-0 mb-3">
					<Logout />
				</div>
			</nav>
		</div>
	);
};

export default Navbar;
