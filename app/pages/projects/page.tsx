"use client";
import React, { useState } from "react";
import { useStore } from "@/app/utils/zustandStore";
import { getSortedTasks } from "@/app/utils/sorting";
import { useAddProjectMutation } from "@/app/mutations/taskMutation";

const ProjectTaskList = () => {
  const { userInfo } = useStore();
  const { tasks, projects } = userInfo;
  const [selectedSortOption, setSelectedSortOption] =
    useState<string>("priority");
  const [projectName, setProjectName] = useState("");
  const addProjectMutation = useAddProjectMutation();

  const renderTasksForProject = (projectId: string) => {
    const projectTasks = tasks.filter((task: any) => task.project_id === projectId);
    const sortedTasks = getSortedTasks(projectTasks, selectedSortOption);
    
    return sortedTasks.map((task: any) => (
      <tr key={task.id} className="border-b hover:bg-gray-100 transition">
        <td className="p-3">{task.title}</td>
        <td className="p-3">{task.description}</td>
        <td className={`p-3 font-medium text-sm ${
          task.priority === "High"
            ? "text-red-600"
            : task.priority === "Medium"
            ? "text-orange-500"
            : "text-green-600"
        }`}>
          {task.priority}
        </td>
        <td className="p-3 text-gray-500">{task.due_date}</td>
        <td className="p-3">{task.taskstatus}</td>
      </tr>
    ));
  };

  return (
    <div className="flex flex-col p-6 bg-white rounded-lg shadow-md flex-grow overflow-auto">
      {/* Sorting Dropdown */}
      <div className="mb-5 flex items-center gap-3">
        <label htmlFor="sortOption" className="text-gray-700 font-medium">
          Sort By:
        </label>
        <select
          id="sortOption"
          value={selectedSortOption}
          onChange={(e) => setSelectedSortOption(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-orange-300 text-gray-700"
        >
          <option value="priority">Priority</option>
          <option value="dueDate">Due Date</option>
          <option value="status">Status</option>
        </select>
      </div>

      {/* Add New Project */}
      <div className="flex items-center gap-3 mb-5">
        <input
          type="text"
          placeholder="Enter project name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:ring focus:ring-orange-300"
        />
        <button
          onClick={() => addProjectMutation.mutate(projectName)}
          className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
        >
          Add Project
        </button>
      </div>

      {/* Project and Task Display */}
      {projects.map((project: any) => (
        <div key={project.id} className="mb-6 p-5 bg-gray-50 rounded-md shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-3">
            {project.name}
          </h2>
          <table className="w-full border border-gray-200 rounded-md">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-left">
                <th className="p-3">Title</th>
                <th className="p-3">Description</th>
                <th className="p-3">Priority</th>
                <th className="p-3">Due Date</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>{renderTasksForProject(project.id)}</tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default ProjectTaskList;
