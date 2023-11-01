import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axiosPrivate from "../api/axios";

const LoginPage = () => {
	const { setAuth, persist, setPersist } = useAuth();

	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || "/";

	const userRef = useRef();
	const errRef = useRef();

	const [user, setUser] = useState("");
	const [pwd, setPwd] = useState("");
	const [errMsg, setErrMsg] = useState("");

	useEffect(() => {
		userRef.current.focus();
	}, []);

	useEffect(() => {
		setErrMsg("");
	}, [user, pwd]);

	const togglePersist = () => {
		setPersist((prev) => !prev);
	};

	useEffect(() => {
		localStorage.setItem("persist", persist);
	}, [persist]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await axiosPrivate.post("/auth/login", {
				username: user,
				password: pwd,
			});
			console.log(JSON.stringify(response?.data));
			const accessToken = response?.data?.accessToken;
			setAuth({ user, accessToken });
			setUser("");
			setPwd("");
			navigate(from, { replace: true });
		} catch (err) {
			console.error(err);
			if (!err?.response) {
				setErrMsg("No Server Response");
			} else if (err.response?.status === 400) {
				setErrMsg("Missing Username or Password");
			} else if (err.response?.status === 401) {
				setErrMsg("Unauthorized");
			} else {
				setErrMsg("Login Failed");
			}
			errRef.current.focus();
		}
	};

	return (
		<div className="container">
			<div className="row mt-5"></div>
			<div className="row mt-5">
				<div
					className="col-md-4 mx-auto p-5"
					style={{ minWidth: 500, border: "solid black" }}
				>
					<h1>CMA Sign In</h1>
					<hr />
					<p
						ref={errRef}
						className={errMsg ? "alert alert-danger" : "invisible"}
						aria-live="assertive"
					>
						{errMsg}
					</p>
					<form onSubmit={handleSubmit}>
						<div className="mx-auto mt-5 p-2">
							<label className="form-label" htmlFor="username">
								Username
							</label>
							<input
								type="text"
								id="username"
								ref={userRef}
								autoComplete="off"
								onChange={(e) => setUser(e.target.value)}
								value={user}
								required
								className="form-control form-control-lg"
							/>
						</div>
						<div className="mx-auto p-2">
							<label className="form-label" htmlFor="password">
								Password
							</label>
							<input
								type="password"
								id="password"
								onChange={(e) => setPwd(e.target.value)}
								value={pwd}
								required
								className="form-control form-control-lg"
							/>
						</div>
						<div className="mx-auto mt-5 d-flex justify-content-center">
							<button className="btn btn-primary" type="submit">
								Sign In
							</button>
						</div>
						<div className="mx-auto mt-3 form-check">
							<input
								type="checkbox"
								id="persist"
								onChange={togglePersist}
								checked={persist}
								className="form-check-input"
							/>
							<label htmlFor="persist" className="form-check-label">
								Trust This Device
							</label>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
