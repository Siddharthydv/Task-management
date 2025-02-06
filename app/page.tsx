"use client";
import { useState } from "react";
import { TaskModal } from "./components/TaskModal";
import { useStore } from "./utils/zustandStore";

import {  LandingPage } from "./components/LandingPage";

export default function Home() {
  const { userInfo } = useStore();
  console.log("userinfo", userInfo);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <LandingPage />
    </div>
    // );
  );
}
