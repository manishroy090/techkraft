"use client";
import React from "react";
import "./css/globals.css";
import {store}  from "@store/store";
import { StoreProvider } from "@/store/storeProvider";
import { Suspense } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.png" type="image/svg+xml" />
        {/* <link rel="manifest" href="/manifest.json" /> */}
        <meta name="theme-color" content="#5d87ff" />
        <script
          src="https://kit.fontawesome.com/018e90aa20.js"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className="">
        <StoreProvider >
            <Suspense>{children}</Suspense>
        </StoreProvider>
      </body>
    </html>
  );
}
