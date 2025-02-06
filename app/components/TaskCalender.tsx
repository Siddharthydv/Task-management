import React, { useState, useMemo } from "react";
import { Task } from "../api/protected/task/taskTypes";

const formatDate = (date, formatString) => {
  const d = new Date(date);
  d.setUTCHours(0, 0, 0, 0); // Normalize to UTC midnight

  switch (formatString) {
    case "MMMM yyyy":
      return d.toLocaleString("default", { month: "long", year: "numeric" });
    case "yyyy-MM-dd":
      return d.toISOString().split("T")[0]; // Always returns correct UTC date
    case "d":
      return d.getUTCDate().toString();
    default:
      return d.toString();
  }
};

const isToday = (date) => {
  const today = new Date();
  const checkDate = new Date(date);
  return (
    checkDate.getDate() === today.getDate() &&
    checkDate.getMonth() === today.getMonth() &&
    checkDate.getFullYear() === today.getFullYear()
  );
};

const TaskCalendar = ({ tasks }: { tasks: Task[] }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedTask, setSelectedTask] = useState(null);

  // Organize tasks by date
  const tasksByDate = useMemo(() => {
    return tasks.reduce((acc, task) => {
      const dateKey = formatDate(new Date(task.due_date), "yyyy-MM-dd");
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(task);
      return acc;
    }, {});
  }, [tasks]);

  // Generate calendar days for current month
  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    const totalDays = 42;

    for (let i = 0; i < totalDays; i++) {
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + i);
      days.push(day);
    }

    return days;
  }, [currentDate]);

  const navigateMonth = (direction) => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + direction);
      return newDate;
    });
  };

  const isSameMonth = (date, referenceDate) => {
    return (
      date.getMonth() === referenceDate.getMonth() &&
      date.getFullYear() === referenceDate.getFullYear()
    );
    const formatDate = (date, formatString) => {
      const d = new Date(date);

      switch (formatString) {
        case "MMMM yyyy":
          return d.toLocaleString("default", {
            month: "long",
            year: "numeric",
          });
        case "yyyy-MM-dd":
          return d.toISOString().split("T")[0];
        case "d":
          return d.getDate().toString();
        default:
          return d.toString();
      }
    };
  };

  const getPriorityColor = (priority) => {
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

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md flex -z-30">
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
                p-2 border rounded 
                ${isToday(day) ? "bg-blue-100" : ""}
                ${!isSameMonth(day, currentDate) ? "text-gray-300" : ""}
                relative
              `}
              onClick={() => {
                const dayTasks = tasksByDate[formatDate(day, "yyyy-MM-dd")];
                if (dayTasks && dayTasks.length) {
                  handleTaskClick(dayTasks[0]);
                }
              }}
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

      {selectedTask && (
        <div className="w-1/4 border-l pl-4">
          <h3 className="text-lg font-bold mb-2">{selectedTask.title}</h3>
          <div
            className={`h-2 w-full ${getPriorityColor(selectedTask.priority)}`}
          ></div>
          <p className="mt-2 text-sm text-gray-600">
            {selectedTask.description}
          </p>
          <div className="mt-4">
            <div className="flex justify-between text-sm">
              <span>Status:</span>
              <span className="font-semibold">{selectedTask.taskstatus}</span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span>Due Date:</span>
              <span className="font-semibold">
                {formatDate(new Date(selectedTask.due_date), "yyyy-MM-dd")}
              </span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span>Project:</span>
              <span className="font-semibold">{selectedTask.project_id}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCalendar;
