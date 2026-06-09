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

    deleteUser: (id) => set((state) => ({
        users: state.users.filter((user) => user.id !== id),
    })), 
}))

export default useStore 