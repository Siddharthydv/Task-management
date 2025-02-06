import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../utils/reactQueryProvider";
import axios from "axios";

export const useAddTaskMutation = () => {
  return useMutation({
    mutationFn: async (taskData: {
      title: string;
      description: string;
      priority: string;
      due_date: string;
      taskstatus: string;
      project_id: string;
    }) => {
      console.log;
      const res = await axios.post("/api/protected/task", taskData, {
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] }); // Refetch tasks after adding a new one
    },
  });
};

export const useDeleteTaskMutation = () => {
  return useMutation({
    mutationFn: async (taskId: String) => {
      return await axios.delete(`/api/protected/task/${taskId}`, {
        withCredentials: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] }); // Refetch tasks after mutation
    },
  });
};

export const useEditTaskMutation = () => {
  return useMutation({
    mutationFn: async (taskData: {
      id: string;
      title: string;
      description: string;
      priority: string;
      due_date: string;
      taskstatus: string;
      project_id: string;
    }) => {
      console.log(taskData);
      const res = await axios.put(
        `/api/protected/task/${taskData.id}`,
        taskData,
        { withCredentials: true },
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

export const useAddProjectMutation = () => {
  return useMutation({
    mutationFn: async (name: string) => {
      console.log(name);
      const res = await axios.post(
        `/api/protected/projects/`,
        { name },
        { withCredentials: true },
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};
