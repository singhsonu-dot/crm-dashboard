export const fetchUsers = async (search) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users?name_like=${search}`) 

    if (!res.ok) {
        throw new Error("Failed to fetch users")
    }

    return res.json()
}