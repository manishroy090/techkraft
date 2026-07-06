"use client";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Doctorcards from "../cards/users/Doctorcards";
import { useEffect, useState } from "react";
const Grid = ({ data = [], query }:{ data:any, query:any}) => {
  const [doctors, setDoctorDetails] = useState<any>();

  useEffect(() => {
    if(data.length>0){

      setDoctorDetails(data);
    }
  }, [data]);

  useEffect(() => {
    // console.log("doctors",doctors);

    const filtersValue = query?.filters;
    const filterDoctors = doctors?.filter(
      (doctor:any) =>
        doctor?.name == filtersValue?.name ||
        doctor?.designation == filtersValue?.designation ||
        doctor?.department == filtersValue?.department ||
        doctor?.fees == filtersValue?.fees ||
        doctor?.status == filtersValue?.status,
    );

    if (
      !filtersValue?.name &&
      !filtersValue?.designation &&
      !filtersValue?.department &&
      !filtersValue?.fees &&
      !filtersValue?.status
    ) {
      setDoctorDetails(data);
    } else {
      setDoctorDetails(filterDoctors);
    }
  }, [query]);

  return (
    <div className="grid grid-cols-3 gap-4 ">
      {doctors?.length >0 ? doctors?.map((item:any, index:any) => (
        <Doctorcards doctorDetails={item} key={index} />
      )) : <span className="text-center  col-span-3 py-8 font-semibold text-xl">No Data Available</span>}
    </div>
  );
};

export default Grid;
