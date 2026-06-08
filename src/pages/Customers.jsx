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

function Users() {
    const [search, setSearch] = useState("")

    const debouncedSearch = useDebounce(search, 500)

    const { users, loading, error, setUsers, refetch } = UseUsers(debouncedSearch)

    const deleteUser = useStore((state) => state.deleteUser)
    const handleDelete = (id) => {
        deleteUser(id)
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
                 <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search users"/>

                    {filteredUsers.length === 0 ? (
                        <EmptyState message="No users found"/>
                    ) : (
                        <div className="mt-6 w-full overflow-x-auto rounded-1g bg-slate-800">
                            <table className="w-full border-collapse text-left text-slate-100">
                                <thead className="bg-slate-900">
                                    <tr className="border-b border-slate-700 hover:bg-slate-700">
                                        <th className="border-2 border-slate-700 px-6 py-4 text-sm font-semibold uppercase tracking-wide text-slate-400">Name</th>
                                        <th>Email</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {filteredUsers.map((user) => (
                                        <tr key={user.id}>
                                            <td className="px-6 py-4 text=[0.95rem]">{user.name}</td>
                                            <td>{user.email}</td>
                                            <td><button aria-label="Delete User" className="rounded p-1 text-red-400 transition-transform hover:scale-110 hover:text-red-300" onClick={() => handleDelete(user.id)}>X</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </>
            )}
            </main>
        </div>
    )
}

export default Users 