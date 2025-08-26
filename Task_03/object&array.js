// Create an array of students (objects inside an array):

const students = [
  { name: "Aman", marks: [80, 75, 90] },
  { name: "Riya", marks: [60, 70, 65] },
  { name: "Kabir", marks: [95, 85, 92] }
];


// Use map() to calculate total marks of each student:

const totalMarks = students.map(student => {
  const total = student.marks.reduce((sum, m) => sum + m, 0);
  return { name: student.name, total };
});
console.log(totalMarks);


// Use filter() to find students with more than 200 marks:

const toppers = totalMarks.filter(s => s.total > 200);
console.log(toppers);


// Use reduce() to calculate class average:

const classTotal = totalMarks.reduce((sum, s) => sum + s.total, 0);
const classAverage = classTotal / students.length;
console.log("Class Average:", classAverage);