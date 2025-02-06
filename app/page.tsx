"use client";
import { useState } from "react";
import { useStore } from "./utils/zustandStore";

import {  LandingPage } from "./components/LandingPage";

export default function Home() {
  const { userInfo } = useStore();
  return (
    <div>
      <LandingPage />
    </div>
    // );
  );
}
