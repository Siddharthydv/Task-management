"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useStore } from "@/app/utils/zustandStore";
import { useDeleteTaskMutation } from "@/app/mutations/taskMutation";
import { Task } from "@/app/api/protected/task/taskTypes";
import { todo } from "node:test";
import { getSortedTasks } from "@/app/utils/sorting";
import { EditModal } from "@/app/components/EditModal";
const TaskDashboard = () => {
  const {
    userInfo: { tasks },
  } = useStore();
  const deleteTaskMutation = useDeleteTaskMutation();
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  // Dropdown selection state
  const [sortType, setSortType] = useState("default");
  const [TodoArray, setTodoArray] = useState<Task[]>();
  const [InprogressArray, setInprogArr] = useState<Task[]>();
  const [CompletedArr, setcompletedArr] = useState<Task[]>();
  //
  useEffect(() => {
    if (tasks) {
      // Filter tasks based on their status
      const todos: Task[] = tasks.filter((task) => task.taskstatus === "To Do");
      const inProgress: Task[] = tasks.filter(
        (task) => task.taskstatus === "In Progress",
      );
      const completed: Task[] = tasks.filter(
        (task) => task.taskstatus === "Done",
      );
      console.log();
      console.log("todo", InprogressArray);
      // Update the state arrays
      setTodoArray(todos);
      setInprogArr(inProgress);
      setcompletedArr(completed);
    }
  }, [tasks]);

  const TaskCard = ({
    id,
    title,
    type,
    task,
  }: {
    id: string;
    title: string;
    type: string;
    task: Task;
  }) => (
    <Card className="mb-4 shadow-md p-4">
      <CardContent>
        <h3 className="font-medium text-lg">{title}</h3>
        <p className="text-sm text-gray-500 mt-1">{type}</p>
        <p className="text-sm text-gray-500 mt-1">
          {JSON.stringify(new Date(task.due_date).getDate())}/
          {JSON.stringify(new Date(task.due_date).getMonth())}/
          {JSON.stringify(new Date(task.due_date).getFullYear())}
        </p>
        <div className="flex justify-between mt-4">
          <Button
            onClick={() => {
              setEditModalOpen(true);
            }}
            variant="link"
            className="text-blue-500"
          >
            Edit
          </Button>
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
          <Button
            onClick={() => deleteTaskMutation.mutate(task.id)}
            disabled={deleteTaskMutation.isPending}
            variant="ghost"
            className="text-red-500"
          >
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex flex-col space-y-5 flex-grow">
      <h1 className="text-2xl font-bold mb-6">Tasks Overview</h1>
      <div>
        <label className="font-semibold text-gray-700">Sort By:</label>
        <select
          onChange={(e) => setSortType(e.target.value)}
          value={sortType}
          className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-300 w-15"
        >
          <option value="default">None</option>
          <option value="priority">Priority</option>
          <option value="dueDate">Due Date</option>
        </select>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* TO DO Column */}
        <div className="flex flex-col border bborder-orange-700 p-4 rounded-lg  overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">TO DO</h2>
          {TodoArray &&
            getSortedTasks(TodoArray, sortType)?.map((task, index) => (
              <TaskCard
                key={index}
                title={task.title}
                id={task.id}
                type={task.priority}
                task={task}
              />
            ))}
          <Button variant="ghost" className="mt-4 text-blue-500">
            + Add task
          </Button>
        </div>

        {/* IN PROGRESS Column */}
        <div className="flex flex-col border bborder-orange-700 p-4 rounded-lg  overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">IN PROGRESS</h2>
          {InprogressArray &&
            getSortedTasks(InprogressArray, sortType)?.map((task, index) => (
              <TaskCard
                key={index}
                title={task.title}
                id={task.id}
                type={task.priority}
                task={task}
              />
            ))}
          <Button variant="ghost" className="mt-4 text-blue-500">
            + Add task
          </Button>
        </div>

        {/* DONE Column */}
        <div className="flex flex-col border bborder-orange-700 p-4 rounded-lg  overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">DONE</h2>
          {CompletedArr &&
            getSortedTasks(CompletedArr, sortType)?.map((task, index) => (
              <TaskCard
                key={index}
                title={task.title}
                id={task.id}
                type={task.priority}
                task={task}
              />
            ))}
          <Button variant="ghost" className="mt-4 text-blue-500">
            + Add task
          </Button>
        </div>
      </div>
    </div>
  );
};
export default TaskDashboard;
