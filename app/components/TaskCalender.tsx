import React, { useState, useMemo } from "react";
import { Task } from "../api/protected/task/taskTypes";
import { useStore } from "../utils/zustandStore";

const formatDate = (date: string | Date, formatString: string) => {
  const d = new Date(date);
  d.setUTCHours(0, 0, 0, 0); // Normalize to UTC midnight

  switch (formatString) {
    case "MMMM yyyy":
      return d.toLocaleString("default", { month: "long", year: "numeric" });
    case "yyyy-MM-dd":
      return d.toISOString().split("T")[0]; // Correct UTC date
    case "d":
      return d.getUTCDate().toString();
    default:
      return d.toString();
  }
};

const isToday = (date: Date) => {
  const today = new Date();
  return (
    date.getUTCDate() === today.getUTCDate() &&
    date.getUTCMonth() === today.getUTCMonth() &&
    date.getUTCFullYear() === today.getUTCFullYear()
  );
};

const TaskCalendar = ({ tasks }: { tasks: Task[] }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedTasks, setSelectedTasks] = useState<Task[]>([]);
  const {userInfo:{projects}}=useStore();


  // Organize tasks by date
  const tasksByDate = useMemo(() => {
    return tasks.reduce<{ [key: string]: Task[] }>((acc, task) => {
      const dateKey = formatDate(new Date(task.due_date), "yyyy-MM-dd");
      acc[dateKey] = acc[dateKey] ? [...acc[dateKey], task] : [task];
      return acc;
    }, {});
  }, [tasks]);

  // Generate calendar days for current month
  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    

    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days: Date[] = [];
    for (let i = 0; i < 42; i++) {
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + i);
      days.push(day);
    }

    return days;
  }, [currentDate]);

  const navigateMonth = (direction: number) => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + direction);
      return newDate;
    });
  };

  const isSameMonth = (date: Date, referenceDate: Date) => {
    return (
      date.getMonth() === referenceDate.getMonth() &&
      date.getFullYear() === referenceDate.getFullYear()
    );
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const handleTaskClick = (date: Date) => {
    const dayTasks = tasksByDate[formatDate(date, "yyyy-MM-dd")] || [];
    setSelectedTasks(
      dayTasks.map((task) => ({
        ...task,
        project_name: projects.find((p) => p.id === task.project_id)?.name || "Unknown",
      }))
    );
  };
  

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md flex">
      <div className="w-3/4 pr-4">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => navigateMonth(-1)}
            className="px-2 py-1 bg-blue-500 text-white rounded"
          >
            Previous
          </button>
          <h2 className="text-xl font-bold">
            {formatDate(currentDate, "MMMM yyyy")}
          </h2>
          <button
            onClick={() => navigateMonth(1)}
            className="px-2 py-1 bg-blue-500 text-white rounded"
          >
            Next
          </button>
        </div>

        <div className="grid grid-cols-7 gap-2 text-center">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="font-bold text-gray-600">
              {day}
            </div>
          ))}

          {calendarDays.map((day) => (
            <div
              key={day.toISOString()}
              className={`
                p-2 border rounded cursor-pointer 
                ${isToday(day) ? "bg-blue-100" : ""}
                ${!isSameMonth(day, currentDate) ? "text-gray-300" : ""}
                relative
              `}
              onClick={() => handleTaskClick(day)}
            >
              <div className="text-sm">{formatDate(day, "d")}</div>
              {tasksByDate[formatDate(day, "yyyy-MM-dd")] && (
                <div className="absolute bottom-0 right-0 p-1">
                  <span className="bg-blue-500 text-white rounded-full px-2 py-1 text-xs">
                    {tasksByDate[formatDate(day, "yyyy-MM-dd")].length}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {selectedTasks.length > 0 && (
        <div className="w-1/4 border-l pl-4">
          <h3 className="text-lg font-bold mb-2">Tasks</h3>
          {selectedTasks.map((task) => (
            <div key={task.id} className="mb-4">
              <h4 className="font-semibold">{task.title}</h4>
              <div
                className={`h-2 w-full ${getPriorityColor(task.priority)}`}
              ></div>
              <p className="mt-2 text-sm text-gray-600">{task.description}</p>
              <div className="mt-2 text-sm">
                <div className="flex justify-between">
                  <span>Status:</span>
                  <span className="font-semibold">{task.taskstatus}</span>
                </div>
                <div className="flex justify-between mt-1">
                  <span>Due Date:</span>
                  <span className="font-semibold">
                    {formatDate(task.due_date, "yyyy-MM-dd")}
                  </span>
                </div>
                <div className="flex justify-between mt-1">
                  <span>Project:</span>
                 {task.project_name  && <span className="font-semibold">{task.project_name}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskCalendar;
