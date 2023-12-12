import { ChangeEvent, useState } from "react";
import { showicon, unshowicon } from "../assets";

export default function Register() {
    const [regInfo, setRegInfo] = useState({ username: "", email: "", password: "", confirmPassword: "" });
    const [passShow, setPassShow] = useState({ pass: false, confirm: false })

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setRegInfo({ ...regInfo, [e.target.name]: e.target.value });
    };

    const handlePasswordShow = () => {
        setPassShow({ ...passShow, pass: !passShow.pass })
    }
    const handleConfirmPasswordShow = () => {
        setPassShow({ ...passShow, confirm: !passShow.confirm })
    }

    return (
        <div className="register-container">
            <form className="register-form">
                <h1>Register</h1>
                <input type="text" name="username" placeholder="Username" onChange={handleInputChange} />
                <input type="email" name="email" placeholder="Email" onChange={handleInputChange} />
                <div className="grid h-[50px] items-center relative">
                    <input type={passShow.pass ? "text" : "password"} name="password" placeholder="Password" onChange={handleInputChange} />
                    <img src={passShow.pass ? showicon : unshowicon} className="absolute h-[30px] aspect-square right-2" onPointerDown={handlePasswordShow} />
                </div>
                <div className="grid h-[50px] items-center relative">
                    <input type={passShow.confirm ? "text" : "password"} name="confirmPassword" placeholder="Confirm Password" onChange={handleInputChange} />
                    <img src={passShow.confirm ? showicon : unshowicon} className="absolute h-[30px] aspect-square right-2" onPointerDown={handleConfirmPasswordShow} />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
}
