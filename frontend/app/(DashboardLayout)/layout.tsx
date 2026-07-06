"use client";

import { useEffect } from "react";
import Header from "./layout/header/Header";
import Sidebar from "./layout/sidebar/Sidebar";
// import { getMe } from "../services/Auth";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../store/features/Hoshpital/AuthSlice";
import AIBotUI from "../components/medinexus/AIBotUI";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();



  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-100">
    

        {/* ================= HEADER ================= */}
          <Header />

        {/* ================= PAGE CONTENT ================= */}
        <main className=" p-20">
          {children}
        
        </main>

    </div>
  );
}