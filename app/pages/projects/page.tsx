"use client";
import React, { useState } from "react";
import { useStore } from "@/app/utils/zustandStore"; // Adjust path as needed
import { getSortedTasks } from "@/app/utils/sorting"; // Import the central sorting function
import { useAddProjectMutation } from "@/app/mutations/taskMutation";
const ProjectTaskList = () => {
  const { userInfo } = useStore();
  const { tasks, projects } = userInfo;
  const [selectedSortOption, setSelectedSortOption] =
    useState<string>("priority"); // Default sorting option
  const addProjectMutation = useAddProjectMutation();
  // Function to render tasks for each project
  const renderTasksForProject = (projectId: string) => {
    const projectTasks = tasks.filter(
      (task: any) => task.project_id === projectId,
    );
    const sortedTasks = getSortedTasks(projectTasks, selectedSortOption); // Use the central sorting function
    return sortedTasks.map((task: any, index: number) => (
      <tr
        key={task.id}
        className={`border-b ${
          index % 2 === 0 ? "bg-gray-100" : "bg-white"
        } hover:bg-gray-200 transition`}
      >
        <td className="p-4">{task.title}</td>
        <td className="p-4">{task.description}</td>
        <td
          className={`p-4 font-semibold ${
            task.priority === "High"
              ? "text-red-500"
              : task.priority === "Medium"
                ? "text-yellow-500"
                : "text-green-500"
          }`}
        >
          {task.priority}
        </td>
        <td className="p-4">{task.due_date}</td>
        <td className="p-4">{task.taskstatus}</td>
      </tr>
    ));
  };

  return (
    <div className="flex-col flex-grow p-6 bg-gray-50 rounded-lg shadow-lg">
      {/* Sorting Dropdown */}
      <div className="mb-6 flex items-center gap-4">
        <label htmlFor="sortOption" className="text-gray-700 font-semibold">
          Sort By:
        </label>
        <select
          id="sortOption"
          value={selectedSortOption}
          onChange={(e) => setSelectedSortOption(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-300"
        >
          <option value="priority">Priority</option>
          <option value="dueDate">Due Date</option>
          <option value="status">Status</option>
        </select>
        <button
          onClick={() => {
            addProjectMutation.mutate("third project");
          }}
          className="border-2 p-2 rounded-md"
        >
          Add New Project
        </button>
      </div>

      {/* Project and Task Display */}
      {projects.map((project: any) => (
        <div
          key={project.id}
          className="mb-8 p-6 bg-white rounded-lg shadow-md"
        >
          <h2 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">
            {project.name}
          </h2>
          <div className="overflow-hidden rounded-lg">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-blue-500 text-white text-left">
                  <th className="p-4">Title</th>
                  <th className="p-4">Description</th>
                  <th className="p-4">Priority</th>
                  <th className="p-4">Due Date</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody>{renderTasksForProject(project.id)}</tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectTaskList;
