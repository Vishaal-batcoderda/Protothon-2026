import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const sections = ["home","about","timeline","problems","rules"];

function Navbar() {

  const location = useLocation();

  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  /* ================= SCROLL EFFECT ================= */
  useEffect(() => {

    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
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
          if (entry.isIntersecting)
            setActive(entry.target.id);
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();

  }, []);

  /* ================= SCROLL ================= */
  const scrollToSection = (id) => {

    setMenuOpen(false);

    if (location.pathname !== "/") {
      window.location.href = `/#${id}`;
      return;
    }

    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (

    <nav
      className={`
      fixed top-0 w-full z-50
      transition-all duration-300
      ${scrolled
        ? "backdrop-blur-xl bg-white/70 shadow-md py-3"
        : "bg-transparent py-5"}
      `}
    >

      <div className="
      max-w-7xl mx-auto
      flex justify-between items-center
      px-6 md:px-10">

        {/* LOGO */}
        <h1
          onClick={() => scrollToSection("home")}
          className="
          text-xl md:text-2xl
          font-bold text-indigo-600
          cursor-pointer tracking-wide"
        >
          Protothon 2026
        </h1>

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
              hover:text-indigo-600"
            >

              {sec.charAt(0).toUpperCase() + sec.slice(1)}

              {active === sec && (
                <motion.div
                  layoutId="nav-indicator"
                  className="
                  absolute -bottom-2
                  left-0 right-0
                  h-[2px]
                  bg-indigo-600"
                />
              )}

            </span>

          ))}

          {/* ✅ STUDENT PORTAL */}
          <Link
            to="/student/login"
            className="hover:text-indigo-600"
          >
            Student Login
          </Link>

          {/* STAFF */}
          <Link
            to="/staff-login"
            className="hover:text-indigo-600"
          >
            Staff
          </Link>

          {/* REGISTER */}
          <Link
            to="/register"
            className="
            px-5 py-2 rounded-lg
            bg-indigo-600 text-white
            hover:bg-indigo-700
            transition hover:scale-105"
          >
            Register
          </Link>

        </div>

        {/* MOBILE BUTTON */}
        <button
          className="md:hidden text-3xl"
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
            bg-white/95 backdrop-blur-xl
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
                hover:text-indigo-600"
              >
                {sec.charAt(0).toUpperCase()+sec.slice(1)}
              </span>
            ))}

            {/* TEAM */}
            <Link
              to="/student/login"
              onClick={()=>setMenuOpen(false)}
              className="text-lg"
            >
              Student Login
            </Link>

            {/* STAFF */}
            <Link
              to="/staff-login"
              onClick={()=>setMenuOpen(false)}
              className="text-lg"
            >
              Staff
            </Link>

            {/* REGISTER */}
            <Link
              to="/register"
              onClick={()=>setMenuOpen(false)}
              className="
              mx-auto px-6 py-3
              rounded-lg bg-indigo-600
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
