import React from "react";
import { useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";

const Logout = () => {
	const navigate = useNavigate();
	const logout = useLogout();

	const signOut = async () => {
		await logout();
		navigate("/login");
	};

	return (
		<button type="button" className="btn btn-outline-primary" onClick={signOut}>
			Logout
		</button>
	);
};

export default Logout;
