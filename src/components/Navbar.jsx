import { useState } from "react";
import useNotificationStore from "../store/notificationStore";
import { FaBars, FaBell, FaMoon, FaSun } from "react-icons/fa";
import useStore from "../store/useStore";
import useRoleStore from "../store/useRoleStore";

function Navbar({ title, toggleSidebar }) {
    const [showNotifications, setShowNotifications] = useState(false)

    const notifications = useNotificationStore((state) => state.notifications)
    const profile = useStore((state) => state.profile)
    const role = useRoleStore((state) => state.role)
    const setRole = useRoleStore((state) => state.setRole)

    return (
        <header className="mb-5 flex w-full items-center justify-between gap-2 rounded-1g bg-gray-100 dark:bg-slate-800 px-3 py-4">
            <div className="flex items-center gap-3">
                <button onClick={toggleSidebar} className="md:hidden text-black dark:text-white">
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

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 dark:bg-slate-700 font-bold text-black dark:text-white">
                    {profile?.name?.charAt(0).toUpperCase() || 'U'}
                </div>

                <div className="hidden 1g:block text-right">
                    <p className="text-sm font-medium text-black dark:text-white">
                        {profile?.name || 'User'}
                    </p>

                    <p className="text-xs text-slate-500 dark:text-slate-400">
                        {profile.email}
                    </p>
                </div> 

                {profile?.role && (
                    <span className="hidden md:inline-block rounded-md bg-blue-100 dark:bg-slate-700 px-2.5 py-1 text-xs font-semibold uppercase text-blue-700 dark:text-blue-400">
                        {profile.role}
                    </span>
                )}
            </div>
        </header>
    )
}

export default Navbar 