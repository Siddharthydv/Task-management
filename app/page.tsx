"use client";
import { useState } from "react";
import { TaskModal } from "./components/TaskModal";
import { useStore } from "./utils/zustandStore";

import { Appbar } from "./components/Appbar";

export default function Home() {
  const { userInfo } = useStore();
  console.log("userinfo", userInfo);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <Appbar />
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 bg-green-600 text-white rounded"
      >
        + New Task
      </button>

      <TaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      {/* <TaskTable/> */}
      {JSON.stringify(userInfo)}
    </div>
    // );
  );
}
