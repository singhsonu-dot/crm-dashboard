import { useEffect } from "react";
import { getCustomers } from "../services/customerService";
import useStore from "../store/useStore";

function useUsers(search) {
    const users = useStore((state) => state.users)
    const loading = useStore((state) => state.loading)
    const error = useStore((state) => state.error)

    const setUsers = useStore((state) => state.setUsers)
    const setLoading = useStore((state) => state.setLoading)
    const setError = useStore((state) => state.setError)

        const getUsers = async () => {
            setLoading(true)
            setError("")

            try {
                const data = await getCustomers() 
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