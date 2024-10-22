import { useContext } from "react";
import Navbar from "../../components/navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import { UserContext } from "../../lib/userContext";
import "./layout.scss"


function Layout() {
  const { user } = useContext(UserContext); // Get user from context

  return (
    <div className="layout">
      <div className="navbar">
        <Navbar user={user} />
      </div>
      <div className="content">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
