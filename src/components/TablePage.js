import React, { useState, useEffect } from 'react';
import Table from './Table';
import { toast } from 'react-toastify';

import patientService from '../services/patients';

const TablePage = () => {

    const [patients, setPatients] = useState([]);

    const fetchPatients = () => {
        patientService.getAll().then(initialPatients => {
            setPatients(initialPatients);
        }).catch(error => {
            toast("Error occurred while getting Patients");
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