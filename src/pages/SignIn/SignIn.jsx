import { useContext, useEffect, useRef, useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Providers/AuthProvider";

// Default avatar as base64 SVG to prevent network issues
const defaultAvatar =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjUwIiBjeT0iMzciIHI9IjE1IiBmaWxsPSIjOUI5Qjk5Ii8+CjxwYXRoIGQ9Ik0yMCA4MEM5IDgwIDEwIDY2IDE2IDYwQzI1IDU0IDc1IDU0IDg0IDYwQzkwIDY2IDkxIDgwIDgwIDgwIiBmaWxsPSIjOUI5Qjk5Ii8+Cjwvc3ZnPgo=";

const SignIn = () => {
  const {
    login: signIn,
    signInWithGoogle: googleSignIn,
    resetPassword,
    user,
  } = useContext(AuthContext) || {};
  const [error, setError] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const passwordToggleRef = useRef(null);

  const from = location.state?.from?.pathname || "/";

  // Handle click outside to close password toggle
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        passwordToggleRef.current &&
        !passwordToggleRef.current.contains(event.target)
      ) {
        setPasswordVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Email validation
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!signIn) {
      setError("Auth context missing");
      return;
    }
    setLoading(true);
    setError(null);
    const email = e.target.email.value;
    const password = e.target.password.value;

    signIn(email, password)
      .then(() => {
        Swal.fire({
          title: "Login successful",
          icon: "success",
          timer: 1200,
          showConfirmButton: false,
        });
        setLoading(false);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        setError(error.message);
        Swal.fire({
          icon: "error",
          title: "Login failed",
          text: error.message,
        });
        setLoading(false);
      });
  };

  const handleGoogleLogin = () => {
    if (!googleSignIn) {
      setError("Auth context missing");
      return;
    }
    setLoading(true);
    setError(null);
    googleSignIn()
      .then(() => {
        Swal.fire({
          title: "Login successful",
          icon: "success",
          timer: 1200,
          showConfirmButton: false,
        });
        setLoading(false);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        setError(error.message);
        Swal.fire({
          icon: "error",
          title: "Login failed",
          text: error.message,
        });
        setLoading(false);
      });
  };

  const handleForgotPassword = () => {
    if (!resetPassword) {
      Swal.fire({
        icon: "error",
        title: "Auth context missing",
        text: "Password reset is unavailable.",
      });
      return;
    }
    Swal.fire({
      title: "Forgot Password?",
      input: "email",
      inputLabel: "Enter your email address",
      inputPlaceholder: "Enter your email",
      showCancelButton: true,
      confirmButtonText: "Send Reset Link",
      cancelButtonText: "Cancel",
      preConfirm: (email) => {
        if (!email) {
          Swal.showValidationMessage("Email is required");
          return;
        }
        if (!validateEmail(email)) {
          Swal.showValidationMessage("Invalid email address");
          return;
        }
        return resetPassword(email)
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Reset email sent",
              text: "Check your email for the reset link.",
              timer: 3000,
              showConfirmButton: false,
            });
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Reset failed",
              text: error.message,
            });
          });
      },
    });
  };

  return (
    <section
      className="min-h-screen flex justify-center items-center"
      style={{
        backgroundImage: "url('/src/assets/bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="">
        <div className=" backdrop-blur">
          {/* Right Panel */}
          <div className="bg-gray-50  p-8 flex flex-col justify-center">
            <h3 className="text-2xl font-bold mb-6 text-center text-blue-700">
              Welcome to Telemedicine Portal
            </h3>
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
              aria-label="Login Form"
              autoComplete="off"
            >
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block mb-1 font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="input input-bordered w-full border-[#2E9CCA] focus:border-[#2E9CCA] focus:ring-[#2E9CCA] rounded-md bg-white"
                  required
                  aria-required="true"
                  autoComplete="username"
                />
              </div>
              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block mb-1 font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Enter your password"
                    className="input input-bordered w-full border-[#2E9CCA] focus:border-[#2E9CCA] focus:ring-[#2E9CCA] rounded-md bg-white pr-10"
                    required
                    aria-required="true"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    ref={passwordToggleRef}
                    onClick={() => setPasswordVisible((v) => !v)}
                    className="absolute right-3 top-2.5 text-gray-500 hover:text-[#2E9CCA] focus:outline-none"
                    aria-label={
                      passwordVisible ? "Hide password" : "Show password"
                    }
                    tabIndex={-1}
                  >
                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
              {/* Remember & Forgot */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm"
                    aria-label="Remember me"
                  />
                  Remember me
                </label>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-[#2E9CCA] hover:underline font-medium"
                  aria-label="Forgot password"
                >
                  Forgot password?
                </button>
              </div>
              {/* Error */}
              {error && (
                <div aria-live="polite">
                  <p className="text-error text-sm mt-1">{error}</p>
                </div>
              )}
              {/* Login Button */}
              <button
                className="w-full py-2 bg-blue-700 text-white rounded-md font-semibold hover:bg-[#3FA7D6] transition disabled:bg-gray-400"
                disabled={loading}
                aria-label="Sign In"
                type="submit"
              >
                {loading ? (
                  <span className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin inline-block"></span>
                ) : (
                  "Sign In"
                )}
              </button>
              {/* Divider */}
              <div className="flex items-center my-2">
                <div className="flex-grow border-t border-gray-300" />
                <span className="mx-3 text-gray-500">or</span>
                <div className="flex-grow border-t border-gray-300" />
              </div>
              {/* Google Sign-In */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full py-2 bg-white border border-[#2E9CCA] text-[#2E9CCA] rounded-md font-semibold hover:bg-[#2E9CCA] hover:text-white transition flex items-center justify-center gap-2 disabled:bg-gray-200"
                disabled={loading}
                aria-label="Sign in with Google"
              >
                {loading ? (
                  <span className="w-5 h-5 border-2 border-t-transparent border-[#2E9CCA] rounded-full animate-spin inline-block"></span>
                ) : (
                  <>
                    <FaGoogle /> Sign in with Google
                  </>
                )}
              </button>
            </form>
            <p className="text-center text-sm mt-5">
              Don't have an account?{" "}
              <Link
                to="/signUp"
                className="text-[#2E9CCA] hover:underline font-semibold"
              >
                Sign Up
              </Link>
            </p>{" "}
            <div className="text-center text-xs mt-6 opacity-70">
              {user && (
                <div className="flex items-center justify-center gap-2 mb-2">
                  <img
                    src={user.photoURL || defaultAvatar}
                    alt="Profile"
                    className="w-8 h-8 rounded-full border"
                  />
                  <span className="font-medium text-gray-800">
                    {user.displayName}
                  </span>
                </div>
              )}
              Innovated by{" "}
              <a
                href="https://www.jionex.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block align-middle transition-all duration-200 hover:scale-105 hover:opacity-90"
                aria-label="Visit Jionex website, innovated by"
              >
                <img
                  src="https://i.ibb.co/XMXd54n/jionex-logo.png"
                  alt="Jionex Logo"
                  className="inline h-6 ml-1"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
