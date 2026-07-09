import { Bar, BarChart, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/ui/StatCard";
import { useState } from "react";
import { FaChartLine, FaHandshake, FaMoon, FaSun, FaUserPlus } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa6";
import Loader from "../components/ui/Loader";
import useThemeStore from "../store/themeStore";
import { logout } from "../services/authService";
import { useNavigate } from "react-router-dom";

  const chartData = [
        { month: "Jan", customers: 4 },
        { month: "Feb", customers: 6 },
        { month: "Mar", customers: 8 },
        { month: "Apr", customers: 10 },
        { month: "May", customers: 12 },
        { month: "June", customers: 15 },
    ];

    const revenueData = [
        {
            week: "Mon",
            subscriptions: 700,
            services: 300,
            support: 200,
        }, 
        {
            week: "Tue",
            subscriptions: 900,
            services: 500,
            support: 400,
        }, 
        {
            week: "Wed",
            subscriptions: 1200,
            services: 700,
            support: 500,
        }, 
        {
            week: "Thr",
            subscriptions: 1600,
            services: 900,
            support: 700,
        }, 
        {
            week: "Fri",
            subscriptions: 2000,
            services: 1200,
            support: 900,
        }, 
        {
            week: "Sat",
            subscriptions: 2600,
            services: 1700,
            support: 900,
        }, 
    ];

    const analyticsData = {
        "Last 7 Days": {
            totalCustomers: 5,
            activeCustomers: 4,
            revenue: "$900",
            growth: "+4%",
            customerChart: [
                { month: "Jan", customers: 1 },
                { month: "Feb", customers: 2 },
                { month: "Mar", customers: 3 },
                { month: "Apr", customers: 4 },
                { month: "May", customers: 5 },
            ],
            revenueChart: [
                {
                    week: "Mon",
                    subscriptions: 80,
                    services: 40,
                    support: 30,
                },
                {
                    week: "Tue",
                    subscriptions: 90,
                    services: 50,
                    support: 40,
                },
                {
                    week: "Wed",
                    subscriptions: 120,
                    services: 60,
                    support: 40,
                },
                 {
                    week: "Thu",
                    subscriptions: 100,
                    services: 40,
                    support: 20,
                },
                 {
                    week: "Fri",
                    subscriptions: 130,
                    services: 50,
                    support: 30,
                },
            ]
        },
        "Last 30 Days": {
            totalCustomers: 10,
            activeCustomers: 8,
            revenue: "$4,200",
            growth: "+12%",
            customerChart: chartData,
            revenueChart: revenueData,
        },

        "Last 90 Days": {
            totalCustomers: 25,
            activeCustomers: 21,
            revenue: "$12,000",
            growth: "+28%",
            customerChart: [
                { month: "Mon", customers: 10 },
                { month: "Tue", customers: 12 },
                { month: "Wed", customers: 14 },
                { month: "Thu", customers: 20 },
                { month: "Fri", customers: 30 },
            ],
            revenueChart: [
                {
                    week: "Mon",
                    subscriptions: 120,
                    services: 80,
                    support: 50,
                },
                {
                    week: "Tue",
                    subscriptions: 150,
                    services: 90,
                    support: 60,
                },
                {
                    week: "Wed",
                    subscriptions: 170,
                    services: 100,
                    support: 70,
                },
                 {
                    week: "Thu",
                    subscriptions: 220,
                    services: 120,
                    support: 90,
                },
                 {
                    week: "Fri",
                    subscriptions: 280,
                    services: 150,
                    support: 120,
                },
            ],
        }
    }; 

    const performanceData = [
        {
            id: 1,
            title: "Revenue Increased",
            description: "Revenue increased by 12% this month.",
            icon: <FaChartLine className="text-green-500"/>,
        },
        {
            id: 2,
            title: "New Customers",
            description: "3 new customers joined.",
            icon: <FaUserPlus className="text-blue-500"/>
        },
        {
            id: 3,
            title: "Subscription Ugraded",
            description: "One customer upgraded their subscription.",
            icon: <FaArrowUp className="text-yellow-500"/>,
        },
        {
            id: 4,
            title: "Customer Engagement",
            description: "Customer engagement improved this week.",
            icon: <FaHandshake className="text-purple-500"/>,
        },
    ];

function Analytics() {
    const handleExportCSV = () => {
        const headers = [
            "Month",
            "Subscriptions",
            "Services",
            "Support",
        ];

        const rows = currentData.revenueChart.map((item) => [
            item.month,
            item.subscriptions,
            item.services,
            item.support,
        ]);

        const csvContent = [
            headers,
            ...rows,
        ]
           .map((row) => row.join(",")).join("\n");

        const blob = new Blob([csvContent], {
            type: "text/csv;charset=utf-8;",
        });

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.download = "analytics-report.csv";
        link.click();

        URL.revokeObjectURL(url);
    };

     const [isSidebarOpen, setIsSidebarOpen] = useState(false)
     const [dateRange, setDateRange] = useState("Last 7 Days")
     const currentData = analyticsData[dateRange]
     const navigate = useNavigate()
     const isDark = useThemeStore((state) => state.isDark) 
     const toggleTheme = useThemeStore((state) => state.toggleTheme) 
     const handleLogout = async () => {
        try {
            await logout()
            navigate("/", { replace: true })
        } catch (error) {
            toast.error(error)
        }
    }

    return (
        <div className="flex min-h-screen flex-col md:h-screen md:flex-row text-black dark:text-white md:overflow-hidden">
            <>
            <aside className="hidden bg-white dark:bg-slate-800 p-4 md:flex md:min-h-screen md:w-[250px] md:min-w-[250px] md:flex-col">
                <Sidebar/>

                <div className="mt-auto border-t border-slate-700 pt-4 space-y-3">
                    <button onClick={toggleTheme} className="flex items-center gap-3 w-full rounded-1g px-4 py-3 bg-slate-200 dark:bg-slate-700 p-2 transition hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100 text-sm">
                      {isDark ? <FaSun size={18}/> : <FaMoon size={18} />}
                    </button>
                    <button onClick={handleLogout} className="flex items-center gap-3 w-full rounded-1g px-4 py-3 bg-blue-500 text-xs md:text-sm font-medium text-white md:px-3 hover:bg-blue-600">Logout</button> 
                
                </div>
            </aside>

            {isSidebarOpen && (
                <aside className="fixed inset-0 z-50 bg-white dark:bg-slate-800 md:hidden">
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

            <main className="flex flex-1 flex-col gap-5 p-4 md:overflow-y-auto md:p-5 bg-white dark:bg-slate-900">
                <Navbar title="Analytics" toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}/>

                <section className="flex flex-col gap-4 rounded-1g bg-white dark:bg-slate-800 p-5 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h2 className="text-2x1 font-bold text-black dark:text-white">
                            Analytics Overview
                        </h2>

                        <p className="text-sm text-black dark:text-slate-400">
                            Track customer growth and 
                            revenue performance. 
                        </p>
                    </div>

                    <select value={dateRange} onChange={(e) => setDateRange(e.target.value)} className="rounded-md border border-slate-600 bg-gray-100 dark:bg-slate-700 px-4 py-2 text-black dark:text-white outline-none">
                        <option>Last 7 Days</option>
                        <option>Last 30 Days</option>
                        <option>Last 90 Days</option>
                        <option>Custom Range</option>
                    </select>
                </section>

                <section className="grid gap-4 sm:grid-cols-2 x1:grid-cols-4">
                    <StatCard title="Total customers" value={currentData.totalCustomers}/>
                    <StatCard title="Active Customers" value={currentData.activeCustomers}/>
                    <StatCard title="Revenue" value={currentData.revenue}/>
                    <StatCard title="Growth Rate" value={currentData.growth}/>
                </section>

                <section className="rounded-1g bg-gray-100 dark:bg-slate-800 p-5">
                    <h2 className="mb-4 text-1g font-semibold">
                        Customer Growth 
                    </h2>
                  <div className="w-full h-[320px]">
                     <ResponsiveContainer width="100%" height={300}> 
                        <LineChart data={currentData.customerChart}>
                            <XAxis dataKey="month" stroke="#94a3b8"/>
                            <YAxis stroke="#94a3b8"/>
                            <Tooltip/>

                            <Line type="monotone" dataKey="customers" stroke="#3b82f6" strokeWidth={3}/>
                        </LineChart>
                    </ResponsiveContainer>
                   </div>
                </section>

                <section className="rounded-1g bg-gray-100 dark:bg-slate-800 p-5">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-1g font-semibold text-slate-900 dark:text-white">
                            Revenue Analytics
                        </h2>

                        <button onClick={handleExportCSV} className="rounded-1g bg-gray-100 dark:bg-blue-500 px-4 py-2 text-sm font-medium text-black dark:text-white transition hover:bg-slate-200 dark:hover:bg-blue-600">
                            Export CSV
                        </button>
                    </div>

                    <div className="w-full h-[320px]">
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={currentData.revenueChart}>
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

                <section className="rounded-1g bg-gray-100 dark:bg-slate-800 p-5">
                    <h2 className="mb-4 text-1g font-semibold text-black dark:text-white">
                        Recent Prformance
                    </h2>

                    <div className="grid gap-4 sm:grid-cols-2">
                        {performanceData.map((item) => (
                            <div key={item.id} className="rounded-1g border border-slate-700 bg-gray-100 dark:bg-slate-700 p-4 transition hover:bg-slate-600">
                                <div className="flex items-start gap-3">
                                    <span className="text-2x1">
                                        {item.icon}
                                    </span>

                                    <div>
                                        <h3 className="font-semibold text-black dark:text-white">
                                            {item.title}
                                        </h3>

                                        <p className="mt-1 text-sm text-black dark:text-white">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                             </div> 
                        ))}
                    </div>
                </section>
            </main>
        </div>
    )
}

export default Analytics

