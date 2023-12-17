import { ChangeEvent, FormEvent, useState } from "react";
import { showicon, unshowicon } from "../../assets";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { MainContext, useContext } from "../../context";

const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export default function Register() {

    const { setToken } = useContext(MainContext)

    const [regInfo, setRegInfo] = useState({ name: "", email: "", password: "", confirmPassword: "" });
    const [passShow, setPassShow] = useState({ pass: false, confirm: false })
    const [emailError, setEmailError] = useState("")
    const [error, setError] = useState("")


    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setRegInfo({ ...regInfo, [e.target.name]: e.target.value });

        if (e.target.name == "email" && !validateEmail(e.target.value)) {
            setEmailError('Invalid email format')
        } else {
            setEmailError("")
        }
    };

    const handlePasswordShow = () => {
        setPassShow({ ...passShow, pass: !passShow.pass })
    }
    const handleConfirmPasswordShow = () => {
        setPassShow({ ...passShow, confirm: !passShow.confirm })
    }

    const handleRegister = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios.post(`${import.meta.env.VITE_REST_API}/login`, regInfo)
            .then(res => {
                setError("")
                localStorage.setItem("token", res.data.token)
                setToken(res.data.token)
                console.log(1)
                window.location.href = "."
            })
            .catch((err: { response: { data: { message: string } } }) => {
                setError(err.response.data.message)
                setRegInfo({ name: "", email: "", password: "", confirmPassword: "" })
            })
    };



    return (
        <div className="register-container flex-col">
            <form className="register-form" onSubmit={handleRegister}>
                <h1>Register</h1>
                <input type="text" name="name" placeholder="name" onChange={handleInputChange} />
                <input type="email" name="email" placeholder="Email" onChange={handleInputChange} />
                {emailError && <div className="error-message">{emailError}</div>}
                <div className="grid h-[50px] items-center relative">
                    <input type={passShow.pass ? "text" : "password"} name="password" placeholder="Password" onChange={handleInputChange} />
                    <img src={passShow.pass ? showicon : unshowicon} className="absolute h-[30px] aspect-square right-2 cursor-pointer" onPointerDown={handlePasswordShow} />
                </div>
                <div className="grid h-[50px] items-center relative">
                    <input type={passShow.confirm ? "text" : "password"} name="confirmPassword" placeholder="Confirm Password" onChange={handleInputChange} />
                    <img src={passShow.confirm ? showicon : unshowicon} className="absolute h-[30px] aspect-square right-2 cursor-pointer" onPointerDown={handleConfirmPasswordShow} />
                </div>
                <button type="submit">Register</button>
                {error && <div className="text-red-600 mt-1 p-1">{error}</div>}
            </form>
            <div>Already have an account?<NavLink to="/login" className="text-blue-400 ml-1 underline">Sign in</NavLink></div>
        </div>
    );
}