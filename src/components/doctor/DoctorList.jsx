import Icon from '@/components/ui/Icon';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import CustomAlert from '@/components/ui/CustomAlert';
import useDoctorMutations from '@/hooks/admin/doctor/useDoctorMutations';

const DoctorList = ({ data, pagination, setPagination, searchQuery, setSearchQuery }) => {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const { remove } = useDoctorMutations();

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
      },
      {
        accessorKey: 'Spesialisasi.nama',
        header: 'spesialisasi',
      },
      {
        accessorKey: 'nama',
        header: 'nama dokter',
      },
      {
        accessorKey: 'aktif',
        cell: ({ row }) => <span>{row.original.aktif ? "aktif" : "tidak aktif"}</span>,
        header: 'status',
      },
      {
        accessorKey: 'aksi',
        cell: ({ row }) => (
          <div className='flex items-center justify-center gap-2'>
            <button type='button' onClick={() => handleDeleteClick(row.original.id)} className='flex items-center justify-center w-10 h-10 bg-red-500 rounded-lg'>
              <Icon name="trash" />
            </button>
            <Link to={`/admin/doctor/edit/${row.original.id}`} className='flex items-center justify-center w-10 h-10 rounded-lg bg-primary'>
              <Icon name="pencil" />
            </Link>
          </div>
        ),
        header: 'aksi',
      },
    ],
    []
  );

  const table = useReactTable({
    columns,
    data: data?.data || [],
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onGlobalFilterChange: setSearchQuery,
    manualPagination: true,
    pageCount: data?.totalPages || 1,
    state: {
      pagination: pagination,
    },
  })

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteAlert(true);
  };

  return (
    <>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2 py-2'>
          <p className='font-medium'>Show</p>
          <select
            value={table.getState().pagination.pageSize}
            onChange={e => {
              table.setPageSize(Number(e.target.value))
            }}
          >
            {[10, 20, 30, 40, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
          <p className='font-medium'>entries</p>
        </div>
        <input
          type='text'
          placeholder='Search...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <table className='w-full'>
        <thead className='h-10'>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody className='text-center'>
          {table.getRowModel().rows.map(row => {
            return (
              <tr key={row.id} className='h-10'>
                {row.getVisibleCells().map(cell => {
                  return (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className='flex items-center justify-between'>
        {
          (() => {
            const total = table.getPrePaginationRowModel().rows.length;
            const startRow = table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1;
            const endRow = Math.min(startRow + table.getRowModel().rows.length - 1, total);
            return <p>Showing {startRow} to {endRow} of {total} entries</p>;
          })()
        }
        <div className='flex items-center gap-2'>
          <button
            type='button'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <Icon name="double-arrow-left" />
          </button>
          {
            Array.from({ length: table.getPageCount() }, (_, index) => (
              <button
                key={index}
                type='button'
                className={`px-2 py-1 rounded-lg ${table.getState().pagination.pageIndex === index ? 'bg-primary text-white' : 'border border-black'}`}
                onClick={() => table.setPageIndex(index)}
              >
                {index + 1}
              </button>
            ))
          }
          <button type='button'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <Icon name="double-arrow-right" />
          </button>
        </div>
      </div>
      {showDeleteAlert && (
        <CustomAlert
          title="Hapus Data?"
          message="Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak bisa dibatalkan."
          onConfirm={() => {
            remove.mutate(deleteId, {
              onSuccess: () => setShowDeleteAlert(false)
            });
          }}
          onCancel={() => setShowDeleteAlert(false)}
        />
      )}
    </>

  );
}

export default DoctorList