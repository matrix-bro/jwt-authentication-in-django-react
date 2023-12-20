import { useState } from "react";
import Layout from "../components/Layout";
import { useAppDispatch } from "../hooks";
import { login } from "../features/authSlice";

const Login = () => {
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <>
      <Layout title="JWT Auth | Login" content="Login Page">
        <div className="container m-auto w-96">
          <h1 className="text-3xl font-bold">Log into your account</h1>
          <form
            action=""
            className="bg-gray-100 mt-4 rounded-xl px-5 py-4"
            onSubmit={onSubmit}
          >
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

            <button className="text-xl bg-blue-500 p-3 py-3 hover:bg-blue-700">
              Login
            </button>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default Login;
