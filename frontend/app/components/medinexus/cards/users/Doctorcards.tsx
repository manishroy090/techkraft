"use client";
import { useState, useRef, useEffect } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";
import { DeleteModal } from "../../DeleteModal";
import { deleteDoctor } from "../../../../services/Doctor";

const Doctorcards = ({ doctorDetails } : { doctorDetails:any }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef<any>(null);
  const [open, setOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<any>(
    null,
  );

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event:MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggelModal = () => {
    setConfirmAction(true);
  };

  const deletDoctor = async () => {
    const { id } = doctorDetails;
    await deleteDoctor(id);
  };

  return (
    <div className="group relative flex items-center gap-5 p-5 w-full max-w-md rounded-3xl bg-gradient-to-br from-white to-blue-50 border border-blue-100 shadow-md hover:shadow-xl transition">
      {/* Image */}
      <div className="w-28 h-28 flex-shrink-0">
        <img
          src={
            doctorDetails?.image
              ? `http://localhost:8080/uploads/doctors/${doctorDetails?.image}`
              : "/hrm_image/doctor.png"
          }
          alt="doctor"
          className="w-full h-full object-cover rounded-2xl border-2 border-white shadow-md"
        />
      </div>

      {/* Info */}

      <div className="flex-1 flex flex-col gap-2 pr-10">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col">
            <h2 className="text-lg font-bold text-gray-800">
              {doctorDetails?.name}
            </h2>
            <p className="text-sm text-blue-600 font-medium">
              {doctorDetails.department}
            </p>
          </div>

          <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-600 font-medium">
            {doctorDetails?.doctor_status}
          </span>
        </div>

        <div className="text-sm text-gray-600 space-y-1">
          <p>
            <span className="font-medium text-gray-800">Available:</span> Mon,
            20 Jan 2025
          </p>
          <p>
            <span className="font-medium text-gray-800">Starts From:</span>{" "}
            <span className="text-blue-600 font-bold">
              ${doctorDetails.fees}
            </span>
          </p>
        </div>

        {/* <div className="flex gap-2 mt-2">
          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 rounded-xl transition">
            Book Appointment
          </button>
          <button className="p-2 rounded-xl border hover:bg-gray-100 transition">
            <CalendarMonthIcon fontSize="small" />
          </button>
        </div> */}
      </div>

      {/* Menu */}
      <div className="absolute top-3 right-3" ref={menuRef}>
        <button
          onClick={() => setOpenMenu(!openMenu)}
          className="p-2 rounded-xl bg-white shadow hover:scale-105 transition"
        >
          <MoreVertIcon fontSize="small" />
        </button>

        {openMenu && (
          <div className="absolute right-0 mt-2 w-32 bg-white border rounded-xl shadow-lg overflow-hidden z-50">
            <Link href={`/doctors/adddoctor/?doctor_id=${doctorDetails.id}`}>
              <button className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-100">
                <EditIcon fontSize="small" />
                Edit
              </button>
            </Link>

            <button
              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-500 hover:bg-red-50"
              onClick={toggelModal}
            >
              <DeleteIcon fontSize="small" />
              Delete
            </button>
          </div>
        )}
      </div>
      <DeleteModal
        open={!!confirmAction}
        onClose={() => setConfirmAction(null)}
        onConfirm={async () => {
          deletDoctor();
          setConfirmAction(null);
          setOpen(false);
        }}
      />
    </div>
  );
};

export default Doctorcards;
