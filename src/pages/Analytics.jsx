import { Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/ui/StatCard";
import { useState } from "react";

  const chartData = [
        { month: "Jan", customers: 4 },
        { month: "Feb", customers: 6 },
        { month: "March", customers: 8 },
        { month: "April", customers: 10 },
        { month: "May", customers: 12 },
        { month: "June", customers: 15 },
    ];

    const revenueData = [
        { month: "Jan", revenue: 1200 },
        { month: "Feb", revenue: 1800 },
        { month: "March", revenue: 2400 },
        { month: "April", revenue: 3200 },
        { month: "May", revenue: 4100 },
        { month: "June", revenue: 5200 },
    ];

function Analytics() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    return (
        <div className="flex min-h-screen flex-col md:h-screen md:flex-row md:overflow-hidden">
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
                <Navbar title="Analytics" toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}/>

                <section className="grid gap-4 sm:grid-cols-2 x1:grid-cols-4">
                    <StatCard title="Total customers" value="10"/>
                    <StatCard title="Active Customers" value="8"/>
                    <StatCard title="Revenue" value="$4,200"/>
                    <StatCard title="Growth Rate" value="+12%"/>
                </section>

                <section className="rounded-1g bg-slate-800 p-5">
                    <h2 className="mb-4 text-1g font-semibold">
                        Customer Growth 
                    </h2>
                  <div className="w-full h-[320px]">
                     <ResponsiveContainer width="100%" height={300}> 
                        <LineChart data={chartData}>
                            <XAxis dataKey="month" stroke="#94a3b8"/>
                            <YAxis stroke="#94a3b8"/>
                            <Tooltip/>

                            <Line type="monotone" dataKey="customers" stroke="#3b82f6" strokeWidth={3}/>
                        </LineChart>
                    </ResponsiveContainer>
                   </div>
                </section>

                <section className="rounded-1g bg-slate-800 p-5">
                    <h2 className="mb-4 text-1g font-semibold text-white">
                        Revenue Analytics
                    </h2>

                    <div className="w-full h-[320px]">
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={revenueData}>
                                <XAxis dataKey="month" stroke="#94a3b8"/>

                                <YAxis stroke="#94a3b8"/>

                                <Tooltip/>

                                <Bar dataKey="revenue" fill="#22c55e" radius={[4, 4, 0, 0]}/>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </section>

                <section className="rounded-1g bg-slate-800 p-5">
                    <h2 className="mb-4 text-1g font-semibold">
                        Recent Prformance
                    </h2>

                    <ul className="space-y-3 text-slate-300 list-none">
                        <li>Revenue increased by 12%</li>
                        <li>3 new customers joined</li>
                        <li>Subscription upgrade received</li>
                        <li>Customer engagement improved</li>
                    </ul>
                </section>
            </main>
        </div>
    )
}

export default Analytics

