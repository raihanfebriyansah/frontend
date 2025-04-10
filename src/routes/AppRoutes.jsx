import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthOutlet from '@auth-kit/react-router/AuthOutlet'
import { lazy } from 'react';
import { ProtectedRoute } from './ProtectedRoutes';

const WebsiteLayout = lazy(() => import('@/components/layouts/website/WebsiteLayout'));
const BerandaPage = lazy(() => import('@/pages/website/beranda/BerandaPage'));
const JadwalDokterPage = lazy(() => import('@/pages/website/jadwal-dokter/JadwalDokterPage'));
const HubungiPage = lazy(() => import('@/pages/website/hubungi/HubungiPage'));
const WebsiteLoginPage = lazy(() => import('@/pages/website/auth/LoginPage'));
const WebsiteRegisterPage = lazy(() => import('@/pages/website/auth/RegisterPage'));
const ProfilPage = lazy(() => import('@/pages/website/profil/ProfilPage'));
const ReservasiPage = lazy(() => import('@/pages/website/reservasi/ReservasiPage'));
const RiwayatPage = lazy(() => import('@/pages/website/riwayat/RiwayatPage'));
const AntrianPage = lazy(() => import('@/pages/website/antrian/AntrianPage'));

// Dashboard
const AdminLayout = lazy(() => import('@/components/layouts/dashboard/AdminLayout'));
const LoginPage = lazy(() => import('@/pages/admin/auth/LoginPage'));
const DashboardPage = lazy(() => import('@/pages/admin/dashboard/DashboardPage'));

const SpesialisasiPage = lazy(() => import('@/pages/admin/spesialisasi/SpesialisasiPage'));
const SpesialisasiCreateUpdatePage = lazy(() => import('@/pages/admin/spesialisasi/CreateUpdatePage'))

const DoctorPage = lazy(() => import('@/pages/admin/doctor/DoctorPage'));
const DoctorCreateUpdatePage = lazy(() => import('@/pages/admin/doctor/CreateUpdatePage'))

const DashboardJadwalDokterSpesialisPage = lazy(() => import('@/pages/admin/jadwal-dokter/JadwalDokterSpesialisPage'));
const JadwalDokterSpesialisCreateUpdatePage = lazy(() => import('@/pages/admin/jadwal-dokter/JadwalDokterSpesialisCreateUpdatePage'))

const JadwalDokterUmumPage = lazy(() => import('@/pages/admin/jadwal-dokter/umum/JadwalDokterUmumPage'));
const JadwalDokterUmumCreateUpdatePage = lazy(() => import('@/pages/admin/jadwal-dokter/umum/JadwalDokterUmumCreateUpdatePage'))

const DashboardReservasiPage = lazy(() => import('@/pages/admin/reservasi/ReservasiPage'));
const ReservasiCreateUpdatePage = lazy(() => import('@/pages/admin/reservasi/CreateUpdatePage'))

const AdminProfilePage = lazy(() => import('@/pages/admin/profil/ProfilPage'))

const FooterPage = lazy(() => import('@/pages/admin/footer/FooterPagee'));

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<WebsiteLayout />}>
        <Route path="/" element={<BerandaPage />} />
        <Route path="/jadwal-dokter" element={<JadwalDokterPage />} />
        <Route path="/hubungi" element={<HubungiPage />} />
        <Route path="/user/login" element={<WebsiteLoginPage />} />
        <Route path="/user/register" element={<WebsiteRegisterPage />} />
        <Route path='/user/profile' element={
          <ProtectedRoute requiredRole="patient">
            <ProfilPage />
          </ProtectedRoute>
        } />
        <Route path="/user/reservasi/:id" element={
          <ProtectedRoute requiredRole="patient">
            <ReservasiPage />
          </ProtectedRoute>
        } />
        <Route path="/user/riwayat" element={
          <ProtectedRoute requiredRole="patient">
            <RiwayatPage />
          </ProtectedRoute>
        } />
        <Route path="/user/riwayat/:id" element={
          <ProtectedRoute requiredRole="patient">
            <AntrianPage />
          </ProtectedRoute>
        } />
      </Route>

      <Route path="/admin/login" element={<LoginPage />} />
      <Route element={
        <ProtectedRoute requiredRole="admin">
          <AdminLayout />
        </ProtectedRoute>
      }>
        <Route path="/admin/dashboard" element={<DashboardPage />} />
        <Route path="/admin/spesialisasi" element={<SpesialisasiPage />} />
        <Route path="/admin/spesialisasi/create" element={<SpesialisasiCreateUpdatePage />} />
        <Route path="/admin/spesialisasi/edit/:id" element={<SpesialisasiCreateUpdatePage />} />
        <Route path="/admin/doctor" element={<DoctorPage />} />
        <Route path="/admin/doctor/create" element={<DoctorCreateUpdatePage />} />
        <Route path="/admin/doctor/edit/:id" element={<DoctorCreateUpdatePage />} />
        <Route path="/admin/jadwal-dokter/spesialisasi" element={<DashboardJadwalDokterSpesialisPage />} />
        <Route path="/admin/jadwal-dokter/spesialisasi/create" element={<JadwalDokterSpesialisCreateUpdatePage />} />
        <Route path="/admin/jadwal-dokter/spesialisasi/edit/:id" element={<JadwalDokterSpesialisCreateUpdatePage />} />
        <Route path="/admin/jadwal-dokter/umum" element={<JadwalDokterUmumPage />} />
        <Route path="/admin/jadwal-dokter/umum/create" element={<JadwalDokterUmumCreateUpdatePage />} />
        <Route path="/admin/jadwal-dokter/umum/edit/:id" element={<JadwalDokterUmumCreateUpdatePage />} />
        <Route path="/admin/reservasi" element={<DashboardReservasiPage />} />
        <Route path="/admin/reservasi/create" element={<ReservasiCreateUpdatePage />} />
        <Route path="/admin/reservasi/edit/:id" element={<ReservasiCreateUpdatePage />} />
        <Route path="/admin/profil" element={<AdminProfilePage />} />
        <Route path="/admin/footer" element={<FooterPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
