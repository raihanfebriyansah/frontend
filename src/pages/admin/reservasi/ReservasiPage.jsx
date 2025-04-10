import Icon from '@/components/ui/Icon';
import ReservasiList from '@/components/reservasi/ReservasiList';
import useReservasiQueries from '@/hooks/admin/reservasi/useReservasiQueries';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const ReservasiPage = () => {
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [searchQuery, setSearchQuery] = React.useState('');
  const [debouncedSearch, setDebouncedSearch] = React.useState(searchQuery);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setPagination((prev) => ({
        ...prev,
        pageIndex: 0,
      }));
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  const { reservasiQuery } = useReservasiQueries({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    search: debouncedSearch,
  });

  return (
    <>
      <header className='flex items-center justify-between px-12 capitalize py-9'>
        <h1 className="text-3xl font-medium text-primary">Riwayat Reservasi</h1>
        <Link to={`/admin/reservasi/create`} className='flex items-center px-4 py-2 font-medium text-white rounded-lg bg-primary'>
          <Icon name="plus" />
          tambah
        </Link>
      </header>
      <section className='px-12 capitalize'>
        <ReservasiList
          data={reservasiQuery?.data || []}
          pagination={pagination}
          setPagination={setPagination}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </section>
    </>
  );
}

export default ReservasiPage;