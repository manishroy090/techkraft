"use client";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PatientCards from "../cards/users/PatientCards";
import { useEffect, useState } from "react";
const Grid = ({ data = [], query }:{ data:any, query:any }) => {
  const [patients, setPatients] = useState<any>();

  useEffect(() => {
    setPatients(data);
  }, [data]);

  useEffect(() => {
    const filtersValue = query?.filters;
    if (filtersValue) {

      const filterPatients = patients?.filter(
        (patient:any) =>
          patient?.name == filtersValue?.name ||
          patient?.status == filtersValue?.status ||
          patient.primary_doctor == filtersValue?.primary_doctor,
      );

      if(!filtersValue?.name && !filtersValue?.status && !filtersValue?.primary_doctor ){

       setPatients(data);

      }
      else{
        setPatients(filterPatients);
      }

    }
  }, [query,data]);

  return (
    <div className="grid grid-cols-3 gap-4">
      {patients?.map((item:any, index:any) => (
        <PatientCards patientDetails={item} key={index} />
      ))}
    </div>
  );
};

export default Grid;
