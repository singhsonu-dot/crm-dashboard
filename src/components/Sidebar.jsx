import { FaChartLine, FaChartPie, FaCog, FaCreditCard, FaUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";

function Sidebar() {
    return (
            <nav className="flex flex-col gap-2.5">
            <NavLink to="/dashboard" className={({ isActive }) => isActive ? "flex items-center gap-3 rounded-1g bg-blue-500 px-4 py-2.5 font-semibold text-white shadow-1g" : "flex items-center gap-3 rounded-1g px-4 py-2.5 font-medium text-slate-400 transition-all hover:bg-slate-700 hover:text-white"}>
            <FaChartPie/>
             <span>Dashboard</span>
            </NavLink>

            <NavLink to="/customers" className={({ isActive }) => isActive ? "flex items-center gap-3 rounded-1g bg-blue-500 px-4 py-2.5 font-semibold text-white shadow-1g" : "flex items-center gap-3 rounded-1g px-4 py-2.5 font-medium text-slate-400 transition-all hover:bg-slate-700 hover:text-white"}>
             <FaUser/>
             <span>Customers</span>
            </NavLink>

            <NavLink to="/analytics" className={({ isActive }) => isActive ? "flex items-center gap-3 rounded-1g bg-blue-500 px-4 py-2.5 font-semibold text-white shadow-1g" : "flex items-center gap-3 rounded-1g px-4 py-2.5 font-medium text-slate-400 transition-all hover:bg-slate-700 hover:text-white"}>
             <FaChartLine/>
             <span>Analytics</span>
            </NavLink>

            <NavLink to="/subscription" className={({ isActive }) => isActive ? "flex items-center gap-3 rounded-1g bg-blue-500 px-4 py-2.5 font-semibold text-white shadow-1g" : "flex items-center gap-3 rounded-1g px-4 py-2.5 font-medium text-slate-400 transition-all hover:bg-slate-700 hover:text-white"}>
             <FaCreditCard/>
             <span>Subscription</span>
            </NavLink>

            <NavLink to="/settings" className={({ isActive }) => isActive ? "flex items-center gap-3 rounded-1g bg-blue-500 px-4 py-2.5 font-semibold text-white shadow-1g" : "flex items-center gap-3 rounded-1g px-4 py-2.5 font-medium text-slate-400 transition-all hover:bg-slate-700 hover:text-white"}>
             <FaCog/>
             <span>Settings</span>
            </NavLink>
            </nav>
    )
}

export default Sidebar 