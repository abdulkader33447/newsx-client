import { useState } from "react";
import logo from "../assets/logo.png";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import useAuth from "../Hooks/useAuth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Loading from "../components/Loading";
import { Link, useNavigate } from "react-router";

const Login = () => {
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password); // login call
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Successfully logged in",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Invalid email or password");
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="bg-[#6200EE] mt-16">
      <div className="flex justify-center items-center min-h-screen w-11/12 mx-auto">
        <div className="bg-white shadow-lg rounded-2xl sm:p-8 p-6 w-96">
          <img src={logo} alt="logo" className="sm:w-50 w-35 mx-auto" />
          <p className="text-center mb-6">Welcome to Newsx, Please Log In</p>

          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <div className="relative">
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border-none bg-gray-200 rounded-lg px-3 py-2 focus:outline-none"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@gmail\.com$/,
                    message: "Only gmail addresses are allowed",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type={showPass ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full border-none bg-gray-200 rounded-lg px-3 py-2 focus:outline-none"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {showPass ? (
                <IoEyeOutline
                  className="absolute right-7 top-[34px] cursor-pointer"
                  onClick={() => setShowPass(false)}
                />
              ) : (
                <IoEyeOffOutline
                  className="absolute right-7 top-[34px] cursor-pointer"
                  onClick={() => setShowPass(true)}
                />
              )}
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="cursor-pointer w-full bg-[#6200EE] text-white py-2 rounded-lg hover:bg-[#6300eedc] transition"
            >
              Login
            </button>
            {error && (
              <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
            )}
          </form>

          <div className="flex items-center my-10">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="mx-4">Or</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>

          <p className="text-center text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="text-[#6200EE] font-medium">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
