const BASE_URL = import.meta.env.VITE_API_URL

export const apiFetch = async (endpoint) => {
    const res = await fetch(`${BASE_URL}${endpoint}`)

    if (!res.ok) {
        throw new Error("Request Failed")
    }

    return res.json()
}