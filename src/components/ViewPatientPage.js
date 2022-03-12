import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { toast } from 'react-toastify';
import Table from './Table';

const ViewPatientPage = () => {

    const [consultations, setConsultations] = useState([]);

    const { pid } = useParams();

    const axiosPrivate = useAxiosPrivate();

    const columns = React.useMemo(() => [
        {
            Header: 'Action',
            accessor: 'id',
            Cell: ({value}) => (
                <>
                <button onClick={() => {}} className="btn"><i className="bi bi-pencil-fill"></i></button>
                <button onClick={() => {}} className="btn"><i className="bi bi-trash3-fill"></i></button>
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

    const fetchConsultations = () => {
        console.log('pid : ', pid);
        axiosPrivate.get(`/api/patients/${pid}/consultations`).then(response => {
            console.log(response.data);
            setConsultations(response.data);
        }).catch(error => {
            toast("Error occurred while getting Consultations");
        });
    }

    useEffect(fetchConsultations, []);

    return(
        <div>
            <h5>Patient View</h5>
            {pid}
            <h5>Past Consultations</h5>
            <Table columns={columns} data={consultations} />
        </div>
    );
};

export default ViewPatientPage;