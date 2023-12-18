import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { logoSrc, userLogoSrc } from "../../assets";
import { MainContext } from "../../context";

interface optionType {
  label: string;
  value: string;
}

const options: optionType[] = [
  { label: "View Profile", value: "profile" },
  { label: "Logout", value: "logout" },
];

const NavBar = () => {

  const {setToken, name} = useContext(MainContext)
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<null | optionType>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: optionType) => {
    setSelectedOption(option);

    if(option.value == "logout"){
      setToken("")
      localStorage.removeItem("token")
    }
  };


  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-900">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <NavLink to="/" className="flex items-center">
          <img src={logoSrc} className="mr-3 h-6 sm:h-9" alt="Logo" />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            BoardGames
          </span>
        </NavLink>
        <div className="flex md:order-2 items-center">
          <div className="relative">
            <div className="flex items-center gap-5">
              <div className="text-[1.2em] font-semibold">{name}</div>
              <img
                src={userLogoSrc}
                className="h-6 sm:h-9 cursor-pointer"
                alt="User"
                onClick={toggleDropdown}
              />
            </div>
            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-md">
                <ul className="py-1">
                  {options.map((option: optionType) => (
                    <li
                      key={option.value}
                      className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                      onClick={() => handleOptionClick(option)}
                    >
                      {option.label}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1">
          <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
            <li>
              <NavLink
                to="/about"
                className="block py-2 pr-4 pl-3 text-gray-700 rounded md:bg-transparent hover:text-blue-700 md:p-0 dark:text-white"
                aria-current="page"
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/services"
                className="block py-2 pr-4 pl-3 text-gray-700 rounded md:bg-transparent hover:text-blue-700 md:p-0 dark:text-white"
              >
                Services
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/pricing"
                className="block py-2 pr-4 pl-3 text-gray-700 rounded md:bg-transparent hover:text-blue-700 md:p-0 dark:text-white"
              >
                Pricing
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className="block py-2 pr-4 pl-3 text-gray-700 rounded md:bg-transparent hover:text-blue-700 md:p-0 dark:text-white"
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
