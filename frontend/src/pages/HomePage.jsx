import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../constants.js";
import { Link, useNavigate } from "react-router-dom";

const HomePage = () => {
  const [todos, setTodos] = useState([]);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [editingTodo, setEditingTodo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const API_URL = `${BACKEND_URL}/api/todo`;

  const handleLogout = async () => {
    try {
      await axios.post(`${BACKEND_URL}/api/auth/logout`);
      setIsLoggedIn(false);
      setTodos([]);
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await axios.get(API_URL);
        setTodos(response.data);
        setIsLoggedIn(true);
      } catch (err) {
        setIsLoggedIn(false);
        setError("Failed to fetch tasks. Login required.");
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, []);

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!newTodoTitle.trim()) return;
    try {
      const response = await axios.post(API_URL, { title: newTodoTitle });
      setTodos([...todos, response.data]);
      setNewTodoTitle("");
    } catch (err) {
      setError("Failed to add to-do.");
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (err) {
      setError("Failed to delete to-do.");
    }
  };

  const handleToggleComplete = async (todo) => {
    try {
      const updatedTodo = { ...todo, isCompleted: !todo.isCompleted };
      const response = await axios.put(`${API_URL}/${todo._id}`, updatedTodo);
      setTodos(todos.map((t) => (t._id === todo._id ? response.data : t)));
    } catch (err) {
      setError("Failed to update to-do status.");
    }
  };

  const handleStartEdit = (todo) => {
    setEditingTodo({ _id: todo._id, title: todo.title });
  };

  const handleSaveEdit = async (id) => {
    if (!editingTodo.title.trim()) return;
    try {
      const response = await axios.put(`${API_URL}/${id}`, {
        title: editingTodo.title,
      });
      setTodos(todos.map((t) => (t._id === id ? response.data : t)));
      setEditingTodo(null);
    } catch (err) {
      setError("Failed to save edit.");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-black p-4">
      <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          My Task List
        </h1>

        <form onSubmit={handleAddTodo} className="flex gap-2 mb-6">
          <input
            type="text"
            value={newTodoTitle}
            onChange={(e) => setNewTodoTitle(e.target.value)}
            placeholder="Add a new task..."
            className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add
          </button>
        </form>

        {loading && <p className="text-center text-gray-500">Loading...</p>}
        {error && (
          <p className="text-center text-red-500 bg-red-100 p-2 rounded-md">
            {error}
          </p>
        )}

        <ul className="space-y-3">
          {todos.map((todo) => (
            <li
              key={todo._id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg shadow-sm transition-all hover:shadow-md"
            >
              <div className="flex items-center gap-3 flex-grow">
                <input
                  type="checkbox"
                  checked={todo.isCompleted}
                  onChange={() => handleToggleComplete(todo)}
                  className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                {editingTodo?._id === todo._id ? (
                  <input
                    type="text"
                    value={editingTodo.title}
                    onChange={(e) =>
                      setEditingTodo({ ...editingTodo, title: e.target.value })
                    }
                    className="flex-grow px-2 py-1 border border-blue-300 rounded-md"
                    onBlur={() => handleSaveEdit(todo._id)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && handleSaveEdit(todo._id)
                    }
                    autoFocus
                  />
                ) : (
                  <span
                    className={`flex-grow ${
                      todo.isCompleted
                        ? "line-through text-gray-400"
                        : "text-gray-800"
                    }`}
                  >
                    {todo.title}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {editingTodo?._id === todo._id ? (
                  <button
                    onClick={() => handleSaveEdit(todo._id)}
                    className="px-3 py-1 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleStartEdit(todo)}
                    className="px-3 py-1 text-sm font-medium text-gray-700 bg-yellow-400 rounded-md hover:bg-yellow-500"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => handleDeleteTodo(todo._id)}
                  className="px-3 py-1 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-4 text-center">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 inline-block"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
