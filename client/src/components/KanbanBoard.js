import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const statuses = ['To Do', 'In Progress', 'Done'];

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
