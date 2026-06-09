import { useNavigate } from "react-router-dom";
import { logout } from "../services/authService";
import { useState } from "react";
import useNotificationStore from "../store/notificationStore";

function Navbar({ title }) {
    const navigate = useNavigate()

    const [showNotifications, setShowNotifications] = useState(false)
    const notifications = useNotificationStore((state) => state.notifications)

    const handleLogout = () => {
        logout() 
        navigate("/")
    }

    return (
        <header className="mb-5 flex w-full items-center justify-between rounded-1g bg-slate-800 px-5 py-4">
            <h2 className="text-1g font-semibold md:text-x1">{title}</h2>

            <div className="flex items-center gap-4">
                <div className="relative">
                    <button onClick={() => setShowNotifications(!showNotifications)} className="rounded-md bg-slate-700 px-3 py-2 text-sm">
                        {notifications.length}
                    </button>

                    {showNotifications && (
                        <div className="absolute right-0 top-12 z-50 w-72 rounded-1g border border-slate-700 bg-slate-800 p-4 shadow-1g">
                            <h3 className="mb-3 font-semibold"> Notifications</h3>

                            {notifications.length === 0 ?(
                                <p className="text-sm text-slate-400">No Notifications</p>
                            ) : (
                                <div className="space-y-3">
                                    {notifications.map (
                                        (notification) => (
                                            <div key={notification.id} className="rounded-md bg-slate-700 p-3">
                                                <p className="text-sm">{notification.message}</p>

                                                <span className="text-xs text-slate-400">{notification.time}</span>
                                            </div>
                                        )
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-700 font-bold">
                    S
                </div>

                <button onClick={handleLogout} className="rounded-md bg-blue-500 px-3 py-2 text-sm font-medium text-white hover:bg-blue-600">Logout</button> 
            </div>
        </header>
    )
}

export default Navbar 