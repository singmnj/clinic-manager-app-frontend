import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

const DashboardPage = () => {
	const axiosPrivate = useAxiosPrivate();

	const [stats, setStats] = useState({});
	const [isLoading, setIsLoading] = useState(true);

	const getConsultationsChartData = () => {
		let labels = [];
		for (let i = 6; i >= 0; i--) {
			let date = new Date();
			date.setDate(date.getDate() - i);
			labels.push(date.getDate());
		}
		const data = {
			labels: labels,
			datasets: [
				{
					label: "# of Consultations",
					data: stats.last7DaysConsultations,
					backgroundColor: "rgba(255, 99, 132, 0.5)",
				},
			],
		};
		return data;
	};

	const getEarningsChartData = () => {
		let labels = [];
		for (let i = 5; i >= 0; i--) {
			let date = new Date();
			date.setMonth(date.getMonth() - i);
			labels.push(date.toLocaleString("en-us", { month: "long" }));
		}
		const data = {
			labels: labels,
			datasets: [
				{
					label: "₹ Earnings",
					data: stats.last6MonthsEarnings,
					backgroundColor: "rgba(53, 162, 235, 0.5)",
				},
			],
		};
		return data;
	};

	//get the stats when page loads
	useEffect(() => {
		const controller = new AbortController();
		axiosPrivate
			.get("/stats", {
				signal: controller.signal,
			})
			.then((response) => {
				console.log(response.data);
				setStats(response.data);
				setIsLoading(false);
			})
			.catch((error) => {
				if (error.message !== "canceled") {
					toast("Error occurred while getting Stats");
					console.log("error occured while getting stats: ", error);
				}
			});
		return () => controller.abort();
	}, []);

	return (
		<>
			{isLoading ? (
				<p>Loading...</p>
			) : (
				<div className="ms-2">
					<h3>Dashboard</h3>
					<hr />
					<div className="row row-cols-1 row-cols-md-4 g-4">
						<div className="col">
							<div className="card text-center border-dark h-100">
								<div className="card-body">
									<div className="card-title">
										<h5>Total Unique Patients</h5>
									</div>
									<div className="card-text mt-5">
										<h1 className="display-1">{stats.totalUniquePatients}</h1>
									</div>
								</div>
							</div>
						</div>
						<div className="col">
							<div className="card text-center border-dark h-100">
								<div className="card-body">
									<div className="card-title">
										<h5>Patients with Dues</h5>
									</div>
									<div className="card-text mt-5">
										<h1 className="display-1">{stats.patientsWithDues}</h1>
									</div>
								</div>
							</div>
						</div>
						<div className="col">
							<div className="card text-center border-dark h-100">
								<div className="card-body">
									<div className="card-title">Total 5 patients with dues</div>
									<div className="card-text">
										<table className="table table-sm">
											<thead>
												<tr>
													<th>#</th>
													<th>Name</th>
													<th>Due</th>
												</tr>
											</thead>
											<tbody>
												{stats.topPatientsWithDues?.map((p, index) => {
													return (
														<tr key={index}>
															<td>{p.opd}</td>
															<td>{`${p.firstName} ${p.lastName}`}</td>
															<td>{`₹ ${p.due}`}</td>
														</tr>
													);
												})}
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
						<div className="col">
							<div className="card text-center border-dark h-100">
								<div className="card-body">
									<div className="card-title">
										<h5>Total Dues</h5>
									</div>
									<div className="card-text mt-5">
										<h1 className="display-1">{`₹ ${stats.totalDues}`}</h1>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="row row-cols-1 row-cols-md-2 g-4 mt-1">
						<div className="col">
							<div className="card text-center border-dark">
								<div className="card-body">
									<div className="card-text">
										<Bar
											data={getConsultationsChartData()}
											options={{
												plugins: {
													title: {
														display: true,
														text: "Last 7 days Consultations",
													},
												},
											}}
										/>
									</div>
								</div>
							</div>
						</div>
						<div className="col">
							<div className="card text-center border-dark">
								<div className="card-body">
									<div className="card-text">
										<Bar
											data={getEarningsChartData()}
											options={{
												plugins: {
													title: {
														display: true,
														text: "Last 6 months Earnings",
													},
												},
											}}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default DashboardPage;
