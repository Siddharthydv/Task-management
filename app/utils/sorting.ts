// sortingUtils.ts

import { Task } from "../api/protected/task/taskTypes";

// Sorting by priority order
export const sortByPriority = (tasks: Task[]) => {
  const priorityOrder: Record<string, number> = { High: 1, Medium: 2, Low: 3 };
  return [...tasks].sort(
    (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority],
  );
};

// Sorting by task status order
// export const sortByStatus = (tasks: any[]) => {
//   const statusOrder: Record<string, number> = { "Todo": 1, "In Progress": 2, "Completed": 3 };
//   return [...tasks].sort((a, b) => statusOrder[a.taskstatus] - statusOrder[b.taskstatus]);
// };

// Sorting by due date (earliest first)
export const sortByDueDate = (tasks: any[]) => {
  return [...tasks].sort(
    (a, b) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime(),
  );
};

// Central function to get sorted tasks based on the selected sort type
export const getSortedTasks = (tasks: Task[], sortType: string) => {
  switch (sortType) {
    case "priority":
      return sortByPriority(tasks);
    // case "status":
    //   return sortByStatus(tasks);
    case "dueDate":
      return sortByDueDate(tasks);
    default:
      return tasks; // Default: No sorting
  }
};
