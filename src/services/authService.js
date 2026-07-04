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
    const { error } = await supabase.auth.signOut();

    if (error) throw error
};

export const isAuthenticated = async () => {
    const {
        data: { session },
    } = await supabase.auth.getSession();

    console.log("SESSION:", session)

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
        redirectTo: "https://crm-dashboard-beta-jade.vercel.app/forgot-password",
    });

    if (error) throw error;
}; 

export const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
            redirectTo: "https://crm-dashboard-beta-jade.vercel.app/dashboard"
        },
    });

    if (error) throw error;

    return data; 
}