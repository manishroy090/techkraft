"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Sidebar = () => {
  const [active, setActive] = useState(true);
  return (
    <div className="h-screen bg-slate-500 w-62 py-8 rounded">
      <ul className="flex flex-col space-y-2">
        <li
          className={
            active
              ? `bg-yellow-100 text-[#14967f] font-semibold shadow-md p-3 text-black`
              : `flex
                items-center
                gap-3
                px-3
                py-2.5
                rounded-xl
                transition-all
                relative
                group`
          }
        >
          Candidates
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
