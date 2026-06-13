import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import toast from "react-hot-toast";

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault() 

        const success = login(email, password)

        if (success) {
            navigate("/dashboard")
        } else {
            toast.error("Invalid credentials")
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-900 px-4">
            <div className="w-full max-w-md rounded-x1 bg-slate-800 p-6 shadow-1g">
                <h1 className="mb-4 text-center text-3x1 font-bold text-white">Login</h1>

                <div className="mb-6 rounded-1g bg-slate-700 p-3 text-sm text-slate-300">
                    <p>Email: admin@gmail.com</p>
                    <p>Password: 12345</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <input type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} className="w-full rounded-1g border border-slate-600 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-500"/>
                    <input type="password" placeholder="Enter password" onChange={(e)=> setPassword(e.target.value)} className="w-full rounded-1g border border-slate-600 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-500"/>
                    <button type="button" onClick={() => navigate("/forgot-password")} className="text-sm text-blue-400 hover:underline">Forgot Password?</button>
                    <button type="submit" className="w-full rounded-1g bg-blue-500 py-3 font-semibold text-white transition hover:bg-blue-600">Login</button>

                    <div className="my-6 flex items-center">
                        <div className="h-px flex-1 bg-slate-600"></div>

                        <span className="px-4 text-sm text-slate-400">OR</span>
                        <div className="h-px flex-1 bg-slate-600"></div>
                    </div>

                    <button type="button" onClick={() => toast("Google Login coming in V3")} className="mb-3 w-full rounded-1g border border-slate-600 py-3 font-medium text-white trnasition hover:bg-slate-700">
                         Continue with Google 
                    </button>

                    <button type="button" onClick={() => toast("Github Login coming in V3")} className="w-full rounded-1g border border-slate-600 py-3 font-medium text-white transition hover:bg-slate-700">
                        Continue with Github
                    </button>
                    
                </form>
            </div>
        </div>
    )
}

export default Login 