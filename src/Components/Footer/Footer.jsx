import { FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiFacebook } from "react-icons/fi";
import { Link } from "react-router-dom";
import "./footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="wrapper">
          <div className="inner_wrapper">
            <Link className="logo" to="/">
              <img
                src="/src/assets/wiocare-w.svg"
                alt="wiocare"
                className="logo_img"
              />
            </Link>
            <p className="location">
              <a
                href="https://maps.app.goo.gl/Ujn6xGKHXdCc5hQ99"
                target="_blank"
                rel="noopener noreferrer"
              >
                4th Floor, IPL City Centre, Holding No. 162, O. R. Nizam Road,
                Goal Pahar, PS: Panchlaish, District:- Chattogram, Bangladesh.
              </a>
            </p>
          </div>
          <div className="footer_menu">
            <h3>Company</h3>
            <ul>
              <li>
                <Link className="nav_link" to="/about">
                  About Us
                </Link>
              </li>
              <li>
                <a className="nav_link" href="javascript:void(0)">
                  Careers
                </a>
              </li>
              <li>
                <a className="nav_link" href="javascript:void(0)">
                  News & Press
                </a>
              </li>
              <li>
                <a className="nav_link" href="javascript:void(0)">
                  Investor Relation
                </a>
              </li>
            </ul>
          </div>
          <div className="footer_menu">
            <h3>Support</h3>
            <ul>
              <li>
                <a className="nav_link" href="javascript:void(0)">
                  Product Help
                </a>
              </li>
              <li>
                <a className="nav_link" href="javascript:void(0)">
                  Learn & Care
                </a>
              </li>
              <li>
                <a className="nav_link" href="javascript:void(0)">
                  Partner
                </a>
              </li>
              <li>
                <a className="nav_link" href="javascript:void(0)">
                  Community
                </a>
              </li>
            </ul>
          </div>
          <div className="connect">
            <h3>Connect</h3>
            <ul>
              <li>
                <a href="javascript:void(0)">
                  <FiFacebook />
                </a>
              </li>
              <li>
                <a href="javascript:void(0)">
                  <FaInstagram />
                </a>
              </li>
              <li>
                <a href="javascript:void(0)">
                  <FaXTwitter />
                </a>
              </li>
              <li>
                <a href="javascript:void(0)">
                  <FaLinkedinIn />
                </a>
              </li>
              <li>
                <a href="javascript:void(0)">
                  <FaYoutube />
                </a>
              </li>
              {/* <li>
                <a href="javascript:void(0)">
                  <FaMedium />
                </a>
              </li> */}
            </ul>
          </div>
        </div>
        <div className="footer_bootom">
          <p className="copyright">Copyright © 2025 wiocare.com</p>
          <p className="copyright">Powered by wiocare.com</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
