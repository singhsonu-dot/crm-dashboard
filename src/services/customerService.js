import supabase from "../lib/supabase"; 
const API_BASE_URL ="https://crm-backend-wek4.onrender.com/api";

export const getCustomers = async () => {
    const res = await fetch(`${API_BASE_URL}/customers`);
    if (!res.ok) throw new Error("Failed to fetch customers");
    const data = await res.json();
    return data.data;
};

export const addCustomer = async (customer) => {
    const { data: { user } } = await supabase.auth.getUser();
    const res = await fetch(`${API_BASE_URL}/customers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            ...customer,
            user_id: user?.id || null 
        }),
    });
    if (!res.ok) throw new Error("Failed to add customer");
    const data = await res.json();
    return data.data;
};

export const updateCustomer = async (id, updates) => {
    const res = await fetch(`${API_BASE_URL}/customers/${id}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error("Failed to update customer");
    const data = await res.json();
    return data.data;
};

export const deleteCustomer = async (id) => {
    const res = await fetch(`${API_BASE_URL}/customers/${id}`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete customer");
    return true;
}; 

export const toggleCustomerStatus = async (customer, newStatus) => {
    const res = await fetch(`${API_BASE_URL}/customers/${customer.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: customer.name,
            email: customer.email,
            phone: customer.phone,
            website: customer.website,
            status: newStatus
        }),
    });
    if (!res.ok) throw new Error("Failed to update status");
    const data = await res.json();
    return data.data;
}; 