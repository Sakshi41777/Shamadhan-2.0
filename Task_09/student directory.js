import React, { useState, useEffect } from "react";

function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ id: "", name: "", branch: "" });

  // Fetch students on load
  useEffect(() => {
    fetch("http://localhost:3000/students")
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.error(err));
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add student
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
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">🎓 Student Directory</h1>

      {/* Add Student Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-4 mb-6 max-w-md mx-auto"
      >
        <input
          type="text"
          name="id"
          placeholder="ID"
          value={form.id}
          onChange={handleChange}
          className="border p-2 rounded w-full mb-2"
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="border p-2 rounded w-full mb-2"
        />
        <input
          type="text"
          name="branch"
          placeholder="Branch"
          value={form.branch}
          onChange={handleChange}
          className="border p-2 rounded w-full mb-2"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded w-full">
          Add Student
        </button>
      </form>

      {/* Student List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {students.map((student) => (
          <div
            key={student.id}
            className="bg-white shadow-lg rounded-xl p-4 hover:shadow-xl transition"
          >
            <h2 className="text-lg font-semibold">{student.name}</h2>
            <p className="text-gray-600">ID: {student.id}</p>
            <p className="text-gray-700 font-medium">Branch: {student.branch}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;