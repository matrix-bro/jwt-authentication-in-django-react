import { useState } from "react";
import Layout from "../components/Layout";
import { useAppDispatch } from "../hooks";

import { register } from "../features/authSlice";

const Register = () => {
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const { first_name, last_name, email, password, confirm_password } = formData;

  const onChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e: any) => {
    e.preventDefault();

    dispatch(
      register({ first_name, last_name, email, password, confirm_password })
    );
  };

  return (
    <>
      <Layout title="JWT Auth | Register" content="Register Page">
        <div className="container m-auto w-96">
          <h1 className="text-3xl font-bold">Register for an account</h1>
          <form
            action=""
            className="bg-gray-100 mt-4 rounded-xl px-5 py-4"
            onSubmit={onSubmit}
          >
            <div className="py-2">
              <label className="text-xl font-semibold">First Name</label>
              <br />
              <input
                type="text"
                name="first_name"
                value={first_name}
                onChange={onChange}
                required
                className="border py-2 px-2 w-full"
              />
            </div>
            <div className="py-2">
              <label className="text-xl font-semibold">Last Name</label>
              <br />
              <input
                type="text"
                name="last_name"
                value={last_name}
                onChange={onChange}
                required
                className="border py-2 px-2 w-full"
              />
            </div>
            <div className="py-2">
              <label className="text-xl font-semibold">Email</label>
              <br />
              <input
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                required
                className="border py-2 px-2 w-full"
              />
            </div>
            <div className="py-2">
              <label className="text-xl font-semibold">Password</label>
              <br />
              <input
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                required
                className="border py-2 px-2 w-full"
              />
            </div>
            <div className="py-2">
              <label className="text-xl font-semibold">Confirm Password</label>
              <br />
              <input
                type="password"
                name="confirm_password"
                value={confirm_password}
                onChange={onChange}
                required
                className="border py-2 px-2 w-full"
              />
            </div>

            <button className="text-xl bg-teal-500 p-3 py-3 hover:bg-teal-700">
              Register
            </button>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default Register;
