import { useContext, useState } from "react";
import { BsPersonFillAdd } from "react-icons/bs";
import { IoMenu } from "react-icons/io5";
import { PiSignInBold } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import "./header.scss";

const defaultAvatar =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjUwIiBjeT0iMzciIHI9IjE1IiBmaWxsPSIjOUI5Qjk5Ii8+CjxwYXRoIGQ9Ik0yMCA4MEM5IDgwIDEwIDY2IDE2IDYwQzI1IDU0IDc1IDU0IDg0IDYwQzkwIDY2IDkxIDgwIDgwIDgwIiBmaWxsPSIjOUI5Qjk5Ii8+Cjwvc3ZnPgo=";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/signin");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const toggleMenu = () => {
    setShow((prevState) => !prevState);
  };

  const validPhotoUrl = user?.photoURL || defaultAvatar;

  return (
    <header className="header">
      <div className="wrapper">
        <div className="container">
          <div className="nav">
            <div className="logo">
              <Link to="/">
                <img
                  src="/src/assets/logo.webp"
                  alt="logo"
                  className="logo-img"
                />
              </Link>
            </div>
            <ul className={`menu ${show ? "show" : ""}`}>
              <li className="navItem">
                <Link
                  to="/"
                  className={`navLink ${
                    window.location.pathname === "/" ? "active" : ""
                  }`}
                >
                  Home
                </Link>
              </li>
              <li className="navItem">
                <Link
                  to="/doctors"
                  className={`navLink ${
                    window.location.pathname === "/doctors" ? "active" : ""
                  }`}
                >
                  Doctors
                </Link>
              </li>
              <li className="navItem">
                <Link
                  to="/about"
                  className={`navLink ${
                    window.location.pathname === "/about" ? "active" : ""
                  }`}
                >
                  About Us
                </Link>
              </li>
              <li className="navItem">
                <button
                  disabled
                  className={`navLink ${
                    window.location.pathname === "/tests" ? "active" : ""
                  } disabled`}
                >
                  Tests
                </button>
              </li>
              <li className="navItem">
                <button
                  disabled
                  className={`navLink ${
                    window.location.pathname === "/blog" ? "active" : ""
                  } disabled`}
                >
                  Blog
                </button>
              </li>
            </ul>
            <div className="btns">
              <div className="btn">
                {!user ? (
                  <>
                    <Link to="/signin" className="navLink signin">
                      <span>Sign in</span>
                      <PiSignInBold />
                    </Link>
                    <Link to="/signup" className="navLink signup">
                      <span>Sign up</span>
                      <BsPersonFillAdd />
                    </Link>
                  </>
                ) : (
                  <div className="relative group">
                    <button className="profile-btn">
                      <img
                        src={validPhotoUrl}
                        alt="Profile"
                        className="profile-img"
                        onError={(e) => {
                          if (e.target.src !== defaultAvatar) {
                            e.target.src = defaultAvatar;
                          }
                        }}
                      />
                    </button>
                    <div className="dropdown">
                      <button
                        className="dropdown-item"
                        onClick={() => navigate("/dashboard")}
                      >
                        Dashboard
                      </button>
                      <button className="dropdown-item" onClick={handleLogout}>
                        Logout
                      </button>
                    </div>
                  </div>
                )}
                {/* <Link to="/e-services" className="navLink download">
                  Download App <MdKeyboardDoubleArrowRight />
                </Link> */}
              </div>
              <div className="hamMenu" onClick={toggleMenu}>
                <IoMenu />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
