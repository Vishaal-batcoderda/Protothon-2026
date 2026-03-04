import Navbar from "../components/Navbar";
import { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

function Register() {

  const navigate = useNavigate();
  const problemRef = useRef(null);
  const abstractRef = useRef(null);

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
    { name: "", regNo: "", email: "" }
  ]);

  const [selectedDomain, setSelectedDomain] = useState("");

  const [formData, setFormData] = useState({
    teamName: "",
    leader: {
      name: "",
      regNo: "",
      email: "",
      phone: "",
      password: ""
    },
    department: "",
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

    try {

      /* REGISTER */
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/team/register`,
        {
          teamName: formData.teamName,
          leader: formData.leader,
          members,
          department: formData.department,
          year: formData.year,
          domain: selectedDomain,
          problemTitle: formData.problemTitle,
          abstract: formData.abstract
        }
      );

      /* AUTO LOGIN */
      const loginRes = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/team/login`,
        {
          email: formData.leader.email,
          password: formData.leader.password
        }
      );

      localStorage.setItem(
        "teamToken",
        loginRes.data.token
      );

      navigate("/student/dashboard");

    } catch (err) {
  console.log("FRONTEND ERROR:", err.response?.data);
  toast.error(err.response?.data?.message || "Registration failed ❌");
}
  };

  const addMember = () =>
    members.length < 3 &&
    setMembers([
      ...members,
      { name: "", regNo: "", email: "" }
    ]);

  const removeMember = (index) =>
    setMembers(members.filter((_, i) => i !== index));

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex justify-center items-center pt-28 px-4 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-4xl bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-10"
        >

          <h2 className="text-4xl font-bold text-center text-indigo-600 mb-10">
            Ideathon 2026 Registration
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">

            <Input name="teamName" placeholder="Team Name" onChange={handleChange} />

            <Input placeholder="Team Leader Name"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  leader: { ...formData.leader, name: e.target.value }
                })
              }
            />

            <Input placeholder="Leader Register Number"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  leader: { ...formData.leader, regNo: e.target.value }
                })
              }
            />

            <Input type="email" placeholder="Leader Email"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  leader: { ...formData.leader, email: e.target.value }
                })
              }
            />

            <Input placeholder="Leader Phone Number"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  leader: { ...formData.leader, phone: e.target.value }
                })
              }
            />

            <Input type="password" placeholder="Create Password"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  leader: { ...formData.leader, password: e.target.value }
                })
              }
            />

            <div>
              <h3 className="font-semibold mb-3">Team Members</h3>

              {members.map((member, index) => (
                <div key={index} className="space-y-2 mb-6">

                  <input
                    placeholder={`Member ${index + 1} Name`}
                    className="w-full p-3 rounded-xl border"
                    onChange={(e) => {
                      const updated = [...members];
                      updated[index].name = e.target.value;
                      setMembers(updated);
                    }}
                    required
                  />

                  <input
                    placeholder={`Member ${index + 1} Reg No`}
                    className="w-full p-3 rounded-xl border"
                    onChange={(e) => {
                      const updated = [...members];
                      updated[index].regNo = e.target.value;
                      setMembers(updated);
                    }}
                    required
                  />

                  <input
                    type="email"
                    placeholder={`Member ${index + 1} Email`}
                    className="w-full p-3 rounded-xl border"
                    onChange={(e) => {
                      const updated = [...members];
                      updated[index].email = e.target.value;
                      setMembers(updated);
                    }}
                    required
                  />

                  {members.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeMember(index)}
                      className="w-11 h-11 bg-red-100 rounded-xl">
                      ❌
                    </button>
                  )}

                </div>
              ))}

              {members.length < 4 && (
                <button type="button" onClick={addMember} className="text-indigo-600">
                  + Add Member
                </button>
              )}
            </div>

            <Input name="department" placeholder="Department" onChange={handleChange} />

            <select name="year" onChange={handleChange} required className="p-3 rounded-xl border">
              <option value="">Select Year</option>
              <option>2nd Year</option>
              <option>3rd Year</option>
            </select>

            <select value={selectedDomain} onChange={handleDomainChange} required className="p-3 rounded-xl border">
              <option value="">Select Domain</option>
              {domains.map((d, i) => (
                <option key={i}>{d.name}</option>
              ))}
            </select>

            {selectedDomain && (
              <div ref={problemRef}>
                <select name="problemTitle" onChange={handleProblemChange} required className="p-3 rounded-xl border">
                  <option>Select Problem</option>
                  {selectedProblems.map((p, i) => (
                    <option key={i}>{p}</option>
                  ))}
                </select>
              </div>
            )}

            {formData.problemTitle && (
              <div ref={abstractRef}>
                <textarea
                  name="abstract"
                  placeholder="Project Abstract"
                  onChange={handleChange}
                  required
                  className="w-full h-40 p-3 rounded-xl border"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold">
              Submit Registration →
            </button>

          </form>

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
      className="w-full p-3 rounded-xl border border-gray-300"
    />
  );
}

export default Register;