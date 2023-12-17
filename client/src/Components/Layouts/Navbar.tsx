import { NavLink } from 'react-router-dom';
import { logoSrc, userLogoSrc } from '../../assets';

const NavBar = () => (
  <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-900">
    <div className="container flex flex-wrap justify-between items-center mx-auto">
      <NavLink to="/" className="flex items-center">
        <img src={logoSrc} className="mr-3 h-6 sm:h-9" alt="Logo" />
        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">BoardGames</span>
      </NavLink>
      <div className="flex md:order-2">
        <NavLink to="/user" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          <img src={userLogoSrc} className="h-6 sm:h-9" alt="User" />
        </NavLink>
      </div>
      <div className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1">
        <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
          <li>
            <NavLink to="/about" className="block py-2 pr-4 pl-3 text-gray-700 rounded md:bg-transparent hover:text-blue-700 md:p-0 dark:text-white" aria-current="page">About</NavLink>
          </li>
          <li>
            <NavLink to="/services" className="block py-2 pr-4 pl-3 text-gray-700 rounded md:bg-transparent hover:text-blue-700 md:p-0 dark:text-white">Services</NavLink>
          </li>
          <li>
            <NavLink to="/pricing" className="block py-2 pr-4 pl-3 text-gray-700 rounded md:bg-transparent hover:text-blue-700 md:p-0 dark:text-white">Pricing</NavLink>
          </li>
          <li>
            <NavLink to="/contact" className="block py-2 pr-4 pl-3 text-gray-700 rounded md:bg-transparent hover:text-blue-700 md:p-0 dark:text-white">Contact</NavLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default NavBar;
