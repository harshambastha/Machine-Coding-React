import { useState, useRef } from "react";
import styles from "./KanbanBoard.module.css";

const getInitialInputState = (columns) => {
  return columns.reduce((acc, col) => {
    acc[col.id] = "";
    return acc;
  }, {});
};

export default function KanbanBoard({ columns, initialTasks }) {
  const [tasks, setTasks] = useState(structuredClone(initialTasks));
  const [inputValues, setInputValues] = useState(getInitialInputState(columns));
  const [dragOverCol, setDragOverCol] = useState(null);

  const dragInfo = useRef(null);
  const maxTaskId = Math.max(
    0,
    ...Object.values(initialTasks)
      .flat()
      .map((task) => Number.parseInt(task.id.replace("task-", ""), 10) || 0)
  );
  const taskCounter = useRef(maxTaskId + 1);

  const handleDragStart = (colId, taskId) => {
    dragInfo.current = { colId, taskId };
  };

  const handleDragOver = (e, colId) => {
    e.preventDefault();
    setDragOverCol(colId);
  };

  const handleDragLeave = () => {
    setDragOverCol(null);
  };

  const handleDrop = (e, targetColId) => {
    e.preventDefault();
    setDragOverCol(null);
    if (!dragInfo.current) return;

    const { colId: sourceColId, taskId } = dragInfo.current;
    dragInfo.current = null;

    if (sourceColId === targetColId) return;

    setTasks((prev) => {
      const task = prev[sourceColId].find((t) => t.id === taskId);
      return {
        ...prev,
        [sourceColId]: prev[sourceColId].filter((t) => t.id !== taskId),
        [targetColId]: [...prev[targetColId], task],
      };
    });
  };

  const handleAddTask = (colId) => {
    const content = inputValues[colId].trim();
    if (!content) return;
    const newTask = { id: `task-${taskCounter.current++}`, content };
    setTasks((prev) => ({ ...prev, [colId]: [...prev[colId], newTask] }));
    setInputValues((prev) => ({ ...prev, [colId]: "" }));
  };

  const handleDeleteTask = (colId, taskId) => {
    setTasks((prev) => ({
      ...prev,
      [colId]: prev[colId].filter((t) => t.id !== taskId),
    }));
  };

  const handleInputChange = (colId, value) => {
    setInputValues((prev) => ({ ...prev, [colId]: value }));
  };

  const handleKeyDown = (e, colId) => {
    if (e.key === "Enter") handleAddTask(colId);
  };

  return (
    <div className={styles.board}>
      {columns.map((col) => (
        <div
          key={col.id}
          className={`${styles.column} ${dragOverCol === col.id ? styles.columnDragOver : ""}`}
          onDragOver={(e) => handleDragOver(e, col.id)}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, col.id)}
        >
          <div className={styles.columnHeader}>
            <h3 className={styles.columnTitle}>{col.title}</h3>
            <span className={styles.count}>{tasks[col.id].length}</span>
          </div>

          <div className={styles.cards}>
            {tasks[col.id].map((task) => (
              <div
                key={task.id}
                className={styles.card}
                draggable
                onDragStart={() => handleDragStart(col.id, task.id)}
              >
                <span>{task.content}</span>
                <button
                  className={styles.deleteBtn}
                  onClick={() => handleDeleteTask(col.id, task.id)}
                  aria-label="Delete task"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className={styles.addTask}>
            <input
              type="text"
              placeholder="Add a task..."
              value={inputValues[col.id]}
              onChange={(e) => handleInputChange(col.id, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, col.id)}
            />
            <button onClick={() => handleAddTask(col.id)}>+</button>
          </div>
        </div>
      ))}
    </div>
  );
}
