// Import express
const express = require("express");
const app = express();


app.use(express.json());


let students = [
  { id: 1, name: "Aman", branch: "CSE" },
  { id: 2, name: "Priya", branch: "ECE" },
  { id: 3, name: "Rahul", branch: "ME" },
  // Sample student data
  { id: 4, name: "Sakshi", branch: "AI" }
];

// GET route → return list of students
app.get("/students", (req, res) => {
  res.json(students);
});

// POST route → add a new student
app.post("/students", (req, res) => {
  const newStudent = req.body;
  students.push(newStudent);
  res.json({ message: "Student added!", students });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
