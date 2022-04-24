import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { toast } from 'react-toastify';
import Table from './Table';

import ConfirmationDialogModal from "./ConfirmationDialogModal";
import EditConsultationModal from "./EditConsultationModal";

const ViewPatientPage = () => {

    const [consultations, setConsultations] = useState([]);
    const [patientDetails, setPatientDetails] = useState();

    const [showDeleteConsultationModal, setShowDeleteConsultationModal] = useState(false);
    const [showDeletePatientModal, setShowDeletePatientModal] = useState(false);
    const [showEditConsultationModal, setShowEditConsultationModal] = useState(false);
    const [showEditPatientModal, setShowEditPatientModal] = useState(false);

    const { pid } = useParams();

    const axiosPrivate = useAxiosPrivate();

    const columns = React.useMemo(() => [
        {
            Header: 'Action',
            accessor: 'id',
            Cell: ({value}) => (
                <>
                <button onClick={() => editConsultation(pid, value)} className="btn"><i className="bi bi-pencil-fill"></i></button>
                <button onClick={() => deleteConsultation(pid, value)} className="btn"><i className="bi bi-trash3-fill"></i></button>
                </>
            )
        },
        {
            Header: 'Date',
            accessor: 'date'
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
            disableFilters: true
        },
        {
            Header: 'Charged',
            accessor: 'chargedAmount',
            disableFilters: true
        },
        {
            Header: 'Received',
            accessor: 'receivedAmount',
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
            toast("Error occurred while Patient Details");
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
        }).catch(error => {
            toast("Error occurred while deleting Consultation");
        });
    }

    const editConsultation = (pid, cid) => {
        console.log('editing Consultation: ', cid);
        setShowEditConsultationModal(true);
    }

    useEffect(fetchConsultations, []);
    useEffect(getPatientDetails, []);

    return(
        <div> 
            <div className="mb-2">
                <p className="d-inline h4">Patient Details</p>
                <button onClick={() => {editConsultation(pid)}} className="mx-3 d-inline btn btn-outline-primary btn-sm"><i className="bi bi-pencil-fill"></i></button>
                <button onClick={() => {editConsultation(pid)}} className="d-inline btn btn-outline-primary btn-sm"><i className="bi bi-trash3-fill"></i></button>
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
                <button onClick={() => {editConsultation(pid)}} className="mx-3 d-inline btn btn-outline-primary btn-sm"><i className="bi bi-plus-square-fill"></i></button>
            </div>
            <Table columns={columns} data={consultations} />
            <ConfirmationDialogModal show={showDeleteConsultationModal} handleClose={() => setShowDeleteConsultationModal(false)}/>
            <EditConsultationModal show={showEditConsultationModal} handleClose={() => setShowEditConsultationModal(false)}/>
        </div>
    );
};

export default ViewPatientPage;