import { useState } from "react";

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

/* 🎫 EVENT CARD (COLOR HEADER) */
function EventCard({ title, subtitle, badge, headerColor }) {
  return (
    <div className="rounded-xl shadow overflow-hidden bg-white hover:shadow-lg transition">
      
      {/* HEADER */}
      <div className={`p-4 text-white ${headerColor}`}>
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-sm opacity-90">{subtitle}</p>
      </div>

      {/* BODY */}
      <div className="p-4 flex justify-between items-center">
        <span className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-700">
          {badge}
        </span>
        <button className="text-sm text-blue-600 hover:underline">
          View Details →
        </button>
      </div>

    </div>
  );
}

/* 🚀 EVENTS PAGE */
export default function EventPage() {
  const [stats] = useState({
    total: 6,
    upcoming: 3,
    ongoing: 1,
    completed: 2,
  });

  return (
    <div className="p-6 space-y-8 bg-gray-100 min-h-screen">

      <h1 className="text-2xl font-bold">Events Dashboard</h1>

      {/* KPI PANELS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Events" value={stats.total} color="bg-blue-100 text-blue-600" icon="📅" />
        <StatCard title="Upcoming" value={stats.upcoming} color="bg-yellow-100 text-yellow-600" icon="⏳" />
        <StatCard title="Ongoing" value={stats.ongoing} color="bg-green-100 text-green-600" icon="▶️" />
        <StatCard title="Completed" value={stats.completed} color="bg-gray-200 text-gray-700" icon="✔️" />
      </div>

      {/* EVENT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        <EventCard
          title="Cultural Festival"
          subtitle="Dance • Music • Drama"
          badge="Upcoming"
          headerColor="bg-gradient-to-r from-purple-500 to-pink-500"
        />

        <EventCard
          title="Research Seminar"
          subtitle="Innovation & Technology"
          badge="Upcoming"
          headerColor="bg-gradient-to-r from-blue-500 to-indigo-500"
        />

        <EventCard
          title="Sports Meet"
          subtitle="Cricket • Football • Relay"
          badge="Ongoing"
          headerColor="bg-gradient-to-r from-green-500 to-emerald-500"
        />

        <EventCard
          title="Career Fair"
          subtitle="Company Placements"
          badge="Completed"
          headerColor="bg-gradient-to-r from-gray-500 to-gray-700"
        />

        <EventCard
          title="Hackathon"
          subtitle="24-Hour Coding Event"
          badge="Completed"
          headerColor="bg-gradient-to-r from-slate-600 to-slate-800"
        />

        <EventCard
          title="Workshop"
          subtitle="AI & Machine Learning"
          badge="Upcoming"
          headerColor="bg-gradient-to-r from-yellow-400 to-orange-500"
        />

      </div>
    </div>
  );
}