import { create } from "zustand";

const useThemeStore = create((set) => ({
    isDark: JSON.parse(localStorage.getItem("theme")) ?? true,

    toggleTheme: () =>
        set((state) => {
            const newTheme = !state.isDark;

            localStorage.setItem("theme", JSON.stringify(newTheme));

            return {
                isDark: newTheme,
            };
        }),
}));

export default useThemeStore; 