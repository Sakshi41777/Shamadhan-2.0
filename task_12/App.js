import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  // Fetch students from backend
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/students");
      setStudents(res.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  // Add new student
  const addStudent = async () => {
    if (!name || !age) return alert("Please fill all fields!");
    try {
      const res = await axios.post("http://localhost:5000/students", {
        name,
        age: parseInt(age)
      });
      setStudents([...students, res.data]);
      setName("");
      setAge("");
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  // Delete student
  const deleteStudent = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/students/${id}`);
      setStudents(students.filter((s) => s.id !== id));
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  return (
    <div style={{ margin: "40px" }}>
      <h1>📚 Student List</h1>

      {/* Add Student Form */}
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginRight: "10px" }}
      />
      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        style={{ marginRight: "10px" }}
      />
      <button onClick={addStudent}>Add Student</button>

      <h2 style={{ marginTop: "20px" }}>All Students</h2>
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            {student.name} ({student.age} years)
            <button
              onClick={() => deleteStudent(student.id)}
              style={{ marginLeft: "10px", color: "red" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
