import React from 'react';
import Table from './Table';

const TablePage = () => {

    const data = React.useMemo(() => [
        {
            opd: 'A1',
            firstName: 'Kim',
            lastName: 'Parrish',
            address: '4420 Valley Street, Garnerville, NY 10923',
            gender: 'F',
            phone: '1213243243',
            age: 24,
            city: 'Patiala',
            notes: 'yup',
            due: 900
        },
        {
            opd: 'A1',
            firstName: 'Kim',
            lastName: 'Parrish',
            address: '4420 Valley Street, Garnerville, NY 10923',
            gender: 'F',
            phone: '1213243243',
            age: 24,
            city: 'Patiala',
            notes: 'yup',
            due: 900
        },{
            opd: 'A1',
            firstName: 'Kim',
            lastName: 'Parrish',
            address: '4420 Valley Street, Garnerville, NY 10923',
            gender: 'F',
            phone: '1213243243',
            age: 24,
            city: 'Patiala',
            notes: 'yup',
            due: 900
        },{
            opd: 'A1',
            firstName: 'Kim',
            lastName: 'Parrish',
            address: '4420 Valley Street, Garnerville, NY 10923',
            gender: 'F',
            phone: '1213243243',
            age: 24,
            city: 'Patiala',
            notes: 'yup',
            due: 900
        },{
            opd: 'A1',
            firstName: 'Kim',
            lastName: 'Parrish',
            address: '4420 Valley Street, Garnerville, NY 10923',
            gender: 'F',
            phone: '1213243243',
            age: 24,
            city: 'Patiala',
            notes: 'yup',
            due: 900
        },
        {
            opd: 'A1',
            firstName: 'Kim',
            lastName: 'Parrish',
            address: '4420 Valley Street, Garnerville, NY 10923',
            gender: 'F',
            phone: '1213243243',
            age: 24,
            city: 'Patiala',
            notes: 'yup',
            due: 900
        }
    ], []
    );

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
      <Table columns={columns} data={data} />
    );
};

export default TablePage;