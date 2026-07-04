import { useState } from "react";
import UseUsers from "../hooks/useUsers";
import useDebounce from "../hooks/useDebounce";
import Sidebar from "../components/Sidebar";
import Loader from "../components/ui/Loader";
import SearchBar from "../components/ui/SearchBar";
import EmptyState from "../components/ui/EmptyState";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";
import useStore from "../store/useStore";
import useNotificationStore from "../store/notificationStore";
import { RiDeleteBin6Line } from "react-icons/ri"; 
import { addCustomer } from "../services/customerService";
import { updateCustomer } from "../services/customerService";
import { deleteCustomer } from "../services/customerService";
import { toggleCustomerStatus } from "../services/customerService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useRoleStore from "../store/useRoleStore";
import { FaMoon, FaSun } from "react-icons/fa";
import useThemeStore from "../store/themeStore";
import { logout } from "../services/authService";
import { useNavigate } from "react-router-dom";

function Customers() {
    const resetForm = () => {
        setName("")
        setEmail("")
        setPhone("")
        setWebsite("")
        setEditingId(null)
        setIsEditing(false)
        setShowModal(false)
    }
    const addCustomerMutation = useMutation({
        mutationFn: addCustomer,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["customers"],
            });

            addNotification("Customer added")
            toast.success("Customer added")
            resetForm()
        },

        onError: (err) => {
            toast.error(err.message)
        },
    })

    const handleAddCustomer = async () => {
        if (!name || !email) return 

        addCustomerMutation.mutate({
            name,
            email,
            phone: phone || "",
            website: website || "", 
            status: "active",
        });
    }

    const handleEdit = (user) => {
        setEditingId(user.id)
        setName(user.name || "")
        setEmail(user.email || "")

        setPhone(user.phone || "")
        setWebsite(user.website || "")

        setIsEditing(true)
        setShowModal(true)
    }

    const updateCustomerMutation = useMutation({
        mutationFn: ({ id, data }) => updateCustomer(id, data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["customers"],
            });

            addNotification("Customers updated")
            toast.success("Customers updated")
            resetForm()
        },

        onError: (err) => {
            toast.error(err.message)
        }, 
    })

    const handleUpdateCustomer = async () => {
        updateCustomerMutation.mutate({
            id: editingId,
            data: {
                name,
                email,
                phone: phone || "",
                website: website || "",
            }, 
        })
    }

    const toggleStatusMutation = useMutation({
        mutationFn: ({ id, status }) =>
            toggleCustomerStatus(id, status),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["customers"],
            })

            addNotification("Customer status updated")
            toast.success("Customer status updated")
        },

        onError: (err) => {
            toast.error(err.message)
        }
    })

    const handleStatusToggle = async (user) => {
        toggleStatusMutation.mutate({
            id: user.id,
            status: user.status === "active" ? "inactive" : "active", 
        })
    }

    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [website, setWebsite] = useState("")
    const [isEditing, setIsEditing] = useState(false)
    const [editingId, setEditingId] = useState(null)
    const [search, setSearch] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const usersPerPage = 5     
    const navigate = useNavigate()

    const queryClient = useQueryClient()
    const debouncedSearch = useDebounce(search, 500)
    const { users, loading, error, setUsers, refetch } = UseUsers(debouncedSearch)

    const addNotification = useNotificationStore((state) => state.addNotification)
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

    const deleteCustomerMutation = useMutation(({
        mutationFn: deleteCustomer,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["customers"],
            });

            addNotification("Customer delete")
            toast.success("Customer delete")
        },

        onError: (err) => {
            toast.error(err.message)
        },
    }))
    
    const handleDelete = async (id) => {
        deleteCustomerMutation.mutate(id)
    }

    const filteredUsers = users.filter(
        (user) =>
        (user.name ?? "")
          .toLowerCase()
          .includes((debouncedSearch ?? "").toLowerCase()) || [] 
    )

    const totalPages = Math.ceil(filteredUsers.length / usersPerPage) || 1 
    const startIndex = (currentPage - 1) * usersPerPage
    const paginatedUsers = filteredUsers.slice(
        startIndex, 
        startIndex + usersPerPage
    )

    if (loading) {
        return <Loader/>
    }

    return (
        <div className="flex min-h-screen flex-col md:h-screen md:flex-row text-black dark:text-white md:overflow-hidden">
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
            <Navbar title="Customers" toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}/>

            {error ? (
                <div className="flex min-h-[60vh] w-full items-center justify-center">
                    <div className="max-w-md rounded-x1 border border-slate-700 bg-slate-800 px-10 py-9 text-center shadow-1g">
                        <h2 className="mb-2 text-x1 font-semibold text-red-500">Data not loaded</h2>
                        <p className="mb-6 text-sm loading-relaxed text-slate-400">{error || "Internet not connected"}</p>

                        <button aria-label="Retry" className="rounded-md bg-blue-500 px-5 py-2 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-blue-600" onClick={refetch}>Try again</button>
                    </div>
                </div>
            ) : (
                <>
                <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="w-full md:max-w-md">
                        <SearchBar value={search} onChange={(e) => {
                            setSearch(e.target.value)
                            setCurrentPage(1)
                        }} placehholder="Search Customers"/>
                    </div>

                    {role === "admin" && (
                        <button onClick={() => { resetForm(); setShowModal(true); }} className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
                            + Add Customer
                        </button>
                    )}
                </div> 

                    {filteredUsers.length === 0 ? (
                        <EmptyState message="No users found"/>
                    ) : (
                        <div className="mt-6 w-full overflow-x-auto rounded-1g bg-white dark:bg-slate-900 shadow-md">
                            <table className="w-full border-collapse text-left text-black dark:text-white min-w-187.5 md:min-w-full">
                                <thead className="bg-gray-100 dark:bg-slate-600">
                                    <tr className="border-b border-slate-700 text-xs uppercase tracking-wide text-black dark:text-white">
                                        <th className="px-6 py-4">Name</th>
                                        <th className="px-6 py-4">Email</th>
                                        <th className="px-6 py-4">Phone</th>
                                        <th className="px-6 py-4">Website</th> 
                                        <th className="px-6 py-4">Status</th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-slate-700">
                                    {paginatedUsers.map((user) => (
                                        <tr key={user.id} className = "hover:bg-slate-700/50 transition-colors">
                                            <td className="px-6 py-4 text-center">{user.name}
                                                <div className="flex justify-center gap-3">
                                                    {role === "admin" && (
                                                        <button onClick={() => handleEdit(user)} className="text-black dark:text-blue-400">
                                                            Edit
                                                        </button>
                                                    )}

                                                    {role === "admin" && (
                                                        <button onClick={() => handleDelete(user.id)} className="text-red-400">
                                                            <RiDeleteBin6Line/>
                                                        </button>
                                                    )}
                                                    
                                                    {role === "admin" && (
                                                        <button onClick={() => handleStatusToggle(user)} className={`relative h-6 w-12 rounded-full transition ${user.status === "active" ? "bg-green-500" : "bg-red-500"}`}>
                                                            <span className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${user.status === "active" ? "left-7" : "left-1"}`}/>
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-black dark:text-slate-300">{user.email}</td>
                                            <td className="px-6 py-4 text-black dark:text-slate-300 whitespace-nowrap">{user.phone || "-"}</td>
                                            <td className="px-6 py-4 text-black dark:text-slate-400">{user.website || "-"}</td>
                                            <td className="px-6 py-4 text-black dark:text-slate-400">
                                                <div className={`rounded-full px-3 py-1 text-xs font-semibold ${user.status === "active" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>{user.status}</div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    <div className="mt-6 flex items-center justify-center gap-4">
                        <button onClick={() => setCurrentPage(
                            (prev) => Math.max(prev - 1, 1)
                        )}
                        disabled={currentPage === 1} className="rounded-md bg-gray-100 dark:bg-slate-700 px-4 py-2 text-black dark:text-white disabled:opacity-50">Previous</button>

                        <span className="text-shadow-black dark:text-white">
                            Page {currentPage} of {totalPages}
                        </span>

                        <button onClick={() => setCurrentPage(
                            (prev) => Math.min(
                                prev + 1,
                                totalPages
                            )
                        )}
                        disabled={currentPage === totalPages} className="rounded-md bg-gray-100 dark:bg-slate-700 px-4 py-2 text-black dark:text-white disabled:opacity-50">Next</button>
                    </div>

                    {showModal && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                            <div className="w-full max-w-md rounded-1g bg-slate-800 p-6">
                                <h2 className="mb-4 text-x1 font-semibold text-white">{isEditing ? "Edit Customer" : "Add Customer"}</h2>

                                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="mb-3 w-full rounded border border-slate-600 bg-slate-700 p-2 text-white"/>
                                <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="mb-3 w-full rounded border border-slate-600 bg-slate-700 p-2 text-white"/>
                                <input type="text" placeholder="Phone (optional)" value={phone} onChange={(e) => setPhone(e.target.value)} className="mb-3 w-full rounded border border-slate-600 bg-slate-700 p-2 text-white"/>
                                <input type="text" placeholder="Website (optional)" value={website} onChange={(e) => setWebsite(e.target.value)} className="mb-3 w-full rounded border border-slate-600 bg-slate-700 p-2 text-white"/>

                                <div className="flex justify-end gap-2">
                                    <button onClick={resetForm} className="rounded bg-slate-600 px-4 py-2">Cancel</button>

                                    <button onClick={isEditing ? handleUpdateCustomer : handleAddCustomer} className="rounded bg-slate-500 px-4 py-2 text-white">{isEditing ? "Update" : "Save"}</button>
                                </div>
                            </div>
                        </div> 
                    )}
                
                </>
            )}
            </main>
        </div>
    )
}

export default Customers