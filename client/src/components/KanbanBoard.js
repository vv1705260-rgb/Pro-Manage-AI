import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const API = "http://localhost:5000/api";
const API = "https://pro-manage-ai-1.onrender.com/api";
export default function KanbanBoard() {
  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchTasks();

    socket.on('taskUpdated', fetchTasks);

    return () => socket.off();
  }, []);

  const fetchTasks = async () => {
    const res = await axios.get('http://localhost:5000/api/tasks', {
      headers: { Authorization: token }
    });
    setTasks(res.data);
  };

  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const id = result.draggableId;
    const newStatus = result.destination.droppableId;

    await axios.put(
      `http://localhost:5000/api/tasks/${id}`,
      { status: newStatus },
      { headers: { Authorization: token } }
    );

    socket.emit('taskUpdated');
    fetchTasks();
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className=\"grid grid-cols-3 gap-6\">
        {statuses.map(status => (
          <Droppable droppableId={status} key={status}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className=\"bg-white/20 backdrop-blur-lg p-4 rounded-xl shadow-lg min-h-[300px]\"
              >
                <h2 className=\"text-white font-bold mb-3\">{status}</h2>

                {tasks
                  .filter(t => t.status === status)
                  .map((task, index) => (
                    <Draggable
                      key={task._id}
                      draggableId={task._id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className=\"bg-white text-black p-3 mb-2 rounded-lg shadow-md hover:scale-105 transition\"
                        >
                          {task.title}
                        </div>
                      )}
                    </Draggable>
                  ))}

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
    }
<div className="grid grid-cols-3 gap-6">
  {['To Do', 'In Progress', 'Done'].map(status => (
    <div
      key={status}
      className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-2xl"
    >
      <h2 className="text-white text-xl font-semibold mb-3">
        {status}
      </h2>

      {tasks
        .filter(t => t.status === status)
        .map(task => (
          <div
            key={task._id}
            className="bg-white text-black p-3 mb-3 rounded-xl shadow-md hover:scale-105 transition duration-300 cursor-pointer"
          >
            {task.title}
          </div>
        ))}
    </div>
  ))}
</div>
<button onClick={() => setDark(!dark)}>
  🌙 Toggle Theme
</button>
const [dark, setDark] = useState(true);

<div className={dark ? "dark" : ""}>
{message && (
  <div className="bg-green-500 text-white p-2 rounded mb-4">
    {message}
  </div>
)}
const [message, setMessage] = useState('');

const addTask = async () => {
  await axios.post(`${API}/tasks`, { title }, {
    headers: { Authorization: token }
  });
  setMessage("✅ Task Added!");
  setTimeout(() => setMessage(''), 2000);
};
<button
  onClick={() => setTitle("Design UI, Setup backend, Add auth")}
  className="bg-indigo-500 px-4 py-2 rounded-lg text-white mb-4"
>
  🤖 Suggest Tasks
</button>
<div className="mb-6 flex gap-3">
  <input
    value={title}
    onChange={e => setTitle(e.target.value)}
    placeholder="Enter new task..."
    className="flex-1 p-3 rounded-xl bg-white/20 text-white placeholder-gray-300 backdrop-blur-lg outline-none"
  />

  <button
    onClick={addTask}
    className="bg-purple-600 px-6 py-3 rounded-xl text-white hover:bg-purple-700 transition"
  >
    Add
  </button>
</div>
