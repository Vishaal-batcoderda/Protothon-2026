import Navbar from "../components/Navbar";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Register() {

  const navigate = useNavigate();
  const problemRef = useRef(null);
  const abstractRef = useRef(null);

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [teamId, setTeamId] = useState(null);

  useEffect(() => {

  const handleBeforeUnload = (e) => {
    e.preventDefault();
    e.returnValue = "";
  };

  window.addEventListener("beforeunload", handleBeforeUnload);

  return () => {
    window.removeEventListener("beforeunload", handleBeforeUnload);
  };

}, []);

  const domains = [
    {
      name: "Artificial Intelligence & Data Intelligence",
      problems: [
        "Sentiment Analysis of E-Consultation Comments",
        "AI-Based Skill Recommendation Engine",
        "News Category Classification System",
        "Document Classification and Smart Search System"
      ]
    },
    {
      name: "Multipurpose Digital Infrastructure Systems",
      problems: [
        "Unified Digital Identity Platform",
        "Smart Resource Allocation Platform",
        "Multi-Service Request Management",
        "Fake Review Detection System"
      ]
    },
    {
      name: "Agriculture, FoodTech and Rural Development",
      problems: [
        "Supply Chain Traceability Platform",
        "Demand & Supply Matching System",
        "Smart Storage Monitoring",
        "Digital Marketplace Analytics"
      ]
    },
    {
      name: "Digital Platforms and Social Innovation",
      problems: [
        "Community Collaboration Platform",
        "Trust & Reputation System",
        "Knowledge Sharing Platform",
        "Digital Accessibility Assistant"
      ]
    },
    {
      name: "Industry & Business Solutions",
      problems: [
        "Workflow Automation System",
        "Predictive Maintenance Platform",
        "Business Intelligence Dashboard",
        "Customer Retention Prediction"
      ]
    }
  ];

  const [members, setMembers] = useState([
    { name: "", regNo: "", email: "", year: "" }
  ]);

  const [selectedDomain, setSelectedDomain] = useState("");

  const [formData, setFormData] = useState({
    teamName: "",
    leader: {
      name: "",
      regNo: "",
      email: "",
      phone: "",
      year: "",
      password: ""
    },
    department: "Information Technology",
    year: "",
    problemTitle: "",
    abstract: ""
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleDomainChange = (e) => {
    const domain = e.target.value;
    setSelectedDomain(domain);

    setFormData({
      ...formData,
      problemTitle: "",
      abstract: ""
    });

    setTimeout(() => {
      problemRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }, 200);
  };

  const handleProblemChange = (e) => {
    handleChange(e);

    setTimeout(() => {
      abstractRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }, 200);
  };

  const selectedProblems =
    domains.find(d => d.name === selectedDomain)?.problems || [];

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

    const emailRegex = /^it\d+@saranathan\.ac\.in$/i;

  if (!emailRegex.test(formData.leader.email)) {
    toast.error("Email must be in format itXXXXXX@saranathan.ac.in ❌");
    setLoading(false);
    return;
  }

    if (!/^[6-9]\d{9}$/.test(formData.leader.phone)) {
  toast.error("Enter a valid 10 digit phone number ❌");
  setLoading(false);
  return;
}

    if (
  !formData.teamName ||
  !formData.leader.name ||
  !formData.leader.email ||
  !formData.leader.password ||
  !selectedDomain ||
  !formData.problemTitle ||
  !formData.abstract
) {
  toast.error("Please fill all required fields ❌");
  setLoading(false);
  return;
}

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/team/register`,
      {
        teamName: formData.teamName,
        leader: formData.leader,
        members,
        department: formData.department,
        year: formData.leader.year,
        domain: selectedDomain,
        problemTitle: formData.problemTitle,
        abstract: formData.abstract
      }
    );

    const generatedId = res.data.teamId;

    setTeamId(generatedId);

    const loginRes = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/team/login`,
      {
        email: formData.leader.email,
        password: formData.leader.password
      }
    );

    localStorage.setItem("teamToken", loginRes.data.token);

    toast.success("Registration Successful ✅");

    setLoading(false);

    // 3 sec apram dashboard ku pogum
    setTimeout(() => {
      navigate("/student/dashboard");
    }, 3000);

  } catch (err) {

    setLoading(false);

    toast.error(
      err.response?.data?.message || "Registration failed ❌"
    );

  }
};

  const addMember = () =>
    members.length < 3 &&
    setMembers([
      ...members,
      { name: "", regNo: "", email: "", year: "" }
    ]);

  const removeMember = (index) =>
    setMembers(members.filter((_, i) => i !== index));

  const wordCount =
    formData.abstract.trim() === ""
      ? 0
      : formData.abstract.trim().split(/\s+/).length;

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex justify-center items-center pt-28 px-4 bg-white">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl p-10"
        >

          <h2 className="text-4xl font-bold text-center text-black mb-10">
            Protothon 2026 Registration
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">

            <Input name="teamName" placeholder="Team Name" onChange={handleChange} />

            {/* Leader */}

            <Input
              placeholder="Leader Name"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  leader: { ...formData.leader, name: e.target.value }
                })
              }
            />

            <Input
              placeholder="Register Number"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  leader: { ...formData.leader, regNo: e.target.value }
                })
              }
            />

            <Input
              type="email"
              placeholder="Email"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  leader: { ...formData.leader, email: e.target.value }
                })
              }
            />

            <Input
              placeholder="Phone Number"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  leader: { ...formData.leader, phone: e.target.value }
                })
              }
            />

            <select
  className="w-full p-3 border rounded-xl"
  onChange={(e) =>
    setFormData({
      ...formData,
      leader: { ...formData.leader, year: e.target.value }
    })
  }
