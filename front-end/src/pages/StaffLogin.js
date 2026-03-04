import Navbar from "../components/Navbar";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

export default function StaffLogin() {

  const navigate = useNavigate();

  const [login, setLogin] = useState({
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/staff/login`,
        login
      );

      localStorage.setItem("token", res.data.token);

      navigate("/staff-success");

    } catch (err) {
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
        bg-gradient-to-br
        from-indigo-50
        via-purple-50
        to-pink-50"
      >

        <motion.form
          onSubmit={handleLogin}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="
          w-full max-w-md
          bg-white/80
          backdrop-blur-xl
          rounded-3xl
          shadow-2xl
          border border-gray-200
          p-10 text-center"
        >

          {/* TITLE */}
          <h2 className="
          text-3xl font-bold
          text-indigo-600
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
            focus:ring-indigo-500"
          />

          {/* PASSWORD */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="
            w-full mb-8
            p-3 rounded-xl
            border border-gray-300
            outline-none
            focus:ring-2
            focus:ring-indigo-500"
          />

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            className="
            w-full py-3
            rounded-xl
            bg-gradient-to-r
            from-indigo-600
            to-purple-600
            text-white
            font-semibold
            hover:scale-105
            active:scale-95
            transition"
          >
            Login →
          </button>

        </motion.form>

      </div>
    </>
  );
}
