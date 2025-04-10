import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router"
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const AdminLayout = () => {
  return (
    <>
      <Toaster />
      <Navbar />
      <Sidebar />
      <main className="ml-[22rem] mt-32">
        <Outlet />
      </main>
    </>
  )
}

export default AdminLayout;