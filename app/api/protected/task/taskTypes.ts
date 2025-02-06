export interface Task {
  id: string;
  title: string; // The title of the task
  description: string; // A brief description of the task
  priority: string; // Task priority (e.g., 'low', 'medium', 'high')
  due_date: string; // The due date of the task (as a Date object)
  category_id: string; // Category ID (UUID of the category)
  user_id: string; // User ID (UUID of the user who owns the task)
  taskstatus: string; // Status of the task (e.g., 'todo', 'in-progress', 'done')
  project_id: string; // Project ID (UUID of the associated project)
}
