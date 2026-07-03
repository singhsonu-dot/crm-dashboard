import { create } from "zustand";

const useRoleStore = create((set) => ({
    role: "admin",

    setRole: (role) => set({ role }),
}));

export default useRoleStore