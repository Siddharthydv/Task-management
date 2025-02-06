"use client";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useState } from "react";
import React from "react";
import { nextauth } from "../api/auth/[...nextauth]/route";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { TaskModal } from "./TaskModal";
import dashimg from "./images/dashboard.png";
import projimg from "./images/projects.png";
import taskimg from "./images/task.png";
import addTaskimg from "./images/addTask.png";
import Appimg from "./images/appImg.png";
import signOutimg from "./images/signout.png";

const Sidebar = () => {
  const session = useSession();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col w-64 border-r rounded-md  justify-between p-4">
      <div className="flex flex-col">
        <div className="flex">
          {/* <Image src={Appimg} alt='appimg' width={20} height={20}/> */}
          <h2 className="text-2xl font-semibold mb-8">DashBoard</h2>
        </div>
        <ul className="space-y-6">
          <li>
            <div className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100">
              <Image src={dashimg} alt="Dashboard" width={20} height={20} />
              <button
                onClick={() => router.push("/pages/dashboard")}
                className="text-md font-semibold hover:text-gray-400 hover:scale-105"
              >
                Dashboard
              </button>
            </div>
          </li>

          <li>
            <div className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100">
              <Image src={taskimg} alt="Dashboard" width={20} height={20} />
              <button
                onClick={() => router.push("/pages/tasks")}
                className="text-md font-semibold hover:text-gray-400 hover:scale-105"
              >
                Tasks
              </button>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100">
              <Image src={projimg} alt="Projects" width={20} height={20} />
              <button
                onClick={() => router.push("/pages/projects")}
                className="text-md font-semibold hover:text-gray-400 hover:scale-105"
              >
                Projects
              </button>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100">
              <Image src={addTaskimg} alt="Dashboard" width={20} height={20} />
              <button
                onClick={() => setIsModalOpen(true)}
                className="text-md font-semibold hover:text-gray-400 hover:scale-105"
              >
                Add Task
              </button>
              <TaskModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
              />
            </div>
          </li>

          <li>
            <div className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100">
              <Image src={signOutimg} alt="Dashboard" width={20} height={20} />
              {session && (
                <button onClick={() => signOut({ callbackUrl: "/" })}>
                  Sign out
                </button>
              )}
            </div>
          </li>
        </ul>
      </div>
      {/* Footer or additional content can go here */}
      <div className="text-center mt-8">
        <p className="text-sm">&copy; 2025 My App</p>
      </div>
    </div>
  );
};

export default Sidebar;
