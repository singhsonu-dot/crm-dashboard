 import { useNavigate } from "react-router-dom";
import { logout } from "../services/authService";
import { useState } from "react";
import useNotificationStore from "../store/notificationStore";
import { FaBars, FaBell, FaMoon, FaSun } from "react-icons/fa";
import useThemeStore from "../store/themeStore";

function Navbar({ title, toggleSidebar }) {
    const navigate = useNavigate()

    const [showNotifications, setShowNotifications] = useState(false)
    const notifications = useNotificationStore((state) => state.notifications)

    const isDark = useThemeStore((state) => state.isDark) 
    const toggleTheme = useThemeStore((state) => state.toggleTheme)

    const handleLogout = () => {
        logout() 
        navigate("/")
    }

    return (
        <header className="mb-5 flex w-full items-center justify-between gap-2 rounded-1g bg-gray-100 dark:bg-slate-800 px-3 py-4">
            <div className="flex items-center gap-3">
                <button onClick={toggleSidebar} className="md:hidden text-white">
                    <FaBars size={20}/>
                </button>
            </div> 
            <h2 className="text-1g font-semibold md:text-x1 text-slate-900 dark:text-white">{title}</h2>

            <div className="flex items-center gap-4 shrink-0">
                <div className="relative">
                    <button onClick={() => setShowNotifications(!showNotifications)} className="rounded-md relative bg-gray-300 dark:bg-slate-700 p-2">
                        <FaBell size={18}/>

                        {notifications.length > 0 && (
                            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-slate-900 dark:text-white transition hover:bg-slate-600">
                                {notifications.length}
                            </span>
                        )}
                    </button>

                    {showNotifications && (
                        <div className="absolute right-0 top-12 z-50 w-72 rounded-1g border border-slate-200 dark:border-slate-700 bg-slate-800 p-4 shadow-1g">
                            <h3 className="mb-3 font-semibold"> Notifications</h3>

                            {notifications.length === 0 ?(
                                <p className="text-sm text-slate-900 dark:text-white">No Notifications</p>
                            ) : (
                                <div className="space-y-3">
                                    {notifications.map (
                                        (notification) => (
                                            <div key={notification.id} className="rounded-md bg-gray-100 dark:bg-slate-700 p-3">
                                                <p className="text-sm">{notification.message}</p>

                                                <span className="text-xs text-slate-900 dark:text-white">{notification.time}</span>
                                            </div>
                                        )
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <button onClick={toggleTheme} className="rounded-md bg-slate-200 dark:bg-slate-700 p-2 transition hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100">
                    {isDark ? <FaSun size={18}/> : <FaMoon size={18} />}
                </button>

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-700 font-bold text-white">
                    S
                </div>

                <button onClick={handleLogout} className="rounded-md bg-blue-500 px-2 py-2 text-xs md:text-sm font-medium text-white md:px-3 hover:bg-blue-600">Logout</button> 
            </div>
        </header>
    )
}

export default Navbar 