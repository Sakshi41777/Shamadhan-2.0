import React, { useState } from "react";

function Day8Task() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  // Add task
  const addTask = () => {
    if (task.trim() === "") return;
    setTasks([...tasks, task]);
    setTask("");
  };

  // Delete task
  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Day 8 Task - To-Do List</h2>

      {/* Input + Add Button */}
      <input
        type="text"
        placeholder="Enter task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>

      {/* Task List */}
      <ul>
        {tasks.map((t, index) => (
          <li key={index}>
            {t} 
            <button onClick={() => deleteTask(index)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Day8Task;