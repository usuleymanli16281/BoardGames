import { ChangeEvent, FormEvent, useState } from "react"
import { showicon, unshowicon } from "../../assets"
import axios from "axios";
import { MainContext, useContext } from "../../context";
import { NavLink } from "react-router-dom";

export default function Login() {

    const { setToken, setUserInfo } = useContext(MainContext)

    const [logInfo, setLogInfo] = useState({ name: "", password: "" })
    const [passShow, setPassShow] = useState(false)
    const [error, setError] = useState("")

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLogInfo({ ...logInfo, [e.target.name]: e.target.value });
    };

    const handlePasswordShow = () => {
        setPassShow(!passShow)
    }

    const handleRegister = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios.post(`${import.meta.env.VITE_REST_API}/login`, logInfo)
            .then(res => {
                setError("")
                localStorage.setItem("token", res.data.token)
                setToken(res.data.token)
                setUserInfo(logInfo)
                window.location.href = "."
            })
            .catch((err: { response: { data: { message: string } } }) => {
                setError(err.response.data.message)
                setLogInfo({ name: "", password: "" })
            })
    };

    return (
        <div className="login-container flex-col" >
            <form className="login-form" onSubmit={handleRegister}>
                <h1>Login</h1>
                <input type="text" placeholder="name" name="name" onChange={handleInputChange} />
                <div className="grid h-[50px] items-center relative">
                    <input name="password" type={passShow ? "text" : "password"} placeholder="Password" onChange={handleInputChange} />
                    <img src={passShow ? showicon : unshowicon} className="absolute h-[30px] aspect-square right-2 cursor-pointer" onPointerDown={handlePasswordShow} />
                </div>
                <button type="submit">Login</button>
                {error && <div className="text-red-600 mt-1 p-1">{error}</div>}
            </form>
            <div>Don't you have an account?<NavLink to="/register" className="text-green-400 ml-1 underline">Sign up</NavLink></div>
        </div>

    )
}

