import React from "react";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-toastify/dist/ReactToastify.css";

import TablePage from "./components/TablePage";
import DashboardPage from "./components/DashboardPage";
import AddPatientPage from "./components/AddPatientPage";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import LoginPage from "./components/LoginPage";
import PersistLogin from "./components/PersistLogin";
import ViewPatientPage from "./components/ViewPatientPage";
import Missing from "./components/Missing";

const App = () => {
	return (
		<Routes>
			{/* public routes */}
			<Route path="/login" element={<LoginPage />} />
			{/* we want to protect these routes */}
			<Route path="/" element={<Layout />}>
				<Route element={<PersistLogin />}>
					<Route element={<RequireAuth />}>
						<Route path="/" element={<DashboardPage />} />
						<Route path="patients" element={<TablePage />} />
						<Route path="add-patient" element={<AddPatientPage />} />
						<Route path="patients/:pid" element={<ViewPatientPage />} />
					</Route>
				</Route>
			</Route>
			{/* catch all */}
			<Route path="*" element={<Missing />} />
		</Routes>
	);
};

export default App;
