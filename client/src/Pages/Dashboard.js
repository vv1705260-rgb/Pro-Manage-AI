import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);

  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('http://localhost:5000/api/tasks', {
      headers: { Authorization: token }
    }).then(res => setTasks(res.data));
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      {tasks.map(t => <div key={t._id}>{t.title}</div>)}
    </div>
  );
      }
import KanbanBoard from '../components/KanbanBoard';

export default function Dashboard() {
  return (
    <div className=\"min-h-screen bg-gradient-to-br from-black via-purple-900 to-indigo-900 p-6\">
      <h1 className=\"text-4xl text-white font-bold mb-6\">
        ProManage AI 🚀
      </h1>

      <KanbanBoard />
    </div>
  );
    }
  const [title, setTitle] = useState('');

const addTask = async () => {
  await axios.post(
    'http://localhost:5000/api/tasks',
    { title },
    { headers: { Authorization: token } }
  );
};
