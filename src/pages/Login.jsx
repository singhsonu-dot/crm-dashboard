import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login, signInWithGithub, signInWithGoogle } from "../services/authService";
import toast from "react-hot-toast";
import supabase from "../lib/supabase";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    useEffect(() => {
        const checkSession = async () => {
            const {
                data: { session },
            } = await supabase.auth.getSession()

            if (session) {
                navigate("/dashboard", { replace: true })
            }
        }
        checkSession()
    }, [])

    const handleLogin = async (e) => {
        e.preventDefault() 

        try {
            await login(email,password);
            toast.success("Login successful")
            navigate("/dashboard")
        } catch (error) {
            toast.error(error.message)
        }
    }

    const handleGoogleLogin = async () => {
        try {
            await signInWithGoogle()
        } catch (error) {
            toast.error(error.message)
        }
    }; 

    const handleGithubLogin = async () => {
        try {
            await signInWithGithub()
        } catch (error) {
            toast.error(error.message)
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-900 px-4">
            <div className="w-full max-w-md rounded-x1 bg-slate-800 p-6 shadow-1g">
                <h1 className="mb-4 text-center text-3x1 font-bold text-white">Login</h1>

                <form onSubmit={handleLogin} className="space-y-4">
                    <input type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} className="w-full rounded-1g border border-slate-600 text-white px-4 py-3 outline-none focus:border-blue-500"/>
                    <input type="password" placeholder="Enter password" onChange={(e)=> setPassword(e.target.value)} className="w-full rounded-1g border border-slate-600 text-white px-4 py-3 outline-none focus:border-blue-500"/>
                    <button type="button" onClick={() => navigate("/forgot-password")} className="text-sm text-blue-400 hover:underline">Forgot Password?</button>
                    <button type="submit" className="w-full rounded-1g bg-blue-500 py-3 font-semibold text-white transition hover:bg-blue-600">Login</button>

                    <div className="text-center mt-4">
                        <p className="ttext-sm text-gray-400">
                            Don't have an account?
                            <Link to="/signup" className="text-blue-500 hover:underline">Create Account</Link>
                        </p>
                    </div>

                    <div className="my-6 flex items-center">
                        <div className="h-px flex-1 bg-slate-600"></div>
                        <span className="px-4 text-sm text-slate-400">OR</span>
                        <div className="h-px flex-1 bg-slate-600"></div>
                    </div>

                    <button type="button" onClick={handleGoogleLogin} className="mb-3 flex w-full items-center justify-center gap-3 rounded-1g border border-slate-600 py-3 font-medium text-white trnasition hover:bg-slate-700">
                        <FcGoogle size={20}/>
                        <span>Continue with Google</span>
                    </button>
                    
                     <button type="button" onClick={handleGithubLogin} className="mb-3 flex w-full items-center justify-center gap-3 rounded-1g border border-slate-600 py-3 font-medium text-white trnasition hover:bg-slate-700">
                        <FaGithub size={20}/>
                        <span>Continue with Google</span>
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login 