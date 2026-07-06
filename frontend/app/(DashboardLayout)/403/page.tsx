"use client";

import React from "react";
import { motion } from "framer-motion";
import { LockKeyhole } from "lucide-react";

const Page = () => {
  return (
    <div className="flex items-center justify-center min-h-screen  px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className=" p-10 max-w-md w-full text-center border border-gray-100"
      >
        {/* Animated Icon */}
        <motion.div
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="flex justify-center"
        >
          <div className="bg-red-100 p-6 rounded-full">
            <LockKeyhole className="w-16 h-16 text-red-500" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold text-gray-800 mt-6"
        >
          Permission Denied
        </motion.h1>

        {/* Message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-gray-500 mt-4 leading-relaxed"
        >
          You do not have permission to access this page.
          <br />
          Please contact your administrator  to request
          access permissions.
        </motion.p>

    
      </motion.div>
    </div>
  );
};

export default Page;