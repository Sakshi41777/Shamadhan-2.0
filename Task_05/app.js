import React, { useState, useEffect } from "react";
import StudentCard from "./components/StudentCard";

function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ id: "", name: "", branch: "" });

  useEffect(() => {
    fetch("http://localhost:3000/students")
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((data) => setStudents(data.students));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-700">
        🎓 Student Directory
      </h1>

      {/* Add Student Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl p-6 mb-8 max-w-md mx-auto"
      >
        <input
          type="text"
          name="id"
          placeholder="ID"
          value={form.id}
          onChange={handleChange}
          className="border p-2 rounded w-full mb-3 focus:ring-2 focus:ring-indigo-400"
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="border p-2 rounded w-full mb-3 focus:ring-2 focus:ring-indigo-400"
        />
        <input
          type="text"
          name="branch"
          placeholder="Branch"
          value={form.branch}
          onChange={handleChange}
          className="border p-2 rounded w-full mb-3 focus:ring-2 focus:ring-indigo-400"
        />
        <button className="bg-indigo-600 text-white px-4 py-2 rounded w-full hover:bg-indigo-700 transition">
          Add Student
        </button>
      </form>

      {/* Student Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map((student) => (
          <StudentCard key={student.id} student={student} />
        ))}
      </div>
    </div>
  );
}

export default App;
