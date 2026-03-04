import { useState } from "react";
import { deleteParticipant, markAttendance } from "../services/participantService";

function ParticipantList({ participants, refresh }) {
  const [search, setSearch] = useState("");

  const filteredParticipants = participants.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase())
  );

  // ✅ Soft delete (Deactivate)
  const handleDeactivate = async (id) => {
    if (confirm("Are you sure you want to deactivate this participant?")) {
      await deleteParticipant(id);
      refresh();
    }
  };

  // ✅ Attendance
  const handleAttendance = async (id) => {
    await markAttendance(id);
    refresh();
  };

  return (
    <div>
      {/* SEARCH BOX */}
      <input
        type="text"
        placeholder="Search by name or email..."
        className="w-full mb-4 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredParticipants.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  No matching participants found
                </td>
              </tr>
            ) : (
              filteredParticipants.map((p) => (
                <tr key={p.id} className="border-t hover:bg-gray-50">
                  <td className="p-3 font-medium">{p.name}</td>
                  <td className="p-3 text-gray-600">{p.email}</td>

                  {/* STATUS */}
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        p.attended
                          ? "bg-blue-100 text-blue-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {p.attended ? "Present" : "Confirmed"}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td className="p-3 text-center space-x-2">
                    <button
                      onClick={() => handleAttendance(p.id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs"
                    >
                      Mark Present
                    </button>

                    <button
                      onClick={() => handleDeactivate(p.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                    >
                      Deactivate
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ParticipantList;