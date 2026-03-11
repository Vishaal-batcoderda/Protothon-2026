import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/logo.png";

const sections = ["home","about","timeline","problems","rules"];

function Navbar() {

  const location = useLocation();

  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  /* ================= SCROLL EFFECT ================= */
  useEffect(() => {

    const handleScroll = () => {
      setMenuOpen(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);

  }, []);

  /* ================= ACTIVE SECTION ================= */
  useEffect(() => {

    const observer = new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }

        });

      },
      {
        threshold: 0.5
      }
    );

    const elements = sections
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };

  }, []);

  /* ================= SCROLL ================= */
  const scrollToSection = (id) => {

    setMenuOpen(false);

    if (location.pathname !== "/") {
      window.location.href = `/#${id}`;
      return;
    }

    const element = document.getElementById(id);

    if (element) {

      const navbarHeight = 80;

      const y =
        element.getBoundingClientRect().top +
        window.pageYOffset -
        navbarHeight;

      window.scrollTo({
        top: y,
        behavior: "smooth",
      });

    }

  };

  return (

    <nav
      className="
      fixed top-0 w-full z[9999]
      transition-all duration-300
      bg-white shadow-md
      "
    >

      <div className="
      max-w-7xl mx-auto
      flex justify-between items-center
      h-16
      px-6 md:px-10">

        {/* LOGO */}
        <img
          src={logo}
          alt="Protothon Logo"
          onClick={() => scrollToSection("home")}
          className="h-14 object-contain cursor-pointer select-none"
        />

        {/* ================= DESKTOP ================= */}
        <div className="
        hidden md:flex
        items-center gap-8 font-medium">

          {sections.map((sec) => (

            <span
              key={sec}
              onClick={() => scrollToSection(sec)}
              className="
              relative cursor-pointer
              text-gray-700
              hover:text-black"
            >

              {sec.charAt(0).toUpperCase() + sec.slice(1)}

              {active === sec && (
                <motion.div
                  layoutId="nav-indicator"
                  className="
                  absolute -bottom-2
                  left-0 right-0
                  h-[2px]
                  bg-black"
                />
              )}

            </span>

          ))}

          {/* STUDENT LOGIN */}
          <Link
            to="/student/login"
            className="hover:text-black text-gray-700"
          >
            Student Login
          </Link>

          {/* STAFF */}
          <Link
            to="/staff-login"
            className="hover:text-black text-gray-700"
          >
            Staff
          </Link>

          {/* REGISTER */}
          <Link
            to="/register"
            className="
            px-5 py-2 rounded-lg
            bg-black text-white
            hover:bg-gray-900
            transition hover:scale-105"
          >
            Register
          </Link>

        </div>

        {/* MOBILE BUTTON */}
        <button
          className="md:hidden text-3xl text-black"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

      </div>

      {/* ================= MOBILE MENU ================= */}
      <AnimatePresence>

        {menuOpen && (

          <motion.div
            initial={{ opacity:0,y:-20 }}
            animate={{ opacity:1,y:0 }}
            exit={{ opacity:0,y:-20 }}
            className="
            md:hidden
            bg-white backdrop-blur-xl
            shadow-lg flex flex-col
            text-center gap-6 py-6"
          >

            {sections.map((sec)=>(

              <span
                key={sec}
                onClick={()=>scrollToSection(sec)}
                className="
                text-lg font-medium
                text-gray-700
                hover:text-black"
              >
                {sec.charAt(0).toUpperCase()+sec.slice(1)}
              </span>

            ))}

            {/* STUDENT LOGIN */}
            <Link
              to="/student/login"
              onClick={()=>setMenuOpen(false)}
              className="text-lg text-gray-700"
            >
              Student Login
            </Link>

            {/* STAFF */}
            <Link
              to="/staff-login"
              onClick={()=>setMenuOpen(false)}
              className="text-lg text-gray-700"
            >
              Staff
            </Link>

            {/* REGISTER */}
            <Link
              to="/register"
              onClick={()=>setMenuOpen(false)}
              className="
              mx-auto px-6 py-3
              rounded-lg bg-black
              text-white"
            >
              Register
            </Link>

          </motion.div>

        )}

      </AnimatePresence>

    </nav>
  );
}

export default Navbar;
