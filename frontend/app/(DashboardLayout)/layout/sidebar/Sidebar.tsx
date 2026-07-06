"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";




const Sidebar = () => {
  return (
      <div className="h-screen bg-black w-62 py-8">

         <ul className="flex flex-col space-y-2">
          <li className="bg-blue-100 w-full p-4 font-semibold text-bs">
            Candidates
          </li>
         </ul>

      </div>
  );
};

export default Sidebar;