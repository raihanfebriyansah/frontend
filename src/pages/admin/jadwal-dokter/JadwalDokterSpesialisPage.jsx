import Icon from '@/components/ui/Icon';
import JadwalDokterSpesialisList from '@/components/jadwal-dokter/spesialisasi/JadwalDokterSpesialisList';
import useJadwalDokterSpesialisasiQueries from '@/hooks/admin/jadwal-dokter/spesialisasi/useJadwalDokterSpesialisasiQueries';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const JadwalDokterSpesialisPage = () => {
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

  const { jadwalDokterSpesialisQuery } = useJadwalDokterSpesialisasiQueries({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    search: debouncedSearch,
  });

  return (
    <>
      <header className='flex items-center justify-between px-12 capitalize py-9'>
        <h1 className="text-3xl font-medium text-primary">jadwal dokter spesialisasi</h1>
        <Link to={`/admin/jadwal-dokter/spesialisasi/create`} className='flex items-center px-4 py-2 font-medium text-white rounded-md bg-primary'>
          <Icon name="plus" />
          tambah
        </Link>
      </header>
      <section className='px-12 capitalize'>
        <JadwalDokterSpesialisList
          data={jadwalDokterSpesialisQuery?.data || []}
          pagination={pagination}
          setPagination={setPagination}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </section>
    </>
  );
}

export default JadwalDokterSpesialisPage;