>
  <option value="">Year</option>
  <option value="2">2nd Year</option>
  <option value="3">3rd Year</option>
</select>

            <div className="relative">

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create Password"
                required
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    leader: { ...formData.leader, password: e.target.value }
                  })
                }
                className="w-full p-3 pr-12 rounded-xl border"
              />

              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>

            </div>

            {/* Members */}

            <h3 className="font-semibold">Team Members</h3>

            {members.map((member, index) => (
              <div key={index} className="space-y-2">

                <input
  placeholder="Name"
  className="w-full p-3 border rounded-xl"
  onChange={(e) => {
    const updated = [...members];
    updated[index].name = e.target.value;
    setMembers(updated);
  }}
/>

<input
  placeholder="Reg No"
  className="w-full p-3 border rounded-xl"
  onChange={(e) => {
    const updated = [...members];
    updated[index].regNo = e.target.value;
    setMembers(updated);
  }}
/>

<input
  placeholder="Email"
  className="w-full p-3 border rounded-xl"
  onChange={(e) => {
    const updated = [...members];
    updated[index].email = e.target.value;
    setMembers(updated);
  }}
/>

<select
  className="w-full p-3 border rounded-xl"
  onChange={(e) => {
    const updated = [...members];
    updated[index].year = e.target.value;
    setMembers(updated);
  }}
>
  <option value="">Select Year</option>
  <option value="2">2nd Year</option>
  <option value="3">3rd Year</option>
</select>

                {members.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeMember(index)}
                    className="text-red-500"
                  >
                    Remove Member
                  </button>
                )}

              </div>
            ))}

            {members.length < 3 && (
              <button type="button" onClick={addMember}>
                + Add Member
              </button>
            )}

            {/* Domain */}

            <div className="w-full">
  <select
    value={selectedDomain}
    onChange={handleDomainChange}
    className="
      w-full
      p-3
      sm:p-3
      text-sm
      sm:text-base
      border
      rounded-xl
      focus:outline-none
      focus:ring-2
      focus:ring-black
    "
    required
  >
    <option value="">Select Domain</option>

    {domains.map((d, i) => (
      <option key={i} value={d.name}>
        {d.name}
      </option>
    ))}

  </select>
</div>

            {/* Problem */}

            {selectedDomain && (
              <div ref={problemRef} className="w-full">

  <select
    name="problemTitle"
    onChange={handleProblemChange}
    className="
      w-full
      p-3
      text-sm
      sm:text-base
      border
      rounded-xl
      focus:outline-none
      focus:ring-2
      focus:ring-black
    "
    required
  >

    <option value="">Select Problem</option>

    {selectedProblems.map((p, i) => (
      <option key={i} value={p}>
        {p}
      </option>
    ))}

  </select>

</div>
            )}

            {/* Abstract */}

            {formData.problemTitle && (
              <div ref={abstractRef}>

                <textarea
                  name="abstract"
                  placeholder="Project Abstract (Max 300 words)"
                  value={formData.abstract}
                  onChange={(e) => {

                    const text = e.target.value;

                    const count =
                      text.trim().split(/\s+/).length;

                    if (count <= 300) {

                      setFormData({
                        ...formData,
                        abstract: text
                      });

                    } else {

                      toast.error(
                        "Abstract cannot exceed 300 words ❌"
                      );

                    }

                  }}
                  className="w-full h-40 border p-3 rounded-xl"
                  required
                />

                <p className="text-sm text-gray-500 mt-1">
                  {wordCount} / 300 words
                </p>

              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="bg-black text-white py-3 rounded-xl"
            >
              {loading ? "Registering..." : "Submit Registration"}
            </button>

          </form>

          {teamId && (

<div className="
mt-6
p-6
bg-green-50
border
border-green-300
rounded-xl
text-center">

<h3 className="text-lg font-semibold text-green-700">
Team ID Generated Successfully 🎉
</h3>

<p className="mt-2 text-gray-600">
Your Team ID
</p>

<p className="text-3xl font-bold text-green-600 mt-2">
{teamId}
</p>

<p className="text-sm text-gray-500 mt-3">
Redirecting to dashboard...
</p>

</div>

)}

        </motion.div>

      </div>

      <ToastContainer position="top-center" />

    </>
  );
}

function Input({ name, type = "text", placeholder, onChange }) {

  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      required
      className="w-full p-3 rounded-xl border"
    />
  );

}

export default Register;
