import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";
import { useState } from "react";

const Filter = ({children,rest}) => {

  const [showfilter,setShow] = useState(false);

  const clearAll = () =>{
    rest()
  }
 
  return (
    <div className="flex flex-col">
      <div onClick={()=>setShow((p)=>!p)} className="inline-flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 shadow-sm hover:shadow-md transition cursor-pointer select-none ml-52">
        <FilterAltRoundedIcon
          style={{ fontSize: 18 }}
          className="text-gray-700"
        />

        <span className="text-sm font-medium text-gray-800 leading-none">
          Filters
        </span>
      </div>
      <div className={showfilter ?`absolute mt-12 bg-white py-10 px-4 z-10 w-fit shadow-lg  rounded` : `absolute mt-12 bg-white py-10 px-4 z-10 w-fit shadow-lg  hidden`   }>
        <div className="flex justify-between">
          <h1>Filter</h1>
          <span className="text-red-600 cursor-pointer" onClick={clearAll}>clear All</span>
        </div>
           {children}
     
      </div>
    </div>
  );
};

export default Filter;