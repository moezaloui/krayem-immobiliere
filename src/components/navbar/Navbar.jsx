import { useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";

function Navbar({ user }) {
  const [open, setOpen] = useState(false);

  return (
    <nav>
      <div className="left">
        <Link to="/" className="logo">
          <img src="/logo.png" alt="" />
          <span>Krayem</span>
        </Link>
        <Link to="/">Accueil</Link>
        <Link to="/list/properity?type=m">Maison</Link>
        <Link to="/list/properity?type=v">Villa</Link>
        <Link to="/list/properity?type=t">Terrain</Link>
      </div>
      <div className="right">
        {user ? (
          <div className="user">
            <img src={user.picture} alt={user.firstName} />
            <span>{`${user.firstName} ${user.lastName}`}</span>
            <Link to="/profile" className="profile">
              <span>Profile</span>
            </Link>
          </div>
        ) : (
          <>
            <a href="/login">Connexion Admin</a>
          </>
        )}
        <div className={open ? "menuIcon active" : "menuIcon"}>
          <img
            src="/menu.png"
            alt=""
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
