import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";

import ParticipantForm from "./components/ParticipantForm";
import ParticipantList from "./components/ParticipantList";
import ParticipantPage from "./pages/ParticipantPage";
import EventPage from "./pages/EventPage"; // ✅ FIXED
import { getParticipants } from "./services/participantService";

/* 🧩 KPI CARD COMPONENT */
function KpiCard({ title, value, color }) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-5">
      <p className="text-gray-500 text-sm">{title}</p>
      <p className={`text-3xl font-bold mt-2 ${color}`}>
        {value}
      </p>
    </div>
  );
}

/* 📊 DASHBOARD PAGE */
function Dashboard({ participants, refresh }) {
  return (
    <>
      {/* KPI CARDS */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6">
        <KpiCard
          title="Total Participants"
          value={participants.length}
          color="text-blue-600"
        />
        <KpiCard title="Active Today" value="8" color="text-green-600" />
        <KpiCard title="Pending" value="3" color="text-yellow-500" />
        <KpiCard title="Completed" value="12" color="text-purple-600" />
      </section>

      {/* FORM + TABLE */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-6 pb-10">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">
            Register Participant
          </h2>
          <ParticipantForm refresh={refresh} />
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">
            Participant List
          </h2>
          <ParticipantList
            participants={participants}
            refresh={refresh}
          />
        </div>
      </section>
    </>
  );
}

/* 🚀 MAIN APP */
function App() {
  const [participants, setParticipants] = useState([]);

  const loadData = async () => {
    const data = await getParticipants();
    setParticipants(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen flex bg-gray-100">

        {/* SIDEBAR */}
        <aside className="w-64 bg-slate-900 text-white flex flex-col">
          <div className="px-6 py-4 text-xl font-bold border-b border-slate-700">
            🎓 Admin Panel
          </div>

          <nav className="flex-1 px-4 py-6 space-y-3 text-sm">
            <Link
              to="/"
              className="block px-4 py-2 rounded hover:bg-slate-800"
            >
              Dashboard
            </Link>

            <Link
              to="/participants"
              className="block px-4 py-2 rounded hover:bg-slate-800"
            >
              Participants
            </Link>

            <Link
              to="/events"
              className="block px-4 py-2 rounded hover:bg-slate-800"
            >
              Events
            </Link>

            <div className="px-4 py-2 rounded opacity-50">
              Reports
            </div>
          </nav>

          <div className="px-6 py-4 border-t border-slate-700 text-sm opacity-80">
            Logged in as Admin
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1">

          {/* TOP BAR */}
          <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
            <h1 className="text-xl font-semibold">
              Event Participant Management
            </h1>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">Admin</span>
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                A
              </div>
            </div>
          </header>

          {/* ROUTES */}
          <Routes>
            <Route
              path="/"
              element={
                <Dashboard
                  participants={participants}
                  refresh={loadData}
                />
              }
            />
            <Route
              path="/participants"
              element={<ParticipantPage />}
            />
            <Route
              path="/events"
              element={<EventPage />}
            />
          </Routes>

        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;