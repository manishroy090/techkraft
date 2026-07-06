"use client";

import {
   Stethoscope,
   HeartPulse,
   User,
   Activity,
   ClipboardList,
   Calendar,
   Phone,
   Droplets,
   Pill,
   AlertCircle,
} from "lucide-react";

const vitals = [
   {
      label: "Heart Rate",
      value: 98,
      icon: HeartPulse,
      color: "bg-[#14967f]",
   },
   {
      label: "Blood Pressure",
      value: "120/80",
      icon: HeartPulse,
      color: "bg-[#f59e0b]", // amber
   },
   {
      label: "Oxygen Level",
      value: "98%",
      icon: HeartPulse,
      color: "bg-[#3b82f6]", // blue
   },
];

const VitalCard = ({ label, value, icon: Icon, color }:{ label:any, value:any, icon:any , color:any }) => {
   return (
      <div
         className={`flex flex-col gap-3 text-white rounded-xl p-6 shadow-md hover:scale-[1.02] transition ${color}`}
      >
         <Icon size={28} />
         <span className="text-sm opacity-90">{label}</span>
         <span className="text-xl font-semibold">{value}</span>
      </div>
   );
};

export default function Patientdetails() {
   return (
      <div className="flex flex-col gap-4 p-4">

         {/* Header */}
         <div>
            <h1 className="text-2xl font-semibold">Patient Details</h1>
            <span className="text-gray-500">
               Monitor patient health records and treatment process
            </span>
         </div>

         <div className="bg-white px-5 py-10 rounded-md h-fit space-y-8">

            {/* Gradient Banner */}
            <div className="h-28 w-full rounded-md bg-gradient-to-r from-[#14967f] via-[#16b78a] to-[#f5e97b]" />

            {/* Main Section */}
            <div className="flex flex-col lg:flex-row gap-8 lg:items-center">

               {/* Patient Image */}
               <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-xl">
                  <img
                     src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400"
                     alt="patient"
                     className="w-full h-full object-cover"
                  />
               </div>

               {/* Patient Info */}
               <div className="flex flex-col gap-3 flex-1">
                  <div className="flex items-center gap-3 flex-wrap">
                     <h1 className="text-xl font-semibold">John Deo</h1>
                     <span className="border border-[#14967f]/20 text-[#14967f] px-4 py-1 rounded-full text-sm font-medium">
                        Under Treatment
                     </span>
                  </div>

                  <span className="text-gray-600">
                     Patient ID: HSP-2026-001
                  </span>

                  <div className="flex gap-3 flex-wrap">
                     <button className="relative flex items-center gap-2 bg-[#14967f] text-white px-5 py-2 rounded-xl shadow hover:scale-[1.03] transition">

                        <Stethoscope size={18} />
                        View Reports

                        <span className="absolute -top-2 -right-2 text-[10px] bg-slate-100 text-black px-2 py-[2px] rounded-full font-bold">
                           SOON
                        </span>

                     </button>

                     <button className="border border-[#14967f]/20 text-[#14967f] px-4 py-2 rounded-xl hover:bg-[#14967f]/5 transition">
                        Emergency Contact
                     </button>
                  </div>
               </div>

               {/* Vitals */}
               <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {vitals.map((item, i) => (
                     <VitalCard
                        key={i}
                        label={item.label}
                        value={item.value}
                        icon={item.icon}
                        color={item.color}
                     />
                  ))}
               </div>

            </div>

            {/* Bottom Grid Section */}
            {/* Bottom Modern Grid Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

               {/* Personal Info */}
               <div className="rounded-2xl p-6 bg-white/70 backdrop-blur-xl border border-white/40 shadow-lg hover:shadow-xl transition duration-300">

                  <h2 className="text-lg font-semibold mb-5 flex items-center gap-2">
                     <User className="w-5 h-5 text-[#14967f]" />
                     Personal Info
                  </h2>

                  <div className="space-y-4 text-sm">
                     {[
                        ["Age", "45"],
                        ["Gender", "Male"],
                        ["Blood Group", "O+"],
                        ["Phone", "+977-9800000000"],
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

               {/* Medical Info */}
               <div className="rounded-2xl p-6 bg-white/70 backdrop-blur-xl border border-white/40 shadow-lg hover:shadow-xl transition duration-300">

                  <h2 className="text-lg font-semibold mb-5 flex items-center gap-2">
                     <ClipboardList className="w-5 h-5 text-[#f59e0b]" />
                     Medical Info
                  </h2>

                  <div className="space-y-4 text-sm">
                     {[
                        ["Condition", "Hypertension"],
                        ["Allergies", "None"],
                        ["Medications", "Amlodipine"],
                        ["Doctor", "Dr. Smith"],
                        ["Last Visit", "12 May 2026"],
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

               {/* Recent Activity */}
               <div className="rounded-2xl p-6 bg-white/70 backdrop-blur-xl border border-white/40 shadow-lg hover:shadow-xl transition duration-300">

                  <h2 className="text-lg font-semibold mb-5 flex items-center gap-2">
                     <Activity className="w-5 h-5 text-[#3b82f6]" />
                     Recent Activity
                  </h2>

                  <div className="space-y-4">
                     {[
                        { text: "Blood pressure checked", time: "2 hours ago", color: "bg-[#14967f]" },
                        { text: "Medication updated", time: "Yesterday", color: "bg-[#f59e0b]" },
                        { text: "Lab report uploaded", time: "3 days ago", color: "bg-[#3b82f6]" },
                     ].map((item, i) => (
                        <div
                           key={i}
                           className="flex items-start gap-3 p-3 rounded-xl hover:bg-white transition"
                        >
                           <div className={`w-2.5 h-2.5 mt-2 rounded-full ${item.color}`} />
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