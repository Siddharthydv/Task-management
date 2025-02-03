import { useState } from 'react';
import { useStore } from '../utils/zustandStore'; // Import your Zustand store
import { useDeleteTaskMutation } from '../mutations/taskMutation'; // Import your mutation hook
import { getSortedTasks } from '../utils/sorting'; // Import the sorting function

export default function TaskTable() {
  const { userInfo: { tasks } } = useStore();
  const deleteTaskMutation = useDeleteTaskMutation();

  // Dropdown selection state
  const [sortType, setSortType] = useState("default");

  return (
    <div className="overflow-x-auto">
      {/* Dropdown for sorting options */}
      <div className="mb-3">
        <label className="mr-2 font-semibold">Sort By:</label>
        <select
          onChange={(e) => setSortType(e.target.value)}
          value={sortType}
          className="px-4 py-2 border rounded"
        >
          <option value="default">None</option>
          <option value="priority">Priority</option>
          <option value="status">Task Status</option>
          <option value="dueDate">Due Date</option>
        </select>
      </div>

      {/* Task Table */}
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Description</th>
            <th className="p-2 border">Priority</th>
            <th className="p-2 border">Due Date</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {getSortedTasks(tasks, sortType).map((task: any) => (
            <tr key={task.id} className="border">
              <td className="p-2 border">{task.title}</td>
              <td className="p-2 border">{task.description}</td>
              <td className="p-2 border">{task.priority}</td>
              <td className="p-2 border">{task.due_date}</td>
              <td className="p-2 border">{task.taskstatus}</td>
              <td className="p-2 border flex gap-2">
                <button className="px-3 py-1 bg-blue-500 text-white rounded">
                  Edit
                </button>
                <button
                  onClick={() => deleteTaskMutation.mutate(task.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                  disabled={deleteTaskMutation.isPending}
                >
                  {deleteTaskMutation.isPending ? "Deleting..." : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
