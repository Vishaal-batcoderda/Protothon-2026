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
    <div className="overflow-x-hidden">
      <ScrollProgress />
      <Navbar />

{/* ================= HERO ================= */}
<section
id="home"
className="
min-h-[calc(100vh-70px)]
flex items-center
overflow-x-hidden
px-6 pt-24
bg-gradient-to-br
from-white
via-gray-100
to-gray-200
"
>

<ParticlesBackground className="absolute inset-0 overflow-hidden"/>

<div
className="pointer-events-none absolute inset-0 opacity-[0.04]"
style={{
backgroundImage:
"url('https://grainy-gradients.vercel.app/noise.svg')"
}}
/>

<div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center gap-10 overflow-hidden">

{/* IMAGE */}
<motion.div
initial={{ opacity:0, x:-80 }}
animate={{ opacity:1, x:0 }}
transition={{ duration:1 }}
className="md:w-1/2 flex justify-center"
>

<motion.img
src={protothon}
alt="Protothon"
className="w-[240px] sm:w-[280px] md:w-[520px] max-w-full"
animate={{
y:[0,-14,0],
rotate:[0,1.5,0,-1.5,0]
}}
transition={{
duration:7,
repeat:Infinity,
ease:"easeInOut"
}}
/>

</motion.div>

{/* CONTENT */}
<motion.div
initial={{ opacity:0, x:80 }}
animate={{ opacity:1, x:0 }}
transition={{ duration:1 }}
className="md:w-1/2 text-center md:text-left"
>

{/* BADGE */}
{/* COLLEGE NAME */}
<h2 className="
text-2xl md:text-3xl
font-bold
text-gray-900
mb-2
text-center md:text-left
">
Saranathan College of Engineering
</h2>

{/* BADGE */}
<div className="flex justify-center md:justify-start mb-4">

<span
className="
px-4 py-1
rounded-full
text-sm
font-medium
bg-white
border border-gray-300
text-gray-800
shadow-sm">

Department of Information Technology

</span>

</div>

{/* TITLE */}
<motion.h1
className="
text-5xl md:text-7xl
font-extrabold
tracking-tight
text-black
">
Protothon 2026
</motion.h1>

<p className="mt-6 text-gray-600 text-lg md:text-xl">
Innovate • Build • Transform Ideas Into Reality
</p>

{/* COUNTDOWN */}
<motion.div
initial={{ opacity:0, scale:0.9 }}
animate={{ opacity:1, scale:1 }}
transition={{ delay:0.4 }}
className="mt-8 w-full flex justify-center md:justify-start"
>

<div className="w-full max-w-md">
<Countdown />
</div>

</motion.div>

{/* CTA BUTTONS */}
<div className="mt-4 flex flex-wrap gap-5 justify-center md:justify-start">

<motion.button
whileHover={{
scale:1.08,
boxShadow:"0px 20px 45px rgba(0,0,0,0.25)"
}}
whileTap={{ scale:0.95 }}
onClick={()=>navigate("/register")}
className="
px-12 py-4
my-8
rounded-2xl
text-white
font-semibold
text-lg
bg-black
shadow-xl
transition-all"
>
Register Now →
</motion.button>

<button
onClick={() =>
document
.getElementById("problems")
?.scrollIntoView({ behavior:"smooth" })
}
className="
px-10 py-4
my-8
rounded-xl
border border-gray-400
hover:bg-gray-100
transition"
>
View Problems
</button>

</div>

</motion.div>

</div>

</section>

{/* ================= HOW IT WORKS ================= */}

<section
id="about"
ref={timelineRef}
className="relative py-32 bg-gray-100 px-6"
>

<motion.div
style={{ scaleY: scrollYProgress }}
className="
hidden md:block
absolute left-1/2 top-60
-translate-x-1/2
w-[3px]
h-[calc(81%-220px)]
bg-black
origin-top"
/>

<Reveal>
<h2 className="text-center text-5xl font-bold mb-24">
How It Works
</h2>
</Reveal>

{steps.map((step, index) => (

<div
key={index}
className={`
relative max-w-7xl mx-auto
flex flex-col md:flex-row
items-center gap-16 mb-32
${index % 2 ? "md:flex-row-reverse" : ""}
`}
>

<div className="hidden md:flex absolute left-1/2 -translate-x-1/2">

<motion.div
initial={{ scale: 0 }}
whileInView={{ scale: 1 }}
viewport={{ once: true }}
transition={{ duration: 0.5 }}
className="
w-6 h-6 rounded-full
bg-black
border-4 border-white
shadow-lg"
/>

</div>

<motion.img
src={step.image}
alt=""
className="md:w-1/2 w-full  max-w-[320px]"
initial={{ opacity: 0, x: 120 }}
whileInView={{ opacity: 1, x: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.8 }}
whileHover={{ scale: 1.05 }}
/>

<motion.div
className="md:w-1/2 text-center md:text-left"
initial={{ opacity: 0, x: -120 }}
whileInView={{ opacity: 1, x: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.8, delay: 0.2 }}
>

<h3 className="text-3xl md:text-4xl font-semibold mb-4">
{index + 1}. {step.title}
</h3>

<p className="text-gray-600 text-lg">
{step.desc}
</p>

</motion.div>

</div>

))}

