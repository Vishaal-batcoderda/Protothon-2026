import Navbar from "../components/Navbar";
import protothon from "../assets/protothon.png";
import step1 from "../assets/steps/step1.png";
import step2 from "../assets/steps/step2.png";
import step3 from "../assets/steps/step3.png";
import step4 from "../assets/steps/step4.png";
import ParticlesBackground from "../components/ParticlesBackground";

import {
  motion,
  useScroll,
} from "framer-motion";

import { useNavigate } from "react-router-dom";
import { useRef } from "react";

import Countdown from "../components/Countdown";
import Reveal from "../components/Reveal";
import ScrollProgress from "../components/ScrollProgress";

/* ✅ NEW IMPORT */
import ProblemStatements from "../components/ProblemStatements";

export default function Home() {

  const navigate = useNavigate();

  const timelineRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end end"]
  });

  const steps = [
    {
      title: "Understand the Problem",
      desc: "Analyze real-world challenges and understand the problem deeply before building solutions.",
      image: step1,
    },
    {
      title: "Ideate & Sketch Solutions",
      desc: "Brainstorm innovative ideas and design structured workflows.",
      image: step2,
    },
    {
      title: "Build Digitally",
      desc: "Transform ideas into working prototypes using modern technologies.",
      image: step3,
    },
    {
      title: "Present & Compete",
      desc: "Showcase your innovation and present your solution to the judges.",
      image: step4,
    },
  ];

  return (
    <>
      <ScrollProgress />
      <Navbar />

      {/* ================= HERO ================= */}
<section
  id="home"
  className="
  relative
  min-h-[calc(100vh-70px)]
  flex items-center
  overflow-hidden
  px-6 pt-24
  bg-[linear-gradient(270deg,#eef2ff,#f5f3ff,#fdf2f8,#eef2ff)]
bg-[length:400%_400%]
animate-[gradientMove_12s_ease_infinite]"
>

  {/* PARTICLES */}
  <ParticlesBackground />

  {/* PREMIUM BACKGROUND GLOW */}
  <div className="absolute inset-0 -z-10">

    <div className="
    absolute
    w-[650px] h-[650px]
    bg-indigo-300/30
    blur-[140px]
    rounded-full
    top-[-150px]
    left-[-150px]"
    />

    <div className="
    absolute
    w-[600px] h-[600px]
    bg-purple-300/30
    blur-[140px]
    rounded-full
    bottom-[-150px]
    right-[-150px]"
    />

  </div>


  <div className="
  max-w-7xl mx-auto w-full
  flex flex-col md:flex-row
  items-center gap-14">

    {/* ===== IMAGE ===== */}
    <motion.div
      initial={{ opacity:0, x:-80 }}
      animate={{ opacity:1, x:0 }}
      transition={{ duration:1 }}
      className="md:w-1/2 flex justify-center"
    >
      <motion.img
        src={protothon}
        alt="Protothon"
        className="w-[280px] md:w-[520px]"
        animate={{
          y:[0,-18,0],
          rotate:[0,1,0,-1,0]
        }}
        transition={{
          duration:6,
          repeat:Infinity,
          ease:"easeInOut"
        }}
      />
    </motion.div>


    {/* ===== CONTENT ===== */}
    <motion.div
      initial={{ opacity:0, x:80 }}
      animate={{ opacity:1, x:0 }}
      transition={{ duration:1 }}
      className="md:w-1/2 text-center md:text-left"
    >

      <motion.h1
className="
text-5xl md:text-7xl
font-extrabold
font-[Sora]
tracking-tight
bg-gradient-to-r
from-indigo-600
via-purple-600
to-pink-600
bg-clip-text
text-transparent
">
Protothon 2026
</motion.h1>

      <p className="mt-6 text-gray-600 text-lg md:text-xl">
        Innovate • Build • Transform Ideas Into Reality
      </p>

      <motion.div
  initial={{ opacity:0, scale:0.9 }}
  animate={{ opacity:1, scale:1 }}
  transition={{ delay:0.4 }}
  className="mt-8 w-full flex justify-center"
>
  <div className="w-full max-w-md">
    <Countdown />
  </div>
</motion.div>

      <motion.button
        whileHover={{
          scale:1.08,
          boxShadow:"0px 20px 45px rgba(99,102,241,0.35)"
        }}
        whileTap={{ scale:0.95 }}
        onClick={() => navigate("/register")}
        className="
        mt-10
        px-12 py-4
        rounded-2xl
        text-white
        font-semibold
        text-lg
        bg-gradient-to-r
        from-indigo-600
        to-purple-600
        shadow-xl
        transition-all"
      >
        Register Now →
      </motion.button>

    </motion.div>

  </div>

</section>


      {/* ================= HOW IT WORKS ================= */}
      <section
        id="about"
        ref={timelineRef}
        className="relative py-32 bg-gray-50 px-6"
      >

        <motion.div
          style={{ scaleY: scrollYProgress }}
          className="
          hidden md:block
          absolute left-1/2 top-60
          -translate-x-1/2
          w-[3px]
          h-[calc(81%-220px)]
          bg-indigo-600
          origin-top"
        />

        <Reveal>
          <h2 className="text-center text-5xl font-bold mb-24">
            How It Works
          </h2>
        </Reveal>

        {steps.map((step, index) => (
          <Reveal key={index}>
            <div
              className={`
              relative max-w-7xl mx-auto
              flex flex-col md:flex-row
              items-center gap-16 mb-32
              ${index % 2 ? "md:flex-row-reverse" : ""}
              `}
            >

              <div className="
              hidden md:flex
              absolute left-1/2
              -translate-x-1/2">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  className="
                  w-6 h-6 rounded-full
                  bg-indigo-600
                  border-4 border-white
                  shadow-lg"
                />
              </div>

              <motion.img
                src={step.image}
                alt=""
                className="md:w-1/2 w-[320px]"
                whileHover={{ scale: 1.05 }}
              />

              <div className="md:w-1/2 text-center md:text-left">
                <h3 className="text-3xl md:text-4xl font-semibold mb-4">
                  {index + 1}. {step.title}
                </h3>
                <p className="text-gray-600 text-lg">
                  {step.desc}
                </p>
              </div>

            </div>
          </Reveal>
        ))}
      </section>


      {/* ================= APPLE STYLE TIMELINE ================= */}
<Reveal>
<section
  id="timeline"
  className="py-32 bg-white px-6 relative overflow-hidden"
>

<h2 className="text-center text-4xl md:text-5xl font-bold mb-24">
Event Timeline
</h2>

<div className="relative max-w-6xl mx-auto">

{/* glowing vertical line */}
<div className="
hidden md:block
absolute left-1/2 top-0
-translate-x-1/2
h-full w-[3px]
bg-gradient-to-b
from-indigo-500
via-purple-500
to-pink-500
opacity-70"
/>

{[
{ title:"Registration Opens", date:"March 10" },
{ title:"Registration Closes", date:"March 25" },
{ title:"Shortlisting Announcement", date:"March 28" },
{ title:"Final Presentation", date:"April 5" },
].map((event,index)=>{

const isLeft = index % 2 === 0;

return(

<motion.div
key={index}

initial={{
opacity:0,
x:isLeft?-120:120,
scale:0.95
}}

whileInView={{
opacity:1,
x:0,
scale:1
}}

viewport={{once:true}}

transition={{
duration:0.8,
ease:"easeOut"
}}

className={`
relative flex items-center mb-28
${isLeft ? "md:justify-start" : "md:justify-end"}
justify-center
`}
>

{/* glowing dot */}
<div className="
hidden md:flex
absolute left-1/2
-translate-x-1/2
items-center justify-center
">

<div className="
w-6 h-6 rounded-full
bg-indigo-600
shadow-[0_0_25px_rgba(99,102,241,0.9)]
animate-pulse
"/>

</div>


{/* timeline card */}
<motion.div

whileHover={{
scale:1.05,
y:-8
}}

className="
w-full md:w-[42%]
bg-white/70
backdrop-blur-xl
border border-gray-200
p-7
rounded-2xl
shadow-xl
transition-all
duration-300
"
>

<h3 className="text-xl font-semibold text-indigo-600">
{event.title}
</h3>

<p className="text-gray-600 mt-2 font-medium">
{event.date}
</p>

</motion.div>

</motion.div>

)

})}

</div>

</section>
</Reveal>


      {/* ✅ PROBLEM STATEMENTS ADDED HERE */}
      <Reveal>
        <ProblemStatements />
      </Reveal>


      {/* ================= RULES & GUIDELINES ================= */}
      {/* ✅ YOUR EXISTING RULES SECTION EXACTLY SAME */}
      {/* (No changes done below this point) */}

      {/* KEEP YOUR EXISTING RULES CODE HERE WITHOUT CHANGE */}
      
      {/* ================= RULES & GUIDELINES ================= */}
<Reveal>
<section
  id="rules"
  className="
  relative
  py-36
  bg-gradient-to-b
  from-white
  to-indigo-50
  px-6
  overflow-hidden"
>

  {/* BACKGROUND DECOR */}
  <div className="absolute inset-0 -z-10">

    <div className="
    absolute w-[400px] h-[400px]
    bg-indigo-200
    blur-[140px]
    opacity-30
    top-10 left-10 rounded-full"/>

    <div className="
    absolute w-[400px] h-[400px]
    bg-purple-200
    blur-[140px]
    opacity-30
    bottom-10 right-10 rounded-full"/>

  </div>


  <h2 className="
  text-center
  text-5xl
  font-bold
  mb-24
  bg-gradient-to-r
  from-indigo-600
  to-purple-600
  bg-clip-text
  text-transparent">
    Rules & Guidelines
  </h2>


  <div className="
  max-w-6xl mx-auto
  grid sm:grid-cols-2 lg:grid-cols-4
  gap-12">

    {[
      {
        icon: "👥",
        title: "Team Size",
        desc: "Each team must consist of 2–4 members."
      },
      {
        icon: "💡",
        title: "Original Ideas",
        desc: "Solutions must be innovative and original."
      },
      {
        icon: "📄",
        title: "Abstract Required",
        desc: "Idea abstract submission is mandatory."
      },
      {
        icon: "⚖️",
        title: "Fair Participation",
        desc: "Maintain ethical and fair competition."
      }
    ].map((rule, index) => (

      <motion.div
        key={index}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        whileHover={{
y:-10,
scale:1.05,
rotateX:6,
rotateY:-6
}}
        className="
        relative
        group
        rounded-3xl
        p-[2px]
        bg-gradient-to-r
        from-indigo-500
        via-purple-500
        to-pink-500"
      >

        {/* CARD */}
        <div className="
        bg-white
        rounded-3xl
        p-8
        h-full
        text-center
        shadow-lg
        transition-all duration-300
        group-hover:shadow-2xl">

          {/* ICON BADGE */}
          <div className="
          text-5xl
          mb-5
          transition
          group-hover:scale-110">
            {rule.icon}
          </div>

          <h3 className="
          text-xl
          font-semibold
          text-indigo-600
          mb-3">
            {rule.title}
          </h3>

          <p className="text-gray-600">
            {rule.desc}
          </p>

        </div>

      </motion.div>

    ))}

  </div>

</section>
</Reveal>
      

      <section
  className="
  relative
  py-32
  overflow-hidden
  bg-gradient-to-r
  from-indigo-600
  via-purple-600
  to-pink-600
  text-white
  text-center"
>

  {/* ===== BACKGROUND GLOW ===== */}
  <div className="absolute inset-0 -z-10">

    <div className="
    absolute w-[500px] h-[500px]
    bg-white/20
    blur-[160px]
    rounded-full
    top-[-120px] left-[-120px]"
    />

    <div className="
    absolute w-[500px] h-[500px]
    bg-white/20
    blur-[160px]
    rounded-full
    bottom-[-120px] right-[-120px]"
    />

  </div>


  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
    className="max-w-4xl mx-auto px-6"
  >

    {/* TITLE */}
    <h2 className="
    text-4xl md:text-6xl
    font-bold
    leading-tight">
      Ready to Build the Future?
    </h2>

    {/* SUBTEXT */}
    <p className="
    mt-6
    text-lg md:text-xl
    text-white/90">
      Transform your ideas into impactful solutions and
      compete with innovators across domains at
      <span className="font-semibold"> Ideathon 2026.</span>
    </p>


    {/* BUTTONS */}
    <div className="
    mt-10
    flex flex-col sm:flex-row
    justify-center
    gap-6">

      {/* REGISTER */}
      <div className="mt-10 flex flex-col sm:flex-row gap-5">

  {/* REGISTER */}
  <motion.button
    whileHover={{
      scale:1.08,
      boxShadow:"0px 20px 45px rgba(99,102,241,0.35)"
    }}
    whileTap={{ scale:0.95 }}
    onClick={()=>navigate("/register")}
    className="
    px-12 py-4
    rounded-2xl
    text-white font-semibold text-lg
    bg-gradient-to-r
    from-indigo-600 to-purple-600
    shadow-xl"
  >
    Register Now →
  </motion.button>


</div>


      {/* VIEW PROBLEMS */}
      <button
        onClick={() =>
          document
            .getElementById("problems")
            ?.scrollIntoView({ behavior: "smooth" })
        }
        className="
        px-10 py-4
        rounded-xl
        border border-white
        font-semibold
        hover:bg-white hover:text-indigo-600
        transition"
      >
        View Problems
      </button>

    </div>

  </motion.div>

</section>



{/* ================= FOOTER START ================= */}

<footer className="
bg-[#0B1120]
text-gray-300
pt-12
pb-6
px-6
border-t border-gray-700
">

  <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">

    {/* COLLEGE ADDRESS */}
    <div>
      <h3 className="text-xl font-semibold text-white mb-4">
        College Address
      </h3>

      <p className="leading-relaxed text-sm">
        Saranathan College of Engineering<br/>
        Venkateswara Nagar,<br/>
        Trichy–Madurai Main Road (NH 45 B),<br/>
        Edamalapatti Pudur (Post),<br/>
        Panjappur, Tiruchirappalli – 620012
      </p>
    </div>

    {/* STUDENT COORDINATORS */}
    <div>
      <h3 className="text-xl font-semibold text-white mb-4">
        Student Coordinators
      </h3>

      <p className="text-sm mb-3">
        Name: Viswanath E<br/>
        Phone: +91 83000 81141
      </p>

      <p className="text-sm mb-3">
        Name: Joel Mesina G A<br/>
        Phone: +91 97888 30593
      </p>
    </div>

    {/* SUPPORT */}
    <div>
      <h3 className="text-xl font-semibold text-white mb-4">
        Support
      </h3>

      <p className="text-sm">
        For queries & assistance:
      </p>

      <p className="mt-2 text-indigo-400 font-medium">
        it264061@saranathan.ac.in
      </p>
    </div>

  </div>

  {/* COPYRIGHT */}
  <div className="text-center text-sm text-gray-500 mt-10 border-t border-gray-700 pt-4">
    © {new Date().getFullYear()} Protothon 2026 |
    Saranathan College of Engineering
  </div>

</footer>

{/* ================= FOOTER END ================= */}

    </>
  );
}
    
