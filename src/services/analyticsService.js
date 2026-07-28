import { supabase } from './supabaseClient';

export const fetchAnalyticsData = async () => {
    try {
        const { data: { session } } = await supabase.auth.getSession();
        const token = session?.access_token; 

        if (!token) {
            throw new Error("No access token found");
        }

        const response = await fetch('http://localhost:5000/api/analytics', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Analytics fetch error:", error);
        throw error;
    }
}; 