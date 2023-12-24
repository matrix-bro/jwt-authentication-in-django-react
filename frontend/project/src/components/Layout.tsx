import { ReactNode } from "react";
import Navbar from "./Navbar";
import { Helmet } from "react-helmet-async";
import Alert from "./Alert";

interface Props {
  title: string;
  content: string;
  children: ReactNode;
}

const Layout = ({ title, content, children }: Props) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={content} />
      </Helmet>
      <Navbar />
      {/* <Alert /> */}
      <div className="px-6 py-6">{children}</div>
    </>
  );
};

export default Layout;
