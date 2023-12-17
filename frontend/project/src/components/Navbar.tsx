const Navbar = () => {
  return (
    <>
      <nav className="flex justify-between items-center border border-gray-200 py-6 px-6">
        <div>
          <h1 className="text-2xl font-bold">JWT Auth</h1>
        </div>
        <div className="space-x-6">
          <a href="#" className="text-lg font-semibold hover:text-gray-500">
            Home
          </a>
          <a href="#" className="text-lg font-semibold hover:text-gray-500">
            Dashboard
          </a>
          <a
            href="#"
            className="text-lg font-semibold px-6 py-3 bg-blue-500 text-white hover:bg-blue-700"
          >
            Login
          </a>
          <a
            href="#"
            className="text-lg font-semibold px-6 py-3 bg-teal-500 text-white hover:bg-teal-700"
          >
            Register
          </a>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
