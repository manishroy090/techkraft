"use client";

import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

import Profile from "./Profile";
import SidebarLayout from "../sidebar/Sidebar";

import { Sheet, SheetContent, SheetTitle } from "@components/medinexus/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsSticky(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`
          w-full z-50 transition-all duration-300 border-b border-gray-100
          ${isSticky ? "fixed top-0 bg-white shadow-sm" : "relative bg-white"}
        `}
      >
        <div className="flex items-center justify-between h-16 px-4 sm:px-6">

          {/* ================= LEFT ================= */}
          <div className="flex items-center gap-3">

            {/* Mobile menu */}
            <button
              onClick={() => setIsOpen(true)}
              className="xl:hidden p-2 rounded-lg hover:bg-gray-100 transition"
            >
              <Icon icon="tabler:menu-2" width="22" />
            </button>

            {/* System Identity */}
            <div className="flex flex-col leading-tight">

              <span className="text-sm font-semibold text-gray-900 tracking-wide">
                Medinexus Healthcare
              </span>

              <span className="text-[11px] text-gray-500 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Secure • Whitelisted • Live System
              </span>

            </div>

          </div>

          {/* ================= RIGHT ================= */}
          <div className="flex items-center gap-3">

            {/* Profile */}
            <Profile />

          </div>

        </div>
      </header>

      {/* ================= MOBILE SIDEBAR ================= */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="left" className="w-72 p-0">
          <VisuallyHidden>
            <SheetTitle>Sidebar</SheetTitle>
          </VisuallyHidden>

          {/* <SidebarLayout onClose={() => setIsOpen(false)} /> */}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Header;