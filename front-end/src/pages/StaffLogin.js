import Navbar from "../components/Navbar";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function StaffLogin() {

  const navigate = useNavigate();

  const [login, setLogin] = useState({
    username: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {

      const res = await axios.post(
        "https://localhost:3000/api/staff/login",
        login
      );

      localStorage.setItem("token", res.data.token);

      navigate("/staff-success");
      setLoading(false);

    } catch (err) {
      setLoading(false);
      toast.error("Invalid Credentials ❌");
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />

      <div
        className="
        min-h-screen
        flex justify-center items-center
        pt-28 px-4
        bg-white"
      >

        <motion.form
          onSubmit={handleLogin}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="
          w-full max-w-md
          bg-white
          rounded-3xl
          shadow-2xl
          border border-gray-200
          p-10 text-center"
        >

          {/* TITLE */}
          <h2 className="
          text-3xl font-bold
          text-black
          mb-8">
            Staff Login
          </h2>

          {/* USERNAME */}
          <input
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
            className="
            w-full mb-5
            p-3 rounded-xl
            border border-gray-300
            outline-none
            focus:ring-2
            focus:ring-black"
          />

          {/* PASSWORD */}
          <div className="relative mb-8">

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
              className="
              w-full
              p-3 pr-12
              rounded-xl
              border border-gray-300
              outline-none
              focus:ring-2
              focus:ring-black"
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              className="
              absolute right-4 top-1/2
              -translate-y-1/2
              cursor-pointer
              text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>

          </div>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="
            w-full py-3
            rounded-xl
            bg-black
            text-white
            font-semibold
            transition
            disabled:opacity-70"
          >
            {loading ? "Logging in..." : "Login →"}
          </button>

        </motion.form>

      </div>
    </>
  );
}
