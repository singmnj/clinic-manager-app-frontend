import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import useAxiosPrivate from "../hooks/useAxiosPrivate";

const EditConsultation = ({
	patientId,
	consultationDetails,
	hideModal,
	setConsultations,
	setSelectedConsultation,
}) => {
	const axiosPrivate = useAxiosPrivate();

	const { register, handleSubmit } = useForm({
		defaultValues: consultationDetails,
	});

	const editConsultation = (consultationObject) => {
		consultationObject.id = consultationDetails.id;
		consultationObject.amountCharged = parseInt(
			consultationObject.amountCharged
		);
		consultationObject.amountReceived = parseInt(
			consultationObject.amountReceived
		);
		consultationObject.days = parseInt(consultationObject.days);
		console.log(consultationObject);
		axiosPrivate
			.put(
				`/patients/consultations/${consultationObject.id}`,
				consultationObject
			)
			.then((response) => {
				console.log(response.data);
				toast(`Consultation Edited`);
				setConsultations((list) =>
					list.map((c) =>
						c.id === consultationObject.id ? consultationObject : c
					)
				);
				hideModal();
				setSelectedConsultation("");
			})
			.catch((error) => {
				console.error(error);
				toast("Error occurred while Saving Consultation");
			});
	};

	return (
		<form onSubmit={handleSubmit(editConsultation)}>
			<div className="container">
				<div className="row">
					<h1>Edit Consultation</h1>
					<hr />
					<div className="col-md-2">
						<label htmlFor="date">Date</label>
						<input
							type="date"
							id="date"
							className="form-control"
							{...register("date", { required: true })}
						/>
					</div>
				</div>

				<div className="row mt-3">
					<div className="col-md-3">
						<label htmlFor="notes">Notes</label>
						<input
							type="text"
							id="notes"
							className="form-control"
							{...register("notes")}
						/>
					</div>
					<div className="col-md-3">
						<label htmlFor="medicines">Medicines</label>
						<input
							type="text"
							id="medicines"
							className="form-control"
							{...register("medicines")}
						/>
					</div>
				</div>

				<div className="row mt-3">
					<div className="col-md-3">
						<label htmlFor="days">Days</label>
						<input
							type="number"
							id="days"
							className="form-control"
							{...register("days")}
						/>
					</div>
					<div className="col-md-3 form-check">
						<div className="mt-4 mx-3">
							<label className="form-check-label" htmlFor="maramCheck">
								{" "}
								MaramTherapy Done{" "}
							</label>
							<input
								type="checkbox"
								id="maramCheck"
								className="form-check-input"
								{...register("maramTherapyDone")}
								defaultChecked={consultationDetails?.maramTherapyDone === true}
							/>
						</div>
					</div>
				</div>

				<div className="row mt-3">
					<div className="col-md-3">
						<label htmlFor="amountCharged">Amount Charged</label>
						<input
							type="number"
							id="amountCharged"
							className="form-control"
							{...register("amountCharged")}
						/>
					</div>
					<div className="col-md-3">
						<label htmlFor="amountReceived">Amount Received</label>
						<input
							type="number"
							id="amountReceived"
							className="form-control"
							{...register("amountReceived")}
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

export default EditConsultation;
