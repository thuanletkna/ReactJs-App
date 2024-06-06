// CustomTable.js

import React from 'react';
import {
  useReactTable,
  getSortedRowModel,
  getPaginationRowModel,
  getCoreRowModel,
  flexRender,
  ColumnDef,
  SortingState,
  PaginationState,
  RowData,
} from '@tanstack/react-table';

interface CustomTableProps<T extends RowData> {
  columns: ColumnDef<T, any>[];
  data: T[];
  onRowSelect?: (row: T) => void;
  initialPageIndex?: number;
  initialPageSize?: number;
  includeCheckboxColumn?: boolean; // New prop for including checkbox column
}

const CustomTable = <T extends RowData>({
  columns,
  data,
  onRowSelect,
  initialPageIndex = 0,
  initialPageSize = 10,
  includeCheckboxColumn = false, // Default to false if not provided
}: CustomTableProps<T>) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: initialPageIndex,
    pageSize: initialPageSize,
  });

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      pagination,
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
  });

  const handleRowSelect = (row: T) => {
    if (onRowSelect) {
      onRowSelect(row);
    }
  };

  return (
    <>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {includeCheckboxColumn && <th style={{ width: '40px' }}></th>} {/* Checkbox column header */}
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  style={{
                    borderBottom: 'solid 3px red',
                    background: 'aliceblue',
                    color: 'black',
                    fontWeight: 'bold',
                  }}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  <span>
                    {header.column.getIsSorted()
                      ? header.column.getIsSorted() === 'desc'
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              onClick={() => handleRowSelect(row.original)}
              style={{ cursor: 'pointer' }}
            >
              {includeCheckboxColumn && ( // Checkbox column cell
                <td style={{ textAlign: 'center' }}>
                  <input
                    type="checkbox"
                    onChange={(e) => e.stopPropagation()} // Prevent row selection on checkbox click
                  />
                </td>
              )}
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  style={{
                    padding: '10px',
                    border: 'solid 1px gray',
                    background: 'papayawhip',
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>
          {'<<'}
        </button>{' '}
        <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          {'<'}
        </button>{' '}
        <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          {'>'}
        </button>{' '}
        <button onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default CustomTable;
