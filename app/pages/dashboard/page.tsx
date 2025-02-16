"use client";
import { Task } from "@/app/api/protected/task/taskTypes";
import { useStore } from "@/app/utils/zustandStore";
import { useEffect, useState } from "react";
import { getSortedTasks } from "@/app/utils/sorting";
import TaskCalendar from "@/app/components/TaskCalender";
import { useDeleteTaskMutation } from "@/app/mutations/taskMutation";
import { EditModal } from "@/app/components/EditModal";
export default function Page() {
  return <Dashboard />;
}

import React from "react";

const Dashboard = () => {
  const {
    userInfo: { tasks },
  }: { userInfo: { tasks: Task[] } } = useStore();
  const [upcomingTasks, setUpcomingtasks] = useState<Task[]>();
  const [newTask, setNewTasks] = useState<Task[]>();
  const deleteTaskMutation = useDeleteTaskMutation();
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const { tasksdone, inProgress, completedtasks } = DashboardStat({ tasks });
  useEffect(() => {
    setUpcomingtasks(getSortedTasks(tasks, "dueDate"));
    const lastTasks = tasks.slice(-3); // Get last 3 tasks, or fewer if less exist
    setNewTasks(lastTasks);

    console.log("upcoming tasks", tasks[tasks.length - 1]);
  }, [tasks]);
  return (
    <div className="flex flex-col flex-grow p-4 space-y-4 bborder border-red-600 overflow-auto">
      {/* New Task Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-h-1/3">
        <div className="bg-white shadow-md  rounded p-4 max-h-1/3">
          <h2 className="text-xl font-semibold mb-2">New Task</h2>
          <ul className="space-y-2">
            {newTask?.[0] &&
              newTask?.map((task, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center p-2 bg-gray-100 rounded hover:bg-orange-400"
                >
                  <div>
                    <p className="font-medium">{task.title}</p> <span>{task.description}</span>
                    <p className="text-sm text-gray-600 space-x-2">
                      <span
                        className={`font-bold ${
                          task.priority === "High"
                            ? "text-red-500"
                            : task.priority === "Medium"
                              ? "text-yellow-500"
                              : "text-green-500"
                        }`}
                      >
                        {task.priority}
                      </span>
                      <span className="font-bold">
                        {JSON.stringify(new Date(task.due_date).getDate())}/
                        {JSON.stringify(new Date(task.due_date).getMonth())}/
                        {JSON.stringify(new Date(task.due_date).getFullYear())}
                      </span>
                    </p>
                  </div>
                  <div className="space-x-2">
                    {/* <button className="text-blue-600 hover:underline">View</button> */}

                    <button
                      onClick={() => {
                        setEditModalOpen(true);
                      }}
                      className="text-green-600 hover:underline"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteTaskMutation.mutate(task.id)}
                      disabled={deleteTaskMutation.isPending}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
          </ul>
        </div>

        {/* Tasks Section */}
        <div className="bg-white shadow-md rounded p-4 max-h-1/3">
          <h2 className="text-xl font-semibold mb-2">Tasks</h2>
          <ul className="space-y-2">
            <li className="flex justify-between items-center">
              <span>Marketing team completed their tasks.</span>
              <button className="text-blue-600 hover:underline">View</button>
            </li>
            <li className="flex justify-between items-center">
              <span>Operations team added new tasks.</span>
              <button className="text-blue-600 hover:underline">View</button>
            </li>
            <li className="flex justify-between items-center">
              <span>All your tasks in one place.</span>
              <button className="text-blue-600 hover:underline">
                New task
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Dashboard and Upcoming Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white shadow-md rounded p-4">
          <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Total", value: tasks.length },
              { label: "To Do", value: tasksdone },
              { label: "In Progress", value: inProgress },
              { label: "completed", value: completedtasks },
            ].map((stat, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center bg-gray-100 p-4 rounded"
              >
                <p className="text-2xl font-bold text-teal-500">{stat.value}</p>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white shadow rounded p-4">
          <h2 className="text-xl font-semibold mb-2">Upcoming Tasks</h2>
          <ul className="space-y-2">
            {upcomingTasks?.[0] &&
              upcomingTasks?.map((task, index) => (
                <li
                  key={index}
                  className="grid grid-cols-3 items-center p-2 bg-gray-100 hover:bg-orange-400 rounded gap-x-4"
                >
                  {/* Title */}
                  <span className="truncate">{task.title}</span>

                  {/* Due Date */}
                  <span className="text-center">
                    {new Date(task.due_date).getDate()}/
                    {new Date(task.due_date).getMonth() + 1}/
                    {new Date(task.due_date).getFullYear()}
                  </span>

                  {/* Actions */}
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => {
                        setEditModalOpen(true);
                      }}
                      className="text-green-600 hover:underline"
                    >
                      Edit
                    </button>
                    <EditModal
                      isOpen={isEditModalOpen}
                      onClose={() => setEditModalOpen(false)}
                      task={{
                        id: task.id,
                        description: task.description,
                        taskstatus: task.taskstatus,
                        due_date: task.due_date,
                        priority: task.priority,
                        title: task.title,
                      }}
                    />

                    <button
                      onClick={() => deleteTaskMutation.mutate(task.id)}
                      disabled={deleteTaskMutation.isPending}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>

      {/* Task Overview and Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TaskCalendar tasks={tasks} />
      </div>

      
    </div>
  );
};

function DashboardStat({ tasks }: { tasks: Task[] }) {
  const tasksdone = tasks.filter((task) => task.taskstatus === "To Do").length;
  const inProgress = tasks.filter(
    (task) => task.taskstatus === "In Progress",
  ).length;
  const completedtasks = tasks.filter(
    (task) => task.taskstatus === "Done",
  ).length;
  return { tasksdone, inProgress, completedtasks };
}
