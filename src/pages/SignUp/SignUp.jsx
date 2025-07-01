import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { AuthContext } from "../../Providers/AuthProvider";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;

// Default avatar as base64 SVG to prevent network issues
const defaultAvatar =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjUwIiBjeT0iMzciIHI9IjE1IiBmaWxsPSIjOUI5Qjk5Ii8+CjxwYXRoIGQ9Ik0yMCA4MEM5IDgwIDEwIDY2IDE2IDYwQzI1IDU0IDc1IDU0IDg0IDYwQzkwIDY2IDkxIDgwIDgwIDgwIiBmaWxsPSIjOUI5Qjk5Ii8+Cjwvc3ZnPgo=";

const SignUp = () => {
  const {
    register: createUser,
    signInWithGoogle: googleSignIn,
    updateUserProfile,
  } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1); // Track form steps
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // Watch password field for confirmation validation
  const password = watch("password");
  // Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${image_hosting_key}`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      if (data.success) {
        setImage(data.data.display_url);
        toast.success("Image uploaded successfully");
      } else {
        throw new Error("Image upload failed");
      }
    } catch {
      toast.error("Image upload failed");
    }
  };

  // Handle step 1 submission
  const onStep1Submit = () => {
    setStep(2); // Move to step 2
  };

  // Handle final submission
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await createUser(data.email, data.password);
      await updateUserProfile({
        displayName: data.name,
        photoURL: image || defaultAvatar,
      });

      const newUser = {
        name: data.name,
        email: data.email.toLowerCase(),
        mobile: data.mobile,
        photo: image || defaultAvatar,
        role: "patient",
        dob: data.dob,
        gender: data.gender,
        createdAt: new Date().toISOString(),
      };

      const response = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) throw new Error("Registration failed");

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Registration successful",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Google sign-in
  const handleGoogleSignIn = async () => {
    setIsSubmitting(true);
    try {
      const result = await googleSignIn();
      const user = result.user;

      const googleUser = {
        name: user.displayName,
        email: user.email.toLowerCase(),
        mobile: "", // Google doesn't provide mobile number
        photo: user.photoURL || defaultAvatar,
        role: "patient",
        createdAt: new Date().toISOString(),
      };

      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(googleUser),
      });

      if (!response.ok) throw new Error("Registration failed");

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Registration successful",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
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
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-center text-blue-700">
          Patient Sign Up
        </h2>
        {/* Step Indicator */}
        <div className="flex justify-center mb-4">
          <div className="flex items-center gap-4">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step === 1
                  ? "bg-blue-700 text-white"
                  : "bg-gray-300 text-gray-600"
              }`}
            >
              1
            </div>
            <div className="w-16 h-1 bg-gray-300"></div>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step === 2
                  ? "bg-blue-700 text-white"
                  : "bg-gray-300 text-gray-600"
              }`}
            >
              2
            </div>
          </div>
        </div>
        {step === 1 ? (
          <form
            onSubmit={handleSubmit(onStep1Submit)}
            className="space-y-4"
            autoComplete="off"
          >
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block mb-1 font-medium">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                {...register("name", { required: "Name is required" })}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Enter your name"
                autoComplete="name"
              />
              {errors.name && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block mb-1 font-medium">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address",
                  },
                })}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Enter your email"
                autoComplete="email"
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Mobile Number Field */}
            <div>
              <label htmlFor="mobile" className="block mb-1 font-medium">
                Mobile Number
              </label>
              <input
                id="mobile"
                type="tel"
                {...register("mobile", {
                  required: "Mobile number is required",
                  pattern: {
                    value: /^\+?[0-9]\d{1,14}$/,
                    message: "Invalid mobile number",
                  },
                })}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Enter your mobile number"
                autoComplete="tel"
              />
              {errors.mobile && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.mobile.message}
                </p>
              )}
            </div>
            {/* Date of Birth */}
            <div>
              <label htmlFor="dob" className="block mb-1 font-medium">
                Date of Birth
              </label>
              <input
                id="dob"
                type="date"
                {...register("dob", { required: "Date of birth is required" })}
                className="w-full px-4 py-2 border rounded-lg"
              />
              {errors.dob && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.dob.message}
                </p>
              )}
            </div>

            {/* Next Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 bg-blue-700 text-white rounded-lg font-medium hover:bg-blue-800 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin inline-block"></span>
              ) : (
                "Next"
              )}
            </button>
          </form>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
            autoComplete="off"
          >
            {/* Gender */}
            <div>
              <label htmlFor="gender" className="block mb-1 font-medium">
                Gender
              </label>
              <select
                id="gender"
                {...register("gender", { required: "Gender is required" })}
                className="w-full px-4 py-2 border rounded-lg"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.gender.message}
                </p>
              )}
            </div>

            {/* Image Upload */}
            <div>
              <label htmlFor="image" className="block mb-1 font-medium">
                Profile Image
              </label>
              <input
                id="image"
                type="file"
                onChange={handleImageUpload}
                className="w-full px-4 py-2 border rounded-lg"
                aria-label="Upload profile image"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block mb-1 font-medium">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  className="w-full px-4 py-2 border rounded-lg pr-10"
                  placeholder="Enter your password"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block mb-1 font-medium"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  className="w-full px-4 py-2 border rounded-lg pr-10"
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Back and Submit Buttons */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full py-2 bg-gray-300 text-gray-800 rounded-lg font-medium hover:bg-gray-400 transition-all"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 bg-blue-700 text-white rounded-lg font-medium hover:bg-blue-800 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin inline-block"></span>
                ) : (
                  "Register"
                )}
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center my-4">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-2 text-gray-600 text-sm">or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            {/* Google Sign-In */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isSubmitting}
              className="w-full py-2 bg-white border border-blue-700 text-blue-700 rounded-lg font-medium hover:bg-blue-700 hover:text-white transition-all flex items-center justify-center gap-2 disabled:bg-gray-200 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="w-5 h-5 border-2 border-t-transparent border-blue-700 rounded-full animate-spin inline-block"></span>
              ) : (
                <>
                  <FaGoogle /> Sign up with Google
                </>
              )}
            </button>
          </form>
        )}{" "}
        {/* User Info Display */}
        <p className="text-center text-sm mt-4 text-gray-600">
          Already registered?{" "}
          <Link
            to="/signin"
            className="text-blue-700 hover:underline font-medium"
          >
            Login
          </Link>
        </p>
        <div className="text-center mt-6 text-gray-500">
          <p>Innovated by</p>
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
    </section>
  );
};

export default SignUp;
