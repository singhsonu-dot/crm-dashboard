import { useForm } from "react-hook-form"
import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"
import useNotificationStore from "../store/notificationStore"
import toast from "react-hot-toast"
import { useState } from "react"

function Settings() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const[emailNotifications, setEmailNotifications] = useState(true)
    const [marketingEmails, setMarketingEmails] = useState(false)
    const [productUpdates, setProductUpdates] = useState(true)

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const addNotification = useNotificationStore((state) => state.addNotification)

    const newPassword = watch("newPassword")

    const onSubmit = (data) => {
        addNotification("Profile updated")
        toast.success("Profile updated")
    } 

    const handlePasswordUpdate = () => {
        addNotification("Password Update")
        toast.success("Password Update")
    }

    const handleToggle = (
        label,
        value,
        setter
    ) => {
        setter(!value)

        addNotification(`${label} ${!value ? "Enable" : "Disable"}`)
        toast.success(`${label} ${!value ? "Enable" : "Disable"}`)
    }

    return (
        <div className="flex flex-col md:flex-row text-white min-h-screen">
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

            <main className="flex-1 p-5">
                <header>
                    <Navbar title="Settings" toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}/>
                </header>

                <section className="mt-6">
                    <h1 className="text-3x1 font-bold">
                        Settings
                    </h1>

                    <p className="mt-2 text-black">
                        Manage your profile settings. 
                    </p>
                </section>

                <section className="mt-8 rounded-1g bg-slate-800 p-6">
                    <h2 className="mb-6 text-2x1 font-bold">
                        Profile Settings
                    </h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <input {...register("name", {
                            required: "Name is required",
                        })}
                        placeholder="Name" className="w-full-rounded-1g p-3 text-slate-300"/>

                        {errors.name && (
                            <p className="mt-1 text-sm text-red-400"> 
                                {errors.name.message}
                            </p>
                        )}

                        <input {...register("email", {
                            required: "Email is required",
                        })}
                        placeholder="Email" className="w-full rounded-1g p-3 text-slate-300"/>

                        {errors.email && (
                            <p className="text-red-400">
                                {errors.email.message}
                            </p>
                        )}

                        <input {...register("phone")} placeholder="Phone" className="w-full rounded-1g p-3 text-slate-300"/>

                        <textarea {...register("bio")} placeholder="Bio" rows="4" className="w-full rounded-1g p-3 text-slate-300"/>

                        <button type="submit" className="rounded-1g bg-blue-500 px-6 py-3 font-medium text-white transition hover:bg-blue-600">Save Changes</button>
                    </form>
                </section>

                <section className="mt-8 rounded-1g bg-slate-800 p-6">
                    <h2 className="mb-6 text-2x1 font-bold">
                        Account Settings
                    </h2>

                    <form onSubmit={handleSubmit(handlePasswordUpdate)} className="space-y-4">
                        <input type="password" placeholder="Current Password" {...register("Current Password", {
                            required: "Current password is required", 
                        })}
                        className="w-full rounded-1g p-3 text-white"/>

                        {errors.currentPassword && (
                            <p className="text-red-400">
                                {errors.currentPassword.message}
                            </p>
                        )}

                        <input type="password" placeholder="New Password" {...register("newPassword", {
                            required: "New password is required",
                        })}
                        className="w-full rounded-1g p-3 text-white"/>

                        {errors.newPassword && (
                            <p className="text-red-400">
                                {errors.newPassword.message}
                            </p>
                        )}

                        <input type="password" placeholder="Confirm Password" {...register("confirmPassword", {
                            required: "Current password is required",
                            validate: (value) => value === newPassword || "Passwords do not match", 
                        })}
                        className="w-full rounded-1g p-3 text-white"/>

                        {errors.confirmPassword && (
                            <p className="text-red-400">
                                {errors.confirmPassword.message}
                            </p>
                        )}

                        <button type="submit" className="rounded-1g bg-blue-500 px-6 py-3 font-medium text-white transition hover:bg-blue-600">
                            Update Password
                        </button>
                        </form>            
                </section>

                <section className="mt-8 rounded-1g bg-slate-800 p-6">
                    <h2 className="mb-6 text-2x1 font-bold">
                        Preferences
                    </h2>

                    <div className="mb-4 flex items-center justify-between">
                        <div>
                            <h3 className="font-medium">Email Notifications</h3>

                            <p className="text-sm text-slate-400">
                                Recieve account alerts
                            </p>
                        </div>

                        <button onClick={() => handleToggle("Email Notifications", emailNotifications, setEmailNotifications)} className={`rounded-1g px-4 py-2 text-sm font-medium ${emailNotifications ? "bg-green-500" : "bg-slate-600"}`}>
                            {emailNotifications ? "Enable" : "Disable"}
                        </button>
                    </div>

                    <div className="mb-4 flex items-center justify-between">
                        <div>
                            <h3 className="font-medium">Marketing Emails</h3>

                            <p className="text-sm text-slate-400">
                                Recieve marketing alerts
                            </p>
                        </div>

                        <button onClick={() => handleToggle("Marketing Notfications", marketingEmails, setMarketingEmails)} className={`rounded-1g px-4 py-2 text-sm font-medium ${marketingEmails ? "bg-green-500" : "bg-slate-600"}`}>
                            {marketingEmails ? "Enable" : "Disable"}
                        </button>
                    </div>

                    <div className="mb-4 flex items-center justify-between">
                        <div>
                            <h3 className="font-medium">Product Emails</h3>

                            <p className="text-sm text-slate-400">
                                Recieve product alerts
                            </p>
                        </div>

                        <button onClick={() => handleToggle("Product Notfications", productUpdates, setProductUpdates)} className={`rounded-1g px-4 py-2 text-sm font-medium ${productUpdates ? "bg-green-500" : "bg-slate-600"}`}>
                            {productUpdates ? "Enable" : "Disable"}
                        </button>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default Settings