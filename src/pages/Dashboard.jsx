import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/ui/StatCard";
import useNotificationStore from "../store/notificationStore";
import useStore from "../store/useStore";
import { useState } from "react";

function Dashboard() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const navigate = useNavigate() 

    const notifications = useNotificationStore((state) => state.notifications)

    const users = useStore((state) => state.users)

    const activeCustomers = users.filter((user) => user.status === "active").length

    return (
        <div className="flex min-h-screen flex-col md:h-screen md:flex-row md:overflow-hidden text-white">
            <>
            <aside className="hidden bg-slate-800 p-4 md:block md:min-h-screen md:w-[250px] md:min-w-[250px]">
                <Sidebar/>
            </aside>

            {isSidebarOpen && (
                <aside className="fixed inset-0 z-50 bg-slate-800 md:hidden">
                    <div className="flex justify-end p-4">
                        <button onClick={() => setIsSidebarOpen(false)} className="text-3x1 text-white">X</button>
                    </div>
                    <Sidebar/>
                </aside>
            )}
            </>

            <main className="flex flex-1 flex-col gap-5 p-4 md:overflow-y-auto md:p-5">

                <header>
                    <Navbar title="Dashboard" toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}/>
                </header>

                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-gray-50/50 rounded-2x1">
                    
                    <StatCard title="Total Customers" value={users.length}/>
                    
                    <StatCard title="Revenue" value={`${users.length * 5000}`}/>

                    <StatCard title="Active Customers" value={activeCustomers}/>

                </section> 

                <section className="rounded-1g bg-slate-800 p-5">
                    <h2 className="mb-4 text-1g font-semibold">
                        Quick Actions
                    </h2>

                    <div className="grid gap-4 sm:grid-cols-2 x1:grid-cols-4">
                        <button onClick={() => navigate("/customers")} className="rounded-1g bg-slate-700 p-4 text-left transition hover:bg-slate-600">
                            <h3 className="font-semibold">Customers</h3>
                            <p className="mt-1 text-sm text-slate-400">
                                Manage Customers
                            </p>
                        </button>

                        <button onClick={() => navigate("/analytics")} className="rounded-1g bg-slate-700 p-4 text-left transition hover:bg-slate-600">
                            <h3 className="font-semibold">Analytics</h3>
                            <p className="mt-1 text-sm text-slate-400">
                                View reports
                            </p>
                        </button>

                        <button onClick={() => navigate("/settings")} className="rounded-1g bg-slate-700 p-4 text-left transition hover:bg-slate-600">
                            <h3 className="font-semibold">Settings</h3>
                            <p className="mt-1 text-sm text-slate-400">
                                Configure Dashboard
                            </p>
                        </button>

                        <button onClick={() =>navigate("/subscription")} className="rounded-1g bg-slate-700 p-4 text-left transition hover:bg-slate-600">
                            <h3 className="font-semibold">Subscription</h3>
                            <p className="mt-1 text-sm text-slate-400">
                                Manage plans 
                            </p>
                        </button>
                    </div>
                </section>

                <section className="mt-10 rounded-1g bg-slate-800 p-5">
                    <h2 className="mb-4 text-x1 font-semibold text-white">Recent Activity</h2>

                    {notifications === 0 ? (
                        <p className="text-slate-400">No recent activity</p>
                    ) : (
                        <div className="space-y-3">
                            {notifications .slice(0,5).map((notification) => (
                                <div key={notification.id} className="rounded-md bg-slate-700 p-3">
                                    <p className="text-white">{notification.message}</p>
                                    <span className="text-sm text-slate-400">{notification.time}</span>
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