</section>

{/* ================= TIMELINE ================= */}

<section
id="timeline"
className="py-32 bg-white px-6"
>

<h2 className="text-center text-5xl font-bold mb-24">
Event Timeline
</h2>

<div className="relative max-w-6xl mx-auto">

<div className="
hidden md:block
absolute left-1/2 top-0
-translate-x-1/2
h-full w-[3px]
bg-black
opacity-60"
/>

{[
{ title:"Registration Opens", date:"March 10" },
{ title:"Registration Closes", date:"March 18" },
{ title:"Shortlisting Announcement", date:"Date will be announced soon" },
{ title:"Final Presentation", date:"April 1" },
].map((event,index)=>{

const isLeft = index % 2 === 0;

return(

<motion.div
key={index}
initial={{ opacity: 0, x: isLeft ? "-80" : "80" }}
whileInView={{opacity:1,x:0}}
viewport={{once:true}}
transition={{duration:0.8}}
className={`relative flex items-center mb-28 ${isLeft ? "md:justify-start" : "md:justify-end"} justify-center`}
>

<div className="hidden md:flex absolute left-1/2 -translate-x-1/2">

<div className="
w-6 h-6 rounded-full
bg-black
shadow-lg
"/>

</div>

<motion.div
whileHover={{scale:1.05,y:-8}}
className="
w-full md:w-[42%]
bg-white
border border-gray-200
p-7
rounded-2xl
shadow-xl
"
>

<h3 className="text-xl font-semibold text-black">
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

<Reveal>
<ProblemStatements />
</Reveal>

{/* ================= RULES ================= */}

<section id="rules" className="py-36 bg-gray-100 px-6">

<h2 className="text-center text-5xl font-bold mb-24">
Rules & Guidelines
</h2>

<div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-12">

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
desc: "Idea abstract submission must contains within 300 words"
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
whileHover={{y:-10,scale:1.05}}
className="bg-white rounded-3xl p-8 text-center shadow-lg border border-black"
>

<div className="text-5xl mb-5">
{rule.icon}
</div>

<h3 className="text-xl font-semibold text-black mb-3">
{rule.title}
</h3>

<p className="text-gray-600">
{rule.desc}
</p>

</motion.div>

))}

</div>

</section>

{/* ================= FAQ ================= */}

<section
className="
py-32
bg-white
px-6
">

<h2 className="
text-center
text-4xl md:text-5xl
font-bold
mb-16
">
Still Have Questions?
</h2>

<div className="max-w-3xl mx-auto space-y-6">

{[
{
q: "Who can participate?",
a: "Students from the Department of Information Technology can participate in Protothon 2026."
},
{
q: "What happens in Round 1?",
a: "Teams must submit an abstract of their idea within 300 words."
},
{
q: "What happens in Round 2?",
a: "An 8-hour hackathon where teams will try to build a working prototype. It is better to prepare and build some parts before coming to the hackathon."
},
{
q: "What technologies can we use?",
a: "You are free to use any programming language, framework, or tool to build your prototype."
}
].map((faq,index)=>(

<details
key={index}
className="
border
border-gray-300
rounded-xl
p-6
cursor-pointer
hover:shadow-md
transition"
>

<summary className="
font-semibold
text-lg
cursor-pointer
flex
justify-between
items-center
">

{faq.q}

<span className="text-xl">
+
</span>

</summary>

<p className="mt-4 text-gray-600 leading-relaxed">
{faq.a}
</p>

</details>

))}

</div>

</section>

{/* ================= CTA ================= */}

<section className="py-32 bg-black text-white text-center">

<h2 className="text-5xl font-bold">
Ready to Build the Future?
</h2>

<p className="mt-6 text-lg text-gray-300">
Transform your ideas into impactful solutions at Protothon 2026.
</p>

<div className="mt-16 flex justify-center gap-6">

<button
onClick={()=>navigate("/register")}
className="px-12 py-4 rounded-2xl bg-white text-black font-semibold"
>
Register Now →
</button>

</div>

</section>

{/* ================= FOOTER ================= */}

<footer className="bg-black text-gray-400 pt-8 pb-6 px-6">

<div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">

<div>
<h3 className="text-xl font-semibold text-white mb-4">
College Address
</h3>

<p className="text-sm leading-relaxed">
Saranathan College of Engineering<br/>
Tiruchirappalli – 620012
</p>
</div>

<div>
<h3 className="text-xl font-semibold text-white mb-4">
Student Coordinators
</h3>

<p className="text-sm mb-3">
Viswanath E — +91 8300081141
</p>

<p className="text-sm mb-3">
Joel Mesina G A — +91 97888 30593
</p>

</div>

<div>
<h3 className="text-xl font-semibold text-white mb-4">
Support
</h3>

<p className="text-sm">
it264061@saranathan.ac.in
</p>
</div>

</div>

<div className="text-center text-sm text-gray-500 mt-10 border-t border-gray-800 pt-4">
© {new Date().getFullYear()} Protothon 2026 | Saranathan College of Engineering
</div>

</footer>

    </div>
  );
}
