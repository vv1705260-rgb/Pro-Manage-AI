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
