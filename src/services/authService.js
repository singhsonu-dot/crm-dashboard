import supabase from "../lib/supabase"

export const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        throw error;
    }

    return data;
};

export const logout = async () => {
    await supabase.auth.signOut();
};

export const isAuthenticated = async () => {
    const {
        data: { session },
    } = await supabase.auth.getSession();

    return !!session; 
}; 

export const signUp = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    });

    if (error) {
        throw error;
    }

    return data; 
}; 