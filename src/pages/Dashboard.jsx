import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/ui/StatCard";
import useNotificationStore from "../store/notificationStore";
import useStore from "../store/useStore";
import { useState } from "react";
import Loader from "../components/ui/Loader";
import useThemeStore from "../store/themeStore";
import { FaMoon, FaSun } from "react-icons/fa";
import { logout } from "../services/authService";
import useUsers from "../hooks/useUsers"

function Dashboard() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const navigate = useNavigate() 

    const notifications = useNotificationStore((state) => state.notifications)
    const storeUsers = useStore((state) => state.users)
    const isDark = useThemeStore((state) => state.isDark) 
    const toggleTheme = useThemeStore((state) => state.toggleTheme) 
    const { users, loading } = useUsers("")
    const activeCustomers = users.filter(user => user.status === "active").length

    const handleLogout = async () => {
        try {
            await logout()
            navigate("/", { replace: true })
        } catch (error) {
            console.error(error)
        }
    }

    if (loading) {
        <Loader/>
    }

    return (
        <div className="flex min-h-screen flex-col md:h-screen md:flex-row text-black dark:text-white md:overflow-hidden">
            <>
            <aside className="hidden bg-gray-100 dark:bg-slate-800 p-4 md:flex md:min-h-screen md:w-[250px] md:min-w-[250px] md:flex-col">
                <Sidebar/>

                <div className="mt-auto border-t border-slate-700 pt-4 space-y-3">
                   <button onClick={toggleTheme} className=" flex w-full items-center gap-3 rounded-1g px-4 py-3 bg-slate-200 dark:bg-slate-700 transition hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100 text-sm">
                      {isDark ? <FaSun size={18}/> : <FaMoon size={18} />}
                    </button>
                    <button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-1g bg-blue-500 px-4 py-3 text-xs md:text-sm font-medium text-white md:px-3 hover:bg-blue-600">Logout</button>                 
                </div>
            </aside>

            {isSidebarOpen && (
                <aside className="fixed inset-0 z-50 bg-gray-100 dark:bg-slate-800 md:hidden">
                    <div className="flex justify-end p-4">
                        <button onClick={() => setIsSidebarOpen(false)} className="text-3x1 text-black dark:text-white">X</button> 
                    </div>
                    <Sidebar/>

                    <div className="mt-auto border-t border-slate-700 pt-4 space-y-3">
                        <button onClick={toggleTheme} className="flex w-full items-center gap-3 rounded-md bg-slate-200 dark:bg-slate-700 py-2 transition hover:bg-slate-300 dark:hover:bg-slate-600 text-sm font-medium text-black dark:text-white">
                           Dark Mode {isDark ? <FaSun size={18}/> : <FaMoon size={18}/>} 
                        </button>
                        <button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-md bg-blue-500 py-2 text-sm font-medium text-white transition hover:bg-blue-600">
                            Logout
                        </button>
                    </div>
                </aside>
            )}
            </>

            <main className="flex flex-1 flex-col gap-5 p-4 md:overflow-y-auto md:p-5 bg-white dark:bg-slate-900 transition-colors duration-300">

                <header>
                    <Navbar title="Dashboard" toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}/>
                </header>

                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-gray-100 rounded-2x1 dark:bg-slate-900 transition-colors duratiom-300">
                    
                    <StatCard title="Total Customers" value={users.length}/>
                    
                    <StatCard title="Revenue" value={`${users.length * 5000}`}/>

                    <StatCard title="Active Customers" value={activeCustomers}/>

                </section> 

                <section className="rounded-1g bg-gray-100 dark:bg-slate-800 p-5"> 
                    <h2 className="mb-4 text-1g font-semibold text-slate-900 dark:text-white">
                        Quick Actions
                    </h2>

                    <div className="grid gap-4 sm:grid-cols-2 x1:grid-cols-4">
                        <button onClick={() => navigate("/customers")} className="rounded-1g bg-gray-200 dark:bg-slate-700 p-4 text-left transition hover:bg-slate-300 dark:hover:bg-slate-600">
                            <h3 className="font-semibold text-slate-900 dark:text-white">Customers</h3>
                            <p className="mt-1 text-sm text-slate-900 dark:text-white">
                                Manage Customers
                            </p>
                        </button>

                        <button onClick={() => navigate("/analytics")} className="rounded-1g bg-gray-200 dark:bg-slate-700 p-4 text-left transition hover:bg-slate-300 dark:hover:bg-slate-600">
                            <h3 className="font-semibold text-slate-900 dark:text-white">Analytics</h3>
                            <p className="mt-1 text-sm text-slate-900 dark:text-white">
                                View reports
                            </p>
                        </button>

                        <button onClick={() => navigate("/settings")} className="rounded-1g bg-gray-200 dark:bg-slate-700 p-4 text-left transition hover:bg-slate-300 dark:hover:bg-slate-600">
                            <h3 className="font-semibold text-slate-900 dark:text-white">Settings</h3>
                            <p className="mt-1 text-sm text-slate-900 dark:text-white">
                                Configure Dashboard
                            </p>
                        </button>

                        <button onClick={() => navigate("/subscription")} className="rounded-1g bg-gray-200 dark:bg-slate-700 p-4 text-left transition hover:bg-slate-300 dark:hover:bg-slate-600">
                            <h3 className="font-semibold text-slate-900 dark:text-white">Subscription</h3>
                            <p className="mt-1 text-sm text-slate-900 dark:text-white">
                                Manage plans 
                            </p>
                        </button>
                    </div>
                </section>

                <section className="mt-10 rounded-1g bg-gray-200 dark:bg-slate-800 p-5">
                    <h2 className="mb-4 text-x1 font-semibold text-slate-900 dark:text-white">Recent Activity</h2>

                    {notifications === 0 ? (
                        <p className="text-slate-900 dark:text-white">No recent activity</p>
                    ) : (
                        <div className="space-y-3">
                            {notifications .slice(0,5).map((notification) => (
                                <div key={notification.id} className="rounded-md bg-white dark:bg-slate-700 p-3">
                                    <p className="text-slate-900 dark:text-white">{notification.message}</p>
                                    <span className="text-sm text-slate-900 dark:text-white">{notification.time}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </main>
        </div>
    )
}

export default Dashboard 