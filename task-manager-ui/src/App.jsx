import { useState, useEffect } from "react";

const API = "http://127.0.0.1:8000";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    const res = await fetch(`${API}/tasks`);
    const data = await res.json();
    setTasks(data);
    setLoading(false);
  }

  async function createTask() {
    if (!newTitle.trim()) return;
    await fetch(`${API}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTitle, description: newDescription }),
    });
    setNewTitle("");
    setNewDescription("");
    setShowForm(false);
    fetchTasks();
  }

  async function completeTask(task) {
    await fetch(`${API}/tasks/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !task.completed }),
    });
    fetchTasks();
  }

  async function deleteTask(id) {
    await fetch(`${API}/tasks/${id}`, { method: "DELETE" });
    fetchTasks();
  }

  return (
    <div>
      <header style={styles.header}>
        <h1 style={styles.heading}>Task Manager</h1>
        <p style={styles.subheading}>{tasks.length} task{tasks.length !== 1 ? "s" : ""}</p>
      </header>

      <button style={styles.addButton} onClick={() => setShowForm(!showForm)}>
        {showForm ? "Cancel" : "+ New Task"}
      </button>

      {showForm && (
        <div style={styles.form}>
          <input
            style={styles.input}
            placeholder="Task title (required)"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <input
            style={styles.input}
            placeholder="Description (optional)"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
          <button style={styles.submitButton} onClick={createTask}>
            Create Task
          </button>
        </div>
      )}

      {loading ? (
        <p style={styles.empty}>Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p style={styles.empty}>No tasks yet. Create one above!</p>
      ) : (
        <ul style={styles.list}>
          {tasks.map((task) => (
            <li key={task.id} style={styles.card}>
              <div style={styles.cardLeft}>
                <span style={{
                  ...styles.badge,
                  background: task.completed ? "#d1fae5" : "#e0e7ff",
                  color: task.completed ? "#065f46" : "#3730a3",
                }}>
                  {task.completed ? "Completed" : "In Progress"}
                </span>
                <p style={{
                  ...styles.title,
                  textDecoration: task.completed ? "line-through" : "none",
                  color: task.completed ? "#9ca3af" : "#1a1a2e",
                }}>
                  {task.title}
                </p>
                {task.description && (
                  <p style={styles.description}>{task.description}</p>
                )}
              </div>
              <div style={styles.cardRight}>
                <button
                  style={{
                    ...styles.actionButton,
                    background: task.completed ? "#fef3c7" : "#d1fae5",
                    color: task.completed ? "#92400e" : "#065f46",
                  }}
                  onClick={() => completeTask(task)}
                >
                  {task.completed ? "Undo" : "Complete"}
                </button>
                <button
                  style={styles.deleteButton}
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const styles = {
  header: { marginBottom: "24px" },
  heading: { fontSize: "32px", fontWeight: "700", color: "#1a1a2e" },
  subheading: { fontSize: "14px", color: "#6b7280", marginTop: "4px" },
  addButton: {
    marginBottom: "16px", padding: "10px 20px", background: "#4f46e5",
    color: "white", border: "none", borderRadius: "8px", fontSize: "15px",
    cursor: "pointer", fontWeight: "600",
  },
  form: {
    background: "white", borderRadius: "12px", padding: "20px",
    marginBottom: "20px", display: "flex", flexDirection: "column", gap: "12px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
  },
  input: {
    padding: "10px 14px", borderRadius: "8px", border: "1px solid #e5e7eb",
    fontSize: "15px", outline: "none",
  },
  submitButton: {
    padding: "10px", background: "#4f46e5", color: "white", border: "none",
    borderRadius: "8px", fontSize: "15px", cursor: "pointer", fontWeight: "600",
  },
  list: { listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" },
  card: {
    background: "white", borderRadius: "12px", padding: "16px 20px",
    display: "flex", justifyContent: "space-between", alignItems: "center",
    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
  },
  cardLeft: { display: "flex", flexDirection: "column", gap: "4px" },
  cardRight: { display: "flex", flexDirection: "column", gap: "8px", marginLeft: "16px" },
  badge: {
    display: "inline-block", padding: "2px 10px", borderRadius: "999px",
    fontSize: "12px", fontWeight: "600", width: "fit-content",
  },
  title: { fontSize: "16px", fontWeight: "600" },
  description: { fontSize: "14px", color: "#6b7280" },
  actionButton: {
    padding: "6px 14px", border: "none", borderRadius: "6px",
    fontSize: "13px", cursor: "pointer", fontWeight: "600",
  },
  deleteButton: {
    padding: "6px 14px", background: "#fee2e2", color: "#991b1b",
    border: "none", borderRadius: "6px", fontSize: "13px",
    cursor: "pointer", fontWeight: "600",
  },
  empty: { color: "#6b7280", textAlign: "center", marginTop: "40px" },
};