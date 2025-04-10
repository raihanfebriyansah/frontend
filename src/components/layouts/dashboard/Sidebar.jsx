import React, { useState } from "react"
import Icon from "@/components/ui/Icon"
import { Link, NavLink, useLocation } from "react-router-dom"
import { useEffect } from "react"

const Sidebar = () => {
  const location = useLocation()
  const isSubMenuActive = location.pathname.startsWith("/admin/jadwal-dokter")
  const [jadwalExpanded, setJadwalExpanded] = useState(isSubMenuActive)

  useEffect(() => {
    if (isSubMenuActive) setJadwalExpanded(true)
  }, [isSubMenuActive])

  return (
    <aside className="fixed left-0 z-20 w-[350px] top-[120px] h-screen text-white bg-primary shadow-md capitalize">
      <h1 className="px-12 pt-10 mb-4 text-2xl font-bold">menu</h1>
      <nav>
        <ul>
          <li>
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                `px-12 flex items-center gap-2 h-12 hover:bg-[#44A659] ${isActive ? "border-r-4 bg-[#44A659]" : ""}`
              }
            >
              <Icon name="dashboard" className="w-8 h-8" />
              dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/spesialisasi"
              className={({ isActive }) =>
                `px-12 flex items-center gap-2 h-12 hover:bg-[#44A659] ${isActive ? "border-r-4 bg-[#44A659]" : ""}`
              }
            >
              <Icon name="medical" className="w-8 h-8" />
              spesialisasi
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/doctor"
              className={({ isActive }) =>
                `px-12 flex items-center gap-2 h-12 hover:bg-[#44A659] ${isActive ? "border-r-4 bg-[#44A659]" : ""}`
              }
            >
              <Icon name="stetoscope" className="w-8 h-8" />
              daftar dokter
            </NavLink>
          </li>
          <li>
            <div
              onClick={() => {
                if (!isSubMenuActive) setJadwalExpanded(!jadwalExpanded)
              }}
              className="px-12 flex items-center gap-2 h-12 hover:bg-[#44A659] cursor-pointer"
            >
              <Icon name="calender" className="w-8 h-8" />
              jadwal dokter
              <Icon name={jadwalExpanded ? "chevron-down" : "chevron-left"} className="w-4 h-4 ml-auto text-white" />
            </div>
            {jadwalExpanded && (
              <ul>
                <li>
                  <NavLink
                    to="/admin/jadwal-dokter/spesialisasi"
                    className={({ isActive }) =>
                      `px-12 flex items-center gap-2 h-12 hover:bg-[#44A659] ${isActive ? "border-r-4 bg-[#44A659]" : ""}`
                    }
                  >
                    <div className="w-8 h-8"></div>
                    dokter spesialisasi
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/jadwal-dokter/umum"
                    className={({ isActive }) =>
                      `px-12 flex items-center gap-2 h-12 hover:bg-[#44A659] ${isActive ? "border-r-4 bg-[#44A659]" : ""}`
                    }
                  >
                    <div className="w-8 h-8"></div>
                    dokter umum
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
          <li>
            <NavLink
              to="/admin/reservasi"
              className={({ isActive }) =>
                `px-12 flex items-center gap-2 h-12 hover:bg-[#44A659] ${isActive ? "border-r-4 bg-[#44A659]" : ""}`
              }
            >
              <Icon name="user-group" className="w-8 h-8" />
              reservasi
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/footer"
              className={({ isActive }) =>
                `px-12 flex items-center gap-2 h-12 hover:bg-[#44A659] ${isActive ? "border-r-4 bg-[#44A659]" : ""}`
              }
            >
              <Icon name="setting" className="w-8 h-8" />
              setting footer
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar