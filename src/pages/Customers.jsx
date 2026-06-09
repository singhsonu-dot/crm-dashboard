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
        })

        addNotification("Customer added")

        toast.success("Customer added")

        setName("")
        setEmail("")
        setShowModal(false)
    }

    const [showModal, setShowModal] = useState(false)

    const [name, setName] = useState("")

    const [email, setEmail] = useState("")

    const [search, setSearch] = useState("")

    const debouncedSearch = useDebounce(search, 500)

    const { users, loading, error, setUsers, refetch } = UseUsers(debouncedSearch)

    const addUser = useStore((state) => state.addUser)
    const deleteUser = useStore((state) => state.deleteUser)
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
                <div className="w-full md:max-w-md">
                 <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search users"/>

                    <button onClick={() =>setShowModal(true)} className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">+ Add Customers</button>

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
                                        <th className="px-6 py-4 text-center">Action</th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-slate-700">
                                    {filteredUsers.map((user) => (
                                        <tr key={user.id} className = "hover:bg-slate-700/50 transition-colors">
                                            <td className="px-6 py-4 text=[0.95rem] whitespace-nowrap font-medium">{user.name}</td>
                                            <td className="px-6 py-4 text-slate-300">{user.email}</td>
                                            <td className="px-6 py-4 text-slate-300 whitespace-nowrap">{user.phone}</td>
                                            <td className="px-6 py-4 text-slate-400">{user.website}</td>
                                            <td className="px-6 py-4 text-center"><button aria-label="Delete User" className="rounded p-1 text-red-400 transition-transform hover:scale-110 hover:text-red-300" onClick={() => handleDelete(user.id)}>X</button></td>
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

                                    <button onClick={handleAddCustomer} className="rounded bg-slate-500 px-4 py-2 text-white">Save</button>
                                </div>
                            </div>
                        </div> 
                    )}
                </div>
            )}
            </main>
        </div>
    )
}

export default Customers