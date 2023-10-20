import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import useAxiosPrivate from "../hooks/useAxiosPrivate";

const EditPatient = ({
	patientDetails,
	patientId,
	hideModal,
	setPatientDetails,
}) => {
	const axiosPrivate = useAxiosPrivate();

	const { register, handleSubmit } = useForm({
		defaultValues: patientDetails,
	});

	const editPatient = (patientObject) => {
		console.log(patientObject);
		axiosPrivate
			.put(`/patients/${patientId}`, patientObject)
			.then((response) => {
				console.log(response.data);
				toast(`Patient ${patientObject.opd} Edited`);
				setPatientDetails(patientObject);
				hideModal();
			})
			.catch((error) => {
				console.error(error);
				toast("Error occurred while Saving Patient");
			});
	};

	return (
		<form onSubmit={handleSubmit(editPatient)}>
			<div className="container">
				<div className="row">
					<h1>Edit Patient</h1>
					<hr />
					<div className="col-md-2">
						<label htmlFor="opd">OPD Number</label>
						<input
							type="text"
							id="opd"
							className="form-control"
							{...register("opd", { required: true })}
						/>
					</div>
				</div>

				<div className="row mt-3">
					<h5>Personal Information</h5>
					<div className="col-md-3">
						<label htmlFor="firstName">First Name</label>
						<input
							type="text"
							id="firstName"
							className="form-control"
							{...register("firstName", { required: true })}
						/>
					</div>
					<div className="col-md-3">
						<label htmlFor="lastName">Last Name</label>
						<input
							type="text"
							id="lastName"
							className="form-control"
							{...register("lastName", { required: true })}
						/>
					</div>
				</div>

				<div className="row mt-3">
					<div className="col-md-3">
						<label>Gender</label>
						<div className="mt-2">
							<input
								type="radio"
								id="male"
								value="M"
								className="form-check-input"
								{...register("gender", { required: true })}
								defaultChecked={patientDetails.gender === "M"}
							/>
							<label className="form-check-label" htmlFor="male">
								Male
							</label>{" "}
							<input
								type="radio"
								id="female"
								value="F"
								className="form-check-input"
								{...register("gender", { required: true })}
								defaultChecked={patientDetails.gender === "F"}
							/>
							<label className="form-check-label" htmlFor="female">
								Female{" "}
							</label>{" "}
							<input
								type="radio"
								id="other"
								value="O"
								className="form-check-input"
								{...register("gender", { required: true })}
								defaultChecked={patientDetails.gender === "O"}
							/>
							<label className="form-check-label" htmlFor="other">
								Other{" "}
							</label>
						</div>
					</div>
					<div className="col-md-3">
						<label htmlFor="dob">DOB</label>
						<input
							type="date"
							id="dob"
							className="form-control"
							{...register("dob", { required: true })}
						/>
					</div>
				</div>

				<div className="row mt-3">
					<h5>Contact Information</h5>
					<div className="col-md-3">
						<label htmlFor="phone">Phone</label>
						<input
							type="tel"
							id="phone"
							className="form-control"
							{...register("phone")}
						/>
					</div>
					<div className="col-md-3">
						<label id="address">Address</label>
						<input
							type="text"
							id="address"
							className="form-control"
							{...register("address")}
						/>
					</div>
				</div>

				<div className="row">
					<div className="col-md-2">
						<label htmlFor="city">City</label>
						<input
							type="text"
							id="city"
							className="form-control"
							{...register("city", { required: true })}
						/>
					</div>
				</div>

				<div className="row mt-3">
					<div className="col-md-3">
						<h5 id="notes">Notes</h5>
						<input
							type="text"
							id="notes"
							className="form-control"
							{...register("notes")}
						/>
					</div>
				</div>

				<div className="row mt-3">
					<div>
						<button type="submit" className="btn btn-primary">
							Submit
						</button>
					</div>
				</div>
			</div>
		</form>
	);
};

export default EditPatient;
