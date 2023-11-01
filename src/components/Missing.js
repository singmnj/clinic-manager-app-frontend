import { Link } from "react-router-dom";

const Missing = () => {
	return (
		<article className="vh-100 d-flex flex-column align-items-center justify-content-center">
			<h1 className="display-1 strong">Oops!</h1>
			<p className="display-6">Page Not Found</p>
			<div>
				<Link to="/">Go to Homepage</Link>
			</div>
		</article>
	);
};

export default Missing;
