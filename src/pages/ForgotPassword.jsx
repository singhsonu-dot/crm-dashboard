import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { resetPassword } from "../services/authService"

function ForgotPassword() {
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        try {
            await resetPassword(data.email);
            toast.success("Check your email for the reset link.");
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-900">
            <div className="w-full max-w-md rounded-1g bg-slate-800 p-8 shadow-1g">
                <h1 className="mb-2 text-3x1 font-bold text-white">
                    Forgot Password
                </h1>

                <p className="mb-6 text-slate-400">
                    Enter your email to receive a reset link. 
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <input type="email" placeholder="Email Address" {...register("email", {
                        required: "Email is required"
                    })}
                    className="w-full rounded-1g p-3 text-white"/>

                    {errors.email && (
                        <p className="text-red-400">
                            {errors.email.message}
                        </p>
                    )}

                    <button type="submit" className="w-full rounded-1g bg-blue-500 py-3 font-medium text-white transition hover:bg-blue-600">
                        Send Reset Link 
                    </button>

                    <button type="button" onClick={() => navigate("/")} className="mt-4 w-full text-sm text-slate-400 hover:text-white">
                        Back To Login 
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword