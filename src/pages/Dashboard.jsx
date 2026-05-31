import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/ui/StatCard";
import "./Dashboard.css" 

function Dashboard() {
    return (
        <div className="layout">

            <aside className="sidebar-wrapper">
                <Sidebar/>
            </aside>

            <main className="main-content">

                <header>
                    <Navbar title="Admin"/>
                </header>

                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-gray-50/50 rounded-2x1">
                    
                    <StatCard title="Total Users" value="1250"/>
                    
                    <StatCard title="Revenue" value="$12,500"/>

                    <StatCard title="Active Users" value="830"/>

                </section>

                <section className="activity">
                    <h2>Recent Activity</h2>

                    <ul>
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