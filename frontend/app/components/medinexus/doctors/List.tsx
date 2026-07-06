"use client";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Table from "../Table";
import { useEffect, useState } from "react";
import Link from "next/link";
import Badge from "@mui/material/Badge";
import { useRouter } from "next/navigation";
import { deleteDoctor } from "../../../services/Doctor";
import VisibilityIcon from '@mui/icons-material/Visibility';
import ModeIcon from '@mui/icons-material/Mode';
import DeleteIcon from '@mui/icons-material/Delete';
import { use } from "apexcharts";

const List = ({ data,query}:{ data:any,query:any}) => {
  const router = useRouter();

  const [page, setPage] = useState(1);

  const edit = async (doctorId:string) => {
    router.push(`/doctors/adddoctor/?doctor_id=${doctorId}`);
  };

  const deleteDoctorD = async (doctorId:string) => {
    deleteDoctor(doctorId);
  };

  useEffect(()=>{

    console.log(query);

  },[query])

  return (
    <div>
      <Table
        data={data}
        showaction={true}
        actionlist={[
          {
            label: "View",
            icon: <VisibilityIcon className="text-blue-600"/>,
            href: (item) => `/doctors/view/${item.id}`,
          },

          {
            label: "Edit",
            icon: <ModeIcon className="text-yellow-600"/>,
            onClick: (item) => edit(item.id),
          },

          {
            label: "Delete",
            icon: <DeleteIcon className="text-red-600"/>,
            confirm: true,
            onClick: (item) => deleteDoctorD(item.id),
          },
        ]}
        columnRenderers={{
          image:(value,row)=>{
            return(
                 <img className="w-16 h-16" src={row.image ? `http://localhost:8080/uploads/doctors/${row.image}`  : '/hrm_image/doctor.png'}/>
            )
          },
          status: (value) => {
            if (value === "Available") {
              return (
                <Badge className="bg-yellow-100 text-yellow-700 p-2 rounded">
                  Available
                </Badge>
              );
            }
            if (value === "On Leave") {
              return (
                <Badge className="bg-yellow-100 text-yellow-700 p-2 rounded">
                  On Leave
                </Badge>
              );
            }
            if (value === "Busy") {
              return (
                <Badge className="bg-green-100 text-green-700 p-2 rounded">
                  Busy
                </Badge>
              );
            }
            return (
              <Badge className="bg-blue-100 text-blue-700 p-2 rounded">
                Under Treatment
              </Badge>
            );
          },
        }}
        columns={[
          { title: "Name" },
          { title: "Designation" },
          { title: "Email" },
          { title: "Department" },
          { title: "Phone Number" },
          { title: "Image" },
          { title: "Fees" },
          { title: "Created At" },
          { title: "Status" },
        ]}
        query={query}
      />
    </div>
  );
};

export default List;
