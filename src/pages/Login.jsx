import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault() 

        const demoEmail = "admin@gmail.com"
        const demoPassword = "12345"

        if (email === demoEmail && password === demoPassword) {
            localStorage.setItem("isAuth", "true")
            navigate("/dashboard")
        } else {
            alert("Invalid credentials")
        }
    }

    return (
        <div>
            <h1>Login</h1>

            <p>Email: admin@gmail.com</p>
            <p>Password: 12345</p>

            <form onSubmit={handleLogin}>
                <input type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}/>

                <br/>

                <input type="password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)}/> 

                <br/>

                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login 