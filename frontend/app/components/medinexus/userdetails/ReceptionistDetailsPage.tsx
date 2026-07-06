"use client";

import {
  User,
  Phone,
  ClipboardList,
  Calendar,
  Activity,
  Clock,
  BadgeCheck,
  Users,
  Stethoscope,
  MessageSquare,
} from "lucide-react";

const stats = [
  {
    label: "Patients Registered",
    value: 1580,
    icon: Users,
    color: "bg-[#14967f]",
  },
  {
    label: "Check-ins Today",
    value: 64,
    icon: BadgeCheck,
    color: "bg-[#3b82f6]",
  },
  {
    label: "Avg Response Time",
    value: "2.4 min",
    icon: Clock,
    color: "bg-[#f59e0b]",
  },
];

const StatCard = ({ label, value, icon: Icon, color }:{ label:any, value:any, icon:any, color:any }) => {
  return (
    <div
      className={`flex flex-col gap-3 text-white rounded-xl p-6 shadow-md hover:scale-[1.02] transition ${color}`}
    >
      <Icon size={26} />
      <span className="text-sm opacity-90">{label}</span>
      <span className="text-xl font-semibold">{value}</span>
    </div>
  );
};

export default function ReceptionistDetailsPage() {
  return (
    <div className="flex flex-col gap-4 p-4">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Receptionist Details</h1>
        <span className="text-gray-500">
          Monitor front desk performance and patient flow management
        </span>
      </div>

      <div className="bg-white px-5 py-10 rounded-md space-y-8">

        {/* Banner */}
        <div className="h-28 w-full rounded-md bg-gradient-to-r from-[#14967f] via-[#16b78a] to-[#f5e97b]" />

        {/* Top Section */}
        <div className="flex flex-col lg:flex-row gap-8 lg:items-center">

          {/* Profile Image */}
          <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=400"
              alt="receptionist"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Info */}
          <div className="flex flex-col gap-3 flex-1">

            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-xl font-semibold">Anna Williams</h1>

              <span className="border border-[#14967f]/20 text-[#14967f] px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                <BadgeCheck size={14} />
                Front Desk Officer
              </span>
            </div>

            <span className="text-gray-600">
              Employee ID: REC-33012
            </span>

            <div className="flex gap-3 flex-wrap">

              <button className="flex items-center gap-2 bg-[#14967f] text-white px-5 py-2 rounded-xl shadow hover:scale-[1.03] transition">
                <MessageSquare size={18} />
                View Requests
              </button>

              <button className="border border-[#14967f]/20 text-[#14967f] px-5 py-2 rounded-xl hover:bg-[#14967f]/5 transition">
                Contact Admin
              </button>

            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {stats.map((item, i) => (
              <StatCard key={i} {...item} />
            ))}
          </div>

        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Personal Info */}
          <div className="rounded-2xl p-6 bg-white/70 backdrop-blur-xl border border-white/40 shadow-lg hover:shadow-xl transition">

            <h2 className="text-lg font-semibold mb-5 flex items-center gap-2">
              <User className="w-5 h-5 text-[#14967f]" />
              Personal Info
            </h2>

            <div className="space-y-4 text-sm">

              {[
                ["Age", "31"],
                ["Gender", "Female"],
                ["Phone", "+977-9800000000"],
                ["Email", "anna@hospital.com"],
                ["Address", "Kathmandu, Nepal"],
              ].map(([label, value], i) => (
                <div
                  key={i}
                  className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0"
                >
                  <span className="text-gray-500">{label}</span>
                  <span className="font-medium text-gray-800">{value}</span>
                </div>
              ))}

            </div>
          </div>

          {/* Work Info */}
          <div className="rounded-2xl p-6 bg-white/70 backdrop-blur-xl border border-white/40 shadow-lg hover:shadow-xl transition">

            <h2 className="text-lg font-semibold mb-5 flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-[#f59e0b]" />
              Responsibilities
            </h2>

            <div className="space-y-3 text-sm">

              {[
                "Patient Registration",
                "Appointment Scheduling",
                "Front Desk Management",
                "Insurance Verification",
                "Call Handling",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#14967f]" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}

            </div>
          </div>

          {/* Daily Activity */}
          <div className="rounded-2xl p-6 bg-white/70 backdrop-blur-xl border border-white/40 shadow-lg hover:shadow-xl transition">

            <h2 className="text-lg font-semibold mb-5 flex items-center gap-2">
              <Activity className="w-5 h-5 text-[#3b82f6]" />
              Daily Activity
            </h2>

            <div className="space-y-4 text-sm">

              {[
                { text: "Checked in 24 patients", time: "Today" },
                { text: "Scheduled 18 appointments", time: "Today" },
                { text: "Verified insurance docs", time: "Yesterday" },
              ].map((item, i) => (
                <div key={i} className="flex gap-3 p-3 rounded-xl hover:bg-white transition">

                  <div className="w-2.5 h-2.5 mt-2 rounded-full bg-[#14967f]" />

                  <div>
                    <p className="text-sm font-medium text-gray-800">{item.text}</p>
                    <p className="text-xs text-gray-400">{item.time}</p>
                  </div>

                </div>
              ))}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}