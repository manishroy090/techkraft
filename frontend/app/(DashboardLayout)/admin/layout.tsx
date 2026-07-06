"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Sidebar from "../layout/sidebar/Sidebar";


export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();

 

  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-100 flex">
      
           <Sidebar/>

        {/* ================= PAGE CONTENT ================= */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>

    </div>
  );
}