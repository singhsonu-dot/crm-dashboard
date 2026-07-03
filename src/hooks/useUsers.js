import { useQuery } from "@tanstack/react-query";
import { getCustomers } from "../services/customerService";

function useUsers(search) {
        const {
            data = [],
            isLoading,
            error,
            refetch,
        } = useQuery({
            queryKey: ["customers"],
            queryFn: getCustomers,
        })

    return {
        users: data, 
        loading: isLoading,
        error: error?.message || "", 
        refetch, 
    }
}

export default useUsers