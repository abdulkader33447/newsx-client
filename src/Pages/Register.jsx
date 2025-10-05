import { useState } from "react";
import logo from "../assets/logo.png";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import useAuth from "../Hooks/useAuth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxios from "../Hooks/useAxios";
import { Link, useNavigate } from "react-router";
import Loading from "../components/Loading";

const Register = () => {
  const { createUser, loading } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const axios = useAxios();

  const onSubmit = async (data) => {
    setError("");
    try {
      const result = await createUser(data.email, data.password);

      const userInfo = {
        name: data.name,
        email: data.email,
        password: data.password,
      };

      const userRes = await axios.post("users", userInfo);
      // console.log(userRes.data);

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Successfully signed up",
        showConfirmButton: false,
        timer: 2000,
      });

      navigate("/");
    } catch (err) {
      console.error(err);
      setError(err.message || "Signup failed. Please try again.");
    }
  };

  if (loading) return <Loading/>;

  return (
    <div className="flex justify-center items-center min-h-screen w-11/12 mx-auto pt-20">
      <div className="bg-white shadow-lg rounded-2xl sm:p-8 p-6 w-96">
        <img src={logo} alt="logo" className="sm:w-50 w-35 mx-auto" />
        <p className="text-center mb-6">Welcome Newsx, Please Sign up</p>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div className="relative">
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full border-none bg-gray-200 rounded-lg px-3 py-2 focus:outline-none"
              {...register("name", {
                required: "Name is required",
              })}
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>

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
                  message: "Only 'gmail' addresses are allowed",
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

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full cursor-pointer bg-[#6200EE] text-white py-2 rounded-lg hover:bg-[#6300eedc] transition"
          >
            Sign up
          </button>
        </form>

        <div className="flex items-center my-10">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="mx-4">Or</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>

        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-[#6200EE] font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
