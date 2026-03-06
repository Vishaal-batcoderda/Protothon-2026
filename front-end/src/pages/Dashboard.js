import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function Dashboard() {

  const navigate = useNavigate();

  const [teams, setTeams] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedAbstract, setSelectedAbstract] = useState(null);
  const [domainFilter, setDomainFilter] = useState("all");

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/staff-login");
      return;
    }

    fetchTeams();

  }, [navigate]);


  const fetchTeams = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/team/teams`
      );
      setTeams(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const updateStatus = async (id, status) => {
    await axios.put(
      `${process.env.REACT_APP_API_URL}/api/team/status/${id}`,
      { status }
    );
    fetchTeams();
  };

  const filteredTeams = teams.filter(team => {

  const matchSearch =
    team.teamName
      .toLowerCase()
      .includes(search.toLowerCase());

  const matchFilter =
    filter === "all" ||
    team.status === filter;

 const matchDomain =
  domainFilter === "all" ||
  team.domain === domainFilter;

  return matchSearch && matchFilter && matchDomain;

});

  return (
    <>
      <Navbar />

      <div className="min-h-screen pt-28 px-10 bg-white">

        {/* HEADER */}
        <div className="
        flex flex-col md:flex-row
        justify-between items-center
        mb-10 gap-4">

          <h1 className="text-4xl font-bold text-black">
            Staff Dashboard
          </h1>

          <button
            onClick={()=>{
              localStorage.removeItem("token");
              navigate("/staff-login");
            }}
            className="
            px-5 py-2 rounded-lg
            bg-red-500 text-white
            hover:opacity-90 transition">
            Logout
          </button>

        </div>


        {/* SEARCH + FILTER */}
        <div className="
bg-gray-100
rounded-xl
p-6 mb-8
flex flex-wrap gap-4 items-center">

  <input
    placeholder="Search Team..."
    value={search}
    onChange={(e)=>setSearch(e.target.value)}
    className="
    p-3 rounded-lg
    border border-gray-300
    bg-white"
  />

  {/* STATUS FILTER */}
  <select
    value={filter}
    onChange={(e)=>setFilter(e.target.value)}
    className="
    p-3 rounded-lg
    border border-gray-300
    bg-white"
  >
    <option value="all">All Status</option>
    <option value="Selected">Selected</option>
    <option value="Rejected">Rejected</option>
    <option value="Pending">Pending</option>
  </select>

  {/* DOMAIN FILTER */}
  <select
    value={domainFilter}
    onChange={(e)=>setDomainFilter(e.target.value)}
    className="
    p-3 rounded-lg
    border border-gray-300
    bg-white"
  >
    <option value="all">All Domains</option>
    <option value="all">All Domains</option>

<option value="Artificial Intelligence & Data Intelligence">
Artificial Intelligence & Data Intelligence
</option>

<option value="Multipurpose Digital Infrastructure Systems">
Multipurpose Digital Infrastructure Systems
</option>

<option value="Agriculture, FoodTech and Rural Development">
Agriculture, FoodTech and Rural Development
</option>

<option value="Digital Platforms and Social Innovation">
Digital Platforms and Social Innovation
</option>

<option value="Industry & Business Solutions">
Industry & Business Solutions
</option>
  </select>

  <a
    href={`${process.env.REACT_APP_API_URL}/api/team/export`}
    className="
    px-4 py-3 rounded-lg
    bg-green-600 text-white">
    Export Excel
  </a>

</div>


        {/* TABLE */}
        <motion.div
          initial={{ opacity:0, y:30 }}
          animate={{ opacity:1, y:0 }}
          className="
          bg-white
          rounded-xl
          shadow-md
          overflow-x-auto">

          <table className="w-full text-center">

            <thead className="bg-gray-200">
              <tr>
                <th className="p-4">Team</th>
                <th>Problem Title</th>
                <th>Abstract</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {filteredTeams.map(team => (

                <tr
                  key={team._id}
                  className="border-t hover:bg-gray-50"
                >

                  <td className="p-4 font-semibold">
                    {team.teamName}
                  </td>

                  <td className="max-w-xs truncate">
  {team.problemTitle || team.problemStatement}
</td>

                  <td>
                    <button
                      onClick={()=>setSelectedAbstract(team)}
                      className="
                      px-3 py-1
                      bg-black
                      text-white
                      rounded">
                      View
                    </button>
                  </td>

                  <td>
                    <span className={`
                      px-3 py-1 rounded-full text-white
                      ${team.status==="Selected" && "bg-green-500"}
                      ${team.status==="Rejected" && "bg-red-500"}
                      ${team.status==="Pending" && "bg-yellow-500"}
                    `}>
                      {team.status}
                    </span>
                  </td>

                  <td className="space-x-2">

                    <button
                      onClick={()=>updateStatus(team._id,"Selected")}
                      className="
                      px-3 py-1
                      bg-green-500
                      text-white
                      rounded">
                      Select
                    </button>

                    <button
                      onClick={()=>updateStatus(team._id,"Rejected")}
                      className="
                      px-3 py-1
                      bg-red-500
                      text-white
                      rounded">
                      Reject
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </motion.div>


        {/* ABSTRACT POPUP */}
        <AnimatePresence>

        {selectedAbstract && (

          <motion.div
            initial={{ opacity:0 }}
            animate={{ opacity:1 }}
            exit={{ opacity:0 }}
            className="
            fixed inset-0
            bg-black/40
            flex justify-center items-center
            z-50 px-4">

            <motion.div
              initial={{ scale:0.8 }}
              animate={{ scale:1 }}
              exit={{ scale:0.8 }}
              className="
              bg-white
              rounded-xl
              shadow-xl
              max-w-3xl w-full
              max-h-[80vh]
              overflow-y-auto
              p-8 relative">

              <button
                onClick={()=>setSelectedAbstract(null)}
                className="
                absolute top-4 right-5
                text-xl font-bold">
                ✕
              </button>

              <h2 className="
              text-2xl font-bold
              mb-4">
                {selectedAbstract.teamName}
              </h2>

              <p className="
              text-gray-700
              leading-relaxed
              whitespace-pre-line
              text-justify">
                {selectedAbstract.abstract}
              </p>

            </motion.div>

          </motion.div>

        )}

        </AnimatePresence>

      </div>
    </>
  );
}

export default Dashboard;
