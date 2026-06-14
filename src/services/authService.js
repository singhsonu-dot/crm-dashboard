export const login = (email, password) => {
    const demoEmail = "admin@gmail.com"
    const demoPassword = "12345"

    if (email === demoEmail && password === demoPassword) {
        localStorage.setItem("isAuth", "true")
        return true
    }

    return false
}

export const logout = () => {
    localStorage.removeItem("isAuth")
}

export const isAuthenticated = () => {
    return localStorage.getItem("isAuth") === "true"
}