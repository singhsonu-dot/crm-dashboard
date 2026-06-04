import { useNavigate } from "react-router-dom";

function Navbar({ title }) {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("isAuth")
        navigate("/")
    }

    return (
        <header className="mb-5 flex w-full items-center justify-between rounded-1g bg-slate-800 px-5 py-4">
            <h2 className="text-1g font-semibold md:text-x1">{title}</h2>

            <div className="flex items-center gap-4">
                <button>Notification</button> 

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-700 font-bold">
                    S
                </div>

                <button onClick={handleLogout} className="rounded-md bg-blue-500 px-3 py-2 text-sm font-medium text-white hover:bg-blue-600">Logout</button> 
            </div>
        </header>
    )
}

export default Navbar 