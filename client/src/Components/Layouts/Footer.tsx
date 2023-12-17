import { NavLink } from 'react-router-dom';

const Footer = () => (
  <footer className="bg-white border-t border-gray-200 dark:bg-gray-900">
    <div className="container flex flex-col flex-wrap justify-between items-center mx-auto py-4 px-5">
      <div className="flex flex-wrap justify-center">
        <NavLink to="/about" className="text-gray-700 hover:text-blue-700 dark:text-white px-5 py-2 text-sm">About</NavLink>
        <NavLink to="/services" className="text-gray-700 hover:text-blue-700 dark:text-white px-5 py-2 text-sm">Services</NavLink>
        <NavLink to="/pricing" className="text-gray-700 hover:text-blue-700 dark:text-white px-5 py-2 text-sm">Pricing</NavLink>
        <NavLink to="/contact" className="text-gray-700 hover:text-blue-700 dark:text-white px-5 py-2 text-sm">Contact</NavLink>
      </div>
      <div className="text-center text-gray-500 text-sm py-2">
        © {new Date().getFullYear()} BoardGames. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
