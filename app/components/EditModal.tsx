import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useEditTaskMutation } from "../mutations/taskMutation";

export const EditModal = ({
  isOpen,
  onClose,
  task,
}: {
  isOpen: boolean;
  onClose: () => void;
  task: {
    id: string;
    title: string;
    description: string;
    priority: string;
    due_date: string;
    taskstatus: string;
  };
}) => {
  const { register, handleSubmit, reset } = useForm();
  const { mutate } = useEditTaskMutation();
  useEffect(() => {
    if (task) {
      reset(task); // Reset form with new task details when modal opens
    }
  }, [task, reset]);

  const onSubmit = async (data: any) => {
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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Edit Task</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <input
            {...register("title", { required: true })}
            className="w-full p-2 border rounded"
          />
          <textarea
            {...register("description")}
            className="w-full p-2 border rounded"
          ></textarea>

          <select
            {...register("priority", { required: true })}
            className="w-full p-2 border rounded"
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          {/* Due Date Input */}
          <input
            {...register("due_date", { required: true })}
            type="date"
            className="w-full p-2 border rounded"
          />

          <select
            {...register("taskstatus", { required: true })}
            className="w-full p-2 border rounded"
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
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
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Update Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
