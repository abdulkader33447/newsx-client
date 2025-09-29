import { useState } from "react";
import logo from "../assets/logo.png";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import useAuth from "../Hooks/useAuth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxios from "../Hooks/useAxios";

const Register = () => {
  const { createUser } = useAuth();
  const { user } = useAuth();
  // const [formData, setFormData] = useState({
  //   email: "",
  //   password: "",
  // });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const axios = useAxios();
  console.log(user);

  const onSubmit = async (data) => {
    try {
      const result = createUser(data.email, data.password);
      // console.log("form submitted", data);

      const userInfo = {
        name: data.name,
        email: data.email,
        password: data.password,
      };

      const userRes = await axios.post("users", userInfo);
      console.log(userRes.data);
      // show alert
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Successfully logged in",
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error) {
      console.log("login failed", error);
    }
  };

  // input change handler
  // const handleChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // submit handler
  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   if (!formData.email || !formData.password) {
  //     setError("All fields are required!");
  //     return;
  //   }

  //   setError("");
  //   console.log("Form submitted:", formData);
  //   // write API call / authentication logic
  // };

  return (
    <div className="flex justify-center items-center min-h-screen w-11/12 mx-auto">
      <div className="bg-white shadow-lg rounded-2xl sm:p-8 p-6 w-96">
        {/* <h2 className="text-2xl font-bold text-center"></h2> */}
        <img src={logo} alt="logo" className="sm:w-50 w-35 mx-auto" />
        <p className="text-center mb-6">Welcome Newsx, Please Log In</p>
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
              // name="name"
              // value={formData.name}
              // onChange={handleChange}
              className="w-full border-none bg-gray-200 rounded-lg px-3 py-2 focus:outline-none"
              {...register("name", {
                required: true,
              })}
            />

            {errors.name?.type === "required" && (
              <p className="text-red-500">name is required</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              // name="email"
              // value={formData.email}
              // onChange={handleChange}
              className="w-full border-none bg-gray-200 rounded-lg px-3 py-2 focus:outline-none"
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[^\s@]+@gmail\.com$/,
                  message: "Only 'gmail' addresses are allowed",
                },
              })}
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500">email is required</p>
            )}
            {errors.email?.type === "pattern" && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type={showPass ? "text" : "password"}
              placeholder="Enter your password"
              // name="password"
              // value={formData.password}
              // onChange={handleChange}
              className="w-full border-none bg-gray-200 rounded-lg px-3 py-2 focus:outline-none"
              {...register("password", {
                required: true,
                minLength: 6,
                // pattern: {
                //   value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/,
                //   message:
                //     "Password must have at least 6 characters including uppercase, lowercase, and a number",
                // },
              })}
            />
            {showPass ? (
              <>
                <IoEyeOutline
                  className="absolute right-7 top-[34px] size-5 cursor-pointer"
                  onClick={() => setShowPass(false)}
                />
              </>
            ) : (
              <>
                <IoEyeOffOutline
                  className="absolute right-7 top-[34px] size-5 cursor-pointer"
                  onClick={() => setShowPass(true)}
                />
              </>
            )}

            {errors.password?.type === "required" && (
              <p className="text-red-500">password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500">
                password must be 6 characters or longer
              </p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full cursor-pointer bg-[#6200EE] text-white py-2 rounded-lg hover:bg-[#6300eedc] transition"
          >
            Login
          </button>
        </form>
        <div className="flex items-center my-10">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="mx-4">Or</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>
      </div>
    </div>
  );
};

export default Register;
