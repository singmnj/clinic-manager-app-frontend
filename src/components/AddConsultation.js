import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import useAxiosPrivate from "../hooks/useAxiosPrivate";

const AddConsultation = ({ patientId, hideModal, setConsultations }) => {
	const axiosPrivate = useAxiosPrivate();

	const { register, handleSubmit } = useForm({
		defaultValues: {
			date: new Date().toISOString().substring(0, 10),
			notes: "",
			medicines: "",
			days: 0,
			amountCharged: 0,
			amountReceived: 0,
			maramTherapyDone: false,
		},
	});

	const saveConsultation = (consultationObject, e) => {
		consultationObject.amountCharged = parseInt(
			consultationObject.amountCharged
		);
		consultationObject.amountReceived = parseInt(
			consultationObject.amountReceived
		);
		consultationObject.days = parseInt(consultationObject.days);
		console.log(consultationObject);
		axiosPrivate
			.post(`/patients/${patientId}/consultations`, consultationObject)
			.then((response) => {
				console.log(response.data);
				toast(`Consultation Added`);
				consultationObject.id = response.data.id;
				setConsultations((list) => list.concat(consultationObject));
				hideModal();
				e.target.reset();
			})
			.catch((error) => {
				console.error(error);
				toast("Error occurred while Saving Consultation");
			});
	};

	return (
		<form onSubmit={handleSubmit(saveConsultation)}>
			<div className="container">
				<div className="row">
					<h1>Add Consultation</h1>
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
								value={true}
								className="form-check-input"
								{...register("maramTherapyDone")}
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

export default AddConsultation;
