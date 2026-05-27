import { useState } from "react";
import UseUsers from "../hooks/useUsers";
import useDebounce from "../hooks/useDebounce";
import Sidebar from "../components/Sidebar";
import "./Users.css"
import SearchBar from "../components/ui/SearchBar";
import EmptyState from "../components/ui/EmptyState";
import Loader from "../components/ui/Loader";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";

function Users() {
    const [search, setSearch] = useState("")

    const debouncedSearch = useDebounce(search, 500)

    const { users, loading, error, setUsers, refetch } = UseUsers(debouncedSearch)

    const handleDelete = (id) => {
        const updatedUsers = users.filter((user) => user.id !== id)
        setUsers(updatedUsers)
        toast.success("user deleted") 
    }

    const filteredUsers = users.filter((user) => user.name.toLowerCase().includes(debouncedSearch.toLowerCase()))

    if (loading) {
        return <Loader/>
    }

    return (
        <div className="layout">
            <aside className="sidebar-wrapper"><Sidebar/></aside>

            <main className="main-content">
            <Navbar title="Users"/>

            {error ? (
                <div className="error-wrapper-center">
                    <div className="error-card-polished">
                        <h2>Data not loaded</h2>
                        <p>{error || "Internet not connected"}</p>

                        <button aria-label="Retry" className="retry-action-btn" onClick={refetch}>Try again</button>
                    </div>
                </div>
            ) : (
                <>
                 <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Serach users"/>

                    {filteredUsers.length === 0 ? (
                        <EmptyState message="No users found"/>
                    ) : (
                        <div className="table-container">
                            <table className="users-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {filteredUsers.map((user) => (
                                        <tr key={user.id}>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td><button aria-label="Delete User" className="delete-btn" onClick={() => handleDelete(user.id)}>X</button></td>
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