import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/ui/StatCard";

function Dashboard() {
    const navigate = useNavigate() 

    return (
        <div className="flex min-h-screen flex-col md:h-screen md:flex-row md:overflow-hidden">

            <aside className="bg-slate-800 p-4 md:min-h-screen md:w-[250px] md:min-w-[250px]">
                <Sidebar/>
            </aside>

            <main className="flex flex-1 flex-col gap-5 p-4 md:overflow-y-auto md:p-5">

                <header>
                    <Navbar title="Admin"/>
                </header>

                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-gray-50/50 rounded-2x1">
                    
                    <StatCard title="Total Users" value="1250"/>
                    
                    <StatCard title="Revenue" value="$12,500"/>

                    <StatCard title="Active Users" value="830"/>

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
                    <h2>Recent Activity</h2>

                    <ul className="list-none text-slate-300">
                        <li>User Erin logged in</li>
                        <li>New order created</li>
                        <li>Admin updated dashboard</li>
                    </ul>
                </section>
            </main>
        </div>
    )
}

export default Dashboard 