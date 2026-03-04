import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";

export default function SelectedTeams() {

  const [teams, setTeams] = useState([]);

  useEffect(() => {
    fetchSelected();
  }, []);

  const fetchSelected = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/teams`
    );

    const selected =
      res.data.filter(
        team => team.status === "selected"
      );

    setTeams(selected);
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-black text-white p-20">

        <h1 className="text-4xl text-yellow-500 mb-8">
          Selected Teams
        </h1>

        <table className="w-full border border-gray-700">

          <thead>
            <tr className="bg-gray-900">
              <th className="p-3">Team Name</th>
              <th className="p-3">Leader</th>
              <th className="p-3">Department</th>
              <th className="p-3">Year</th>
            </tr>
          </thead>

          <tbody>
            {teams.map(team => (
              <tr key={team._id}
                className="text-center border-t border-gray-700">

                <td className="p-3">
                  {team.teamName}
                </td>

                <td>{team.leaderName}</td>
                <td>{team.department}</td>
                <td>{team.year}</td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>
    </>
  );
}