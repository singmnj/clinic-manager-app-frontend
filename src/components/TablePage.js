import React from 'react';
import styled from 'styled-components';
import Table from './Table';

const Styles = styled.div`
  padding: 1rem;

  input {
      width: 80%;
  }

  table {
    table-layout: fixed;
    width: 100%;
    border-spacing: 0;
    border: 1px solid black;
    font-family: Verdana;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }

  .pagination {
    padding: 0.5rem;
    font-family: Verdana;
  }
`

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
        <Styles>
            <Table columns={columns} data={data} />
        </Styles>
    );
};

export default TablePage;