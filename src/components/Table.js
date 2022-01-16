import React from 'react';
import { useTable, useSortBy, useFilters, usePagination } from 'react-table';

const Table = ({ columns, data }) => {

    const defaultColumn = React.useMemo(
        () => ({
            Filter: TextFilter,
        }),
        []
    )

    function TextFilter({ column: { filterValue, preFilteredRows, setFilter }, }) {
        return (
          <input
                value={filterValue || ''}
                onChange={e => {
                    setFilter(e.target.value || undefined)
                }}
                placeholder={`Search`}
                className="form-control form-control-sm"
          />
        );
    }

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        pageOptions,
        state: { pageIndex, pageSize },
        canPreviousPage,
        canNextPage,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
       } = useTable({ columns, data, defaultColumn, initialState: { pageSize: 10 }, }, useFilters, useSortBy, usePagination);

    return (
        <div>
            <table {...getTableProps()} className="table table-striped table-sm table-bordered table-hover">
                <thead className="table-dark" style={{'position': 'sticky', 'top': 0}}>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps(column.getSortByToggleProps())} className="text-center align-middle">
                            {column.render('Header')}
                            <span>
                                {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                            </span>
                            <div>{column.canFilter ? column.render('Filter') : null}</div>
                        </th>
                    ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {page.map(row => {
                    prepareRow(row)
                    return (
                    <tr {...row.getRowProps()}>
                        {row.cells.map(cell => {
                            return <td {...cell.getCellProps()} className="text-center align-middle" >{cell.render('Cell')}</td>
                        })}
                    </tr>
                    )
                })}
                </tbody>
            </table>
            <div className="mt-3">
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage} className="btn btn-outline-dark">
                {'<<'}
                </button>{' '}
                <button onClick={() => previousPage()} disabled={!canPreviousPage} className="btn btn-outline-dark">
                {'<'}
                </button>{' '}
                <button onClick={() => nextPage()} disabled={!canNextPage} className="btn btn-outline-dark">
                {'>'}
                </button>{' '}
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} className="btn btn-outline-dark">
                {'>>'}
                </button>{' '}
                <span>
                Page{' '}
                <strong>
                    {pageIndex + 1} of {pageOptions.length}
                </strong>{' '}
                </span>
                <span>
                | Go to page:{' '}
                <input
                    type="number"
                    defaultValue={pageIndex + 1}
                    onChange={e => {
                        const page = e.target.value ? Number(e.target.value) - 1 : 0
                        gotoPage(page)
                    }}
                    style={{ width: '100px' }}
                />
                </span>{' '}
                <select
                value={pageSize}
                onChange={e => {
                    setPageSize(Number(e.target.value))
                }}
                >
                    {[10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
        </div>
      </div>
    );
};

export default Table;