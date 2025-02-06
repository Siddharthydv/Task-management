"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useStore } from "@/app/utils/zustandStore";
import { useDeleteTaskMutation } from "@/app/mutations/taskMutation";
import { Task } from "@/app/api/protected/task/taskTypes";
import { getSortedTasks } from "@/app/utils/sorting";
import { EditModal } from "@/app/components/EditModal";

const TaskDashboard = () => {
  const {
    userInfo: { tasks },
  } = useStore();
  const deleteTaskMutation = useDeleteTaskMutation();
  
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [sortType, setSortType] = useState("default");
  const [searchTerm, setSearchTerm] = useState("");
  const [TodoArray, setTodoArray] = useState<Task[]>([]);
  const [InprogressArray, setInprogArr] = useState<Task[]>([]);
  const [CompletedArr, setCompletedArr] = useState<Task[]>([]);

  useEffect(() => {
    if (tasks) {
      setTodoArray(tasks.filter((task) => task.taskstatus === "To Do"));
      setInprogArr(tasks.filter((task) => task.taskstatus === "In Progress"));
      setCompletedArr(tasks.filter((task) => task.taskstatus === "Done"));
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
        <h3 className="font-medium text-lg">
          {title} - <span className="text-sm">{task.description}</span>
        </h3>
        <p className="text-sm text-gray-500 mt-1">{type}</p>
        <p className="text-sm text-gray-500 mt-1">
          {new Date(task.due_date).getDate()}/
          {new Date(task.due_date).getMonth() + 1}/
          {new Date(task.due_date).getFullYear()}
        </p>
        <div className="flex justify-between mt-4">
          <Button
            onClick={() => setEditModalOpen(true)}
            variant="link"
            className="text-blue-500"
          >
            Edit
          </Button>
          <EditModal
            isOpen={isEditModalOpen}
            onClose={() => setEditModalOpen(false)}
            task={task}
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

  // Filtering logic for search
  const filterTodoTasks = (tasks: Task[]) =>
    TodoArray?.filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const filterInProgTasks = (tasks: Task[]) =>
      InprogressArray?.filter((task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      const filterCompTasks = (tasks: Task[]) =>
        CompletedArr?.filter((task) =>
          task.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex flex-col space-y-5 flex-grow">
      <h1 className="text-2xl font-bold mb-6">Tasks Overview</h1>

      {/* Search and Sorting Row */}
      <div className="flex items-center space-x-4">
       
        <div>
          <label className="font-semibold text-gray-700">Sort By:</label>
          <select
            onChange={(e) => setSortType(e.target.value)}
            value={sortType}
            className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-300 w-24"
          >
            <option value="default">None</option>
            <option value="priority">Priority</option>
            <option value="dueDate">Due Date</option>
          </select>
        </div>
        <Input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-1/3 border p-2 rounded"
        />
      </div>

      {/* Task Columns */}
      <div className="grid grid-cols-3 gap-6">
        {/* TO DO Column */}
        <div className="flex flex-col bborder border-orange-700 p-4 rounded-lg overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">TO DO</h2>
          {filterTodoTasks(getSortedTasks(TodoArray, sortType))?.map((task) => (
            <TaskCard key={task.id} title={task.title} id={task.id} type={task.priority} task={task} />
          ))}
          <Button variant="ghost" className="mt-4 text-blue-500">+ Add task</Button>
        </div>

        {/* IN PROGRESS Column */}
        <div className="flex flex-col bborder border-orange-700 p-4 rounded-lg overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">IN PROGRESS</h2>
          {filterInProgTasks(getSortedTasks(InprogressArray, sortType))?.map((task) => (
            <TaskCard key={task.id} title={task.title} id={task.id} type={task.priority} task={task} />
          ))}
          <Button variant="ghost" className="mt-4 text-blue-500">+ Add task</Button>
        </div>

        {/* DONE Column */}
        <div className="flex flex-col bborder border-orange-700 p-4 rounded-lg overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">DONE</h2>
          {filterCompTasks(getSortedTasks(CompletedArr, sortType))?.map((task) => (
            <TaskCard key={task.id} title={task.title} id={task.id} type={task.priority} task={task} />
          ))}
          <Button variant="ghost" className="mt-4 text-blue-500">+ Add task</Button>
        </div>
      </div>
    </div>
  );
};

export default TaskDashboard;
