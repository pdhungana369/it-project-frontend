import React from 'react';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Spinner } from '@components';

interface IProps {
  tableData: any[];
  tableColumn: any;
  errorText?: string;
  isLoading?: boolean;
  isDashboard?: boolean;
}

const TableComp: React.FC<IProps> = ({
  tableColumn,
  tableData,
  errorText,
  isLoading,
  isDashboard = false,
}) => {
  const data = React.useMemo(() => (tableData ? tableData : []), [tableData]);
  const columns = React.useMemo(() => tableColumn, [tableColumn]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
  });
  return (
    <div className="mt-10">
      <table className="text-text-color w-full text-left text-xs">
        <thead className={isDashboard ? 'bg-white' : 'bg-light-gray'}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    style={{ width: header.getSize() }}
                    className="text-text-color px-5 py-3 text-center text-xs font-semibold capitalize"
                  >
                    {header.isPlaceholder ? null : (
                      <>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        {errorText && (
          <p className="my-14 text-center text-lg text-primary">{errorText}</p>
        )}

        {isLoading && (
          <div className="mt-10">
            <Spinner variant="large" />
          </div>
        )}

        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr
                key={row.id}
                className="cursor-pointer hover:bg-light-gray hover:bg-opacity-80"
              >
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id} className="px-6 py-4 text-center">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* {!isDashboard && (
        <div className="bg-pure-white my-4 flex flex-wrap justify-center rounded p-5">
          <div className="flex items-center space-x-5">
            <button
              onClick={() => table.firstPage()}
              disabled={!table.getCanPreviousPage()}
              className="my-4 cursor-pointer rounded-lg bg-secondary p-1 disabled:bg-secondary disabled:bg-opacity-50 md:my-0"
            >
              <TbPlayerTrackPrev size={20} color="#fff" />
            </button>
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="my-4 cursor-pointer rounded-lg bg-secondary p-1 disabled:bg-secondary disabled:bg-opacity-50 md:my-0"
            >
              <MdOutlineSkipPrevious size={20} color="#fff" />
            </button>
            <div className="flex items-center space-x-2 text-xs font-medium">
              <p>Page</p>
              <input
                type="number"
                min="1"
                placeholder={String(table.getState().pagination.pageIndex + 1)}
                max={table.getPageCount()}
                defaultValue={table.getState().pagination.pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  table.setPageIndex(page);
                }}
              />
              <h5>
                of <span>{table.getPageCount().toLocaleString()}</span>
              </h5>
            </div>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="my-4 cursor-pointer rounded-lg bg-secondary p-1 disabled:bg-secondary disabled:bg-opacity-50 md:my-0"
            >
              <MdOutlineSkipNext size={20} color="#fff" />
            </button>
            <button
              onClick={() => table.lastPage()}
              disabled={!table.getCanNextPage()}
              className="my-4 cursor-pointer rounded-lg bg-secondary p-1 disabled:bg-secondary disabled:bg-opacity-50 md:my-0"
            >
              <TbPlayerTrackNext size={20} color="#fff" />
            </button>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default React.memo(TableComp);
