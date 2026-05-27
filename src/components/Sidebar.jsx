import { NavLink } from "react-router-dom";
import "./Sidebar.css" 

function Sidebar() {
    return (
            <nav className="sidebar-nav">
            <NavLink to="/dashboard" className={({ isActive }) => isActive ? "sidebar-link active-tab" : "sidebar-link"}>Dashboard</NavLink>

            <br/>

            <NavLink to="/users" className={({ isActive }) => isActive ? "sidebar-link active-tab" : "sidebar-link"}>Users</NavLink>
            </nav>
    )
}

export default Sidebar 