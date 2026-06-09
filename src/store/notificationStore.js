import { create } from "zustand";

const useNotificationStore = create((set) => ({
    notifications: [],

    addNotification: (message) => set((state) => ({
        notifications: [
            {
                id: Date.now(),message,
                time: new Date().toLocaleTimeString(),
            },
            ...state.notifications,
        ],
    })),
}))

export default useNotificationStore