import supabase from "../lib/supabase"

export const getCustomers = async () => {
    const { data, error } = await 
    supabase 
    .from("customers")
    .select("*") 

    if (error) {
        throw error;
    }

    return data; 
} 

export const addCustomer = async (customer) => {
    const { data, error } = await 
    supabase 
    .from("customers")
    .insert([customer])
    .select() 

    if (error) throw error 

    return data 
}

export const updateCustomer = async (id, updates) => {
    const { data, error } = await 
    supabase 
    .from("customers")
    .update(updates) 
    .eq("id", id)
    .select()

    if (error) throw error 

    return data 
}

export const deleteCustomer = async (id) => {
    const { error } = await supabase 
    .from("customers")
    .delete()
    .eq("id", id)

    if (error) throw error 
}

export const toggleCustomerStatus = async (id, status) => {
    const { data, error } = await supabase
    .from("customers")
    .update({ status }) 
    .eq("id", id) 
    .select() 

    if (error) throw error 

    return data 
}