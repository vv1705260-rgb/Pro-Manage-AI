import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function TaskBoard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await axios.get('http://localhost:5000/api/tasks');
    setTasks(res.data);
  };
const addTask = async () => {
    await axios.post('http://localhost:5000/api/tasks', {
      title,
      status: 'To Do'
    });
    setTitle('');
    fetchTasks();
  };

  const statuses = ['To Do', 'In Progress', 'Done'];

  return (
    <div><div className="flex gap-2 mb-6">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 rounded w-64"
          placeholder="Enter task"
        />
        <button onClick={addTask} className="bg-black text-white px-4 py-2 rounded">
          Add Task
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {statuses.map(status => (
          <div key={status} className="bg-white p-4 rounded-xl shadow-xl">
            <h2 className="font-bold mb-3">{status}</h2>
            {tasks.filter(t => t.status === status).map(task => (
              <div key={task._id} className="bg-gray-100 p-2 mb-2 rounded">
                {task.title}
          </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
