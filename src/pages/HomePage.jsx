import React, { use, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [todo, setTodo] = useState([]);

  useEffect(() => {
    axios.get('https://tutam9-back.vercel.app/home')
      .then((res) => {
        console.log(res.data);
        setTasks(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const addTask = (e) => {
    e.preventDefault();
    if (newTask.trim() === '') return;
    axios.post('https://tutam9-back.vercel.app/home', { text: newTask })
      .then((res) => {
        console.log(res.data);
        setTasks([...tasks, res.data.data]);
        setNewTask('');
      })
      .catch((err) => {
        console.error(err);
      });
  };

const toggleTask = (task) => {
  axios.put('https://tutam9-back.vercel.app/home', {
    id: task.id,
    text: task.text,
    completed: !task.completed
  })
  .then((res) => {
    console.log(res.data);
    setTasks(tasks.map(t => 
      t.id === task.id ? { ...t, completed: !task.completed } : t
    ));
  })
  .catch((err) => {
    console.error(err);
  });
};

//delete task
const deleteTask = (id) => {
  axios.delete(`https://tutam9-back.vercel.app/home/${id}`)
    .then((res) => {
      console.log(res.data);
      setTasks(tasks.filter(task => task.id !== id));
    })
    .catch((err) => {
      console.error(err);
    });
};

// const deleteTask = (id) => {
//   setTasks(tasks.filter(task => task.id !== id));
// };


  const completedCount = tasks.filter(t => t.completed).length;
  const completionRate = tasks.length ? (completedCount / tasks.length) * 100 : 0;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5FAF8]">
      <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4 text-[#1F2937] flex items-center">
          ✅ To-Do List
        </h1>
        <div className="flex mb-4">
          <input
            type="text"
            className="flex-grow px-4 bg-white text-black py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300"
            placeholder="Add a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button
            onClick={addTask}
            className="bg-white text-black px-4 border focus:outline-none focus-ring-2 focus:ring-[#1F2937] rounded-lg hover:bg-gray-200 ml-2"
          >
            +
          </button>
        </div>
        <ul className="space-y-2">
          {tasks.map(task => (
            <li
              key={task.id}
              className="flex items-center justify-between p-2 border rounded-lg"
            >
              <div
                onClick={() => toggleTask(task)}
                className={`flex-grow cursor-pointer ${
                  task.completed ? 'line-through text-gray-400' : 'text-[#1F2937]'
                }`}
              >
                {task.text}
              </div>
              <button
                onClick={() => deleteTask(task.id)}
                className="text-black hover:bg-gray-200 bg-white"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
        <div className="text-center text-sm text-gray-500 mt-4"> 
          {completedCount} of {tasks.length} tasks complete
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div
              className="bg-[#1F2937] h-2 rounded-full"
              style={{ width: `${completionRate}%` }}
            ></div>
          </div>
          <span className="text-xs">{Math.round(completionRate)}%</span>
        </div>
        <div className="text-center text-xs text-gray-400 mt-4">
          ©BonifasiusRaditya (2306242350) - 2025
        </div>
      </div>
    </div>
  );
};

export default TodoApp;