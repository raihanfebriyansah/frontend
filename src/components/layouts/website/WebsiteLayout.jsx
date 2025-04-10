import { Toaster } from "react-hot-toast";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { Outlet } from "react-router"

const WebsiteLayout = () => {
  return (
    <>
      <Toaster />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default WebsiteLayout;