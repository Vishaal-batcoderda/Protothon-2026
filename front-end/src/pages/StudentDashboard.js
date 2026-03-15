import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../assets/logo.png";

export default function StudentDashboard() {

const [team, setTeam] = useState(null);
const [editing, setEditing] = useState(false);
const [newAbstract, setNewAbstract] = useState("");

const navigate = useNavigate();

const logout = () => {
localStorage.removeItem("teamToken");
navigate("/student/login");
};

const deadline = new Date("2026-03-18T23:59:59+05:30");
const isEditable = new Date() <= deadline;

/* ================= FETCH TEAM ================= */

useEffect(() => {


const token = localStorage.getItem("teamToken");

if (!token) {
  navigate("/student/login");
  return;
}

axios.get(
  `${process.env.REACT_APP_API_URL}/api/team/dashboard`,
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
)
.then(res => {
  setTeam(res.data);
  setNewAbstract(res.data.abstract || "");
})
.catch(() => {
  localStorage.removeItem("teamToken");
  navigate("/student/login");
});


}, [navigate]);

/* ================= UPDATE ABSTRACT ================= */

const updateAbstract = async () => {

  try {

    const token = localStorage.getItem("teamToken");

    const res = await axios.put(
      `${process.env.REACT_APP_API_URL}/api/team/update-abstract`,
      {
        abstract: newAbstract
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    setTeam(res.data); // update UI with backend response

    setEditing(false);

    toast.success("Abstract Updated Successfully ✅");

  } catch (error) {

    console.error("UPDATE ERROR:", error.response?.data || error.message);

    toast.error("Update Failed ❌");

  }

};

if (!team)
return <h1 className="pt-20 text-center">Loading...</h1>;

return (
<>


  {/* HEADER */}

  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center px-4 sm:px-6 py-4 shadow bg-white gap-2">

    <img
      src={logo}
      alt="Protothon Logo"
      className="h-12 sm:h-14 object-contain mx-auto sm:mx-0"
    />

    <div className="text-center sm:text-right font-semibold text-gray-700 text-sm sm:text-base">
      Team ID : {team.teamId} | {team.leader.name} (Logged In)
    </div>

  </div>


  {/* WHATSAPP BOX */}

  <div className="mx-4 sm:mx-6 mt-6 mb-8 p-6 rounded-xl bg-green-50 border border-green-200 flex flex-col md:flex-row items-center justify-between gap-4">

    <div>

      <h3 className="text-lg font-semibold text-green-700">
        Stay Updated!
      </h3>

      <p className="text-gray-600 text-sm">
        Join the Protothon WhatsApp community
        to receive important announcements and updates.
      </p>

    </div>

    <a
      href="https://chat.whatsapp.com/Hw7FG3ofObXEjQeUDao1md"
      target="_blank"
      rel="noopener noreferrer"
      className="px-6 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition"
    >
      Join WhatsApp
    </a>

  </div>


  {/* MAIN CONTAINER */}

  <div className="min-h-screen pt-10 sm:pt-16 px-4 sm:px-6 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">

    <motion.div
      initial={{ opacity:0, y:30 }}
      animate={{ opacity:1, y:0 }}
      className="max-w-5xl mx-auto bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sm:p-10"
    >


      {/* TITLE */}

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">

        <h1 className="text-2xl sm:text-3xl font-bold text-indigo-600">
          Student Dashboard
        </h1>

        <button
          onClick={logout}
          className="px-5 py-2 bg-red-500 text-white rounded-lg hover:scale-105 transition"
        >
          Logout
        </button>

      </div>


      {/* TEAM DETAILS */}

      <div className="overflow-x-auto">

        <table className="w-full border border-gray-300 mb-8 text-sm sm:text-base">

          <tbody>

            <tr className="border">
              <td className="p-3 font-semibold bg-gray-100">Team Name</td>
              <td className="p-3">{team?.teamName}</td>
            </tr>

            <tr className="border">
              <td className="p-3 font-semibold bg-gray-100">Leader</td>
              <td className="p-3">
                {team.leader.name} ({team.leader.regNo})
                <br />
                <span className="text-sm text-gray-500">
                  {team.leader.email}
                </span>
              </td>
            </tr>

            <tr className="border">
              <td className="p-3 font-semibold bg-gray-100">Department</td>
              <td className="p-3">{team.department}</td>
            </tr>

            <tr className="border">
              <td className="p-3 font-semibold bg-gray-100">Year</td>
              <td className="p-3">{team.year}</td>
            </tr>

            <tr className="border">
              <td className="p-3 font-semibold bg-gray-100">Status</td>
              <td className="p-3">Pending</td>
            </tr>

          </tbody>

        </table>

      </div>


      {/* TEAM MEMBERS */}

      <h2 className="text-xl font-semibold mb-4">
        Team Members
      </h2>

      <div className="w-full overflow-x-auto">

        <table className="min-w-[600px] w-full border border-gray-300 mb-8 text-sm sm:text-base">

          <thead className="bg-indigo-600 text-white">

            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-center">Register No</th>
              <th className="p-3 text-left">Email</th>
            </tr>

          </thead>

          <tbody>

            {team.members.map((member, index) => (

              <tr key={index} className="border hover:bg-indigo-50">

                <td className="p-3 whitespace-nowrap">
                  {member.name}
                </td>

                <td className="p-3 text-center whitespace-nowrap">
                  {member.regNo}
                </td>

                <td className="p-3 break-all">
                  {member.email}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>


      {/* DOMAIN */}

      <div className="mb-8">

        <h2 className="text-xl font-semibold mb-2">
          Domain
        </h2>

        <p className="text-gray-700">
          {team.domain}
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          Problem Statement
        </h2>

        <p className="text-gray-700">
          {team.problemTitle}
        </p>

      </div>


      {/* ABSTRACT */}

      <div>

        <h2 className="text-xl font-semibold mb-3">
          Project Abstract
        </h2>

        {editing ? (
          <>
            <textarea
              value={newAbstract}
              onChange={(e)=>setNewAbstract(e.target.value)}
              className="w-full h-40 p-3 border rounded-xl"
              maxLength={500}
            />

            <div className="mt-4 flex gap-3 flex-wrap">

              <button
                onClick={updateAbstract}
                className="px-5 py-2 bg-green-600 text-white rounded-lg"
              >
                Save
              </button>

              <button
                onClick={()=>setEditing(false)}
                className="px-5 py-2 bg-gray-400 text-white rounded-lg"
              >
                Cancel
              </button>

            </div>
          </>
        ) : (
          <>
            <p className="text-gray-700 whitespace-pre-line">
              {team.abstract}
            </p>

            {isEditable ? (

              <button
                onClick={()=>setEditing(true)}
                className="mt-4 px-5 py-2 bg-indigo-600 text-white rounded-lg"
              >
                Edit Abstract
              </button>

            ) : (

              <div className="mt-4 p-3 bg-yellow-100 border rounded-lg">
                🔒 Editing closed after March 18
              </div>

            )}

          </>
        )}

      </div>

    </motion.div>

  </div>

</>


);
}
