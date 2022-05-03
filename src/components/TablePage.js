import React, { useState, useEffect } from 'react';
import Table from './Table';
import { toast } from 'react-toastify';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';

import useAxiosPrivate from '../hooks/useAxiosPrivate';

const TablePage = () => {

    const [patients, setPatients] = useState([]);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    //get all the patients when page loads
    useEffect(() => {
        const controller = new AbortController();
        axiosPrivate.get('/patients', {
            signal: controller.signal
        }).then(response => {
            console.log(response.data);
            setPatients(response.data);
        }).catch(error => {
            if(error.message !== 'canceled') {
                toast("Error occurred while getting Patients");
                console.log('error occured while getting patients: ', error);
                navigate('/login', {state: { from: location }, replace: true});
            }
        });
        return () => controller.abort();
    }, []);

    const columns = React.useMemo(() => [
        {
            Header: 'Action',
            accessor: 'id',
            Cell: ({value}) => (
                <>
                <button onClick={() => navigate(`/patients/${value}`)} className="btn"><i className="bi bi-plus-square-fill"></i></button>
                </>
            ),
            disableFilters: true
        },
        {
            Header: 'OPD',
            accessor: 'opd'
        },
        {
            Header: 'First Name',
            accessor: 'firstName'
        },
        {
            Header: 'Last Name',
            accessor: 'lastName'
        },
        {
            Header: 'Gender',
            accessor: 'gender',
            disableFilters: true
        },
        {
            Header: 'Phone',
            accessor: 'phone'
        },
        {
            Header: 'Age',
            accessor: 'age',
            disableFilters: true
        },
        {
            Header: 'City',
            accessor: 'city',
            disableFilters: true
        },
        {
            Header: 'Due',
            accessor: 'due',
            disableFilters: true
        }
        ], []
    );

    return(
      <Table columns={columns} data={patients} />
    );
};

export default TablePage;