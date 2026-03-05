import Navbar from "../components/Navbar";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function StudentLogin() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [login, setLogin] = useState({
    email: "",
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

    setLoading(true);

    try {

      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/team/login`,
        login
      );

      localStorage.setItem(
        "teamToken",
        res.data.token
      );

      navigate("/student/dashboard");
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
            Student Login
          </h2>

          {/* EMAIL */}
          <input
            name="email"
            placeholder="Email"
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
              focus:ring-indigo-500"
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              className="
              absolute right-4 top-1/2
              -translate-y-1/2
              cursor-pointer text-gray-500"
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
            bg-gradient-to-r
            from-indigo-600
            to-purple-600
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
