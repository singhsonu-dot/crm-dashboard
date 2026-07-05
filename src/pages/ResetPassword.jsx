import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import supabase from "../lib/supabase"

function ResetPassword () {
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const navigate = useNavigate()

    const handleResetPassword = async () => {
        alert("button clicked")
        if (!password || !confirmPassword) {
            alert("Empty field")
            return toast.error("Fill all fields")
        }

        if (password !== confirmPassword) {
            alert("Password do'nt match")
            return toast.error("Password do not match")
        }

        alert("Calling updateUser...")

        const { error } = await Supabase.auth.updateUser({password})

        alert(JSON.stringify({ data, error }))

        if (error) {
            toast.error(error.message)
            return
        }

        toast.success("Password Updated Successfully")
        navigate("/")
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-900">
            <div className="w-full max-w-md rounded-1g bg-slate-800 p-6">
                <h2 className="mb-6 text-2x1 font-bold text-white">
                    Reset Password
                </h2>

                <input type="password" placeholder="New Password" value={password} onChange={(e) => setPassword(e.target.value)} className="mb-4 w-full rounded border border-slate-600 bg-slate-700 p-3 text-white"/>
                <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="mb-4 w-full rounded border border-slate-600 bg-slate-700 p-3 text-white"/>
                <button onClick={handleResetPassword} className="w-full rounded bg-blue-500 text-white hover:bg-blue-600">
                    Update Password
                </button>
            </div>
        </div>
    )
}

export default ResetPassword 