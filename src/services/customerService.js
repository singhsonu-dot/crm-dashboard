import supabase from "../lib/supabase"; 
const BASE_URL = import.meta.env.VITE_BACKEND_URL || "https://crm-backend-wek4.onrender.com";
const API_BASE_URL =`${BASE_URL}/api`;

const getAuthHeaders = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token;

    if (!token) {
        throw new Error("No active session found. Please login again");
    }

    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };
};

export const getCustomers = async () => {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE_URL}/customers`, {
        method: "GET",
        headers, 
    });

    if (!res.ok) throw new Error("Failed to fetch customers");
    const data = await res.json();
    return data.data;
};

export const addCustomer = async (customer) => {
    const { data: { user } } = await supabase.auth.getUser();
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE_URL}/customers`, {
        method: "POST",
        headers,
        body: JSON.stringify({
            ...customer,
            user_id: user?.id || null 
        }),
    });
    if (!res.ok) throw new Error("Failed to add customer");
    const data = await res.json();
    return data.data;
};

export const updateCustomer = async (id, updatedData) => {
    const headers = await getAuthHeaders();

    const res = await fetch(`${API_BASE_URL}/customers/${id}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(updatedData),
    });
    if (!res.ok) throw new Error("Failed to update customer");
    const data = await res.json();
    return data.data;
};

export const deleteCustomer = async (id) => {
    const headers = await getAuthHeaders();

    const res = await fetch(`${API_BASE_URL}/customers/${id}`, {
        method: "DELETE",
        headers,
    });
    if (!res.ok) throw new Error("Failed to delete customer");
    const data = await res.json();
    return data.data;
}; 

export const toggleCustomerStatus = async (id, status) => {
    const headers = await getAuthHeaders();

    const res = await fetch(`${API_BASE_URL}/customers/${id}/status`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({ status }),
    });
    if (!res.ok) throw new Error("Failed to update status");
    const data = await res.json();
    return data.data;
}; 