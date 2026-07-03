import toast from "react-hot-toast"
import useNotificationStore from "../store/notificationStore"
import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"
import { useState } from "react"

function Subscription() {
    const plans = [
        {
            id: 1,
            name: "Free",
            price: "$0",
            features: [
                "Dashboard Access", 
                "Customer Management", 
                "Basic Analytics",
            ],
        },

        {
            id: 2,
            name: "Pro",
            price: "$29/mo",
            features: [
                "Advance Analytics", 
                "CSV Export", 
                "Data Filters",
                "Dark Mode",
                "Responsive Dashboard",
            ],
        },

        {
            id: 3,
            name: "Enterprise",
            price: "Contact Sales",
            features: [
                "Custom Integrations",
                "API Support",
                "Scalable Dashboard",
                "Team Management (future feature)",
                "Custom Branding (future feature)",
            ],
        },
    ]

    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const addNotification = useNotificationStore((state) => state.addNotification)

    const handlePlanSelect = (planName) => {
        addNotification(`${planName} plan selected`)
        toast.success(`${planName} plan selected`)
    }

    return (
        <div className="flex flex-col md:flex-row min-h-screen text-black dark:text-white md:overflow-hidden">
             <>
            <aside className="hidden bg-gray-100 dark:bg-slate-800 p-4 md:flex md:min-h-screen md:w-[250px] md:min-w-[250px] md:flex-col">
                <Sidebar/>

                <div className="mt-auto border-t border-slate-700 pt-4">
                    <button className="w-full rounded-md bg-gray-100 dark:bg-slate-700 py-2  text-black dark:text-white hover:bg-slate-600">
                        Dark Mode 
                    </button>
                </div>
            </aside>

            {isSidebarOpen && (
                <aside className="fixed inset-0 z-50 bg-slate-100 dark:bg-slate-800 md:hidden">
                    <div className="flex justify-end p-4">
                        <button onClick={() => setIsSidebarOpen(false)} className="text-3x1 text-black dark:text-white">X</button>
                    </div>
                    <Sidebar/>
                </aside>
            )}
            </>

            <main className="flex flex-1 flex-col gap-5 p-4 md:overflow-y-auto md:p-5 bg-white dark:bg-slate-900">
                <header>
                    <Navbar title="Subscription" toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}/>
                </header>

                <section className="mt-6">
                    <h2 className="text-3x1 font-bold text-black dark:text-white">
                        Subscription Plans
                    </h2>

                    <p className="mb-8 text-black dark:text-white">
                        Choose the plan that best fits 
                        your business. 
                    </p>
                </section>

                <section className="grid gap-6 md:grid-cols-3">
                    {plans.map((plan) => (
                <div key={plan.id} className="rounded-1g bg-gray-100 dark:bg-slate-800 p-6 shadow-1g transition hover:scale-105">
                    <h2 className="text-2x1 font-bold text-black dark:text-white">{plan.name}</h2>
                    <p className="mt-2 text-3x1 font-bold text-black dark:text-blue-400">{plan.price}</p>
                    <ul className="mt-6 space-y-3">
                        {plan.features.map((feature) => (
                            <li key={feature} className="text-black dark:text-white">
                                {feature}
                            </li>
                        ))}
                    </ul>

                    <button onClick={() => handlePlanSelect(plan.name)} className="mt-8 w-full rounded-1g bg-blue-500 py-3 font-medium text-white transition hover:bg-blue-600">Choose plan</button>
                </div>
            ))}

                </section>
            </main>
        </div>
    )
}

export default Subscription