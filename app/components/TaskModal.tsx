import { useForm } from "react-hook-form";
import { useState } from "react";
import { useStore } from "../utils/zustandStore";
import { useAddTaskMutation } from "../mutations/taskMutation"; // Import your mutation hook
import { Task } from "../api/protected/task/taskTypes";
export const TaskModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { register, handleSubmit, reset } = useForm<Task>();
  const { mutate } = useAddTaskMutation();
  const [loading] = useState(false);

  const { userInfo } = useStore(); // Get user info from Zustand store
  const { projects } = userInfo; // Extract projects from userInfo

  const onSubmit = async (data: Task) => {
    mutate(data, {
      onSuccess: () => {
        reset();
        onClose();
      },
    });
    console.log(data);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30 ">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Create New Task</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <input
            {...register("title", { required: true })}
            placeholder="Task Title"
            className="w-full p-2 border rounded"
          />
          <textarea
            {...register("description")}
            placeholder="Description"
            className="w-full p-2 border rounded"
          ></textarea>

          <select
            {...register("priority", { required: true })}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <input
            {...register("due_date", { required: true })}
            type="date"
            className="w-full p-2 border rounded"
          />

          <select
            {...register("taskstatus", { required: true })}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Status</option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>

          {/* New Project Dropdown */}
          <select
            {...register("project_id", { required: true })}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Project</option>
            {projects.map((project: {id:string,name:string}) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              {loading ? "Creating..." : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
