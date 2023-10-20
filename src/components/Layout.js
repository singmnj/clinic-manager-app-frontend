import React from "react";
import { ToastContainer } from "react-toastify";
import { Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./Navbar";

const Layout = () => {
	return (
		<main className="container-fluid">
			<div className="row">
				<div className="col-2 m-0 p-0 position-fixed" style={{ width: "15%" }}>
					<Navbar />
				</div>
				<div className="col-10 mt-3 mb-3" style={{ marginLeft: "15%" }}>
					<Outlet />
				</div>
			</div>
			<ToastContainer />
		</main>
	);
};

export default Layout;
