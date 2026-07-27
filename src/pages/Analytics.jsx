import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bar, BarChart, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { FaChartLine, FaHandshake, FaMoon, FaSun, FaUserPlus } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa6";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/ui/StatCard";
import Loader from "../components/ui/Loader";
import useThemeStore from "../store/themeStore";
import { logout } from "../services/authService";

const PERFORMANCE_DATA = [
    { id: 1, title: "Revenue Increased", description: "Revenue increased this month.", icon: <FaChartLine className="text-green-500"/> },
    { id: 2, title: "New Customers", description: "New customers joined.", icon: <FaUserPlus className="text-blue-500"/> },
    { id: 3, title: "Subscription Upgraded", description: "Subscription upgraded.", icon: <FaArrowUp className="text-yellow-500"/> },
    { id: 4, title: "Customer Engagement", description: "Customer engagement improved.", icon: <FaHandshake className="text-purple-500"/> },
];

function Analytics() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [dateRange, setDateRange] = useState("Last 7 Days");
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const isDark = useThemeStore((state) => state.isDark);
    const toggleTheme = useThemeStore((state) => state.toggleTheme);

    useEffect(() => {
        const fetchAnalytics = async () => {
            setLoading(true);
            try {
                const res = await fetch(`https://crm-backend-wek4.onrender.com/api/analytics?range=${dateRange}`);
                const data = await res.json();
                if (data.success) {
                    setAnalytics(data.data);
                }
            } catch (err) {
                console.error("Failed to load analytics", err);
            } finally {
                setLoading(false);
            }
        };
        fetchAnalytics();
    }, [dateRange]);

    const handleExportCustomerCSV = () => {
        if (!analytics?.customerChart)
            return;

        const headers = ["Label / Month", "Total Customers"]
        const rows = analytics.customerChart.map((item) => [
            item.month,
            item.customers,
        ]);

        const csvContent = [headers, ...rows].map((row) => row.join(",")).join("\n")
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `customer-growth-${dateRange.replace(/\s+/g, '-').toLowerCase()}.csv`;
        link.click();
        URL.revokeObjectURL(url);
    };

    const handleExportCSV = () => {
        if (!analytics?.revenueChart) return;

        const headers = ["Week", "Subscriptions", "Services", "Support"];
        const rows = analytics.revenueChart.map((item) => [
            item.week,
            item.subscriptions,
            item.services,
            item.support,
        ]);

        const csvContent = [headers, ...rows].map((row) => row.join(",")).join("\n");
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `analytics-report-${dateRange.replace(/\s+/g, '-').toLowerCase()}.csv`;
        link.click();
        URL.revokeObjectURL(url);
    };

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/", { replace: true });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex min-h-screen flex-col md:h-screen md:flex-row text-black dark:text-white md:overflow-hidden">
            <aside className="hidden bg-white dark:bg-slate-800 p-4 md:flex md:min-h-screen md:w-[250px] md:min-w-[250px] md:flex-col">
                <Sidebar/>
                <div className="mt-auto border-t border-slate-700 pt-4 space-y-3">
                    <button onClick={toggleTheme} className="flex items-center gap-3 w-full rounded-lg px-4 py-3 bg-slate-200 dark:bg-slate-700 p-2 text-slate-800 dark:text-slate-100 text-sm">
                      {isDark ? <FaSun size={18}/> : <FaMoon size={18} />}
                    </button>
                    <button onClick={handleLogout} className="flex items-center justify-center gap-3 w-full rounded-lg px-4 py-3 bg-blue-500 text-sm font-medium text-white hover:bg-blue-600">Logout</button> 
                </div>
            </aside>

            {isSidebarOpen && (
                <aside className="fixed inset-0 z-50 bg-white dark:bg-slate-800 md:hidden p-4 flex flex-col">
                    <div className="flex justify-end">
                        <button onClick={() => setIsSidebarOpen(false)} className="text-2xl text-black dark:text-white font-bold">✕</button>
                    </div>
                    <Sidebar/>
                    <div className="mt-auto border-t border-slate-700 pt-4 space-y-3">
                        <button onClick={toggleTheme} className="flex w-full items-center justify-center gap-3 rounded-md bg-slate-200 dark:bg-slate-700 py-2 text-sm font-medium">
                           Dark Mode {isDark ? <FaSun size={18}/> : <FaMoon size={18}/>} 
                        </button>
                        <button onClick={handleLogout} className="flex w-full items-center justify-center gap-3 rounded-md bg-blue-500 py-2 text-sm font-medium text-white">
                            Logout
                        </button>
                    </div>
                </aside>
            )}

            <main className="flex flex-1 flex-col gap-5 p-4 md:overflow-y-auto md:p-5 bg-white dark:bg-slate-900">
                <Navbar title="Analytics" toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}/>

                <section className="flex flex-col gap-4 rounded-lg bg-white dark:bg-slate-800 p-5 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-black dark:text-white">Analytics Overview</h2>
                        <p className="text-sm text-gray-600 dark:text-slate-400">Track customer growth and revenue performance.</p>
                    </div>

                    <select value={dateRange} onChange={(e) => setDateRange(e.target.value)} className="rounded-md border border-slate-600 bg-gray-100 dark:bg-slate-700 px-4 py-2 text-black dark:text-white outline-none">
                        <option>Last 7 Days</option>
                        <option>Last 30 Days</option>
                        <option>Last 90 Days</option>
                    </select>
                </section>

                {loading ? (
                    <div className="flex h-64 items-center justify-center">
                        <Loader />
                    </div>
                ) : (
                    <>
                        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                            <StatCard title="Total Customers" value={analytics?.totalCustomers || 0}/>
                            <StatCard title="Active Customers" value={analytics?.activeCustomers || 0}/>
                            <StatCard title="Revenue" value={analytics?.revenue || "$0"}/>
                            <StatCard title="Growth Rate" value={analytics?.growth || "0%"}/>
                        </section>

                        <section className="rounded-lg bg-gray-100 dark:bg-slate-800 p-5">
                            <div className="mb-4 flex items-center justify-between">
                                <h2 className="text-1g font-semibold text-slate-900 dark:text-white">Customer Growth</h2>
                                <button onClick={handleExportCustomerCSV} className="rounded-1g bg-blue-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-600">
                                    Export CSV
                                </button>
                            </div>

                            <div className="w-full h-[300px]">
                                <ResponsiveContainer width="100%" height="100%"> 
                                    <LineChart data={analytics?.customerChart || []}>
                                        <XAxis dataKey="month" stroke="#94a3b8"/>
                                        <YAxis stroke="#94a3b8"/>
                                        <Tooltip/>
                                        <Line type="monotone" dataKey="customers" stroke="#3b82f6" strokeWidth={3}/>
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </section>

                        <section className="rounded-lg bg-gray-100 dark:bg-slate-800 p-5">
                            <div className="mb-4 flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Revenue Analytics</h2>
                                <button onClick={handleExportCSV} className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-600">
                                    Export CSV
                                </button>
                            </div>

                            <div className="w-full h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={analytics?.revenueChart || []}>
                                        <XAxis dataKey="week" stroke="#94a3b8"/>
                                        <YAxis stroke="#94a3b8"/>
                                        <Tooltip/>
                                        <Legend/>
                                        <Bar dataKey="subscriptions" stackId="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]}/>
                                        <Bar dataKey="services" stackId="revenue" fill="#22c55e" radius={[4, 4, 0, 0]}/>
                                        <Bar dataKey="support" stackId="revenue" fill="#f59e0b" radius={[4, 4, 0, 0]}/>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </section>
                    </>
                )}

                <section className="rounded-lg bg-gray-100 dark:bg-slate-800 p-5">
                    <h2 className="mb-4 text-lg font-semibold text-black dark:text-white">Recent Performance</h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                        {PERFORMANCE_DATA.map((item) => (
                            <div key={item.id} className="rounded-lg border border-slate-700 bg-white dark:bg-slate-700 p-4">
                                <div className="flex items-start gap-3">
                                    <span className="text-2xl">{item.icon}</span>
                                    <div>
                                        <h3 className="font-semibold text-black dark:text-white">{item.title}</h3>
                                        <p className="mt-1 text-sm text-gray-600 dark:text-slate-300">{item.description}</p>
                                    </div>
                                </div>
                            </div> 
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Analytics;