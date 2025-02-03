import React, { useState } from 'react';
import { useStore } from '../utils/zustandStore'; // Adjust path as needed
import { getSortedTasks } from '../utils/sorting'; // Import the central sorting function

const ProjectTaskList = () => {
  const { userInfo } = useStore();
  const { tasks, projects } = userInfo;
  const [selectedSortOption, setSelectedSortOption] = useState<string>('priority'); // Default sorting option

  // Function to render tasks for each project
  const renderTasksForProject = (projectId: string) => {
    const projectTasks = tasks.filter((task: any) => task.project_id === projectId);
    const sortedTasks = getSortedTasks(projectTasks, selectedSortOption); // Use the central sorting function
    return sortedTasks.map((task: any) => (
      <tr key={task.id}>
        <td>{task.title}</td>
        <td>{task.description}</td>
        <td>{task.priority}</td>
        <td>{task.due_date}</td>
        <td>{task.taskstatus}</td>
      </tr>
    ));
  };

  return (
    <div>
      <div className="mb-4">
        <label htmlFor="sortOption" className="mr-2">Sort By:</label>
        <select
          id="sortOption"
          value={selectedSortOption}
          onChange={(e) => setSelectedSortOption(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="priority">Priority</option>
          <option value="dueDate">Due Date</option>
          <option value="status">Status</option>
        </select>
      </div>

      {projects.map((project: any) => (
        <div key={project.id} className="mb-6">
          <h2 className="text-xl font-semibold mb-2">{project.name}</h2>
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">Title</th>
                <th className="p-2 border">Description</th>
                <th className="p-2 border">Priority</th>
                <th className="p-2 border">Due Date</th>
                <th className="p-2 border">Status</th>
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
