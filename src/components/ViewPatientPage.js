import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { toast } from 'react-toastify';
import Table from './Table';

import CustomModal from "./CustomModal";
import EditPatient from "./EditPatient";
import AddConsultation from "./AddConsultation";
import EditConsultation from "./EditConsultation";

const ViewPatientPage = () => {

    const [consultations, setConsultations] = useState([]);
    const [patientDetails, setPatientDetails] = useState();
    const [selectedConsultation, setSelectedConsultation] = useState("");

    const [isDeletePatientModalOpen, setIsDeletePatientModalOpen] = useState(false);
    const [isEditPatientModalOpen, setIsEditPatientModalOpen] = useState(false);

    const [isDeleteConsultationModalOpen, setIsDeleteConsultationModalOpen] = useState(false);
    const [isAddConsultationModalOpen, setIsAddConsultationModalOpen] = useState(false);
    const [isEditConsultationModalOpen, setIsEditConsultationModalOpen] = useState(false);

    const { pid } = useParams();

    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();

    const columns = React.useMemo(() => [
        {
            Header: 'Action',
            accessor: 'id',
            disableFilters: true,
            Cell: ({value}) => (
                <>
                <button onClick={() => {setIsEditConsultationModalOpen(true); setSelectedConsultation(value)}} className="btn"><i className="bi bi-pencil-fill"></i></button>
                <button onClick={() => {setIsDeleteConsultationModalOpen(true); setSelectedConsultation(value)}} className="btn"><i className="bi bi-trash3-fill"></i></button>
                </>
            )
        },
        {
            Header: 'Date',
            accessor: 'date',
            disableFilters: true
        },
        {
            Header: 'Notes',
            accessor: 'notes',
            disableFilters: true
        },
        {
            Header: 'Medicines',
            accessor: 'medicines',
            disableFilters: true
        },
        {
            Header: 'Days',
            accessor: 'days',
            disableFilters: true
        },
        {
            Header: 'MaramTherapy',
            accessor: 'maramTherapyDone',
            disableFilters: true,
            Cell: ({value}) => (<>{value === 'true' ? 'Y' : 'N'}</>)
        },
        {
            Header: 'Charged',
            accessor: 'amountCharged',
            disableFilters: true
        },
        {
            Header: 'Received',
            accessor: 'amountReceived',
            disableFilters: true
        }
        ], []
    );

    const getPatientDetails = () => {
        console.log('getting patient details');
        console.log('pid : ', pid);
        axiosPrivate.get(`/patients/${pid}`).then(response => {
            console.log(response.data);
            setPatientDetails(response.data);
        }).catch(error => {
            toast("Error occurred while getting Patient Details");
        });
    }

    const fetchConsultations = () => {
        console.log('pid : ', pid);
        axiosPrivate.get(`/patients/${pid}/consultations`).then(response => {
            console.log(response.data);
            setConsultations(response.data);
        }).catch(error => {
            toast("Error occurred while getting Consultations");
        });
    }

    const deleteConsultation = (pid, cid) => {
        console.log('deleting cid: ', cid);
        axiosPrivate.delete(`/patients/${pid}/consultations/${cid}`).then(response => {
            console.log(response.data);
            setConsultations(consultations => consultations.filter(consultations => consultations.id !== cid));
            setIsDeleteConsultationModalOpen(false);
            setSelectedConsultation("");
            toast('Consultation Deleted');
        }).catch(error => {
            toast("Error occurred while deleting Consultation");
        });
    }

    const deletePatient = (pid) => {
        console.log('deleting pid: ', pid);
        axiosPrivate.delete(`/patients/${pid}`).then(response => {
            console.log(response.data);
            navigate(`/patients`);
            toast(`Patient ${patientDetails.firstName + ' ' + patientDetails.lastName} deleted`);
        }).catch(error => {
            toast("Error occurred while deleting Patient");
        });
    }

    const getTotalDue = () => {
        return consultations.reduce((acc, c) => {
            return acc + c.amountCharged - c.amountReceived;
        }, 0);
    };

    useEffect(fetchConsultations, []);
    useEffect(getPatientDetails, []);

    return(
        <div> 
            <div className="mb-2">
                <p className="d-inline h4">Patient Details</p>
                <button onClick={() => {setIsEditPatientModalOpen(true)}} className="mx-3 d-inline btn btn-outline-primary btn-sm"><i className="bi bi-pencil-fill"></i></button>
                <button onClick={() => {setIsDeletePatientModalOpen(true)}} className="d-inline btn btn-outline-primary btn-sm"><i className="bi bi-trash3-fill"></i></button>
                <p className="d-inline h4 float-end">Total Due : ₹{getTotalDue()}</p>
            </div>
            <div className="card border-dark mb-3">
                <div className="card-body text-dark">
                    <h5 className="card-title">{patientDetails?.firstName + ' ' + patientDetails?.lastName}</h5>
                    <table style={{tableLayout: 'fixed', width: '100%'}}>
                        <tbody>
                        <tr>
                            <td><p className="card-text">Phone : {patientDetails?.phone}</p></td>
                            <td><p className="card-text">Address : {patientDetails?.address}</p></td>
                        </tr>
                        <tr>
                            <td><p className="card-text">DOB : {patientDetails?.dob}</p></td>
                            <td><p className="card-text">City : {patientDetails?.city}</p></td>
                        </tr>
                        <tr>
                            <td><p className="card-text">Gender : {patientDetails?.gender}</p></td>
                            <td><p className="card-text">Notes : {patientDetails?.notes}</p></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="mb-2">
                <p className="d-inline h4">Past Consultations</p>
                <button onClick={() => setIsAddConsultationModalOpen(true)} className="mx-3 d-inline btn btn-outline-primary btn-sm"><i className="bi bi-plus-square-fill"></i></button>
            </div>
            <Table columns={columns} data={consultations} />
            <CustomModal isModalOpen={isDeletePatientModalOpen} handleClose={() => setIsDeletePatientModalOpen(false)}>
                <p>Are you sure you want to delete this patient?</p>
                <button onClick={() => deletePatient(pid)} className='btn btn-danger'>confirm</button>
            </CustomModal>
            <CustomModal isModalOpen={isDeleteConsultationModalOpen} handleClose={() => setIsDeleteConsultationModalOpen(false)}>
                <p>Are you sure you want to delete this consultation?</p>
                <button onClick={() => deleteConsultation(pid, selectedConsultation)} className='btn btn-danger'>confirm</button>
            </CustomModal>
            <CustomModal isModalOpen={isEditPatientModalOpen} handleClose={() => setIsEditPatientModalOpen(false)}>
                <EditPatient patientDetails={patientDetails} patientId={pid} hideModal={() => setIsEditPatientModalOpen(false)} setPatientDetails={setPatientDetails}/>
            </CustomModal>
            <CustomModal isModalOpen={isAddConsultationModalOpen} handleClose={() => setIsAddConsultationModalOpen(false)}>
                <AddConsultation patientId={pid} hideModal={() => setIsAddConsultationModalOpen(false)} setConsultations={setConsultations}/>
            </CustomModal>
            <CustomModal isModalOpen={isEditConsultationModalOpen} handleClose={() => setIsEditConsultationModalOpen(false)}>
                <EditConsultation patientId={pid} consultationDetails={consultations.find(c => c.id === selectedConsultation)} hideModal={() => setIsEditConsultationModalOpen(false)} setConsultations={setConsultations} setSelectedConsultation={setSelectedConsultation}/>
            </CustomModal>
        </div>
    );
};

export default ViewPatientPage;