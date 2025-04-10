import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { useState } from "react";
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import Icon from "@/components/ui/Icon";
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import KlinikPutriLogo from '@/assets/logo/klinik-putri.png'

const Navbar = () => {
  const auth = useAuthUser();
  const signOut = useSignOut();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignOut = () => {
    signOut();
    navigate("/");
  };

  return (
    <nav className="flex flex-wrap items-center justify-between px-4 py-8 bg-white lg:px-32">
      <img src={KlinikPutriLogo} width={70} height={70} className="object-cover object-center" alt="klinik putri" />
      {/* Hamburger for mobile */}
      <button
        className="text-gray-700 md:hidden focus:outline-none"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isMobileMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>
      {/* Desktop Menu */}
      <ul className="hidden md:flex items-center gap-3 text-xl font-medium text-[#5C5B5B] capitalize">
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? "p-3 text-primary" : "p-3 hover:text-[#159030]"}>
            beranda
          </NavLink>
        </li>
        <li>
          <NavLink to="/jadwal-dokter" className={({ isActive }) => isActive ? "p-3 text-primary" : "p-3 hover:text-[#159030]"}>
            jadwal dokter
          </NavLink>
        </li>
        <li>
          <NavLink to="/hubungi" className={({ isActive }) => isActive ? "p-3 text-primary" : "p-3 hover:text-[#159030]"}>
            hubungi
          </NavLink>
        </li>
      </ul>
      {/* Auth & Register */}
      <div className="items-center hidden gap-5 capitalize md:flex">
        {auth?.role === "patient" ? (
          <Menu>
            <MenuButton>
              <div className='flex items-center gap-2'>
                <img src={auth.user.foto ? auth.user.foto : "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="} className='object-cover object-center bg-red-500 rounded-full' alt={`foto profil ${auth.user.name}`} width={50} />
                <Icon name="arrow-down" className="w-4 h-4 text-gray-500" />
              </div>
            </MenuButton>
            <MenuItems anchor="bottom end" className="bg-white shadow-md p-[30px] rounded-lg space-y-2 capitalize">
              <MenuItem>
                <Link to="/user/profile" className="block data-[focus]:bg-green-100">
                  profil
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to="/user/riwayat" className="block data-[focus]:bg-green-100">
                  riwayat reservasi
                </Link>
              </MenuItem>
              <MenuItem>
                <button type="button" onClick={handleSignOut} className="block data-[focus]:bg-green-100">
                  keluar
                </button>
              </MenuItem>
            </MenuItems>
          </Menu>
        ) : (
          <>
            <Link to="/user/login" className="px-6 py-2 border border-primary text-primary rounded-xl">masuk</Link>
            <Link to="/user/register" className="px-6 py-2 text-white bg-primary rounded-xl">registrasi</Link>
          </>
        )}
      </div>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="w-full mt-4 md:hidden">
          <ul className="flex flex-col gap-2 text-lg font-medium text-[#5C5B5B] capitalize">
            <li>
              <NavLink onClick={() => setIsMobileMenuOpen(false)} to="/" className={({ isActive }) => isActive ? "block p-3 text-primary" : "block p-3 hover:text-[#159030]"}>
                beranda
              </NavLink>
            </li>
            <li>
              <NavLink onClick={() => setIsMobileMenuOpen(false)} to="/jadwal-dokter" className={({ isActive }) => isActive ? "block p-3 text-primary" : "block p-3 hover:text-[#159030]"}>
                jadwal dokter
              </NavLink>
            </li>
            <li>
              <NavLink onClick={() => setIsMobileMenuOpen(false)} to="/hubungi" className={({ isActive }) => isActive ? "block p-3 text-primary" : "block p-3 hover:text-[#159030]"}>
                hubungi
              </NavLink>
            </li>
            <li className="pt-3 border-t">
              {auth?.role === "patient" ? (
                <div className="flex flex-col gap-2">
                  <Link onClick={() => setIsMobileMenuOpen(false)} to="/user/profile" className="block p-2 hover:bg-green-100">profil</Link>
                  <Link onClick={() => setIsMobileMenuOpen(false)} to="/user/riwayat" className="block p-2 hover:bg-green-100">riwayat reservasi</Link>
                  <button onClick={handleSignOut} className="block p-2 text-left hover:bg-green-100">keluar</button>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link onClick={() => setIsMobileMenuOpen(false)} to="/user/login" className="px-6 py-2 text-center border border-primary text-primary rounded-xl">masuk</Link>
                  <Link onClick={() => setIsMobileMenuOpen(false)} to="/user/register" className="px-6 py-2 text-center text-white bg-primary rounded-xl">registrasi</Link>
                </div>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}

export default Navbar;