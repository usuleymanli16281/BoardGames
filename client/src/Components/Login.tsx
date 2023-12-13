import { ChangeEvent, FormEvent, useState } from "react"
import { showicon, unshowicon } from "../assets"
import { NavLink } from "react-router-dom";

export default function Login() {

    const [logInfo, setLogInfo] = useState({ username: "", password: "" })
    const [passShow, setPassShow] = useState(false)

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLogInfo({ ...logInfo, [e.target.name]: e.target.value });
    };

    const handlePasswordShow = () => {
        setPassShow(!passShow)
    }

    const handleRegister = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        <div className="login-container flex-col" >
            <form className="login-form" onSubmit={handleRegister}>
                <h1>Login</h1>
                <input type="text" placeholder="Username" onChange={handleInputChange} />
                <div className="grid h-[50px] items-center relative">
                    <input type={passShow ? "text" : "password"} placeholder="Password" onChange={handleInputChange} />
                    <img src={passShow ? showicon : unshowicon} className="absolute h-[30px] aspect-square right-2 cursor-pointer" onPointerDown={handlePasswordShow} />
                </div>
                <button type="submit">Login</button>
            </form>
            <div>Do not have an account?<NavLink to="/register" className="text-green-400 ml-1 underline">Sign up</NavLink></div>
        </div>

    )
}
