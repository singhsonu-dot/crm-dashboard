import { NavLink } from "react-router-dom";

function Sidebar() {
    return (
            <nav className="flex flex-col gap-2.5">
            <NavLink to="/dashboard" className={({ isActive }) => isActive ? "flex items-center gap-3 rounded-1g bg-blue-500 px-4 py-2.5 font-semibold text-white shadow-1g" : "flex items-center gap-3 rounded-1g px-4 py-2.5 font-medium text-slate-400 transition-all hover:bg-slate-700 hover:text-white"}>
             Dashboard
            </NavLink>

            <NavLink to="/customers" className={({ isActive }) => isActive ? "flex items-center gap-3 rounded-1g bg-blue-500 px-4 py-2.5 font-semibold text-white shadow-1g" : "flex items-center gap-3 rounded-1g px-4 py-2.5 font-medium text-slate-400 transition-all hover:bg-slate-700 hover:text-white"}>
             Customers 
            </NavLink>

            <NavLink to="/analytics" className={({ isActive }) => isActive ? "flex items-center gap-3 rounded-1g bg-blue-500 px-4 py-2.5 font-semibold text-white shadow-1g" : "flex items-center gap-3 rounded-1g px-4 py-2.5 font-medium text-slate-400 transition-all hover:bg-slate-700 hover:text-white"}>
             Analytics
            </NavLink>
            </nav>
    )
}

export default Sidebar 