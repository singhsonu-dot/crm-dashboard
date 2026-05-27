import { useEffect, useState } from "react";
import { fetchUsers } from "../services/useService";

function useUsers(search) {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

        const getUsers = async () => {
            setLoading(true)
            setError("")

            try {
                const data = await fetchUsers(search)
                setUsers(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        useEffect(() => {
            getUsers()
        }, [search])

    return { users, loading, error, setUsers, refetch: getUsers}
}

export default useUsers