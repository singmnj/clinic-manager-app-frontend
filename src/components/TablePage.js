import React, { useState, useEffect } from 'react';
import Table from './Table';
import { toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';

import useAxiosPrivate from '../hooks/useAxiosPrivate';

const TablePage = () => {

    const [patients, setPatients] = useState([]);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    const fetchPatients = () => {
        axiosPrivate.get('/api/patients').then(response => {
            console.log(response.data);
            setPatients(response.data);
        }).catch(error => {
            toast("Error occurred while getting Patients");
            navigate('/login', {state: { from: location }, replace: true});
        });
    };

    useEffect(fetchPatients, []);

    const columns = React.useMemo(() => [
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
            Header: 'Address',
            accessor: 'address',
            disableFilters: true
        },
        {
            Header: 'City',
            accessor: 'city',
            disableFilters: true
        },
        {
            Header: 'Disease',
            accessor: 'notes',
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