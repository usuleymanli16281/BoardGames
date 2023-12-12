import { ChangeEvent, useState } from "react"
import { showicon, unshowicon } from "../assets"

export default function Login() {

    const [logInfo, setLogInfo] = useState({ username: "", password: "" })
    const [passShow, setPassShow] = useState(false)

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLogInfo({ ...logInfo, [e.target.name]: e.target.value });
    };

    const handlePasswordShow = () => {
        setPassShow(!passShow)
    }

    return (
        <div className="login-container">
            <form className="login-form">
                <h1>Login</h1>
                <input type="text" placeholder="Username" onChange={handleInputChange} />
                <div className="grid h-[50px] items-center relative">
                    <input type={passShow?"text":"password"} placeholder="Password" onChange={handleInputChange} />
                    <img src={passShow ? showicon : unshowicon} className="absolute h-[30px] aspect-square right-2" onPointerDown={handlePasswordShow} />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>

    )
}
