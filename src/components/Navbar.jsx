import { useNavigate } from "react-router-dom";
import "./Navbar.css"

function Navbar({ title }) {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("isAuth")
        navigate("/")
    }

    return (
        <header className="navbar">
            <h2>{title}</h2>

            <div className="navbar-right">
                <button>Notification</button> 

                <div className="avatar">
                    S
                </div>

                <button onClick={handleLogout}>Logout</button> 
            </div>
        </header>
    )
}

export default Navbar 