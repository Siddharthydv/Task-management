"use client";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { TaskModal } from "./TaskModal";
import dashimg from "./images/dashboard.png";
import projimg from "./images/projects.png";
import taskimg from "./images/task.png";
import addTaskimg from "./images/addTask.png";
import signOutimg from "./images/signout.png";
import userImg from "./images/user.png"
const Sidebar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
    console.log()
  return (
    <div className="flex flex-col w-64 border-r border-gray-200 rounded-md p-4 bg-gray-50 shadow-md h-screen">
      {/* User Section */}
      {session && session.user && (
        <div className="flex flex-col items-center mb-6 p-4 bg-white rounded-lg shadow">
          <Image
            src={userImg}
            alt="User Avatar"
            width={50}
            height={50}
            className="rounded-full border border-gray-300"
          />
          <h3 className="mt-2 text-lg font-semibold">{session.user.name}</h3>
          <p className="text-sm text-gray-600">{session.user.email}</p>
        </div>
      )}

      {/* Navigation */}
      <div className="flex flex-col flex-grow">
        <h2 className="text-xl font-bold mb-4 text-gray-700">Dashboard</h2>
        <ul className="space-y-4">
          <li>
            <button
              onClick={() => router.push("/pages/dashboard")}
              className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-orange-400 hover:scale-105 active:scale-110 transition w-full text-left"
            >
              <Image src={dashimg} alt="Dashboard" width={20} height={20} />
              Dashboard
            </button>
          </li>

          <li>
            <button
              onClick={() => router.push("/pages/tasks")}
              className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-orange-400 hover:scale-105 active:scale-110 transition w-full text-left"
            >
              <Image src={taskimg} alt="Tasks" width={20} height={20} />
              Tasks
            </button>
          </li>

          <li>
            <button
              onClick={() => router.push("/pages/projects")}
              className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-orange-400  hover:scale-105 active:scale-110 transition w-full text-left"
            >
              <Image src={projimg} alt="Projects" width={20} height={20} />
              Projects
            </button>
          </li>

          <li>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-orange-400 hover:scale-105 active:scale-110 transition w-full text-left"
            >
              <Image src={addTaskimg} alt="Add Task" width={20} height={20} />
              Add Task
            </button>
            <TaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
          </li>

          <li>
            {session && (
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-red-500 hover:scale-105 active:scale-110 active:bg-red-600  hover:text-white transition w-full text-left"
              >
                <Image src={signOutimg} alt="Sign Out" width={20} height={20} />
                Sign Out
              </button>
            )}
          </li>
        </ul>
      </div>

      {/* Footer */}
      <div className="text-center mt-6 text-sm text-gray-500">
        &copy; 2025 My App
      </div>
    </div>
  );
};

export default Sidebar;
