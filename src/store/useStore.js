import { create } from "zustand";

const useStore = create((set) => ({
    users: [],
    loading: false,
    error: "",

    setUsers: (users) => set({ users }), 

    setLoading: (loading) => set({ loading }),

    setError: (error) => set({ error }), 

    addUser: (user) => set((state) => ({
        users: [...state.users, user],
    })), 

    updateUser: (updatedUser) => set((state) => ({
        users: state.users.map((user) =>
            user.id === updatedUser.id ? updatedUser : user
        ),
    })), 

    deleteUser: (id) => set((state) => ({
        users: state.users.filter((user) => user.id !== id),
    })), 

    toggleStatus: (id) => set((state) => ({
        users: state.users.map((user) =>
            user.id === id ? {
                ...user,
                status: user.status === "active" ? "inactive" : "active",
            }
        : user 
        ),
    })),
}))

export default useStore 