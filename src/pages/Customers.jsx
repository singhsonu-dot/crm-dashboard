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

function Customers() {
    const handleAddCustomer = () => {
        if (!name || !email) return

        addUser({
            id: Date.now(),
            name,
            email,
            status: "active",
        })

        addNotification("Customer added")

        toast.success("Customer added")

        setName("")
        setEmail("")
        setShowModal(false)
    }

    const handleEdit = (user) => {
        setEditingId(user.id)

        setName(user.name)
        setEmail(user.email)

        setIsEditing(true)
        setShowModal(true)
    }

    const handleUpdateCustomer = () => {
        updateUser({
            id: editingId,
            name,
            email,
        })

        addNotification("Customer updated")
        toast.success("Customer updated")

        setName("")
        setEmail("")

        setEditingId(null)
        setIsEditing(false)
        setShowModal(false)
    }

    const handleStatusToggle = (user) => {
        toggleStatus(user.id)

        addNotification(`Customer${user.status === "active" ? "inactive" : "active"}`)

        toast.success("Status updated")
    }

    const [showModal, setShowModal] = useState(false)

    const [name, setName] = useState("")

    const [email, setEmail] = useState("")

    const [isEditing, setIsEditing] = useState(false)
    const [editingId, setEditingId] = useState(null)

    const [search, setSearch] = useState("")

    const debouncedSearch = useDebounce(search, 500)

    const { users, loading, error, setUsers, refetch } = UseUsers(debouncedSearch)

    const addUser = useStore((state) => state.addUser)
    const updateUser = useStore((state) => state.updateUser)
    const deleteUser = useStore((state) => state.deleteUser)
    const toggleStatus = useStore((state) => state.toggleStatus)
    const addNotification = useNotificationStore((state) => state.addNotification)
    const handleDelete = (id) => {
        deleteUser(id)
        addNotification("Customer deleted")
        toast.success("user deleted") 
    }

    const filteredUsers = users.filter((user) => user.name.toLowerCase().includes(debouncedSearch.toLowerCase()))

    if (loading) {
        return <Loader/>
    }

    return (
        <div className="flex min-h-screen flex-col md:h-screen md:flex-row md:overflow-hidden">
            <aside className="w-full bg-slate-800 md:w-[250px] md:min-w-[250px]"><Sidebar/></aside>

            <main className="flex flex-1 flex-col gap-5 p-4 md:overflow-y-auto md:p-5">
            <Navbar title="Customers"/>

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
                        <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} placehholder="Search Customers"/>
                    </div>

                    <button onClick={() => setShowModal(true)} className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">+ Add Customers</button>
                </div> 

                    {filteredUsers.length === 0 ? (
                        <EmptyState message="No users found"/>
                    ) : (
                        <div className="mt-6 w-full overflow-x-auto rounded-1g bg-slate-800 shadow-md">
                            <table className="w-full border-collapse text-left text-slate-100 min-w-[700px] md:min-w-full">
                                <thead className="bg-slate-900">
                                    <tr className="border-b border-slate-700 text-xs uppercase tracking-wide text-slate-400">
                                        <th className="px-6 py-4">Name</th>
                                        <th className="px-6 py-4">Email</th>
                                        <th className="px-6 py-4">Phone</th>
                                        <th className="px-6 py-4">Website</th> 
                                        <th className="px-6 py-4">Status</th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-slate-700">
                                    {filteredUsers.map((user) => (
                                        <tr key={user.id} className = "hover:bg-slate-700/50 transition-colors">
                                            <td className="px-6 py-4 text-center">{user.name}
                                                <div className="flex justify-center gap-3">
                                                    <button onClick={() => handleEdit(user)} className="text-blue-400">Edit</button>
                                                    <button onClick={() => handleDelete(user.id)} className="text-red-400">X</button>
                                                    <button onClick={() => handleStatusToggle(user)} className={`relative h-6 w-12 rounded-full transition ${user.status === "active" ? "bg-green-500" : "bg-red-500"}`}>
                                                        <span className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${user.status === "active" ? "left-7" : "left-1"}`}/>
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-slate-300">{user.email}</td>
                                            <td className="px-6 py-4 text-slate-300 whitespace-nowrap">{user.phone}</td>
                                            <td className="px-6 py-4 text-slate-400">{user.website}</td>
                                            <td className="px-6 py-4 text-slate-400">
                                                <div className={`rounded-full px-3 py-1 text-xs font-semibold ${user.status === "active" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>{user.status}</div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {showModal && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                            <div className="w-full max-w-md rounded-1g bg-slate-800 p-6">
                                <h2 className="mb-4 text-x1 font-semibold text-white">Add Customer</h2>

                                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="mb-3 w-full rounded border border-slate-600 bg-slate-700 p-2 text-white"/>
                                <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="mb-3 w-full rounded border border-slate-600 bg-slate-700 p-2 text-white"/>

                                <div className="flex justify-end gap-2">
                                    <button onClick={() => setShowModal(false)} className="rounded bg-slate-600 px-4 py-2">Cancel</button>

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