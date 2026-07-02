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

export const resetPassword = async (email) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "http://localhost:5173/reset-password",
    });

    if (error) throw error;
}; 

export const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
            redirectTo: window.location.origin, 
        },
    });

    if (error) throw error;

    return data; 
}