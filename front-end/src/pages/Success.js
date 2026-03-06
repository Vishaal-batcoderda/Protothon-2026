import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Success() {

  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <div
        className="
        min-h-screen
        flex justify-center items-center
        px-6
        bg-white"
      >

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="
          relative
          max-w-4xl w-full
          bg-white
          rounded-3xl
          shadow-2xl
          overflow-hidden
          grid md:grid-cols-2"
        >

          {/* ================= LEFT SIDE ================= */}
          <div className="
          flex flex-col
          justify-center
          items-center
          bg-black
          text-white
          p-12">

            {/* Animated Success Circle */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 140,
                damping: 10
              }}
              className="
              w-28 h-28
              rounded-full
              bg-white
              flex items-center
              justify-center
              shadow-xl"
            >
              <svg
                width="60"
                height="60"
                viewBox="0 0 24 24"
                fill="none"
                stroke="black"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <motion.path
                  d="M20 6L9 17L4 12"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8 }}
                />
              </svg>
            </motion.div>

            <h2 className="mt-8 text-2xl font-semibold">
              Successfully Registered
            </h2>

          </div>

          {/* ================= RIGHT SIDE ================= */}
          <div className="
          flex flex-col
          justify-center
          p-12
          text-center md:text-left">

            <h1 className="
            text-4xl font-bold
            text-black
            mb-4">
              Welcome to Protothon 2026
            </h1>

            <p className="
            text-gray-600
            leading-relaxed
            mb-8">
              Your team registration has been successfully completed.
              Our organizing team will review your submission and
              shortlisted teams will be notified soon.
            </p>

            <button
              onClick={() => navigate("/")}
              className="
              self-center md:self-start
              px-8 py-3
              rounded-xl
              bg-black
              text-white
              font-semibold
              shadow-lg
              hover:scale-105
              active:scale-95
              transition-all duration-300"
            >
              Back to Home →
            </button>

          </div>

        </motion.div>

      </div>
    </>
  );
}
