import { useState } from "react"
import toast from "react-hot-toast"
import { Link, useNavigate } from "react-router-dom"
import { signUp } from "../services/authService"

function Signup() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const handleSignup = async (e) => {
        e.preventDefault()

        try {
            await signUp(email, password);
            toast.success("Account created successfully!");
            navigate("/")
        } catch (error) {
            toast.error(error.message); 
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-900 px-4">
            <div className="w-full max-w-md rpunded-x1 bg-slate-800 p-6 shadow-1g">
                <h1 className="mb-4 text-white text-center text-3x1 font-bold">Create Account</h1>

                <form onSubmit={handleSignup} className="space-y-4">
                    <input type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} className="w-full text-white rounded-1g border border-slate-600 px-4 py-3 outline-none focus: border-blue-500"/>
                    <input type="password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} className="w-full text-white rounded-1g border border-slate-600 px-4 py-3 outline-none focus: border-blue-500"/>
                    <button type="submit" className="w-full rounded-1g bg-blue-500 py-3 font-semibold text-white transition hover:bg-blue-600">Create Account</button>

                    <div className="text-center mt-4">
                        <p className="text-sm text-gray-400">
                            Already have an account? 
                            <Link to="/" className="text-blue-500 hover:underline">Login</Link>
                        </p>
                    </div>

                    <div className="my-6 flex items-center">
                        <div className="h-px flex-1 bg-slate-600"></div>
                        <span className="px-4 text-sm text-slate-400">OR</span>
                        <div className="h-px flex-1 bg-slate-600"></div>
                    </div>

                    <button type="button" onClick={() => toast("Google Login in progress")} className="mb-3 w-full rounded-1g border border-slate-600 py-3 font-medium text-white trnasition hover:bg-slate-700">
                        Continue with Google
                    </button>

                    <button type="button" onClick={() => toast("Github Login in Progress")} className="w-full rounded-1g border border-slate-600 py-3 font-medium text-white transition hover:bg-slate-700">
                        Continue with Github
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Signup 