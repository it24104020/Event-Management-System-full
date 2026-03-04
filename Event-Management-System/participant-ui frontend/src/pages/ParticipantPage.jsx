import { useEffect, useState } from "react";
import {
  getParticipants,
  deleteParticipant,
  markAttendance,
} from "../services/participantService";

/* 🔢 KPI CARD */
function StatCard({ title, value, color, icon }) {
  return (
    <div className="flex items-center gap-4 bg-white rounded-xl shadow p-4">
      <div className={`p-3 rounded-full ${color}`}>
        <span className="text-xl">{icon}</span>
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}

/* 🏷 STATUS BADGE */
function StatusBadge({ attended }) {
  return attended ? (
    <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
      Present
    </span>
  ) : (
    <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
      Confirmed
    </span>
  );
}

/* 🚀 PARTICIPANT PAGE */
export default function ParticipantPage() {
  const [participants, setParticipants] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const load = async () => {
    const data = await getParticipants();
    setParticipants(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    load();
  }, []);

  /* 🔍 SEARCH + FILTER */
  const filtered = participants.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase()) ||
      (p.mobileNumber && p.mobileNumber.includes(search));

    if (statusFilter === "ALL") return matchesSearch;
    if (statusFilter === "PRESENT") return matchesSearch && p.attended;
    if (statusFilter === "CONFIRMED") return matchesSearch && !p.attended;

    return matchesSearch;
  });

  /* 📊 STATS */
  const total = participants.length;
  const present = participants.filter((p) => p.attended).length;
  const absent = total - present;

  return (
    <div className="p-6 space-y-6">

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Participants"
          value={total}
          color="bg-blue-100 text-blue-600"
          icon="👥"
        />
        <StatCard
          title="Present"
          value={present}
          color="bg-green-100 text-green-600"
          icon="✅"
        />
        <StatCard
          title="Absent"
          value={absent}
          color="bg-red-100 text-red-600"
          icon="❌"
        />
      </div>

      {/* TABLE CARD */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold mb-4">
          Participant Management
        </h2>

        {/* SEARCH */}
        <input
          className="w-full mb-3 border rounded-lg px-4 py-2"
          placeholder="Search by name, email, or mobile..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* STATUS FILTER */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setStatusFilter("ALL")}
            className={`px-3 py-1 rounded border ${
              statusFilter === "ALL" ? "bg-gray-800 text-white" : ""
            }`}
          >
            All
          </button>

          <button
            onClick={() => setStatusFilter("PRESENT")}
            className={`px-3 py-1 rounded border ${
              statusFilter === "PRESENT" ? "bg-green-600 text-white" : ""
            }`}
          >
            Present
          </button>

          <button
            onClick={() => setStatusFilter("CONFIRMED")}
            className={`px-3 py-1 rounded border ${
              statusFilter === "CONFIRMED" ? "bg-blue-600 text-white" : ""
            }`}
          >
            Confirmed
          </button>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b text-left text-gray-500">
              <tr>
                <th className="py-3">Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-b last:border-0">
                  <td className="py-3 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center">
                      👤
                    </div>
                    <span className="font-medium">{p.name}</span>
                  </td>

                  <td className="text-gray-600">{p.email}</td>
                  <td className="text-gray-600">{p.mobileNumber || "-"}</td>

                  <td>
                    <StatusBadge attended={p.attended} />
                  </td>

                  <td className="text-right space-x-2">
                    <button
                      onClick={() => markAttendance(p.id).then(load)}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs"
                    >
                      Mark Present
                    </button>

                    <button
                      onClick={() => deleteParticipant(p.id).then(load)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                    >
                      Deactivate
                    </button>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan="5" className="py-6 text-center text-gray-400">
                    No participants found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION (UI ONLY) */}
        <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
          Showing {filtered.length} of {total} participants
          <div className="space-x-2">
            <button className="px-3 py-1 border rounded">1</button>
            <button className="px-3 py-1 border rounded">2</button>
            <button className="px-3 py-1 border rounded">3</button>
          </div>
        </div>
      </div>
    </div>
  );
}