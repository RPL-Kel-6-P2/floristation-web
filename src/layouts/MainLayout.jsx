import { NavLink, Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="h-screen bg-[#e8edf3] flex justify-center items-start py-6 overflow-hidden">
      
      <div className="relative h-[932px] w-[430px] max-w-full overflow-hidden rounded-[38px] bg-[#f7f2ec] shadow-2xl">
        
        <div className="h-full overflow-y-auto pb-[120px] hide-scrollbar">
          <Outlet />
        </div>

        <nav className="absolute bottom-0 left-0 right-0 border-t border-slate-200 bg-white/95 backdrop-blur-md px-4 py-3">
          <div className="flex items-center justify-between gap-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex-1 rounded-[14px] px-3 py-2 text-center text-sm font-semibold transition ${
                  isActive ? "bg-[#2f435e] text-white" : "text-slate-500 hover:bg-slate-100"
                }`
              }
            >
              <div className="flex flex-col items-center gap-1">
                <span>🏠</span>
                <span>Beranda</span>
              </div>
            </NavLink>

            <NavLink
              to="/draft"
              className={({ isActive }) =>
                `flex-1 rounded-[14px] px-3 py-2 text-center text-sm font-semibold transition ${
                  isActive ? "bg-[#2f435e] text-white" : "text-slate-500 hover:bg-slate-100"
                }`
              }
            >
              <div className="flex flex-col items-center gap-1">
                <span>📋</span>
                <span>Draft</span>
              </div>
            </NavLink>

            <NavLink
              to="/info"
              className={({ isActive }) =>
                `flex-1 rounded-[14px] px-3 py-2 text-center text-sm font-semibold transition ${
                  isActive ? "bg-[#2f435e] text-white" : "text-slate-500 hover:bg-slate-100"
                }`
              }
            >
              <div className="flex flex-col items-center gap-1">
                <span>ℹ️</span>
                <span>Info</span>
              </div>
            </NavLink>
          </div>
        </nav>

      </div>

    </div>
  );
}

export default MainLayout;