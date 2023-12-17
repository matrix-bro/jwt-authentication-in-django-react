import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="flex justify-between items-center border border-gray-200 py-6 px-6 bg-gray-100">
        <div>
          <Link to="/" className="text-2xl font-bold">
            JWT Auth
          </Link>
        </div>
        <div className="space-x-6">
          <NavLink to="/" className="text-lg font-semibold hover:text-gray-500">
            Home
          </NavLink>
          <NavLink
            to="/dashboard"
            className="text-lg font-semibold hover:text-gray-500"
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/login"
            className="text-lg font-semibold px-6 py-3 bg-blue-500 text-white hover:bg-blue-700"
          >
            Login
          </NavLink>
          <NavLink
            to="/register"
            className="text-lg font-semibold px-6 py-3 bg-teal-500 text-white hover:bg-teal-700"
          >
            Register
          </NavLink>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
