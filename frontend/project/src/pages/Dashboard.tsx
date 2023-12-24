import { Navigate } from "react-router-dom";
import Layout from "../components/Layout";
import { useAppSelector } from "../hooks";

const Dashboard = () => {
  const { user, isAuthenticated, loading } = useAppSelector(
    (state) => state.auth
  );

  if (!isAuthenticated && !loading && user !== null)
    return <Navigate to="/login" />;

  return (
    <>
      <Layout title="JWT Auth | Dashboard" content="Dashboard Page">
        <div className="container m-auto">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="bg-gray-100 my-3 py-3 px-3">
            <p className="mt-5 text-xl font-semibold">User Details</p>
            <ul className="py-3 space-y-1 mt-3 text-lg">
              <li>First Name: {user?.first_name}</li>
              <li>Last Name: {user?.last_name}</li>
              <li>Email Name: {user?.email}</li>
            </ul>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Dashboard;
