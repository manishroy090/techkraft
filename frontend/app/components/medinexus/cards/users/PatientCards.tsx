import EventIcon from "@mui/icons-material/Event";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import RoomIcon from "@mui/icons-material/Room";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { DeleteModal } from "../../DeleteModal";
import { deletePatient } from "@/services/Patients";

const PatientCards = ({ patientDetails }: { patientDetails: any }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef<any>(null);
  const [open, setOpen] = useState(false);

  const [confirmAction, setConfirmAction] = useState<any>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
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

  const deletePatientDetails = async () => {
    const { id } = patientDetails;
    await deletePatient(id);
  };

  return (
    <div className="group patient relative flex justify-between p-4 bg-white ">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-300">
            <img
              src={
                patientDetails?.image
                  ? `http://localhost:8080/uploads/doctors/${patientDetails?.image}`
                  : patientDetails?.gender == "male"
                    ? "/hrm_image/male.png"
                    : "/hrm_image/female.jpg"
              }
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h1>{patientDetails?.name}</h1>
            <span>{`${patientDetails?.age}, ${patientDetails?.gender}`}</span>
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <div className="flex space-x-4">
            <EventIcon style={{ fontSize: "16px" }} />
            <span>{patientDetails?.last_visit}</span>
          </div>

          <div className="flex space-x-4">
            <RoomIcon style={{ fontSize: "16px" }} />

            <span>{patientDetails?.location}</span>
          </div>
        </div>
      </div>

      <div className="absolute top-3 right-3" ref={menuRef}>
        <button
          onClick={() => setOpenMenu(!openMenu)}
          className="p-2 rounded-xl bg-white shadow hover:scale-105 transition"
        >
          <MoreVertIcon fontSize="small" />
        </button>
        {openMenu && (
          <div className="absolute right-0 mt-2 w-32 bg-white border rounded-xl shadow-lg overflow-hidden z-50">
            <Link
              href={`/patients/createpatients/?userId=${patientDetails.id}`}
            >
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
          deletePatientDetails();
          setConfirmAction(null);
          setOpen(false);
        }}
      />
    </div>
  );
};

export default PatientCards;
