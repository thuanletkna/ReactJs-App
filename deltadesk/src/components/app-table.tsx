import React, { useState } from 'react';
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
  onAllRowsSelect?: (selected: boolean) => void;
  initialPageIndex?: number;
  initialPageSize?: number;
  includeCheckboxColumn?: boolean;
}

const CustomTable = <T extends RowData>({
  columns,
  data,
  onRowSelect,
  onAllRowsSelect,
  initialPageIndex = 0,
  initialPageSize = 10,
  includeCheckboxColumn = false,
}: CustomTableProps<T>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: initialPageIndex,
    pageSize: initialPageSize,
  });
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [selectOption, setSelectOption] = useState<boolean>(false);
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

  const handleAllRowsSelect = () => {
    setSelectAll(!selectAll);
    if (onAllRowsSelect) {
      onAllRowsSelect(!selectAll);
    }
  };

  return (
    <>
      <div className='bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 relative'>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {includeCheckboxColumn && (
                <th style={{ width: '40px' }}>
                  <input type="checkbox" onChange={handleAllRowsSelect} checked={selectAll} />
                </th>
              )}
              {table.getHeaderGroups().map((headerGroup) => (
                <React.Fragment key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      style={{
                        padding: '10px',
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
                </React.Fragment>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                onClick={() => handleRowSelect(row.original)}
                style={{ padding: '10px', cursor: 'pointer' }}
              >
                {includeCheckboxColumn && (
                  <td style={{ textAlign: 'center', border: '1px solid lightgray' }}>
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={(e) => e.stopPropagation()} // Prevent row selection on checkbox click
                    />
                  </td>
                )}
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    style={{
                      padding: '10px',
                      border: '1px solid lightgray',
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
      </div>
    </>
  );
};

export default CustomTable;
