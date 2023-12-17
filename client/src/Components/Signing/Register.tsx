import { ChangeEvent, FormEvent, useState } from "react";
import { showicon, unshowicon } from "../../assets";
import { NavLink } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { MainContext, useContext } from "../../context";

// ... (previous imports and code remain unchanged)

interface RegistrationResponse {
    message: string;
  }
  
  export default function Register() {
    useContext(MainContext);
  
    const [regInfo, setRegInfo] = useState({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    const [passShow, setPassShow] = useState({ pass: false, confirm: false });
    const [emailError, setEmailError] = useState("");
    const [error, setError] = useState("");
  
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      setRegInfo({ ...regInfo, [e.target.name]: e.target.value });
  
      if (e.target.name === "email" && !validateEmail(e.target.value)) {
        setEmailError("Invalid email format");
      } else {
        setEmailError("");
      }
    };
  
    const handlePasswordShow = () => {
      setPassShow({ ...passShow, pass: !passShow.pass });
    };
  
    const handleConfirmPasswordShow = () => {
      setPassShow({ ...passShow, confirm: !passShow.confirm });
    };
  
    const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        // Register the user with the API in the specified order
        await axios.post<RegistrationResponse>(`${import.meta.env.VITE_REST_API}/register`, {
          name: regInfo.name,
          email: regInfo.email,
          password: regInfo.password,
        });
  
        setError("");
        // Redirect the user to the login page after successful registration
        window.location.href = "/login";
      } catch (err) {
        const axiosError = err as AxiosError<Error>;
        if (axiosError.response?.data?.message) {
          setError(axiosError.response.data.message);
        } else {
          setError("An error occurred during registration.");
        }
        setRegInfo({ name: "", email: "", password: "", confirmPassword: "" });
      }
    };
  
    return (
      <div className="register-container flex-col">
        <form className="register-form" onSubmit={handleRegister}>
          <h1>Register</h1>
          <input type="text" name="name" placeholder="Name" onChange={handleInputChange} />
          <input type="email" name="email" placeholder="Email" onChange={handleInputChange} />
          {emailError && <div className="error-message">{emailError}</div>}
          <div className="grid h-[50px] items-center relative">
            <input type={passShow.pass ? "text" : "password"} name="password" placeholder="Password" onChange={handleInputChange} />
            <img
              src={passShow.pass ? showicon : unshowicon}
              className="absolute h-[30px] aspect-square right-2 cursor-pointer"
              onPointerDown={handlePasswordShow}
              alt="Toggle password visibility"
            />
          </div>
          <div className="grid h-[50px] items-center relative">
            <input
              type={passShow.confirm ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={handleInputChange}
            />
            <img
              src={passShow.confirm ? showicon : unshowicon}
              className="absolute h-[30px] aspect-square right-2 cursor-pointer"
              onPointerDown={handleConfirmPasswordShow}
              alt="Toggle password visibility"
            />
          </div>
          <button type="submit">Register</button>
          {error && <div className="text-red-600 mt-1 p-1">{error}</div>}
        </form>
        <div>
          Already have an account?
          <NavLink to="/login" className="text-blue-400 ml-1 underline">
            Sign in
          </NavLink>
        </div>
      </div>
    );
  }
  