import { useForm } from "react-hook-form"
import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"
import useNotificationStore from "../store/notificationStore"
import toast from "react-hot-toast"
import { useState } from "react"
import useStore from "../store/useStore"
import useRoleStore from "../store/useRoleStore"
import { FaMoon, FaSun } from "react-icons/fa"
import useThemeStore from "../store/themeStore"
import { useNavigate } from "react-router-dom"
import { logout } from "../services/authService"

function Settings() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const[emailNotifications, setEmailNotifications] = useState(true)
    const [marketingEmails, setMarketingEmails] = useState(false)
    const [productUpdates, setProductUpdates] = useState(true)
    const navigate = useNavigate()

    const {
        register: profileRegister,
        handleSubmit: handleProfileSubmit,
        watch,
        formState: { errors: profileErrors },
    } = useForm()

     const {
        register: passwordRegister,
        handleSubmit: handlePasswordSubmit,
        formState: { errors: passwordErrors },
    } = useForm()

     const addNotification = useNotificationStore((state) => state.addNotification)
     const updateProfile = useStore((state) => state.updateProfile)
     const role = useRoleStore((state) => state.role)
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

    const newPassword = watch("newPassword")

    const onSubmit = (data) => {
        updateProfile({
            name: data.name,
            email: data.email,
        })

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

    if (role === "viewer") {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-slate-900">
                <div className="rounded-1g bg-gray-100 dark:bg-slate-800 p-8 text-center">
                    <h2 className="text-2x1 font-bold text-black dark:text-white">
                        Access Denied
                    </h2>

                    <p className="mt-3 text-black dark:text-slate-400">
                        Only administrators can access Settings.
                    </p>
                </div>
            </div>
        ); 
    }

    return (
        <div className="flex flex-col md:flex-row text-black dark:text-white min-h-screen">
            <>
            <aside className="hidden bg-white dark:bg-slate-800 p-4 md:flex md:min-h-screen md:w-[250px] md:min-w-[250px] md:flex-col">
                <Sidebar/>

                <div className="mt-auto border-t border-slate-700 pt-4 space-y-3">
                    <button onClick={toggleTheme} className="flex items-center gap-3 w-full rounded-1g px-4 py-3 bg-slate-200 dark:bg-slate-700 transition hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100 text-sm">
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
                          Dadrk Mode  {isDark ? <FaSun size={18}/> : <FaMoon size={18}/>} 
                        </button>
                        <button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-md bg-blue-500 py-2 text-sm font-medium text-white transition hover:bg-blue-600">
                            Logout
                        </button>
                    </div>
                </aside>
            )}
            </>

            <main className="flex-1 p-5 bg-white dark:bg-slate-900">
                <header>
                    <Navbar title="Settings" toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}/>
                </header>

                <section className="mt-6">
                    <h1 className="text-3x1 font-bold text-black dark:text-white">
                        Settings
                    </h1>

                    <p className="mt-2 text-black dark:text-white">
                        Manage your profile settings. 
                    </p>
                </section>

                <section className="mt-8 rounded-1g bg-gray-100 dark:bg-slate-800 p-6">
                    <h2 className="mb-6 text-2x1 font-bold text-black dark:text-white">
                        Profile Settings
                    </h2>

                    <form onSubmit={handleProfileSubmit(onSubmit)} className="space-y-4">
                        <input {...profileRegister("name", {
                            required: "Name is required",
                        })}
                        placeholder="Name" className="w-full-rounded-1g p-3 text-slate-700 dark:text-slate-300"/>

                        {profileErrors.name && (
                            <p className="mt-1 text-sm text-red-400"> 
                                {errors.name.message}
                            </p>
                        )}

                        <input {...profileRegister("email", {
                            required: "Email is required",
                        })}
                        placeholder="Email" className="w-full rounded-1g p-3 text-slate-700 dark:text-slate-300"/>

                        {profileErrors.email && (
                            <p className="text-red-400">
                                {errors.email.message}
                            </p>
                        )}

                        <input {...profileRegister("phone")} placeholder="Phone" className="w-full rounded-1g p-3 text-slate-700 dark:text-slate-300"/>

                        <textarea {...profileRegister("bio")} placeholder="Bio" rows="4" className="w-full rounded-1g p-3 text-slate-700 dark:text-slate-300"/>

                        <button type="submit" className="rounded-1g bg-blue-500 px-6 py-3 font-medium text-white transition hover:bg-blue-600">Save Changes</button>
                    </form>
                </section>

                <section className="mt-8 rounded-1g bg-gray-100 dark:bg-slate-800 p-6">
                    <h2 className="mb-6 text-2x1 font-bold">
                        Account Settings
                    </h2>

                    <form onSubmit={handlePasswordSubmit(handlePasswordUpdate)} className="space-y-4">
                        <input type="password" placeholder="Current Password" {...passwordRegister("Current Password", {
                            required: "Current password is required", 
                        })}
                        className="w-full rounded-1g p-3 text-black dark:text-white"/>

                        {passwordErrors.currentPassword && (
                            <p className="text-red-400">
                                {errors.currentPassword.message}
                            </p>
                        )}

                        <input type="password" placeholder="New Password" {...passwordRegister("newPassword", {
                            required: "New password is required",
                        })}
                        className="w-full rounded-1g p-3 text-black dark:text-white"/>

                        {passwordErrors.newPassword && (
                            <p className="text-red-400">
                                {errors.newPassword.message}
                            </p>
                        )}

                        <input type="password" placeholder="Confirm Password" {...passwordRegister("confirmPassword", {
                            required: "Current password is required",
                            validate: (value) => value === newPassword || "Passwords do not match", 
                        })}
                        className="w-full rounded-1g p-3 text-black dark:text-white"/>

                        {passwordErrors.confirmPassword && (
                            <p className="text-red-400">
                                {errors.confirmPassword.message}
                            </p>
                        )}

                        <button type="submit" className="rounded-1g bg-blue-500 px-6 py-3 font-medium text-white transition hover:bg-blue-600">
                            Update Password
                        </button>
                        </form>            
                </section>

                <section className="mt-8 rounded-1g bg-gray-100 dark:bg-slate-800 p-6">
                    <h2 className="mb-6 text-2x1 font-bold text-black dark:text-white">
                        Preferences
                    </h2>

                    <div className="mb-4 flex items-center justify-between">
                        <div>
                            <h3 className="font-medium">Email Notifications</h3>

                            <p className="text-sm text-black dark:text-slate-400">
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

                            <p className="text-sm text-black dark:text-slate-400">
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

                            <p className="text-sm text-black dark:text-slate-400">
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