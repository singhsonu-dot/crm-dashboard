import { apiFetch } from "./apiClient"

export const fetchUsers = async (search) => {
  return apiFetch(`/users?name_like=${search}`) 
}

// export const deleteUser = async (id) => {}

// export const getUserById = async (id) => {}