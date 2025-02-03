"use client"
import { useState } from "react";
import { TaskModal } from "./components/TaskModal";
import { useStore } from "./utils/zustandStore";
import TaskTable from "./components/TaskTable";
import { useDeleteTaskMutation } from "./mutations/taskMutation";
import ProjectTaskList from "./components/projects";
export default function Home() {
  const {userInfo:{tasks}}=useStore()
  // return (
  //   <button
  //   onClick={() => mutation.mutate()}
  //   disabled={mutation.status==="pending"}
  // >
  //   {mutation.status==="pending" ? "Adding..." : "Add Task"}
  // </button>
  // );
  const [isModalOpen, setIsModalOpen] = useState(false);
const deleteTaskMutation=useDeleteTaskMutation();
  return (
    <div>
      <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 bg-green-600 text-white rounded">
        + New Task
      </button>

      <TaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <TaskTable/>
      <ProjectTaskList/>
    </div>
  // );
   
)
  
};
